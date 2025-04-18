import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema, generateArticleSchema, generateWebApplicationSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '日期計算器 - 日曆天數計算';
const description = '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-date.png'));

// 從Git歷史獲取頁面日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/date/page.tsx');
const language = 'zh-TW';  // 語言

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/date', '日期計算器');
const webPageSchema = generateWebPageSchema(
  '/date',
  title,
  description,
  imageUrl,        // 提供圖片URL
  language,        // 語言
  datePublished,   // 發布日期
  dateModified     // 修改日期
);
const faqSchema = generateFAQSchema('date');
const articleSchema = generateArticleSchema(
  '/date',
  title,
  description,
  imageUrl,
  datePublished,   // 發布日期
  dateModified,    // 修改日期
  language         // 語言
);

// 使用 generateWebApplicationSchema 函數生成 WebApplication Schema
const appSchema = generateWebApplicationSchema(
  '/date',                    // 路徑
  '日期計算器',               // 應用名稱
  description,                // 使用上面定義的描述
  'UtilityApplication',       // 應用類別
  '4.7',                      // 評分值
  '152'                       // 評分數量
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
  
  keywords: '日期計算器, 日曆天, 工作天計算, 工期計算, 時程規劃',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
  
  // 直接在 metadata 中添加結構化數據 (JSON-LD)
  other: {
    'application/ld+json': [
      JSON.stringify(breadcrumbSchema),
      JSON.stringify(webPageSchema),
      JSON.stringify(faqSchema),
      JSON.stringify(articleSchema),
      JSON.stringify(appSchema)
    ]
  }
};

export default function DateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}