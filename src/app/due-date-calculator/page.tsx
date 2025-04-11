'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DueDateCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [resultSection, setResultSection] = useState<boolean>(false);
  const [eddDisplay, setEddDisplay] = useState<string>('');
  const [currentWeeksDisplay, setCurrentWeeksDisplay] = useState<string>('');
  

  // 格式化日期為本地格式
  const formatLocalDate = useCallback((date: Date) => {
    return date.toLocaleDateString('zh-TW');
  }, []);

  // 計算懷孕週數
  const calculateWeeksAndDays = useCallback((date: Date) => {
    if (!lastPeriodDate) return null;
    const lmpDate = new Date(lastPeriodDate);
    const currentDate = new Date(date);
    
    lmpDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    if (currentDate.getTime() === lmpDate.getTime()) {
      return { weeks: 0, days: 0 };
    }
    
    const diffTime = currentDate.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return null;
    if (diffDays > 40 * 7) return null;
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    return { weeks, days };
  }, [lastPeriodDate]);
  
  // 共享懷孕週數狀態
  const [currentPregnancyData, setCurrentPregnancyData] = useState<{weeks: number, days: number} | null>(null);
  
  // 更新週數標記函數
  const updateWeekMarker = useCallback(() => {
    if (!lastPeriodDate) return;
    
    // 使用共享的懷孕週數數據
    if (!currentPregnancyData) return;
    
    let weeks = currentPregnancyData.weeks;
    
    // 限制週數範圍在0-40週之間
    weeks = Math.min(Math.max(weeks, 0), 40);
    
    // 計算x座標位置（線性插值）
    const startX = 50;   // 0週的X座標
    const endX = 750;    // 40週的X座標
    const position = startX + (endX - startX) * (weeks / 40);
    
    // 更新SVG元素位置
    const line = document.getElementById('weekMarkerLine');
    const circle = document.getElementById('weekMarkerCircle');
    const text = document.getElementById('weekMarkerText');
    
    if (line && circle && text) {
      line.setAttribute('x1', position.toString());
      line.setAttribute('x2', position.toString());
      circle.setAttribute('cx', position.toString());
      text.setAttribute('x', position.toString());
      text.textContent = `👶${weeks}週`;
    }
  }, [lastPeriodDate, currentPregnancyData]);

  // 檢查是否為今天
  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }, []);
  
  // 檢查是否為最後一次月經日期
  const isLMPDate = useCallback((date: Date) => {
    if (!lastPeriodDate) return false;
    const lmpDate = new Date(lastPeriodDate);
    return date.getDate() === lmpDate.getDate() &&
           date.getMonth() === lmpDate.getMonth() &&
           date.getFullYear() === lmpDate.getFullYear();
  }, [lastPeriodDate]);
  
  // 檢查是否為預產期
  const isEDDDate = useCallback((date: Date) => {
    if (!lastPeriodDate) return false;
    const lmpDate = new Date(lastPeriodDate);
    const eddDate = new Date(lmpDate);
    eddDate.setDate(eddDate.getDate() + 280);
    return date.getDate() === eddDate.getDate() &&
           date.getMonth() === eddDate.getMonth() &&
           date.getFullYear() === eddDate.getFullYear();
  }, [lastPeriodDate]);
  
  // 檢查是否為同一個月
  const isSameMonth = useCallback((date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() && 
           date1.getMonth() === date2.getMonth();
  }, []);

  // 設定日期 - 從localStorage讀取或使用預設值
  useEffect(() => {
    // 檢查是否在瀏覽器環境
    if (typeof window !== 'undefined') {
      // 嘗試從localStorage獲取保存的日期
      const savedDate = localStorage.getItem('lastPeriodDate');
      
      if (savedDate) {
        // 如果有保存的值，使用它
        setLastPeriodDate(savedDate);
      } else {
        // 否則使用預設日期（30天前）
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() - 30);
        
        const year = defaultDate.getFullYear();
        const month = String(defaultDate.getMonth() + 1).padStart(2, '0');
        const day = String(defaultDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        setLastPeriodDate(formattedDate);
      }
    }
  }, []);
  
  // 更新結果 - 計算和顯示預產期和懷孕週數
  useEffect(() => {
    if (!lastPeriodDate) {
      setResultSection(false);
      return;
    }

    setResultSection(true);
    
    const lmpDate = new Date(lastPeriodDate);
    const edd = new Date(lmpDate);
    edd.setDate(edd.getDate() + 280);
    setEddDisplay(formatLocalDate(edd));

    const currentPregnancy = calculateWeeksAndDays(new Date());
    
    setCurrentWeeksDisplay(
      currentPregnancy 
        ? `${currentPregnancy.weeks} 週 ${currentPregnancy.days} 天` 
        : '0 週 0 天'
    );
    
    // 只在初始載入或日期變更時才更新共享狀態
    if (currentPregnancy) {
      setCurrentPregnancyData(currentPregnancy);
    }
    
  // 移除 currentPregnancyData 從依賴數組 - 防止循環更新
  }, [lastPeriodDate, formatLocalDate, calculateWeeksAndDays]);

  // 更新日曆
  const updateCalendar = useCallback(() => {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;
    
    // 先設置一個載入狀態，保留空間避免佈局偏移
    if (calendarEl.children.length === 0) {
      calendarEl.innerHTML = '<div class="col-span-7 text-center py-16">載入日曆中...</div>';
    } else {
      calendarEl.innerHTML = '';
    }
    
    // 添加星期標題
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    weekDays.forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.style.cssText = 'padding: 0.5rem; border-bottom: 1px solid #e5e7eb; font-size: 0.875rem; font-weight: 500;';
      dayEl.textContent = day;
      calendarEl.appendChild(dayEl);
    });

    // 獲取月份的第一天和最後一天
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 添加空白日期單元格
    for (let i = 0; i < firstDay.getDay(); i++) {
      const emptyDay = document.createElement('div');
      emptyDay.style.cssText = 'padding: 0.25rem; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; font-size: 1rem; height: 4rem;';
      calendarEl.appendChild(emptyDay);
    }

    // 添加月份的日期
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const pregnancy = calculateWeeksAndDays(date);
      const isCurrentDay = isToday(date);
      const isLMP = isLMPDate(date);
      const isEDD = isEDDDate(date);
      
      const dayEl = document.createElement('div');
      let backgroundColor = 'white';
      if (isCurrentDay || isLMP || isEDD) {
        backgroundColor = '#FFE4E1';
      }
      
      dayEl.style.cssText = `
        padding: 0.25rem; 
        border-bottom: 1px solid #e5e7eb; 
        border-right: 1px solid #e5e7eb; 
        font-size: 1rem; 
        height: 4rem;
        background-color: ${backgroundColor};
      `;
      
      dayEl.innerHTML = `
        <div style="text-align: left;">${i}</div>
        ${pregnancy ? `
          <div style="font-size: 1.125rem; color: #4b5563; margin-top: 0.25rem; text-align: center;">
            ${pregnancy.weeks}<sup>${pregnancy.days}</sup>
          </div>
        ` : ''}
      `;
      calendarEl.appendChild(dayEl);
    }

    // 更新月份顯示
    const calendarMonthDisplay = document.getElementById('calendarMonthDisplay');
    if (calendarMonthDisplay) {
      calendarMonthDisplay.textContent = 
        currentMonth.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' });
    }
    
    // 更新按鈕狀態
    if (!lastPeriodDate) return;
    
    const lmpDate = new Date(lastPeriodDate);
    const today = new Date();
    const eddDate = new Date(lmpDate);
    eddDate.setDate(eddDate.getDate() + 280);
    
    const lmpButton = document.getElementById('goToLMP');
    const todayButton = document.getElementById('goToToday');
    const edcButton = document.getElementById('goToEDC');
    
    if (lmpButton && todayButton && edcButton) {
      [lmpButton, todayButton, edcButton].forEach(button => {
        button.style.backgroundColor = '#f3f4f6';
        button.style.color = '#6b7280';
      });
      
      if (isSameMonth(currentMonth, lmpDate)) {
        lmpButton.style.backgroundColor = '#FFE4E1';
        lmpButton.style.color = '#000000';
      }
      
      if (isSameMonth(currentMonth, today)) {
        todayButton.style.backgroundColor = '#FFE4E1';
        todayButton.style.color = '#000000';
      }
      
      if (isSameMonth(currentMonth, eddDate)) {
        edcButton.style.backgroundColor = '#FFE4E1';
        edcButton.style.color = '#000000';
      }
    }
    
    // 更新週數標記
    updateWeekMarker();
  }, [currentMonth, calculateWeeksAndDays, isToday, isLMPDate, isEDDDate, lastPeriodDate, isSameMonth, updateWeekMarker]);
  
  // 設置月份
  const setMonth = useCallback((date: Date) => {
    setCurrentMonth(new Date(date));
  }, []);
  
  // 處理上個月按鈕點擊
  const handlePrevMonth = useCallback(() => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  }, [currentMonth]);
  
  // 處理下個月按鈕點擊
  const handleNextMonth = useCallback(() => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  }, [currentMonth]);
  
  // 處理跳轉到LMP按鈕點擊
  const handleGoToLMP = useCallback(() => {
    if (lastPeriodDate) {
      setMonth(new Date(lastPeriodDate));
    }
  }, [lastPeriodDate, setMonth]);
  
  // 處理跳轉到EDC按鈕點擊
  const handleGoToEDC = useCallback(() => {
    if (lastPeriodDate) {
      const lmpDate = new Date(lastPeriodDate);
      const edd = new Date(lmpDate);
      edd.setDate(edd.getDate() + 280);
      setMonth(edd);
    }
  }, [lastPeriodDate, setMonth]);
  
  // 處理跳轉到今天按鈕點擊
  const handleGoToToday = useCallback(() => {
    setMonth(new Date());
  }, [setMonth]);
  
  // 只更新日曆，不處理週數標記
  useEffect(() => {
    updateCalendar();
  }, [updateCalendar]);
  
  // 初始化週數標記
  useEffect(() => {
    // 即使沒有數據也先創建標記，避免佈局偏移
    const defaultWeeks = currentPregnancyData ? currentPregnancyData.weeks : 4;
    
    // 計算顯示位置
    const startX = 50;   // 0週的X座標
    const endX = 750;    // 40週的X座標
    const position = startX + (endX - startX) * (defaultWeeks / 40);
    
    const line = document.getElementById('weekMarkerLine');
    const circle = document.getElementById('weekMarkerCircle');
    const text = document.getElementById('weekMarkerText');
    
    if (line && circle && text) {
      line.setAttribute('x1', position.toString());
      line.setAttribute('x2', position.toString());
      circle.setAttribute('cx', position.toString());
      text.setAttribute('x', position.toString());
      text.textContent = `👶${defaultWeeks}週`;
      
      // 確保標記可見
      line.style.display = 'block';
      circle.style.display = 'block';
      text.style.display = 'block';
    }
  }, [currentPregnancyData]);
  
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
          
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-2 px-4 bg-gray-50 rounded-lg flex items-center justify-center">
                    <label htmlFor="lastPeriodDate" className="m-0 mr-4 whitespace-nowrap text-center">最後一次經期的第一天：</label>
                    <input
                      type="date"
                      id="lastPeriodDate"
                      value={lastPeriodDate}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setLastPeriodDate(newDate);
                        
                        // 儲存到localStorage
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('lastPeriodDate', newDate);
                        }
                        
                        // 設置一個默認的週數標記，等待數據加載
                        setTimeout(() => {
                          updateWeekMarker();
                        }, 0);
                      }}
                      className="max-w-48 p-2 border border-gray-300 rounded-lg text-lg text-center"
                    />
                  </div>
                </div>

                {resultSection && (
                  <div id="resultSection">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-2 px-4 bg-gray-50 rounded-lg text-center">
                        <p className="m-0 text-center">預產期</p>
                        <p id="eddDisplay" className="text-xl font-bold text-blue-600 m-0 text-center">{eddDisplay}</p>
                      </div>
                      <div className="p-2 px-4 bg-gray-50 rounded-lg text-center">
                        <p className="font-medium m-0 text-center">今日週數</p>
                        <p id="currentWeeksDisplay" className="text-xl font-bold text-green-600 m-0 text-center">{currentWeeksDisplay}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-3 items-center p-2 border-b border-gray-200 gap-2">
                    <div className="justify-self-start flex items-center gap-1">
                      <button 
                        id="prevMonth" 
                        onClick={handlePrevMonth}
                        aria-label="上個月"
                        className="p-0.5 bg-transparent border-none cursor-pointer flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button 
                        id="nextMonth"
                        onClick={handleNextMonth}
                        aria-label="下個月"
                        className="p-0.5 bg-transparent border-none cursor-pointer flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                    <span id="calendarMonthDisplay" className="font-medium text-center min-w-[120px]"></span>
                    <div className="justify-self-end flex gap-1">
                      <button 
                        id="goToLMP"
                        onClick={handleGoToLMP}
                        aria-label="前往最後一次月經日期"
                        className="py-1 px-2 bg-gray-100 border border-gray-200 rounded text-xs font-medium text-gray-900 transition-all hover:bg-gray-200"
                      >
                        LMP
                      </button>
                      <button 
                        id="goToToday"
                        onClick={handleGoToToday}
                        aria-label="前往今日"
                        className="py-1 px-2 bg-gray-100 border border-gray-200 rounded text-xs font-medium text-gray-900 transition-all hover:bg-gray-200"
                      >
                        Now
                      </button>
                      <button 
                        id="goToEDC"
                        onClick={handleGoToEDC}
                        aria-label="前往預產期"
                        className="py-1 px-2 bg-gray-100 border border-gray-200 rounded text-xs font-medium text-gray-900 transition-all hover:bg-gray-200"
                      >
                        EDD
                      </button>
                    </div>
                  </div>
                  
                  <div id="calendar" className="grid grid-cols-7 text-center min-h-[300px]"></div>
                </div>
              </div>
            </div>
          </div>
          
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
            
            <div className="container">
            <svg id="timeline" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            {/* 背景 */}
            <rect width="800" height="400" fill="white"/>
            {/* 主時間軸 */}
            <line x1="50" y1="200" x2="750" y2="200" stroke="#2c3e50" strokeWidth="3"/>
            {/* 週期標記 */}
            <g fontFamily="Arial, sans-serif" fontSize="18">
            {/* 週數標記 - 移到上方 */}
            <g textAnchor="middle" fontWeight="bold">
                <text x="50" y="170">0週</text>
                <text x="277" y="170">13週</text>
                <text x="557" y="170">29週</text>
                <text x="750" y="170">40週</text>
            </g>
            {/* 第一孕期 */}
            <rect x="50" y="180" width="227" height="40" fill="#FF91A4" opacity="0.4"/>
            <text x="163" y="140" textAnchor="middle" fill="#C71585" fontWeight="bold">第一孕期</text>
            {/* 第二孕期 */}
            <rect x="277" y="180" width="280" height="40" fill="#90EE90" opacity="0.4"/>
            <text x="417" y="140" textAnchor="middle" fill="#228B22" fontWeight="bold">第二孕期</text>
            {/* 第三孕期 */}
            <rect x="557" y="180" width="193" height="40" fill="#87CEEB" opacity="0.4"/>
            <text x="654" y="140" textAnchor="middle" fill="#4169E1" fontWeight="bold">第三孕期</text>
            </g>
            {/* 重要里程碑 */}
            <g fontFamily="Arial, sans-serif" fontSize="12">
            {/* 第一孕期里程碑 */}
            <circle cx="164" cy="200" r="6" fill="#C71585"/>
            <line x1="164" y1="200" x2="164" y2="270" stroke="#C71585" strokeWidth="1" strokeDasharray="2"/>
            <rect x="114" y="270" width="100" height="40" rx="5" fill="#FF91A4" opacity="0.2"/>
            <text x="164" y="285" textAnchor="middle" fill="#C71585">心跳開始</text>
            <text x="164" y="300" textAnchor="middle" fill="#C71585">(6-7週)</text>

            <circle cx="260" cy="200" r="6" fill="#C71585"/>
            <line x1="260" y1="200" x2="260" y2="330" stroke="#C71585" strokeWidth="1" strokeDasharray="2"/>
            <rect x="210" y="330" width="100" height="40" rx="5" fill="#FF91A4" opacity="0.2"/>
            <text x="260" y="345" textAnchor="middle" fill="#C71585">器官發育完成</text>
            <text x="260" y="360" textAnchor="middle" fill="#C71585">(12週)</text>

            {/* 第二孕期里程碑 */}
            <circle cx="365" cy="200" r="6" fill="#228B22"/>
            <line x1="365" y1="200" x2="365" y2="270" stroke="#228B22" strokeWidth="1" strokeDasharray="2"/>
            <rect x="315" y="270" width="100" height="40" rx="5" fill="#90EE90" opacity="0.2"/>
            <text x="365" y="285" textAnchor="middle" fill="#228B22">胎動感受</text>
            <text x="365" y="300" textAnchor="middle" fill="#228B22">(16-20週)</text>

            <circle cx="400" cy="200" r="6" fill="#228B22"/>
            <line x1="400" y1="200" x2="400" y2="330" stroke="#228B22" strokeWidth="1" strokeDasharray="2"/>
            <rect x="350" y="330" width="100" height="40" rx="5" fill="#90EE90" opacity="0.2"/>
            <text x="400" y="345" textAnchor="middle" fill="#228B22">性別辨識</text>
            <text x="400" y="360" textAnchor="middle" fill="#228B22">(20週)</text>

            {/* 第三孕期里程碑 */}
            <circle cx="662" cy="200" r="6" fill="#4169E1"/>
            <line x1="662" y1="200" x2="662" y2="270" stroke="#4169E1" strokeWidth="1" strokeDasharray="2"/>
            <rect x="612" y="270" width="100" height="40" rx="5" fill="#87CEEB" opacity="0.2"/>
            <text x="662" y="285" textAnchor="middle" fill="#4169E1">肺部成熟</text>
            <text x="662" y="300" textAnchor="middle" fill="#4169E1">(34-36週)</text>

            <circle cx="680" cy="200" r="6" fill="#4169E1"/>
            <line x1="680" y1="200" x2="680" y2="330" stroke="#4169E1" strokeWidth="1" strokeDasharray="2"/>
            <rect x="630" y="330" width="100" height="40" rx="5" fill="#87CEEB" opacity="0.2"/>
            <text x="680" y="345" textAnchor="middle" fill="#4169E1">胎位定位</text>
            <text x="680" y="360" textAnchor="middle" fill="#4169E1">(36週)</text>
            </g>
            {/* 標題 */}
            <text x="400" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#2c3e50">懷孕週期發展時程表</text>
            {/* 當前週數標記 */}
            <line id="weekMarkerLine" x1="85" y1="200" x2="85" y2="240" stroke="#FF4500" strokeWidth="3"/>
            <circle id="weekMarkerCircle" cx="85" cy="200" r="8" fill="#FF4500"/>
            <text id="weekMarkerText" x="85" y="260" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#FF4500">👶4週</text>
            </svg>
            </div>
            
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