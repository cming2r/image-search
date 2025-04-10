import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';
import { SchemaMarkupGroup } from '@/components/SchemaMarkup';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/og-image.png'));

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '隱私權政策 ｜ fyimg',
  description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
  
  // 基本HTML標籤 - 有些平台會先讀取這些
  viewport: 'width=device-width, initial-scale=1',
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title: '隱私權政策 ｜ fyimg',
    description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/privacy-policy'),
    siteName: 'fyimg',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'fyimg隱私權政策',
        type: 'image/png', // 指定圖片MIME類型增強兼容性
      },
    ],
  },
  
  // Twitter卡片設定 - 為X.com平台優化
  twitter: {
    card: 'summary_large_image',
    title: '隱私權政策 ｜ fyimg',
    description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
    creator: '@fyimg',
    site: '@fyimg',  // 添加站點標籤增強Twitter卡片顯示
    images: [imageUrl],
  },
  
  // 確保其他必要的元數據
  keywords: '隱私權政策, 個人資料保護, 用戶隱私, 數據安全, 隱私聲明',
  alternates: {
    canonical: getFullUrl('/privacy-policy'),
  },
};

export default function PrivacyPolicy() {
  // 生成JSON-LD結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/privacy-policy', '隱私權政策');
  const webPageSchema = generateWebPageSchema(
    '/privacy-policy',
    '隱私權政策 - fyimg.com',
    '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。'
  );

  // 合併schema為一個數組
  const schemas = [breadcrumbSchema, webPageSchema];

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaMarkupGroup schemas={schemas} id="privacy-policy-schema" />
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <h1>隱私權政策</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              歡迎使用 fyimg.com（以下簡稱「我們」或「本網站」）。我們致力於保護您的隱私，並確保您在使用本網站時的個人資訊安全。
              本隱私權政策說明我們如何收集、使用、儲存及保護您的資訊。請仔細閱讀以下內容。
            </p>

            <h2>1. 我們收集的資訊</h2>
            <p>我們可能會收集以下類型的資訊：</p>
            <ul>
              <li>使用者提供的資訊：當您上傳圖片或輸入圖片網址時，我們會接收並處理這些內容。</li>
              <li>自動收集的資訊：我們可能會收集您的 IP 地址、瀏覽器類型、設備資訊、使用時間等技術資料，以優化網站功能和使用者體驗。</li>
              <li>儲存的圖片資料：上傳的圖片會被轉換為網址並儲存在我們的伺服器，以便進行後續的圖片搜尋。</li>
            </ul>

            <h2>2. 資訊的使用方式</h2>
            <p>我們收集的資訊將用於以下目的：</p>
            <ul>
              <li>提供核心服務：將您輸入的圖片網址或上傳的圖片傳送至第三方搜尋引擎（例如 Google 圖片搜尋、Bing 圖片搜尋）進行搜尋。</li>
              <li>改善服務：分析使用模式以提升網站效能和使用者體驗。</li>
              <li>技術運作：確保網站正常運行並處理後端邏輯。</li>
            </ul>

            <h2>3. 第三方服務</h2>
            <p>
              為了提供圖片搜尋功能，我們會將圖片網址或上傳的圖片傳送至第三方搜尋引擎（例如 Google、Bing、Yandex 和 SauceNAO）。
              這些第三方服務有其各自的隱私政策，我們建議您查閱它們的條款以了解其資料處理方式。我們對第三方如何使用您的資料不承擔責任。
            </p>

            <h2>4. 資料儲存與安全</h2>
            <ul>
              <li>儲存：上傳的圖片會儲存在我們的雲端伺服器中，並生成臨時網址以供搜尋使用。我們不會永久儲存您的圖片，資料將在上傳後30天內自動刪除。</li>
              <li>安全：我們採取合理的安全措施（例如加密和存取控制）保護您的資料，但無法保證絕對安全。如發生資料外洩，我們將依法通知您。</li>
              <li>國際資料傳輸：我們的伺服器可能位於您所在國家/地區以外的地方。使用我們的服務，即表示您同意將資料傳輸至這些地區。</li>
            </ul>

            <h2>5. 您的權利</h2>
            <p>您有權：</p>
            <ul>
              <li>要求存取我們持有的您的個人資料。</li>
              <li>要求更正或刪除您的資料（若適用）。</li>
              <li>隨時停止使用本網站服務。</li>
            </ul>

            <h2>6. Cookies 與追蹤技術</h2>
            <p>
              我們使用 Cookies 或類似技術來提升網站功能及使用者體驗。Cookies 是存儲在您設備上的小型文字檔，有助於我們提供更個人化的體驗、分析網站使用情況及改善服務。
            </p>
            <p>
              我們使用的 Cookie 類型包括：
            </p>
            <ul>
              <li>必要性 Cookie：維持網站基本功能所需。</li>
              <li>分析性 Cookie：幫助我們了解網站使用模式，改善服務。</li>
              <li>功能性 Cookie：記住您的偏好設定，提供更個人化的體驗。</li>
            </ul>
            <p>
              您可以透過瀏覽器設定隨時禁用 Cookies，但這可能影響網站的某些功能。大多數瀏覽器可在設定選項中管理 Cookie 偏好。
            </p>

            <h2>7. 政策變更</h2>
            <p>
              我們可能不時更新本隱私權政策，任何變更將於本頁面公佈，並更新生效日期。請定期查看以了解最新資訊。
            </p>

            <h2>8. 兒童隱私</h2>
            <p>
              本網站不針對13歲以下兒童設計或提供服務。我們不會故意收集13歲以下兒童的個人資料。如果您發現我們可能收集了任何兒童的個人資料，請立即聯絡我們，我們將迅速採取措施移除此類資料。
            </p>

            <h2>9. 完整協議</h2>
            <p>
              本隱私權政策構成您與我們之間關於個人資料收集與使用的完整協議，並取代任何先前有關隱私問題的協議或理解。
            </p>

            <h2>10. 聯絡我們</h2>
            <p>
              如有任何隱私相關問題或疑問，請<a href="/contact" className="text-blue-600 hover:underline">聯繫我們</a>。
            </p>

            <div className="mt-12 p-4 bg-gray-100 rounded text-center text-gray-600">
              <p>生效日期：2025年1月1日</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}