import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { videoUrlTranslations } from './components/meta-translations';


const keywordsList = {
  tw: ['影片網址', '影片上傳', '影片連結產生器', '影片託管', '影片分享', 'MP4上傳'],
  cn: ['视频网址', '视频上传', '视频链接生成器', '视频托管', '视频分享', 'MP4上传'],
  en: ['video url', 'video upload', 'video link generator', 'video hosting', 'video sharing', 'MP4 upload'],
  jp: ['動画URL', '動画アップロード', '動画リンクジェネレーター', '動画ホスティング', '動画共有', 'MP4アップロード'],
  es: ['url de video', 'subir video', 'generador de enlace de video', 'alojamiento de videos', 'compartir videos', 'subir MP4']
};

// 從meta-translations轉換FAQ數據格式以符合結構化數據需求
const convertFaqForSchema = (faqData: typeof videoUrlTranslations.faq.questions.tw) => {
  return faqData.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }));
};

// 多語言FAQ數據（基於meta-translations）
const faqsData = {
  tw: convertFaqForSchema(videoUrlTranslations.faq.questions.tw),
  cn: convertFaqForSchema(videoUrlTranslations.faq.questions.cn),
  en: convertFaqForSchema(videoUrlTranslations.faq.questions.en),
  jp: convertFaqForSchema(videoUrlTranslations.faq.questions.jp),
  es: convertFaqForSchema(videoUrlTranslations.faq.questions.es)
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/video-url/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼

const langMap = {
  'tw': 'zh-TW',
  'cn': 'zh-CN',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片

const imageUrl = getFullUrl('/images/og-image.png');

// 生成多語言元數據配置

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params;
  const title = videoUrlTranslations.meta.title[locale as keyof typeof videoUrlTranslations.meta.title] || videoUrlTranslations.meta.title.tw;
  const description = videoUrlTranslations.meta.description[locale as keyof typeof videoUrlTranslations.meta.description] || videoUrlTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'en' ? `影片網址產生器` : 
                  locale === 'en' ? `Video URL Generator` : 
                  locale === 'es' ? `Generador de URL de Video` :
                  `動画URLジェネレーター`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'en' ? '/video-url' : `/${locale}/video-url`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'tw' ? '影片網址產生器工具界面' :
               locale === 'cn' ? '视频网址生成器工具界面' :
               locale === 'en' ? 'Video URL Generator Tool Interface' :
               locale === 'es' ? 'Interfaz de Herramienta Generadora de URL de Video' :
               '動画URLジェネレーターツールインターフェース',
          type: 'image/png',
        },
      ],
    },
    
    // Twitter/X 平台卡片設定
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fyimg',
      site: '@fyimg',
      images: [imageUrl],
    },
    
    // 規範連結（確保SEO正確性）
    alternates: {
      canonical: getFullUrl(locale === 'en' ? '/video-url' : `/${locale}/video-url`),
      languages: {
        'zh-TW': getFullUrl('/tw/video-url'),
        'zh-CN': getFullUrl('/cn/video-url'),
        'en': getFullUrl('/en/video-url'),
        'ja': getFullUrl('/jp/video-url'),
        'es': getFullUrl('/es/video-url'),
      },
    },
    
    // 關鍵字、作者及發布者信息
    keywords,
    authors: [{ name: 'fyimg開發團隊' }],
    creator: 'fyimg開發團隊',
    publisher: 'fyimg',
  };
}

/**
 * 影片網址產生器頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function VideoUrlLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'en' } = await params;
  const language = langMap[locale as keyof typeof langMap] || 'zh-TW';
  
  // 根據當前語言取得相應標題與描述
  const title = videoUrlTranslations.meta.title[locale as keyof typeof videoUrlTranslations.meta.title] || videoUrlTranslations.meta.title.tw;
  const description = videoUrlTranslations.meta.description[locale as keyof typeof videoUrlTranslations.meta.description] || videoUrlTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.tw;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/video-url', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/video-url',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    2000,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/video-url',
    locale === 'tw' ? '影片網址產生器工具' :
    locale === 'cn' ? '视频网址生成器工具' :
    locale === 'en' ? 'Video URL Generator Tool' :
    locale === 'es' ? 'Herramienta Generadora de URL de Video' :
    '動画URLジェネレーターツール',
    description,
    'WebApplication',
    '4.9',           // 更新的評分值
    '92',            // 更新的評分數量
    datePublished,   // 使用頁面發布日期作為有效日期起點
    language,        // 頁面語言
    locale           // 當前語言代碼
  );
  
  return (
    <>
      {/* 結構化數據標記 - 為每個數據類型使用獨立標記 */}
      <script
        type="application/ld+json"
      >{`
${formatJSON(breadcrumbSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(faqSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(articleSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(webApplicationSchema)}
`}</script>
      {children}
    </>
  );
}