import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema,
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { giftExchangeTranslations } from './components/meta-translations';

const keywordsList = {
  tw: ['交換禮物', '抽籤', '輪盤', '秘密聖誕老人', '團隊活動'],
  cn: ['交换礼物', '抽签', '转盘', '秘密圣诞老人', '团队活动'],
  en: ['gift exchange', 'drawing', 'wheel', 'secret santa', 'team event'],
  jp: ['ギフト交換', '抽選', 'ホイール', 'シークレットサンタ', 'チームイベント'],
  es: ['intercambio de regalos', 'sorteo', 'ruleta', 'amigo secreto', 'evento de equipo']
};

// 從meta-translations轉換FAQ數據格式以符合結構化數據需求
const convertFaqForSchema = (faqData: typeof giftExchangeTranslations.faq.questions.tw) => {
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
  tw: convertFaqForSchema(giftExchangeTranslations.faq.questions.tw),
  cn: convertFaqForSchema(giftExchangeTranslations.faq.questions.cn),
  en: convertFaqForSchema(giftExchangeTranslations.faq.questions.en),
  jp: convertFaqForSchema(giftExchangeTranslations.faq.questions.jp),
  es: convertFaqForSchema(giftExchangeTranslations.faq.questions.es)
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/gift-exchange/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼
const langMap = {
  'tw': 'zh-TW',
  'cn': 'zh-CN',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片
const imageUrl = getFullUrl('/images/og-gift-exchange.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params;
  const title = giftExchangeTranslations.meta.title[locale as keyof typeof giftExchangeTranslations.meta.title] || giftExchangeTranslations.meta.title.tw;
  const description = giftExchangeTranslations.meta.description[locale as keyof typeof giftExchangeTranslations.meta.description] || giftExchangeTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'en' ? `交換禮物抽籤` : 
                locale === 'en' ? `Gift Exchange Draw` : 
                locale === 'jp' ? `ギフト交換抽選` :
                locale === 'es' ? `Sorteo de Intercambio de Regalos` : `Gift Exchange Draw`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'en' ? '/gift-exchange' : `/${locale}/gift-exchange`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'tw' ? '交換禮物抽籤工具界面' :
               locale === 'cn' ? '交换礼物抽签工具界面' :
               locale === 'en' ? 'Gift Exchange Draw Tool Interface' :
               locale === 'jp' ? 'ギフト交換抽選ツールインターフェース' :
               locale === 'es' ? 'Interfaz de Herramienta de Sorteo de Intercambio de Regalos' : 'Gift Exchange Draw Tool Interface',
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
      canonical: getFullUrl(locale === 'en' ? '/gift-exchange' : `/${locale}/gift-exchange`),
      languages: {
        'zh-TW': getFullUrl('/tw/gift-exchange'),
        'zh-CN': getFullUrl('/cn/gift-exchange'),
        'en': getFullUrl('/en/gift-exchange'),
        'ja': getFullUrl('/jp/gift-exchange'),
        'es': getFullUrl('/es/gift-exchange'),
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
 * 交換禮物抽籤頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function GiftExchangeLayout({
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
  const title = giftExchangeTranslations.meta.title[locale as keyof typeof giftExchangeTranslations.meta.title] || giftExchangeTranslations.meta.title.tw;
  const description = giftExchangeTranslations.meta.description[locale as keyof typeof giftExchangeTranslations.meta.description] || giftExchangeTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.tw;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/gift-exchange', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/gift-exchange',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    3500,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/gift-exchange',
    locale === 'tw' ? '交換禮物轉盤工具' :
    locale === 'cn' ? '交换礼物转盘工具' :
    locale === 'en' ? 'Gift Exchange Wheel Tool' :
    locale === 'jp' ? 'ギフト交換ホイールツール' :
    locale === 'es' ? 'Herramienta de Ruleta de Intercambio de Regalos' : 'Gift Exchange Wheel Tool',
    description,
    'SocialApplication',
    '4.9',           // 評分值
    '240',           // 評分數量
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