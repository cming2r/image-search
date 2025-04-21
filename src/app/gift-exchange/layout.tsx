import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema, generateWebApplicationSchema } from '@/lib/schema';

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
// webPageSchema 已移除
// 生成FAQ Schema
const faqSchema = generateFAQSchema([
  {
    '@type': 'Question',
    name: '什麼是交換禮物抽籤？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '交換禮物抽籤是一種活動組織方式，參與者通過隨機抽籤決定要送禮物給誰。每個人既是送禮者也是收禮者，這種方式能確保公平性並增加活動的趣味性。'
    }
  },
  {
    '@type': 'Question',
    name: '如何使用這個交換禮物抽籤工具？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '使用方法簡單：1) 輸入所有參與者的名字；2) 點擊「開始抽籤」創建一個禮物交換活動；3) 使用轉盤抽出收禮物和送禮物的人；4) 系統自動記錄每次抽籤結果；5) 可以通過連結分享活動給所有參與者。'
    }
  },
  {
    '@type': 'Question',
    name: '交換禮物抽籤需要收費嗎？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '不需要，我們的交換禮物抽籤工具完全免費。無需註冊或提供個人資料，任何人都可以直接在網站上使用所有功能。'
    }
  },
  {
    '@type': 'Question',
    name: '轉盤的結果是隨機的嗎？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '是的，我們的轉盤使用標準的隨機算法，確保每次轉動都是完全隨機的，沒有任何人為操作可能。轉盤的動畫效果增加了趣味性，但最終結果是公平且隨機的。'
    }
  },
  {
    '@type': 'Question',
    name: '如何分享我的禮物交換活動？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '創建活動後，系統會生成一個唯一的活動代碼和活動連結。您可以通過點擊分享圖標直接複製連結，然後通過社交媒體、即時通訊軟件或電子郵件分享給所有參與者。'
    }
  },
  {
    '@type': 'Question',
    name: '可以設定自己不要抽到特定的人嗎？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '目前我們的基本版本不支持這個功能，但我們正在開發進階設置，將允許用戶設定排除規則。在特殊情況下，例如想避免家庭成員互抽，您可以先將參與者分組，每組單獨進行抽籤，然後手動合併結果。'
    }
  },
  {
    '@type': 'Question',
    name: '有辦法在聚會現場一起使用這個工具嗎？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '是的！這個工具非常適合聚會現場使用。您可以將手機或平板連接到大螢幕，讓所有人一起觀看轉盤動畫。直接顯示結果的功能也很適合提前準備禮物，而「隨機分佈參與者順序」選項增加了更多驚喜感。'
    }
  }
]);
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