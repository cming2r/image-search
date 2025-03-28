'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema } from '@/lib/schema';
import { SchemaMarkupGroup } from '@/components/SchemaMarkup';

// 定義全域 CSS 樣式
const dateInputStyle = {
  textAlign: 'center' as const,
  // 針對日期輸入框的特殊樣式，強制居中顯示
  direction: 'rtl' as const, // 先反向，使日期選擇器靠左
  paddingRight: '0' as const,
};

export default function DateCalculator() {
  // 日期加天數的狀態
  const [startDate, setStartDate] = useState<string>('');
  const [days, setDays] = useState<number>(7);
  const [daysInput, setDaysInput] = useState<string>("7");
  const [result, setResult] = useState<string>('');
  
  // 日期相減的狀態
  const [startDate2, setStartDate2] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [daysDiff, setDaysDiff] = useState<string>('');

  // 顯示面板的狀態
  const [activeTab, setActiveTab] = useState<'addDays' | 'subtractDates'>('addDays');

  // 生成結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/date', '日期計算器');
  const webPageSchema = generateWebPageSchema(
    '/date',
    '日期計算器 | 日曆天計算工具 - fyimg.com',
    '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。'
  );
  const faqSchema = generateFAQSchema('date');

  // 初始化日期
  useEffect(() => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    
    // 設置日期加天數的初始值
    setStartDate(todayISO);
    
    // 設置日期相減的初始值
    setStartDate2(todayISO);
    
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    setEndDate(sevenDaysLater.toISOString().split('T')[0]);
  }, []);

  // 處理天數輸入變化
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDaysInput(value);
    
    // 如果是有效的數字，更新days狀態
    if (value !== '-' && value !== '') {
      setDays(parseInt(value));
    } else if (value === '-') {
      // 處理只輸入負號的情況
      setDays(0);
    } else {
      // 處理空字串的情況
      setDays(0);
    }
  };

  // 計算日期加天數
  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      start.setDate(start.getDate() + days);
      
      // 取得星期幾
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      const weekday = weekdays[start.getDay()];
      
      setResult(`${start.toISOString().split('T')[0]}（${weekday}）`);
    }
  }, [startDate, days]);

  // 計算日期相減
  useEffect(() => {
    if (startDate2 && endDate) {
      const start = new Date(startDate2);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      setDaysDiff(`${diffDays} 天`);
    }
  }, [startDate2, endDate]);

  // 檢查日期是否為今天
  const isToday = (dateString: string): boolean => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaMarkupGroup schemas={[breadcrumbSchema, webPageSchema, faqSchema]} id="date-calculator-schema" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-lg mx-auto">
          {/* 標題區 */}
          <div className="title-container">
            <h1>日期計算器</h1>
            <p>計算日期之間的差距，或從指定日期加減天數</p>
          </div>
          
          {/* 分頁按鈕 */}
          <div className="flex gap-0.5 mb-4">
            <button 
              onClick={() => setActiveTab('addDays')}
              className={`flex-1 py-2.5 px-4 ${
                activeTab === 'addDays' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              } rounded-t-md font-medium transition-colors`}
            >
              日期加天數
            </button>
            <button 
              onClick={() => setActiveTab('subtractDates')}
              className={`flex-1 py-2.5 px-4 ${
                activeTab === 'subtractDates' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              } rounded-t-md font-medium transition-colors`}
            >
              日期相減
            </button>
          </div>
          
          {/* 日期加天數介面 */}
          <div 
            className={`content-section ${
              activeTab === 'addDays' ? 'block' : 'hidden'
            }`}
          >
            <div className="mb-4">
              <div className="flex items-center mb-4">
                <div className="w-28 text-right pr-4">
                  <label className="font-medium">起始日期：</label>
                </div>
                <div className="flex-1 flex">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    style={dateInputStyle}
                  />
                  <button
                    onClick={() => {
                      const today = new Date();
                      setStartDate(today.toISOString().split('T')[0]);
                    }}
                    className={`ml-2 w-10 h-10 flex items-center justify-center rounded-md ${
                      isToday(startDate) ? 'bg-red-100' : 'bg-gray-100'
                    } hover:bg-gray-200 transition-colors`}
                  >
                    T
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-28 text-right pr-4">
                  <label className="font-medium">天數：</label>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    min="-999"
                    max="999"
                    step="1"
                    value={daysInput}
                    onChange={handleDaysChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-28 text-right pr-4">
                  <label className="font-medium">計算結果：</label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={result}
                    readOnly
                    className="w-full px-3 py-2 border border-red-400 rounded-md text-red-500 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* 日期相減介面 */}
          <div 
            className={`content-section ${
              activeTab === 'subtractDates' ? 'block' : 'hidden'
            }`}
          >
            <div className="mb-4">
              <div className="flex items-center mb-4">
                <div className="w-28 text-right pr-4">
                  <label className="font-medium">起始日期：</label>
                </div>
                <div className="flex-1 flex">
                  <input
                    type="date"
                    value={startDate2}
                    onChange={(e) => setStartDate2(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    style={dateInputStyle}
                  />
                  <button
                    onClick={() => {
                      const today = new Date();
                      setStartDate2(today.toISOString().split('T')[0]);
                    }}
                    className={`ml-2 w-10 h-10 flex items-center justify-center rounded-md ${
                      isToday(startDate2) ? 'bg-red-100' : 'bg-gray-100'
                    } hover:bg-gray-200 transition-colors`}
                  >
                    T
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-28 text-right pr-4">
                  <label className="font-medium">結束日期：</label>
                </div>
                <div className="flex-1 flex">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    style={dateInputStyle}
                  />
                  <button
                    onClick={() => {
                      const today = new Date();
                      setEndDate(today.toISOString().split('T')[0]);
                    }}
                    className={`ml-2 w-10 h-10 flex items-center justify-center rounded-md ${
                      isToday(endDate) ? 'bg-red-100' : 'bg-gray-100'
                    } hover:bg-gray-200 transition-colors`}
                  >
                    T
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-28 text-right pr-4">
                  <label className="font-medium">計算結果：</label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={daysDiff}
                    readOnly
                    className="w-full px-3 py-2 border border-red-400 rounded-md text-red-500 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* 說明區 */}
          <div className="content-section">
            <h2>關於日期計算器</h2>
            <p>
              本工具提供兩種常用日期計算功能：
            </p>
            <ul className="list-disc pl-6 mb-3">
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
            <ul className="list-disc pl-6 mb-3">
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
    </div>
  );
}