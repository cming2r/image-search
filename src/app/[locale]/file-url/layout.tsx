import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { fileUrlTranslations } from './components/meta-translations';


const keywordsList = {
  tw: ['檔案網址', '檔案上傳', '檔案連結產生器', '檔案託管', '檔案分享'],
  cn: ['文件网址', '文件上传', '文件链接生成器', '文件托管', '文件分享'],
  en: ['file url', 'file upload', 'file link generator', 'file hosting', 'file sharing'],
  jp: ['ファイルURL', 'ファイルアップロード', 'ファイルリンクジェネレーター', 'ファイルホスティング', 'ファイル共有'],
  es: ['url de archivo', 'subir archivo', 'generador de enlace de archivo', 'alojamiento de archivos', 'compartir archivos']
};

// 從meta-translations轉換FAQ數據格式以符合結構化數據需求
const convertFaqForSchema = (faqData: typeof fileUrlTranslations.faq.questions.tw) => {
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
  tw: convertFaqForSchema(fileUrlTranslations.faq.questions.tw),
  cn: convertFaqForSchema(fileUrlTranslations.faq.questions.cn),
  en: convertFaqForSchema(fileUrlTranslations.faq.questions.en),
  jp: convertFaqForSchema(fileUrlTranslations.faq.questions.jp),
  es: convertFaqForSchema(fileUrlTranslations.faq.questions.es)
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/file-url/page.tsx');

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
  const title = fileUrlTranslations.meta.title[locale as keyof typeof fileUrlTranslations.meta.title] || fileUrlTranslations.meta.title.tw;
  const description = fileUrlTranslations.meta.description[locale as keyof typeof fileUrlTranslations.meta.description] || fileUrlTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'en' ? `檔案網址產生器` : 
                  locale === 'en' ? `File URL Generator` : 
                  locale === 'es' ? `Generador de URL de Archivo` :
                  `ファイルURLジェネレーター`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'en' ? '/file-url' : `/${locale}/file-url`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'tw' ? '檔案網址產生器工具界面' :
               locale === 'cn' ? '文件网址生成器工具界面' :
               locale === 'en' ? 'File URL Generator Tool Interface' :
               locale === 'es' ? 'Interfaz de Herramienta Generadora de URL de Archivo' :
               'ファイルURLジェネレーターツールインターフェース',
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
      canonical: getFullUrl(locale === 'en' ? '/file-url' : `/${locale}/file-url`),
      languages: {
        'zh-TW': getFullUrl('/tw/file-url'),
        'zh-CN': getFullUrl('/cn/file-url'),
        'en': getFullUrl('/file-url'),
        'ja': getFullUrl('/jp/file-url'),
        'es': getFullUrl('/es/file-url'),
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
 * 檔案網址產生器頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function FileUrlLayout({
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
  const title = fileUrlTranslations.meta.title[locale as keyof typeof fileUrlTranslations.meta.title] || fileUrlTranslations.meta.title.tw;
  const description = fileUrlTranslations.meta.description[locale as keyof typeof fileUrlTranslations.meta.description] || fileUrlTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.tw;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/file-url', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/file-url',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    1800,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/file-url',
    locale === 'tw' ? '檔案網址產生器工具' :
    locale === 'cn' ? '文件网址生成器工具' :
    locale === 'en' ? 'File URL Generator Tool' :
    locale === 'es' ? 'Herramienta Generadora de URL de Archivo' :
    'ファイルURLジェネレーターツール',
    description,
    'WebApplication',
    '4.9',           // 更新的評分值
    '89',            // 更新的評分數量
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