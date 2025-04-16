import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GiftExchangeWheel from "./components/GiftExchangeWheel";

export default function GiftExchange() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>交換禮物抽籤轉盤</h1>
            <p>
              輸入參與者名單，使用轉盤決定禮物交換對象，增添活動樂趣和驚喜
            </p>
          </div>

          <GiftExchangeWheel />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2>如何使用此工具？</h2>
            <ol>
              <li>輸入所有參與交換禮物的成員名單</li>
              <li>點擊「開始轉盤」，第一次轉出的是要收禮物的人</li>
              <li>再次轉動轉盤，第二次轉出的是要送禮物的人</li>
              <li>繼續轉動直到所有人都有送禮和收禮的對象</li>
              <li>查看配對結果，可以儲存或分享給所有參與者</li>
            </ol>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2>什麼是交換禮物活動？</h2>
            <p>
              交換禮物（Gift Exchange）是一種常見的社交活動，特別流行於聖誕節、節日聚會或團隊建設活動中。
              每位參與者會送禮物給另一位參與者，同時也會收到來自其他參與者的禮物。
              使用轉盤方式進行抽籤，讓過程更加有趣和充滿期待，增添節日氣氛。
            </p>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2>交換禮物轉盤常見問題</h2>
            <div className="mt-4">
              <h3 className="text-lg font-medium">如何確保轉盤結果的公平性？</h3>
              <p>
                我們的轉盤使用隨機算法，確保每次轉動都是隨機且公平的。轉盤動畫效果增加趣味性，
                但結果完全隨機，沒有任何人為操作可能。
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">是否可以設置禮物價格範圍？</h3>
              <p>
                可以在活動開始前設定禮物預算，並在工具中記錄。這樣所有參與者都能了解應該準備什麼價位的禮物，
                確保交換體驗更加公平和愉快。
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">轉盤結果會被保存嗎？</h3>
              <p>
                是的，每次抽籤結果都會被記錄下來。活動結束後，您可以查看完整的配對清單，並可以儲存或分享結果。
                資料會進行安全存儲，且僅保留必要的時間。
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2>為什麼選擇我們的交換禮物轉盤工具？</h2>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><span className="font-medium">有趣互動：</span>轉盤動畫增添樂趣和期待感，比普通抽籤更有參與感</li>
              <li><span className="font-medium">完全免費：</span>無任何隱藏費用，所有功能完全免費使用</li>
              <li><span className="font-medium">易於使用：</span>直觀簡單的界面設計，適合各年齡層使用</li>
              <li><span className="font-medium">結果保存：</span>自動記錄所有配對結果，方便後續查詢</li>
              <li><span className="font-medium">無需註冊：</span>無需創建帳號或提供個人資料即可使用</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}