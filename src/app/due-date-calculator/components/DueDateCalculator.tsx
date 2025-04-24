'use client';

import { useState, useEffect, useCallback } from 'react';

export default function DueDateCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [resultSection, setResultSection] = useState<boolean>(false);
  const [eddDisplay, setEddDisplay] = useState<string>('');
  const [currentWeeksDisplay, setCurrentWeeksDisplay] = useState<string>('');
  
  // 共享懷孕週數狀態
  const [currentPregnancyData, setCurrentPregnancyData] = useState<{weeks: number, days: number} | null>(null);

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
    // 確保PregnancyTimeline組件需要的數據已經準備好
    if (!currentPregnancyData) return;
    
    // 初始化週數標記 (這裡的邏輯會在PregnancyTimeline組件內部處理)
    updateWeekMarker();
  }, [currentPregnancyData, updateWeekMarker]);
  
  return (
    <div>
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
    </div>
  );
}