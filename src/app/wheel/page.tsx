import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WheelSelector from "./components/WheelSelector";

export default function WheelPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>抽獎轉盤</h1>
            <p>
              輸入人數並轉動轉盤，隨機抽取號碼
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <WheelSelector />
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2>如何使用抽獎轉盤？</h2>
            <ol className="list-decimal list-inside mt-3 space-y-2 pl-4">
              <li>輸入參與人數 (2-36人)</li>
              <li>點擊「轉動」按鈕開始抽獎</li>
              <li>轉盤停止後，指針所指位置即為抽中的號碼</li>
              <li>可以重新調整人數後再次抽獎</li>
            </ol>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2>抽獎轉盤適用場景</h2>
            <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
              <li>活動獎品抽獎</li>
              <li>團隊中隨機選擇人員</li>
              <li>課堂上隨機提問學生</li>
              <li>家庭聚餐決定就餐地點</li>
              <li>會議中隨機分配任務</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}