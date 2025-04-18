import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋';
const description = '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-image-search.png'));

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/image-search', '圖片搜尋');
const webPageSchema = generateWebPageSchema(
  '/image-search',
  title,
  description
);
const faqSchema = generateFAQSchema('image');
const articleSchema = generateArticleSchema(
  '/image-search',
  title,
  description,
  imageUrl,
  '2025-01-01T00:00:00+08:00',  // 發布日期 (ISO 8601 格式帶時區)
  '2025-01-15T00:00:00+08:00',  // 修改日期 (ISO 8601 格式帶時區)
  'zh-TW'        // 語言
);

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/image-search'),
    siteName: 'fyimg',
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
  
  // 確保其他必要的元數據
  keywords: '以圖搜圖, 反向圖片搜尋, Google圖片搜尋, Bing圖片搜尋, Yandex圖片搜尋, 手機搜圖, iPhone圖片搜尋',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
  
  // 直接在 metadata 中添加結構化數據 (JSON-LD)
  other: {
    'application/ld+json': [
      JSON.stringify(breadcrumbSchema),
      JSON.stringify(webPageSchema),
      JSON.stringify(faqSchema),
      JSON.stringify(articleSchema)
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