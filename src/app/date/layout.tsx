import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema, generateWebApplicationSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '日期計算器 - 日曆天數計算';
const description = '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。';
const keywords = '日期計算器, 日曆天, 工作天計算, 工期計算, 時程規劃';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-date.png'));

// 從Git歷史獲取頁面日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/date/page.tsx');
const language = 'zh-TW';  // 語言

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/date', '日期計算器');
// webPageSchema 已移除
// 生成FAQ Schema
const faqSchema = generateFAQSchema([
  {
    '@type': 'Question',
    name: '什麼是日曆天？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '日曆天是指專案開始到結束的實際天數，包含了工作日、週末以及法定假日。它反映了專案所占用的時間，與工作天不同，日曆天計算包含所有日期，不考慮是否為工作日。'
    }
  },
  {
    '@type': 'Question',
    name: '如何計算兩個日期之間的日曆天數？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '使用我們的日期計算器，選擇「日期相減」選項，然後輸入起始日期和結束日期，系統將自動計算出這兩個日期之間的天數差距。例如，若專案於3月1日開始，並於3月31日結束，則日曆天數為30天。'
    }
  },
  {
    '@type': 'Question',
    name: '日曆天和工作天有什麼區別？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '日曆天包含所有的日期（包括周末和法定假日），而工作天則只計算實際工作日，不包含週末及法定假日。例如，一個為期7天的專案可能只有5個工作天，因為其中包含了週末。'
    }
  },
  {
    '@type': 'Question',
    name: '如何使用日期計算器進行日期加減計算？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '選擇「日期加天數」選項，輸入起始日期和要加減的天數（可為正數或負數），系統將自動計算出結果日期。例如，若從2025年3月15日加上10天，結果將顯示為2025年3月25日。'
    }
  },
  {
    '@type': 'Question',
    name: '日曆天計算在專案管理中有什麼應用？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '日曆天計算用於專案時程管理，有助於：1) 專案進度追蹤：比較實際與計劃時間；2) 資源分配與優化：合理安排人力和物力；3) 風險管理：識別可能導致延遲的因素，如節假日安排等。'
    }
  },
  {
    '@type': 'Question',
    name: '工期計算時需要注意什麼？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '工期計算時需要注意：1) 明確計算基準（日曆天或工作天）；2) 考慮國定假日和特殊休假；3) 區分不同類型活動的工作模式（例如某些工作可能包含週末）；4) 合理設定緩衝時間，以應對可能的風險和延遲；5) 考慮季節因素對某些工期的影響，如雨季對戶外工程的延遲。'
    }
  },
  {
    '@type': 'Question',
    name: '如何計算不同年份的天數差異？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '我們的日期計算器可以精確計算跨年計算，自動考慮閏年因素。您只需輸入兩個不同年份的日期，系統會自動計算準確的天數差異。例如，從2023年12月1日到2024年1月31日之間有62天，其中已考慮了閏年的計算。'
    }
  }
]);
const articleSchema = generateArticleSchema(
  '/date',
  title,
  description,
  imageUrl,
  datePublished,   // 發布日期
  dateModified,    // 修改日期
  language,        // 語言
  keywords,        // 關鍵字
  1800             // 字數統計 (估計值)
);

// 使用 generateWebApplicationSchema 函數生成 WebApplication Schema
const webApplicationSchema = generateWebApplicationSchema(
  '/date',                    // 路徑
  '日期計算器',               // 應用名稱
  description,                // 使用上面定義的描述
  'CalculatorApplication',    // 應用類別
  '4.7',                      // 評分值
  '152',                      // 評分數量
  datePublished,              // 使用頁面發布日期作為有效日期起點
  language                    // 頁面語言
);

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title: `${title} ｜ fyimg`, // 與網站標題模板保持一致
    description,
    // type, locale, siteName由根布局繼承
    url: getFullUrl('/date'),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '日期計算器與日曆天計算工具',
        type: 'image/png', // 指定圖片MIME類型增強兼容性
      },
    ],
  },
  
  // Twitter卡片設定 - 為X.com平台優化
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@fyimg',
    site: '@fyimg',  // 添加站點標籤增強Twitter卡片顯示
    images: [imageUrl],
  },
  
  // 其他metadata
  alternates: {
    canonical: getFullUrl('/date'),
  },
  
  keywords,
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
  
  // 結構化數據改為使用 script 標籤插入，移除 metadata.other
};

export default function DateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 使用標準腳本標籤添加 JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      {children}
    </>
  );
}