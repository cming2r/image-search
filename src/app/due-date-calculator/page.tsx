'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DueDateCalculator from "./components/DueDateCalculator";
import PregnancyTimeline from "./components/PregnancyTimeline";
import { useState, useEffect } from 'react';

export default function DueDatePage() {
  const [currentWeeks, setCurrentWeeks] = useState<number>(4);
  
  // 從DueDateCalculator組件獲取當前週數
  useEffect(() => {
    // 仿站實現，訪問localStorage獲取數據
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        const lastPeriodDate = localStorage.getItem('lastPeriodDate');
        if (lastPeriodDate) {
          const lmpDate = new Date(lastPeriodDate);
          const today = new Date();
          
          lmpDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          
          const diffTime = today.getTime() - lmpDate.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays >= 0) {
            const weeks = Math.floor(diffDays / 7);
            setCurrentWeeks(weeks > 40 ? 40 : weeks);
          }
        }
      };
      
      // 初始化
      handleStorageChange();
      
      // 添加事件監聽器
      window.addEventListener('storage', handleStorageChange);
      
      // 清理
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          {/* 標題區 */}
          <div className="title-container mb-6">
            <h1>預產期計算器</h1>
            <p>計算預產期及懷孕週數，幫助您追蹤懷孕進程</p>
          </div>
          
          <DueDateCalculator />
          
          {/* 說明區 */}
          <div className="content-section mb-6">
            <h2>關於預產期計算器工具特色：</h2>
            <ul>
              <li>輸入最後一次月經日期，自動計算預產期</li>
              <li>顯示當前懷孕週數和天數</li>
              <li>互動式懷孕日曆，清晰標示重要日期</li>
              <li>輕鬆查看過去和未來各個月份的懷孕進程</li>
            </ul>
          </div>
          
          {/* 預產期說明區 */}
          <div className="content-section mb-6">
            <h2>孕期週數怎麼算</h2>
            <p>
              孕期以最後一次經期的第一天開始計算，到預產期約為40週。因此，通常知道自己懷孕時，大概都已到第5週或第六週。若有規劃備孕，建議用手機的「健康」軟體，紀錄自己每一次的月經週期。當第一次看婦產科時，醫生通常會詢問上一次月經的第一天為幾月幾號，依此來計算預產期。
            </p>
            
            <h2>預產期計算方式</h2>
            <p>
              懷孕預產期的計算通常採用內格萊氏法則（Naegele&apos;s rule），這是由德國婦產科醫生 Franz Karl Naegele 發明的方法。
            </p>
            <p>
              計算方式是以最後一次月經的第一天（Last Menstrual Period，LMP）為基準，加上一年，減三個月，加上七天，即可得出預估的分娩日期EDD（Estimated Date of Delivery）。
            </p>
            <p>
              例如最後一次月經第一天為6月1號，「減三個月加上七天加一年」則為隔年3月8日。
            </p>
            <p>
              一般來說，預產期大約40個星期，因此將最後一次月經的第一天加上280天，可得到跟Naegele&apos;s rule計算一樣的結果。這也就是估計的分娩日期（Estimated Date of Delivery, EDD）。
            </p>
            <p className="italic text-gray-600">
              註：本方法假設月經週期為28天，而排卵和受精在第14天發生。
            </p>
            
            <h2>孕期注意事項</h2>
            <p>
              懷孕期間可以劃分成三個階段，分別為妊娠第一期（未滿13週）、妊娠第二期（13-29週）、妊娠第三期（29週以上）。
            </p>
            
            <PregnancyTimeline currentWeeks={currentWeeks} />
            
            <ul className="mb-4">
              <li>定期產檢追蹤</li>
              <li>穿著透氣舒適孕婦裝</li>
              <li>保持心情愉悅</li>
              <li>避免二手菸暴露</li>
            </ul>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">第一孕期 (未滿13週)</h3>
                <h4 className="font-medium">飲食</h4>
                <ul className="mb-2">
                  <li>葉酸補充</li>
                  <li>避免生食</li>
                  <li>每日8杯水</li>
                </ul>
                <h4 className="font-medium">不適處理</h4>
                <ul className="mb-2">
                  <li>緩解孕吐</li>
                  <li>處理頻尿</li>
                </ul>
                <h4 className="font-medium">運動</h4>
                <ul>
                  <li>溫和散步</li>
                  <li>孕婦瑜珈</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">第二孕期 (13-29週)</h3>
                <h4 className="font-medium">飲食</h4>
                <ul className="mb-2">
                  <li>增加蛋白質</li>
                  <li>補充鈣質、鐵質</li>
                </ul>
                <h4 className="font-medium">體重管理</h4>
                <ul className="mb-2">
                  <li>每週增重0.3-0.5kg</li>
                </ul>
                <h4 className="font-medium">皮膚護理</h4>
                <ul>
                  <li>預防妊娠紋</li>
                  <li>處理搔癢</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">第三孕期 (29週以上)</h3>
                <h4 className="font-medium">飲食</h4>
                <ul className="mb-2">
                  <li>少量多餐</li>
                  <li>避免過度增重</li>
                </ul>
                <h4 className="font-medium">睡眠</h4>
                <ul className="mb-2">
                  <li>左側臥</li>
                  <li>使用托腹枕</li>
                </ul>
                <h4 className="font-medium">觀察</h4>
                <ul>
                  <li>胎動計數</li>
                  <li>注意水腫</li>
                </ul>
              </div>
            </div>
            
            <h2>產前定期檢查</h2>
            <p>
              在懷孕期間，產前定期檢查可以幫助診斷孕婦和寶寶的健康，及時發現問題（如果出現的話），並預防分娩過程中的併發症。
            </p>
            <p>
              根據<a href="https://womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline font-semibold underline" aria-label="美國婦女健康辦公室網站，將在新視窗開啟">美國婦女健康辦公室(OWH，隸屬於美國衛生及公共服務部HHS)</a>的建議，正常產檢的頻率為：
            </p>
            <ul className="mb-2">
              <li>第4週到第28週期間，每月一次</li>
              <li>第28週到第36週期間，每月兩次</li>
              <li>第36週到分娩期間，每週一次</li>
            </ul>
            <p className="italic text-gray-600">
              註：高風險妊娠的孕婦可能需要更頻繁地產前護理。
            </p>
            
            <h2>高風險妊娠的孕婦</h2>
            <p>
              「高風險妊娠」並不代表會出現問題，而是較高併發症機率的風險，根據<a href="https://womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests#6" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline font-semibold underline" aria-label="美國婦女健康辦公室(OWH)網站，將在新視窗開啟">美國婦女健康辦公室(OWH)</a>，以下因素可能會增加懷孕期間出現問題的風險：
            </p>
            <ul className="mb-2">
              <li>年齡過小或超過35歲</li>
              <li>體重過重或過輕</li>
              <li>既往妊娠出現問題</li>
              <li>懷孕前就存在的健康問題，如高血壓、糖尿病、自身免疫疾病、癌症和HIV</li>
              <li>雙胞胎或多胞胎</li>
            </ul>
            <p>
              在懷孕期間也可能會出現高風險妊娠的健康問題，例如妊娠糖尿病或子癇前症。
            </p>
            <p>
              若有任何高風險妊娠的疑慮，可以向醫生諮詢，醫生可以解釋風險程度以及實際出現問題的可能性。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}