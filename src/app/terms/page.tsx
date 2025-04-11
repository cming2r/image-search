import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Terms() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">服務條款</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>最後更新日期：2023年1月1日</p>
            
            <h2>1. 接受條款</h2>
            <p>
              歡迎使用 fyimg.com（以下簡稱&quot;本網站&quot;）。通過訪問或使用本網站，您同意受這些條款和條件的約束。如果您不同意這些條款的任何部分，請不要使用本網站。
            </p>
            
            <h2>2. 服務描述</h2>
            <p>
              本網站提供各種在線工具和服務，包括但不限於圖片搜尋、日期計算器等功能。這些服務可能會不時更改，恕不另行通知。
            </p>
            
            <h2>3. 使用限制</h2>
            <p>
              您同意僅將本網站用於合法目的，並以符合所有適用法律和法規的方式使用。您不得：
            </p>
            <ul>
              <li>使用本網站進行欺詐、非法或未經授權的活動</li>
              <li>上傳或傳輸任何含有病毒、惡意代碼或其他有害內容的資料</li>
              <li>嘗試干擾或破壞本網站的正常運作</li>
              <li>收集或儲存本網站其他用戶的個人資料</li>
              <li>規避、禁用或以其他方式干擾本網站的安全相關功能</li>
            </ul>
            
            <h2>4. 智慧財產權</h2>
            <p>
              本網站及其內容（包括但不限於文字、圖形、標誌、圖標、圖像、音頻剪輯、數據編輯和軟件）均為 fyimg 或其內容供應商所有，受國際版權、商標、專利和其他知識產權法律的保護。
            </p>
            <p>
              未經明確許可，您不得複製、修改、發布、傳輸、分發、銷售、展示或以其他方式利用本網站的任何內容。
            </p>
            
            <h2>5. 隱私政策</h2>
            <p>
              我們重視您的隱私。請參閱我們的<a href="/privacy-policy" className="text-blue-600 hover:underline">隱私政策</a>，了解有關我們如何收集、使用和保護您的個人資料的更多信息。
            </p>
            
            <h2>6. 免責聲明</h2>
            <p>
              本網站及其內容按&quot;現狀&quot;提供，不提供任何形式的保證。fyimg 不保證本網站將無錯誤或不間斷運行，也不保證其服務將滿足您的要求或期望。
            </p>
            <p>
              fyimg 不對使用本網站或其服務可能產生的任何直接、間接、附帶、特殊或後果性損害負責。
            </p>
            
            <h2>7. 第三方鏈接</h2>
            <p>
              本網站可能包含指向第三方網站或服務的鏈接。這些鏈接僅為便利用戶而提供，並不意味著 fyimg 認可這些第三方網站或服務。fyimg 對這些第三方網站或服務的內容、隱私政策或做法不負責任。
            </p>
            
            <h2>8. 修改條款</h2>
            <p>
              fyimg 保留隨時修改這些條款的權利。修改後的條款將在本網站上發布時立即生效。您繼續使用本網站將被視為接受修改後的條款。
            </p>
            
            <h2>9. 終止</h2>
            <p>
              fyimg 保留因任何原因隨時終止或限制您訪問本網站的權利，恕不另行通知。
            </p>
            
            <h2>10. 適用法律</h2>
            <p>
              這些條款及您對本網站的使用受台灣法律管轄，不考慮法律衝突原則。
            </p>
            
            <h2>11. 聯絡我們</h2>
            <p>
              如果您對這些條款有任何問題或意見，請通過<a href="/contact" className="text-blue-600 hover:underline">聯絡頁面</a>與我們聯繫。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}