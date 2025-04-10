import { Metadata } from 'next';
import { getFullUrl } from '@/lib/utils';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageForm from "@/components/ImageForm";
import { generateBreadcrumbSchema, generateSchemaMarkup, generateFAQSchema } from "@/lib/schema";
import { SchemaMarkupGroup } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
  description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/image-search'),
  },
  
  // OpenGraph標籤設定
  openGraph: {
    title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
    url: getFullUrl('/image-search'),
    siteName: '圖片搜尋工具',
    images: [
      {
        url: getFullUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
    creator: '@fyimg',
    images: [getFullUrl('/og-image.png')],
  },
  
  // 確保其他必要的元數據
  keywords: '以圖搜圖, 反向圖片搜尋, Google圖片搜尋, Bing圖片搜尋, Yandex圖片搜尋, 手機搜圖, iPhone圖片搜尋',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

export default function ImageSearch() {
  // 網站的所有結構化數據
  const webAppSchema = generateSchemaMarkup();
  const breadcrumbSchema = generateBreadcrumbSchema();
  const faqSchema = generateFAQSchema('image');

  return (
    <>
      <SchemaMarkupGroup schemas={[webAppSchema, breadcrumbSchema, faqSchema]} id="image-search-schema" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>圖片搜尋工具</h1>
            <p>
              輸入圖片網址或上傳圖片，使用各大搜尋引擎查找相似圖片
            </p>
          </div>

          <ImageForm />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2>如何使用此工具？</h2>
            <ol>
              <li>輸入圖片的網址，或是點擊「上傳圖片」按鈕選擇本地圖片</li>
              <li>系統會將上傳的圖片轉換為可搜尋的網址</li>
              <li>點擊「Google」、「Bing」、「Yandex」或「SauceNAO」等按鈕，跳轉至對應的搜索引擎</li>
              <li>搜索引擎將使用此圖片尋找網路上的相似或相關圖片</li>
            </ol>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2>什麼是以圖搜圖？</h2>
            <p>
              以圖搜圖又稱反向圖像搜索 （Reverse Image
              Search），是一種搜尋引擎功能，可以上傳圖像檔案或圖片連結網址來搜尋與該圖像、照片相關的結果或查找圖片來源。
              本站整合Google、Bing、Yandex等以圖搜圖網站，可以在android、iphone上等app手機以圖搜圖使用。
            </p>
            <p>
              例如可以搜索該圖片更高的解析度、用被裁減過的圖像去搜尋完整版的圖片、同一個人像以圖搜圖、或者搜索圖片的類似版本（如同一套裝扮不同姿勢、或者同一個場景不同天氣）。
            </p>
            <p>
              想要在網路上找類似的圖片嗎？本網站工具使個人或工作使用的圖像搜索變得超級快速和容易。只需上傳圖片或輸入圖片
              URL，就能搜尋出類似的圖片。
            </p>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2>Google 圖片以圖搜圖</h2>
            <p>
              Google（Alphabet）成立於1998
              年，目前為市場上市值前五大的公司，僅次於蘋果、微軟等科技巨頭，其營收來源有一半為搜尋服務（Google
              Search），可見谷歌其搜尋引擎在網際網路的影響力。
            </p>
            <p>
              Google 搜尋以超過 70%
              的全球市場占比，無疑是地球上最受歡迎的搜索引擎。在手機搜尋方面，Google
              囊括了 85% 的搜尋流量。
            </p>
            <p>
              Google Search by Image
              也可以搜尋無版權的圖像，能為設計師、創作者提供免費且免版權的圖片。
            </p>
            <p>
              Google Image Search
              是使用最廣泛的圖片搜索引擎之一，以其龐大的圖片索引和提供相關結果的能力而聞名。
              它提供了各種過濾器來細化搜索結果，例如大小、顏色、類型和時間。
              它還提供執行反向圖像搜索的功能，允許用戶通過上傳圖像或提供其 URL
              來搜索有關特定圖像的信息。
            </p>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2>
              Microsoft Bing 微軟必應以圖搜圖
            </h2>
            <p>
              Microsoft Bing
              推出於2009年，由微軟公司推出的搜尋引擎，並於2020年由原名稱 Bing
              冠上公司名稱更名為 Microsoft
              Bing（微軟必應），目前為全球​​第二大搜索引擎。
            </p>
            <p>
              Bing
              的圖像搜索特點是可以搜尋高分辨率圖像，若想要讓網站或產品頁面擁有高質量的視覺效果，Bing的以圖搜圖功能可能會派上用場。
            </p>
            <p>
              Bing Image Search 是微軟的圖像搜索引擎，集成到 Bing 搜索引擎中。
              Bing Image Search
              提供了一個乾淨有序的界面，帶有大小、顏色、樣式和佈局的過濾器。
              它還提供了一個&quot;相關搜索&quot;部分，建議用戶可能也感興趣的相關主題。
              此外，必應圖像搜索提供了一個&quot;桌布圖片&quot;搜索類別，允許用戶搜索和下載桌面壁紙。
            </p>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2>Yandex 圖片搜尋</h2>
            <p>
              Yandex 是俄羅斯最大的搜尋引擎，在俄羅斯和東歐地區擁有龐大的用戶群體。Yandex 圖片搜尋功能強大，擅長識別不同場景與角度下的相同物體或人物。這使得 Yandex 成為尋找特定圖片不同版本的有力工具。
            </p>
            <p>
              Yandex 圖片搜尋能夠識別出照片中的標誌、地標和人物，並提供相關的視覺資訊。其獨特的演算法能處理圖像變形（如裁剪、旋轉、顏色調整等），即使圖片經過部分修改，仍能找到原始圖像或相似內容。
            </p>
            <p>
              除了圖片搜尋，Yandex 還提供多種功能，包括反向圖像搜尋（Reverse image search）、圖像識別和內容分析。無論是追蹤圖片來源還是尋找相似視覺內容，Yandex 都能提供優異的搜尋結果與高度相關性。
            </p>
          </div>



          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2>SauceNAO 圖片搜尋</h2>
            <p>
              SauceNAO
              堪稱是目前最為全面的二次元圖片搜尋引擎。它的資料庫涵蓋了諸如推特、Pixiv
              和 niconico 靜畫等眾多知名圖庫網站。使用
              SauceNAO，不僅能找到圖片的來源和作者資訊，還能查詢到相關的漫畫、插畫集，甚至是美少女遊戲的標題。
            </p>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2>TinEye（已移除）</h2>
            <p>
              TinEye
              是一個專注於圖像識別的搜尋引擎，其特點是能夠精確找出圖片的確切匹配，而不僅僅是類似的圖片。TinEye
              特別適合用於：追蹤圖片在網路上的使用情況、查找圖片的最早出現時間、尋找更高解析度的版本，以及確認圖片是否為原創或被修改過。對於版權所有者和創作者而言，TinEye
              是監控其作品在網路上傳播情況的實用工具。
            </p>
            <p className="text-red-600 font-medium mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              註：經測試後發現 TinEye 搜尋效果不佳，因此已將其從搜尋選項中移除。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}