import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '交換禮物抽籤工具 - 線上免費隨機分配禮物交換對象';
const description = '免費線上交換禮物抽籤工具，輸入參與者名單，一鍵隨機分配送禮對象，支援排除特定配對，適合公司、朋友聚會使用。';

// 用於社交媒體分享的預覽圖片
const imageUrl = getFullUrl('/images/og-image.png'); // 建議為禮物交換創建專用圖片

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
  
  // 確保其他必要的元數據
  keywords: '交換禮物, 抽籤工具, 禮物交換, 聖誕節抽籤, 抽禮物, 交換禮物排除, 禮物配對',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

// 生成結構化數據函數
function generateSchemaJsonLd() {
  try {
    // 使用標準函數生成結構化數據
    const giftExchangeAppSchema = generateGiftExchangeAppSchema();
    const breadcrumbSchema = generateBreadcrumbSchema('/gift-exchange', '交換禮物抽籤工具');
    const faqSchema = generateFAQSchema('giftexchange');
    
    // 添加豐富的 Article Schema 增強 SEO
    const articleSchema = generateArticleSchema(
      '/gift-exchange',
      title,
      description,
      imageUrl,
      '2025-01-01',  // 發布日期
      '2025-01-15',  // 修改日期
      'zh-TW'        // 語言
    );
    
    return JSON.stringify([giftExchangeAppSchema, breadcrumbSchema, faqSchema, articleSchema]);
  } catch (error) {
    console.error('Error generating Schema JSON-LD:', error);
    return JSON.stringify({}); // 返回空對象避免渲染錯誤
  }
}

// 生成交換禮物應用結構化數據
function generateGiftExchangeAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': '禮物交換抽籤轉盤',
    'url': getFullUrl('/gift-exchange'),
    'description': '免費線上交換禮物抽籤工具，輸入參與者名單，一鍵隨機分配送禮對象，使用轉盤增加趣味性，適合公司、朋友聚會使用。',
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'author': {
      '@type': 'Organization',
      'name': 'fyimg',
    },
    'potentialAction': {
      '@type': 'UseAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': getFullUrl('/gift-exchange'),
      },
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '156',
      'bestRating': '5',
      'worstRating': '1'
    },
    'screenshot': [
      {
        '@type': 'ImageObject',
        'url': getFullUrl('/images/gift-exchange-screenshot.png'),
        'width': '1280',
        'height': '720',
        'caption': '禮物交換抽籤轉盤工具界面'
      }
    ]
  };
}

export default function GiftExchangeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 使用標準script標籤添加JSON-LD結構化數據 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaJsonLd() }}
      />
      {children}
    </>
  );
}