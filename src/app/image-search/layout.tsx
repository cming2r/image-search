import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema 
} from '@/lib/schema';

// 頁面元數據定義
const title = '以圖搜圖 - 圖像搜尋工具';
const description = '以圖搜圖工具透過上傳圖片或輸入URL，一鍵使用Google、Bing、Yandex和SauceNAO進行反向圖像搜尋，支援電腦、iphone手機和平板等所有裝置。';
const keywords = '以圖搜圖, 反向圖片搜尋, iphone手機以圖搜圖';

// 社交媒體分享圖片（使用版本控制URL防止快取問題）
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-image-search.png'));

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/image-search/page.tsx');
const language = 'zh-TW';

// 結構化數據生成
const breadcrumbSchema = generateBreadcrumbSchema('/image-search', '以圖搜圖');
// webPageSchema 已移除
// 生成FAQ Schema
const faqSchema = generateFAQSchema([
  {
    '@type': 'Question',
    name: '什麼是以圖搜圖（反向圖片搜尋）？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '以圖搜圖（又稱反向圖片搜尋）是一種使用圖片作為搜尋輸入（而不是文字）的搜尋方式。通過上傳圖片或提供圖片的URL，搜尋引擎會找到與該圖片相似或相關的其他圖片和網頁。'
    }
  },
  {
    '@type': 'Question',
    name: '如何使用這個工具搜尋圖片？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '您可以通過三種方式使用本工具：1) 直接輸入圖片的網址，然後點擊"搜尋此圖片"；2) 上傳您本地電腦上的圖片文件；3) 直接複製圖片後使用Ctrl+V貼上。之後選擇您想使用的搜尋引擎（如Google、Bing、Yandex等）進行搜尋。'
    }
  },
  {
    '@type': 'Question',
    name: '這個工具支持哪些搜尋引擎？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '本工具支持多種流行的圖片搜尋引擎，包括Google圖片搜尋、Bing圖片搜尋、Yandex以及SauceNAO等。每個搜尋引擎有其特點，Google功能全面，Bing擅長高清圖像，Yandex善於找出修改過的圖片，SauceNAO專注於動漫內容。'
    }
  },
  {
    '@type': 'Question',
    name: '上傳的圖片會如何處理？是否會保存？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '我們非常重視用戶隱私。當您上傳圖片時，系統會暫時存儲該圖片以生成可搜尋的URL，但所有圖片資料會在24小時內自動刪除。我們不會永久保存您的圖片，也不會將其用於任何其他目的。上傳的圖片僅用於提供搜尋服務，且只有您可以通過生成的URL訪問它。'
    }
  },
  {
    '@type': 'Question',
    name: '為什麼有時搜尋結果不準確？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '以圖搜圖的準確性取決於多種因素，包括圖片質量、搜尋引擎的資料庫覆蓋範圍、圖像的獨特性等。如果您的圖片分辨率較低、經過裁剪或修改，或是非常常見的圖像類型（如藍天、草地等），搜尋準確率可能會降低。為獲得最佳結果，建議使用清晰、完整的原始圖片，並嘗試多個搜尋引擎進行對比，因為不同引擎的演算法和資料庫有所不同。'
    }
  },
  {
    '@type': 'Question',
    name: '這個工具是否支援手機搜尋？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '是的，本工具完全支援行動裝置使用，包括iPhone和Android設備。在手機上，您可以點擊「上傳圖片」後從相冊選擇照片，或直接拍攝新照片上傳。您也可以從其他應用分享圖片到我們的網站，或將圖片複製到剪貼板後貼上。'
    }
  },
  {
    '@type': 'Question',
    name: '如何在手機上直接拍照搜尋？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '在手機上使用我們的工具拍照搜尋非常簡單：1) 用手機瀏覽器訪問我們的網站；2) 點擊「上傳圖片」按鈕；3) 選擇「拍攝照片」選項（或選擇手機相冊中已有的照片）；4) 拍攝您想搜尋的物體或場景；5) 圖片上傳後，選擇喜好的搜尋引擎進行搜尋。這個功能在購物時查詢商品、旅行中識別地標、或遇到不認識的植物動物時特別有用。'
    }
  },
  {
    '@type': 'Question',
    name: '可以直接複製網頁上的圖片進行搜尋嗎？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '是的，我們支持剪貼板直接貼圖功能。當您在瀏覽網頁時看到感興趣的圖片，可以右鍵點擊該圖片並選擇「複製圖片」，然後切換到我們的網站，點擊上傳區域並使用Ctrl+V (Windows/Linux)或Command+V (Mac)直接貼上圖片。系統會自動處理上傳並準備搜尋，大大簡化了搜尋流程。'
    }
  },
  {
    '@type': 'Question',
    name: '以圖搜圖有哪些常見使用場景？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '以圖搜圖的應用非常廣泛：1) 查找圖片來源或高解析度版本；2) 識別不認識的植物、動物、商品或地標；3) 查找類似的設計靈感或素材；4) 驗證圖片真實性，識別合成或修改過的圖像；5) 查找特定服裝或商品的購買渠道；6) 追蹤藝術作品、動漫或遊戲截圖的出處；7) 檢查自己創作的內容是否被盜用。這些場景對設計師、研究人員、內容創作者和日常用戶都非常實用。'
    }
  }
]);
const articleSchema = generateArticleSchema(
  '/image-search',
  title,
  description,
  imageUrl,
  datePublished,
  dateModified,
  language,
  keywords,        // 關鍵字
  3200             // 字數統計 (估計值)
);
const webApplicationSchema = generateWebApplicationSchema(
  '/image-search',
  '以圖搜圖多引擎搜尋工具',
  description,
  'SearchApplication',
  '4.9',           // 更新的評分值
  '212',           // 更新的評分數量
  datePublished,   // 使用頁面發布日期作為有效日期起點
  language         // 頁面語言
);

// Next.js 元數據配置
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph 配置（優化社交媒體分享體驗）
  openGraph: {
    title: `以圖搜圖 | fyimg`,
    description,
    url: getFullUrl('/image-search'),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '以圖搜圖工具界面',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter/X 平台卡片設定
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@fyimg',
    site: '@fyimg',
    images: [imageUrl],
  },
  
  // 規範連結（確保SEO正確性）
  alternates: {
    canonical: getFullUrl('/image-search'),
  },
  
  // 關鍵字、作者及發布者信息
  keywords,
  authors: [{ name: 'fyimg開發團隊' }],
  creator: 'fyimg開發團隊',
  publisher: 'fyimg',
};

/**
 * 以圖搜圖頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default function ImageSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 結構化數據標記 */}
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