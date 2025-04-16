import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateSchemaMarkup } from '@/lib/schema';

// 定義通用標題和描述
const title = '交換禮物抽籤工具 - 線上免費隨機分配禮物交換對象';
const description = '免費線上交換禮物抽籤工具，輸入參與者名單，一鍵隨機分配送禮對象，支援排除特定配對，適合公司、朋友聚會使用。';

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
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@fyimg',
    site: '@fyimg',
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
    const webAppSchema = generateSchemaMarkup();
    const breadcrumbSchema = generateBreadcrumbSchema('/gift-exchange', '交換禮物抽籤工具');
    const faqSchema = generateGiftExchangeFAQSchema();
    
    return JSON.stringify([webAppSchema, breadcrumbSchema, faqSchema]);
  } catch (error) {
    console.error('Error generating Schema JSON-LD:', error);
    return JSON.stringify({}); // 返回空對象避免渲染錯誤
  }
}

// 自訂交換禮物FAQ
function generateGiftExchangeFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': '什麼是交換禮物抽籤？',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '交換禮物抽籤是一種活動組織方式，參與者通過隨機抽籤決定要送禮物給誰。每個人既是送禮者也是收禮者，這種方式能確保公平性並增加活動的趣味性。'
        }
      },
      {
        '@type': 'Question',
        'name': '如何使用這個交換禮物抽籤工具？',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '使用方法簡單：1) 輸入活動名稱和日期；2) 添加所有參與者的名字；3) 如需排除特定配對（例如夫妻間不互送），可設置排除規則；4) 點擊「抽籤」按鈕獲得隨機配對結果；5) 可以複製結果或通過連結分享。'
        }
      },
      {
        '@type': 'Question',
        'name': '交換禮物抽籤需要收費嗎？',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '不需要，我們的交換禮物抽籤工具完全免費。無需註冊或提供個人資料，任何人都可以直接在網站上使用所有功能。'
        }
      },
      {
        '@type': 'Question',
        'name': '可以排除特定人員之間的配對嗎？',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '可以。我們的工具支援設置排除規則，例如夫妻或家人之間可能不希望互送禮物。只需在添加參與者後，設置哪些人不應該被配對在一起，系統會確保抽籤結果符合這些限制。'
        }
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