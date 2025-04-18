import { Metadata, Viewport } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema, generateArticleSchema, generateWebApplicationSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '預產期計算器 - 懷孕週數計算工具';
const description = '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-due-date-calculator.webp'));

// 從Git歷史獲取頁面日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/due-date-calculator/page.tsx');
const language = 'zh-TW';  // 語言

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/due-date-calculator', '預產期計算器');
const webPageSchema = generateWebPageSchema(
  '/due-date-calculator',
  title,
  description,
  imageUrl,        // 提供圖片URL
  language,        // 語言
  datePublished,   // 發布日期
  dateModified     // 修改日期
);
const faqSchema = generateFAQSchema('duedate');
const articleSchema = generateArticleSchema(
  '/due-date-calculator',
  title,
  description,
  imageUrl,
  datePublished,   // 發布日期
  dateModified,    // 修改日期
  language         // 語言
);

// 使用 generateWebApplicationSchema 函數生成 WebApplication Schema
const appSchema = generateWebApplicationSchema(
  '/due-date-calculator',     // 路徑
  '預產期計算器',             // 應用名稱
  description,                // 使用上面定義的描述
  'HealthApplication',        // 應用類別 - 使用健康類別
  '4.9',                      // 評分值
  '185'                       // 評分數量
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
    url: getFullUrl('/due-date-calculator'),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '預產期計算器工具圖示',
        type: 'image/webp', // 指定圖片MIME類型增強兼容性
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
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/due-date-calculator'),
  },
  
  // 確保其他必要的元數據
  keywords: '預產期計算器, 懷孕週數, 內格萊氏法則, 孕期照護, 孕婦保健',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function DueDateLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {children}
    </>
  );
}