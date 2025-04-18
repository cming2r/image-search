import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema, generateArticleSchema, generateWebApplicationSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋';
const description = '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-image-search.png'));

// 從Git歷史獲取頁面日期，直接使用路由路徑
const { created: datePublished, modified: dateModified } = getPageDates('/image-search');
const language = 'zh-TW';  // 語言

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/image-search', '圖片搜尋');
const webPageSchema = generateWebPageSchema(
  '/image-search',
  title,
  description,
  imageUrl,        // 提供圖片URL，以便WebPageSchema包含完整信息
  language,        // 語言
  datePublished,   // 發布日期
  dateModified     // 修改日期
);
const faqSchema = generateFAQSchema('image');
const articleSchema = generateArticleSchema(
  '/image-search',
  title,
  description,
  imageUrl,
  datePublished,   // 發布日期
  dateModified,    // 修改日期
  language         // 語言
);

// 使用 generateWebApplicationSchema 函數生成 WebApplication Schema
const appSchema = generateWebApplicationSchema(
  '/image-search',            // 路徑
  '以圖搜圖工具',             // 應用名稱
  description,                // 使用上面定義的描述
  'UtilityApplication',       // 應用類別
  '4.8',                      // 評分值
  '176'                       // 評分數量
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
    url: getFullUrl('/image-search'),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具',
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
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/image-search'),
  },
  
  // 注意：robots設置由根布局繼承，無需在每個頁面重複設置
  
  // 確保其他必要的元數據
  keywords: '以圖搜圖, 反向圖片搜尋, Google圖片搜尋, 手機搜圖, iPhone圖片搜尋',
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

export default function ImageSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}