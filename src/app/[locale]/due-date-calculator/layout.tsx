import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema,
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { metaTranslations } from './components/meta-translations';

const keywordsList = {
  zh: ['預產期計算', '懷孕週數', '生產日期', '孕期追蹤'],
  en: ['due date calculator', 'pregnancy weeks', 'delivery date', 'pregnancy tracker'],
  jp: ['出産予定日計算', '妊娠週数', '分娩日', '妊娠追跡'],
  es: ['calculadora de fecha de parto', 'semanas de embarazo', 'fecha de parto', 'seguimiento del embarazo']
};

// 從meta-translations轉換FAQ數據格式以符合結構化數據需求
const convertFaqForSchema = (faqData: typeof metaTranslations.faq.questions.zh) => {
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
  zh: convertFaqForSchema(metaTranslations.faq.questions.zh),
  en: convertFaqForSchema(metaTranslations.faq.questions.en),
  jp: convertFaqForSchema(metaTranslations.faq.questions.jp),
  es: convertFaqForSchema(metaTranslations.faq.questions.es)
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/due-date-calculator/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼
const langMap = {
  'zh': 'zh-TW',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片
const imageUrl = getFullUrl('/images/og-due-date-calculator.webp');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params;
  const title = metaTranslations.meta.title[locale as keyof typeof metaTranslations.meta.title] || metaTranslations.meta.title.zh;
  const description = metaTranslations.meta.description[locale as keyof typeof metaTranslations.meta.description] || metaTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'en' ? `預產期計算器` : 
                locale === 'en' ? `Due Date Calculator` : 
                locale === 'jp' ? `出産予定日計算機` :
                locale === 'es' ? `Calculadora de Fecha de Parto` : `Due Date Calculator`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'en' ? '/due-date-calculator' : `/${locale}/due-date-calculator`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? '預產期計算器工具界面' : 
               locale === 'en' ? 'Due Date Calculator Tool Interface' :
               locale === 'jp' ? '出産予定日計算機ツールインターフェース' :
               locale === 'es' ? 'Interfaz de Herramienta Calculadora de Fecha de Parto' : 'Due Date Calculator Tool Interface',
          type: 'image/webp',
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
      canonical: getFullUrl(locale === 'en' ? '/due-date-calculator' : `/${locale}/due-date-calculator`),
      languages: {
        'zh-TW': getFullUrl('/due-date-calculator'),
        'en': getFullUrl('/en/due-date-calculator'),
        'ja': getFullUrl('/jp/due-date-calculator'),
        'es': getFullUrl('/es/due-date-calculator'),
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
 * 預產期計算器頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function DueDateCalculatorLayout({
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
  const title = metaTranslations.meta.title[locale as keyof typeof metaTranslations.meta.title] || metaTranslations.meta.title.zh;
  const description = metaTranslations.meta.description[locale as keyof typeof metaTranslations.meta.description] || metaTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.zh;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/due-date-calculator', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/due-date-calculator',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    3200,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/due-date-calculator',
    locale === 'zh' ? '懷孕預產期計算工具' :
    locale === 'en' ? 'Pregnancy Due Date Calculator Tool' :
    locale === 'jp' ? '妊娠出産予定日計算ツール' :
    locale === 'es' ? 'Herramienta Calculadora de Fecha de Parto del Embarazo' : 'Pregnancy Due Date Calculator Tool',
    description,
    'MedicalApplication',
    '4.8',           // 評分值
    '160',           // 評分數量
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