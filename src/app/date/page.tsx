import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DateCalculator from "./components/DateCalculator";

export default function DatePage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          {/* 標題區 */}
          <div className="title-container">
            <h1>日期計算器</h1>
            <p>計算日期之間的差距，或從指定日期加減天數</p>
          </div>
          
          <DateCalculator />
          
          {/* 說明區 */}
          <div className="content-section">
            <h2>關於日期計算器</h2>
            <p>
              本工具提供兩種常用日期計算功能：
            </p>
            <ul>
              <li>計算兩個日期之間的天數差距</li>
              <li>從指定日期加上或減去天數</li>
            </ul>
            <p>
              無論是計劃行程、追蹤專案時間，或是計算合約期限、截止日期，
              都能使用此工具快速獲取準確結果。
            </p>
          </div>
          
          {/* 日曆天說明區 */}
          <div className="content-section">
            <h2>日曆天的定義與計算方式</h2>
            <p>
              日曆天是指專案開始到結束的實際天數，包含了工作日、週末以及法定假日。它反映了專案所占用的時間。
            </p>
            <p>
              日曆天的計算方式相對簡單，只需將專案開始日期與結束日期之間的差異天數相加即可。
            </p>
            <p>
              例如，若專案於3月1日開始，並於3月2日結束，則日曆天數為1天。
            </p>
            <p>
              例如，若專案於3月1日開始，並於3月31日結束，則日曆天數為30天。
            </p>
            
            <h2>日曆天與工作天(工期)的差異</h2>
            <p>
              工作是指完成專案所需的工作日數，不包含週末及法定假日。它反映了團隊實際投入專案的時間。
            </p>
            <p>
              由於日曆天包含了非工作日，因此工作天通常會小於日曆天數。假設專案日曆天數為31天，其中22天為需要工作日，則工作日為22天。
            </p>
            
            <h2>日曆天數與工期管理的應用</h2>
            <ul>
              <li className="mb-2"><strong>專案進度追蹤：</strong>通過日曆天數與工期的對比，項目經理可以掌握專案的實際進度。若日曆天數大幅超過預期工期，則表明專案可能存在延遲風險，需要採取措施加以應對。</li>
              <li className="mb-2"><strong>資源分配與優化：</strong>根據日曆天數與工期，項目經理可以合理分配團隊資源，並優化工作安排。例如，在節假日前夕，可以適當增加人力，以確保關鍵任務的按時完成。</li>
              <li className="mb-2"><strong>風險管理：</strong>日曆天計算有助於識別並管理專案風險。例如，若關鍵材料的交付日期恰好遇到長假，則可能導致專案延遲。項目經理需要提前識別此類風險，並制定應對措施。</li>
            </ul>
            
            <h2>日曆天計算的注意事項</h2>
            <ul className="list-disc pl-6 mb-3">
              <li className="mb-2"><strong>考慮時差因素：</strong>若專案涉及跨時區合作，則需要在日曆天計算中考慮時差因素。不同時區的假日安排可能有所不同，需要進行協調以確保順暢的溝通與協作。</li>
              <li className="mb-2"><strong>彈性調整：</strong>雖然日曆天計算提供了一個時間管理的框架，但在實踐中仍需保持一定的彈性。針對突發事件或變更請求，項目經理需要及時調整日曆天安排，以確保專案的順利進行。</li>
            </ul>
            
            <p>
              日曆天計算是專案時程管理的基礎，它為工期估算、進度追蹤以及資源優化提供了依據。通過理解日曆天與工期的關係，並恰當處理假日等特殊情況，項目經理可以更好地掌控專案時程，提高交付的準確性和效率。在日益複雜的專案環境中，精準的日曆天計算與靈活的工期管理將成為項目成功的關鍵因素。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}