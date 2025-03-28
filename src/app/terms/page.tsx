import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';
import { SchemaMarkupGroup } from '@/components/SchemaMarkup';

// 使用外部定義的metadata - metadata.ts

export default function Terms() {
  // 生成JSON-LD結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/terms', '使用條款');
  const webPageSchema = generateWebPageSchema(
    '/terms',
    '使用條款 - fyimg.com',
    '使用fyimg.com圖片搜尋服務前請閱讀我們的服務條款。了解用戶權利與責任，以及我們提供的服務內容與限制。'
  );

  // 合併schema為一個數組
  const schemas = [breadcrumbSchema, webPageSchema];

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaMarkupGroup schemas={schemas} id="terms-schema" />
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <h1>使用條款</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              歡迎使用 fyimg.com（以下簡稱「我們」或「本網站」）。在使用本網站之前，請仔細閱讀以下服務條款（以下簡稱「本條款」）。
              當您訪問或使用本網站時，即表示您同意受本條款約束。如不同意，請勿使用本網站。
            </p>

            <h2>1. 服務內容</h2>
            <p>本網站提供以下功能：</p>
            <ul className="list-disc pl-6 mb-4">
              <li>輸入圖片網址並使用第三方搜尋引擎（例如 Google 圖片搜尋、Bing 圖片搜尋）進行搜尋。</li>
              <li>上傳圖片，圖片將轉換為網址並儲存至我們的伺服器，以便進行搜尋。</li>
              <li>所有搜尋結果由第三方搜尋引擎提供，我們僅作為中介平台。</li>
            </ul>

            <h2 >2. 使用者責任</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>合法使用：您承諾僅上傳或輸入合法、不侵犯他人權利（包括版權、隱私權等）的圖片或網址。</li>
              <li>禁止行為：不得使用本網站進行非法活動、上傳違法內容、散布不適當內容或試圖破壞網站運作。</li>
              <li>內容責任：您對上傳或輸入的內容負完全責任，我們不對其準確性或合法性承擔責任。</li>
            </ul>

            <h2>3. 服務限制</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>我們保留隨時修改、中止或終止服務的權利，無需事先通知。</li>
              <li>本網站依「現狀」提供，不保證服務無錯誤或不中斷。</li>
              <li>我們可能設置使用限制，包括每日上傳圖片數量上限或檔案大小限制。</li>
            </ul>

            <h2>4. 第三方搜尋引擎</h2>
            <p>
              本網站依賴 Google 圖片搜尋、Bing 圖片搜尋、TinEye、SauceNAO 等第三方服務提供搜尋結果。
              我們無法控制這些服務的運作或結果，且不對其內容負責。使用這些第三方服務時，您亦受其服務條款約束。
            </p>

            <h2>5. 智慧財產權</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>我們的權利：本網站的程式碼、設計及技術屬於 fyimg.com 或其授權方所有。</li>
              <li>您的權利：您保留上傳圖片的相關權利，但授予我們有限的許可，以處理並傳送圖片至第三方搜尋引擎。</li>
            </ul>

            <h2>6. 責任限制</h2>
            <p>
              在法律允許的最大範圍內，我們不對因使用本網站導致的任何直接或間接損害（包括資料遺失、搜尋結果不準確、業務中斷等）承擔責任。
              使用本網站所得到的任何資訊或材料完全由使用者自行承擔風險。
            </p>

            <h2>7. 終止服務</h2>
            <p>
              若您違反本條款，我們有權隨時終止您的使用權限，無需通知。終止後，本條款中有關責任限制、智慧財產權等條款仍將繼續有效。
            </p>

            <h2>8. 適用法律</h2>
            <p>
              若有任何爭議，應先透過友好協商解決；若協商不成，則應提交至本地有管轄權的法院解決。
            </p>

            <h2>9. 條款變更</h2>
            <p>
              我們可能不時更新本條款，任何變更將於本頁面公佈，並更新生效日期。繼續使用本網站即表示您接受更新後的條款。
            </p>

            <h2>10. 服務使用費用</h2>
            <p>
              本網站目前提供的所有服務均為免費。我們保留未來引入付費功能或進階服務的權利，並將在實施前提供明確通知。
            </p>

            <h2>11. 完整協議</h2>
            <p>
              本使用條款構成您與我們之間關於使用本網站的完整協議，並取代任何先前有關網站使用的協議或理解。如本條款的任何部分被認定為無效或不可執行，其餘條款仍具完整效力。
            </p>

            <h2>12. 聯絡我們</h2>
            <p>
              如有任何關於使用條款的問題或疑問，請聯繫我們：support@fyimg.com
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