import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { imageUrlTranslations } from './components/meta-translations';


const keywordsList = {
  zh: ['圖片網址', '圖片上傳', '圖片連結產生器', '圖片託管'],
  en: ['image url', 'image upload', 'image link generator', 'image hosting'],
  jp: ['画像URL', '画像アップロード', '画像リンクジェネレーター', '画像ホスティング'],
  es: ['url de imagen', 'subir imagen', 'generador de enlace de imagen', 'alojamiento de imágenes']
};

// 從meta-translations轉換FAQ數據格式以符合結構化數據需求
const convertFaqForSchema = (faqData: typeof imageUrlTranslations.faq.questions.zh) => {
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
  zh: convertFaqForSchema(imageUrlTranslations.faq.questions.zh),
  en: convertFaqForSchema(imageUrlTranslations.faq.questions.en),
  jp: convertFaqForSchema(imageUrlTranslations.faq.questions.jp),
  es: convertFaqForSchema(imageUrlTranslations.faq.questions.es)
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/image-url/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼

const langMap = {
  'zh': 'zh-TW',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片

const imageUrl = getFullUrl('/images/og-image.png');

// 生成多語言元數據配置

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'zh' } = await params;
  const title = imageUrlTranslations.meta.title[locale as keyof typeof imageUrlTranslations.meta.title] || imageUrlTranslations.meta.title.zh;
  const description = imageUrlTranslations.meta.description[locale as keyof typeof imageUrlTranslations.meta.description] || imageUrlTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'zh' ? `圖片網址產生器` : 
                  locale === 'en' ? `Image URL Generator` : 
                  locale === 'es' ? `Generador de URL de Imagen` :
                  `画像URLジェネレーター`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'zh' ? '/image-url' : `/${locale}/image-url`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? '圖片網址產生器工具界面' : 
               locale === 'en' ? 'Image URL Generator Tool Interface' :
               locale === 'es' ? 'Interfaz de Herramienta Generadora de URL de Imagen' :
               '画像URLジェネレーターツールインターフェース',
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
      canonical: getFullUrl(locale === 'zh' ? '/image-url' : `/${locale}/image-url`),
      languages: {
        'zh-TW': getFullUrl('/image-url'),
        'en': getFullUrl('/en/image-url'),
        'ja': getFullUrl('/jp/image-url'),
        'es': getFullUrl('/es/image-url'),
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
 * 圖片網址產生器頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function ImageUrlLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'zh' } = await params;
  const language = langMap[locale as keyof typeof langMap] || 'zh-TW';
  
  // 根據當前語言取得相應標題與描述
  const title = imageUrlTranslations.meta.title[locale as keyof typeof imageUrlTranslations.meta.title] || imageUrlTranslations.meta.title.zh;
  const description = imageUrlTranslations.meta.description[locale as keyof typeof imageUrlTranslations.meta.description] || imageUrlTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.zh;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/image-url', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/image-url',
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
    '/image-url',
    locale === 'zh' ? '圖片網址產生器工具' :
    locale === 'en' ? 'Image URL Generator Tool' :
    locale === 'es' ? 'Herramienta Generadora de URL de Imagen' :
    '画像URLジェネレーターツール',
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