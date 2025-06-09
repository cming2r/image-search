import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';
import { metaTranslations } from './components/meta-translations';

// 多語言關鍵字

const keywordsList = {
  zh: ['日期計算器', '日期加減', '計算日期差', '天數計算'],
  en: ['date calculator', 'date difference', 'days between dates', 'add days to date'],
  jp: ['日付計算機', '日付の差', '日数計算', '日付の追加']
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/date/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼
const langMap = {
  'zh': 'zh-TW',
  'en': 'en',
  'jp': 'ja'
};

// 社交媒體分享圖片
const imageUrl = getFullUrl('/images/og-date.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'zh' } = await params;
  const lang = locale as 'zh' | 'en' | 'jp';
  const title = metaTranslations.meta.title[lang];
  const description = metaTranslations.meta.description[lang];
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = title;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'zh' ? '/date' : `/${locale}/date`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? '日期計算器工具界面' : 
               locale === 'en' ? 'Date Calculator Tool Interface' :
               '日付計算機ツールインターフェース',
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
      canonical: getFullUrl(locale === 'zh' ? '/date' : `/${locale}/date`),
      languages: {
        'zh-TW': getFullUrl('/date'),
        'en': getFullUrl('/en/date'),
        'ja': getFullUrl('/jp/date'),
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
 * 日期計算器頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function DateLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'zh' } = await params;
  const language = langMap[locale as keyof typeof langMap] || 'zh-TW';
  const lang = locale as 'zh' | 'en' | 'jp';
  
  // 根據當前語言取得相應標題與描述
  const title = metaTranslations.meta.title[lang];
  const description = metaTranslations.meta.description[lang];
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/date', title, locale);
  const articleSchema = generateArticleSchema(
    '/date',
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
    '/date',
    locale === 'zh' ? '日期計算工具' :
    locale === 'en' ? 'Date Calculation Tool' :
    '日付計算ツール',
    description,
    'UtilityApplication',
    '4.8',           // 評分值
    '180',           // 評分數量
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