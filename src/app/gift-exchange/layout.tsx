import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '交換禮物抽籤線上工具';
const description = '免費線上交換禮物抽籤工具，輸入參與者名單，一鍵隨機分配送禮對象，支援排除特定配對，適合公司、朋友聚會使用。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-gift-exchange.png'));

// 準備 JSON-LD 數據
const breadcrumbSchema = generateBreadcrumbSchema('/gift-exchange', '交換禮物抽籤工具');
const webPageSchema = generateWebPageSchema(
  '/gift-exchange',
  title,
  description
);
const faqSchema = generateFAQSchema('giftexchange');
const articleSchema = generateArticleSchema(
  '/gift-exchange',
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
  
  // OpenGraph標籤設定
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/gift-exchange'),
    siteName: 'fyimg',
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
  keywords: '交換禮物, 抽籤工具, 禮物交換, 聖誕節抽籤, 抽禮物, 交換禮物排除, 禮物配對',
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

export default function GiftExchangeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}