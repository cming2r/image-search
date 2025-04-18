import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema, generateArticleSchema, generateWebApplicationSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '交換禮物抽籤線上工具';
const description = '免費線上交換禮物抽籤工具，輸入參與者名單，一鍵隨機分配送禮對象，支援排除特定配對，適合公司、朋友聚會使用。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-gift-exchange.png'));

// 從Git歷史獲取頁面日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/gift-exchange/page.tsx');
const language = 'zh-TW';  // 語言

// 準備 JSON-LD 數據
const breadcrumbSchema = generateBreadcrumbSchema('/gift-exchange', '交換禮物抽籤工具');
const webPageSchema = generateWebPageSchema(
  '/gift-exchange',
  title,
  description,
  imageUrl,        // 提供圖片URL
  language,        // 語言
  datePublished,   // 發布日期
  dateModified     // 修改日期
);
const faqSchema = generateFAQSchema('giftexchange');
const articleSchema = generateArticleSchema(
  '/gift-exchange',
  title,
  description,
  imageUrl,
  datePublished,   // 發布日期
  dateModified,    // 修改日期
  language         // 語言
);

// 使用 generateWebApplicationSchema 函數生成 WebApplication Schema
const webApplicationSchema = generateWebApplicationSchema(
  '/gift-exchange',           // 路徑
  '交換禮物抽籤工具',         // 應用名稱
  description,                // 使用上面定義的描述
  'UtilityApplication',       // 應用類別
  '4.9',                      // 評分值
  '125'                       // 評分數量
);

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph標籤設定
  openGraph: {
    title: `${title} ｜ fyimg`, // 與網站標題模板保持一致
    description,
    // type, locale, siteName由根布局繼承
    url: getFullUrl('/gift-exchange'),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '禮物交換抽籤轉盤工具',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@fyimg',
    site: '@fyimg',
    images: [imageUrl],
  },
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/gift-exchange'),
  },
  
  // 確保其他必要的元數據
  keywords: '交換禮物, 抽籤工具, 聖誕節抽籤, 抽禮物, 禮物配對',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
  
  // 結構化數據改為使用 script 標籤插入，移除 metadata.other
};

export default function GiftExchangeLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      {children}
    </>
  );
}