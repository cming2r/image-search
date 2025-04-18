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
            <h1>交換禮物抽籤</h1>
            <p>
              輸入參與者名單，使用轉盤決定禮物交換對象，增添活動樂趣和驚喜
            </p>
          </div>

          <GiftExchangeWheel />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">如何使用此工具？</h2>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2">
                <li className="pl-2"><span className="font-medium">添加參與者：</span>輸入所有參與交換禮物的成員名單（可一次輸入多個名字，用空格分隔）</li>
                <li className="pl-2"><span className="font-medium">選擇設置：</span>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-700">
                    <li><span className="italic">隨機分佈參與者順序</span> - 打亂名單順序，增加驚喜感</li>
                    <li><span className="italic">直接顯示最終結果</span> - 跳過轉盤過程，直接顯示完整配對結果</li>
                  </ul>
                </li>
                <li className="pl-2"><span className="font-medium">創建活動：</span>點擊「開始抽籤」按鈕，系統會自動生成活動連結</li>
                <li className="pl-2"><span className="font-medium">轉動轉盤：</span>每次轉動會隨機選出一位參與者，系統會按順序記錄結果</li>
                <li className="pl-2"><span className="font-medium">查看結果：</span>完成所有抽籤後，可查看完整配對列表，了解誰送禮物給誰</li>
                <li className="pl-2"><span className="font-medium">分享活動：</span>使用分享按鈕將活動連結發送給所有參與者，讓大家一起參與互動</li>
              </ol>
              <div className="bg-blue-50 p-3 rounded-lg mt-4">
                <p className="text-blue-700 font-medium">小提示：</p>
                <p className="text-blue-600 text-sm">抽籤結果會自動保存，隨時可以回到活動頁面查看。建議先在活動前設定禮物價格範圍，確保所有參與者準備的禮物價值相近。</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">什麼是交換禮物活動？</h2>
            <div className="space-y-3">
              <p>
                交換禮物（Gift Exchange）是一種深受歡迎的社交活動，特別流行於聖誕節、新年派對、生日慶祝或公司團建活動中。
                這種活動不僅增進參與者之間的友誼，還能創造共同的美好回憶。
              </p>
              
              <p>
                <span className="font-medium">活動流程：</span> 每位參與者既是送禮者也是收禮者，通過隨機配對或特定方式決定送禮對象。
                相比傳統的「每人準備禮物給所有人」方式，交換禮物更經濟實惠且更有驚喜感。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h3 className="font-medium text-green-700">交換禮物類型</h3>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-green-700">
                    <li>普通交換：每人隨機送禮給另一人</li>
                    <li>秘密聖誕老人：保持送禮者身份保密</li>
                    <li>白象交換：參與者可「搶」別人的禮物</li>
                    <li>主題交換：指定禮物類型或主題</li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h3 className="font-medium text-amber-700">活動益處</h3>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-amber-700">
                    <li>增強團隊凝聚力與友誼</li>
                    <li>創造愉快的共同記憶</li>
                    <li>培養送禮與感恩的文化</li>
                    <li>是節日活動的完美互動環節</li>
                  </ul>
                </div>
              </div>
              
              <p className="mt-3">
                使用我們的轉盤工具進行抽籤，讓整個過程更加公平、有趣且充滿期待，為您的活動增添更多歡樂氣氛和互動性。
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">交換禮物轉盤常見問題</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">如何確保轉盤結果的公平性？</h3>
                <p className="mt-2">
                  我們的轉盤使用Fisher-Yates洗牌算法，確保每次轉動結果都完全隨機且不可預測。
                  轉盤動畫效果不僅增加趣味性，還能讓所有參與者親眼見證抽籤過程的透明度，避免任何疑慮。
                  系統還支持「隨機分佈參與者順序」選項，進一步增強公平性。
                </p>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">如何設置和管理禮物價格範圍？</h3>
                <p className="mt-2">
                  雖然系統本身不直接設置價格限制，但建議在創建活動時與參與者溝通並達成一致的預算範圍。
                  常見的做法是在開始前商定一個適合所有人的價格區間（例如200或500元）。
                  這能確保所有人的禮物價值相近，避免尷尬情況，讓交換體驗更加公平愉快。
                </p>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">抽籤結果如何保存和分享？</h3>
                <p className="mt-2">
                  所有抽籤結果會自動與您的活動代碼關聯並暫時保存。活動完成後，
                  您可以在結果頁面查看完整的配對清單。同時，系統提供方便的分享功能，您只需點擊分享按鈕，
                  即可將活動連結發送給所有參與者。
                  所有數據會在活動結束一段時間後自動清理，確保您的隱私安全。
                </p>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">可以在不同裝置上使用同一個活動嗎？</h3>
                <p className="mt-2">
                  是的，我們的系統完全跨平台兼容。您可以在桌面電腦創建活動，然後在手機或平板上繼續進行。
                  所有參與者只需通過分享的連結，就能在任何具有網頁瀏覽器的設備上查看和參與活動。
                  這種靈活性特別適合遠程或混合工作環境下的團隊活動，或是家人朋友間的遠距離交流。
                </p>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">可以取消或修改已完成的抽籤嗎？</h3>
                <p className="mt-2">
                  為保證公平性，一旦配對完成，系統目前不支持直接修改抽籤結果。不過，您可以選擇創建新的活動並重新抽籤。
                  如有特殊情況，例如某位參與者無法繼續參加，建議在線下協商替代方案，或利用「隨機分佈」和「直接顯示結果」
                  功能快速創建新的抽籤活動。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-3">為什麼選擇我們的交換禮物轉盤工具？</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium text-blue-700">有趣互動體驗</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  精心設計的轉盤動畫增添樂趣和期待感，比傳統紙條抽籤更具參與感，適合團體場合使用和線上分享。
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium text-green-700">完全免費使用</h3>
                </div>
                <p className="text-green-700 text-sm">
                  我們承諾所有功能完全免費，無任何隱藏費用或限制，不顯示廣告，讓您專注於活動體驗。
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="font-medium text-purple-700">簡單易用</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  直觀友好的界面設計，無需技術知識即可上手。從設置到分享結果，整個流程簡潔清晰，適合各年齡層用戶。
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <h3 className="font-medium text-amber-700">結果自動保存</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  自動記錄所有抽籤結果，活動結束後可隨時查看完整配對清單，無需擔心遺忘或記錯。
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="font-medium text-red-700">隱私保護</h3>
                </div>
                <p className="text-red-700 text-sm">
                  無需註冊帳號或提供個人資料，活動數據僅在必要時間內保存，確保您的隱私安全不受侵犯。
                </p>
              </div>
              
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="font-medium text-cyan-700">公平隨機</h3>
                </div>
                <p className="text-cyan-700 text-sm">
                  採用高品質隨機算法，確保抽籤過程完全公平公正，提供多種設置選項滿足不同活動需求。
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
              <p className="text-lg font-medium text-indigo-700">
                立即開始您的交換禮物活動，為您的聚會增添更多歡樂與驚喜！
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                無需註冊，完全免費，只需輸入參與者名單即可開始
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}