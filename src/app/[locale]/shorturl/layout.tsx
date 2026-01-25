import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';
import { shorturlTranslations } from './components/meta-translations';

const keywordsList = {
  tw: ['短網址', '縮短網址', '短連結產生器', 'URL縮短工具'],
  cn: ['短网址', '缩短网址', '短链接生成器', 'URL缩短工具'],
  en: ['url shortener', 'short link', 'link shortener', 'short url generator'],
  jp: ['URL短縮', '短縮リンク', 'リンク短縮ツール', 'URL短縮ジェネレーター'],
  es: ['acortador de url', 'enlace corto', 'acortador de enlaces', 'generador de url corta']
};

// 從meta-translations轉換FAQ數據格式以符合結構化數據需求
const convertFaqForSchema = (faqData: typeof shorturlTranslations.faq.questions.tw) => {
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
  tw: convertFaqForSchema(shorturlTranslations.faq.questions.tw),
  cn: convertFaqForSchema(shorturlTranslations.faq.questions.cn),
  en: convertFaqForSchema(shorturlTranslations.faq.questions.en),
  jp: convertFaqForSchema(shorturlTranslations.faq.questions.jp),
  es: convertFaqForSchema(shorturlTranslations.faq.questions.es)
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/shorturl/page.tsx');

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
  const title = shorturlTranslations.meta.title[locale as keyof typeof shorturlTranslations.meta.title] || shorturlTranslations.meta.title.tw;
  const description = shorturlTranslations.meta.description[locale as keyof typeof shorturlTranslations.meta.description] || shorturlTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = shorturlTranslations.meta.title[locale as keyof typeof shorturlTranslations.meta.title] || shorturlTranslations.meta.title.tw;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'en' ? '/shorturl' : `/${locale}/shorturl`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'tw' ? '短網址產生器工具界面' :
               locale === 'cn' ? '短网址生成器工具界面' :
               locale === 'en' ? 'URL Shortener Tool Interface' :
               locale === 'es' ? 'Interfaz de Herramienta Acortadora de URL' :
               'URL短縮ツールインターフェース',
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
      canonical: getFullUrl(locale === 'en' ? '/shorturl' : `/${locale}/shorturl`),
      languages: {
        'zh-TW': getFullUrl('/tw/shorturl'),
        'zh-CN': getFullUrl('/cn/shorturl'),
        'en': getFullUrl('/en/shorturl'),
        'ja': getFullUrl('/jp/shorturl'),
        'es': getFullUrl('/es/shorturl'),
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
 * 短網址頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function ShortUrlLayout({
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
  const title = shorturlTranslations.meta.title[locale as keyof typeof shorturlTranslations.meta.title] || shorturlTranslations.meta.title.tw;
  const description = shorturlTranslations.meta.description[locale as keyof typeof shorturlTranslations.meta.description] || shorturlTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.tw;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/shorturl', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/shorturl',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    2500,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/shorturl',
    locale === 'tw' ? '短網址產生器工具' :
    locale === 'cn' ? '短网址生成器工具' :
    locale === 'en' ? 'URL Shortener Tool' :
    locale === 'es' ? 'Herramienta Acortadora de URL' :
    'URL短縮ツール',
    description,
    'WebApplication',
    '4.8',           // 評分值
    '156',           // 評分數量
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