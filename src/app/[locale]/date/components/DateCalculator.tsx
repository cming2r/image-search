'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// 定義全域 CSS 樣式
const dateInputStyle = {
  textAlign: 'center' as const,
  // 針對日期輸入框的特殊樣式，強制居中顯示
  direction: 'rtl' as const, // 先反向，使日期選擇器靠左
  paddingRight: '0' as const,
};

// 定義多語言內容
const translations = {
    calculator: {
      tabs: {
        addDays: {
          zh: "日期加天數",
          en: "Add Days to Date",
          jp: "日付に日数を追加",
          es: "Agregar Días a Fecha"
        },
        subtractDates: {
          zh: "日期相減",
          en: "Calculate Date Difference",
          jp: "日付の差を計算",
          es: "Calcular Diferencia de Fechas"
        }
      },
      startDate: {
        zh: "起始日期：",
        en: "Start Date:",
        jp: "開始日：",
        es: "Fecha de Inicio:"
      },
      startDateAs: {
        zh: "起始日期為：",
        en: "Start date as:",
        jp: "開始日を：",
        es: "Fecha de inicio como:"
      },
      day0: {
        zh: "第0天",
        en: "Day 0",
        jp: "第0日",
        es: "Día 0"
      },
      day1: {
        zh: "第1天",
        en: "Day 1",
        jp: "第1日", 
        es: "Día 1"
      },
      day0Explanation: {
        zh: "起始日為1月1日，天數3天\n1月1日＋3天 = 1月4日\n第0天：1月1日\n第1天：1月2日\n第2天：1月3日\n第3天：1月4日",
        en: "Start date Jan 1, add 3 days\nJan 1 + 3 days = Jan 4\nDay 0: Jan 1\nDay 1: Jan 2\nDay 2: Jan 3\nDay 3: Jan 4",
        jp: "開始日1月1日、3日追加\n1月1日+3日 = 1月4日\n第0日：1月1日\n第1日：1月2日\n第2日：1月3日\n第3日：1月4日",
        es: "Fecha inicial 1 Ene, agregar 3 días\n1 Ene + 3 días = 4 Ene\nDía 0: 1 Ene\nDía 1: 2 Ene\nDía 2: 3 Ene\nDía 3: 4 Ene"
      },
      day1Explanation: {
        zh: "起始日為1月1日，天數3天\n第1天：1月1日\n第2天：1月2日\n第3天：1月3日",
        en: "Start date Jan 1, add 3 days\nDay 1: Jan 1\nDay 2: Jan 2\nDay 3: Jan 3", 
        jp: "開始日1月1日、3日追加\n第1日：1月1日\n第2日：1月2日\n第3日：1月3日",
        es: "Fecha inicial 1 Ene, agregar 3 días\nDía 1: 1 Ene\nDía 2: 2 Ene\nDía 3: 3 Ene"
      },
      days: {
        zh: "天數：",
        en: "Days:",
        jp: "日数：",
        es: "Días:"
      },
      endDate: {
        zh: "結束日期：",
        en: "End Date:",
        jp: "終了日：",
        es: "Fecha Final:"
      },
      result: {
        zh: "計算結果：",
        en: "Result:",
        jp: "計算結果：",
        es: "Resultado:"
      },
      weekdays: {
        zh: ["日", "一", "二", "三", "四", "五", "六"],
        en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        jp: ["日", "月", "火", "水", "木", "金", "土"],
        es: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      }
    }
  };

export default function DateCalculator() {
  // 從URL參數中獲取當前語言
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';
  
  // 日期加天數的狀態
  const [startDate, setStartDate] = useState<string>('');
  const [days, setDays] = useState<number>(7);
  const [daysInput, setDaysInput] = useState<string>("7");
  const [result, setResult] = useState<string>('');
  const [startAsDay0, setStartAsDay0] = useState<boolean>(true); // false = 第1天, true = 第0天
  
  // 日期相減的狀態
  const [startDate2, setStartDate2] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [daysDiff, setDaysDiff] = useState<string>('');
  const [startAsDay0ForDiff, setStartAsDay0ForDiff] = useState<boolean>(true); // false = 第1天, true = 第0天

  // 顯示面板的狀態
  const [activeTab, setActiveTab] = useState<'addDays' | 'subtractDates'>('addDays');
  
  // 提示訊息顯示狀態
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showTooltipDiff, setShowTooltipDiff] = useState<boolean>(false);
  
  // 延遲隱藏計時器
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(null);
  const [tooltipTimeoutDiff, setTooltipTimeoutDiff] = useState<NodeJS.Timeout | null>(null);


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
      // 根據計算方式調整天數
      const adjustedDays = startAsDay0 ? days : days - 1;
      start.setDate(start.getDate() + adjustedDays);
      
      // 取得星期幾
      const weekdays = translations.calculator.weekdays[lang];
      const weekday = weekdays[start.getDay()];
      
      // 格式化日期為 yyyy/MM/dd
      const year = start.getFullYear();
      const month = String(start.getMonth() + 1).padStart(2, '0');
      const day = String(start.getDate()).padStart(2, '0');
      
      setResult(`${year}/${month}/${day}（${weekday}）`);
    }
  }, [startDate, days, startAsDay0, lang]);

  // 計算日期相減
  useEffect(() => {
    if (startDate2 && endDate) {
      const start = new Date(startDate2);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      // 根據計算方式調整天數
      if (!startAsDay0ForDiff && diffDays > 0) {
        diffDays += 1; // 第1天模式：包含起始日期本身
      }
      
      // 根據語言設置不同的天數單位
      const dayUnit = locale === 'en' ? ' days' : 
                      locale === 'jp' ? ' 日' : 
                      locale === 'es' ? ' días' : ' 天';
      setDaysDiff(`${diffDays}${dayUnit}`);
    }
  }, [startDate2, endDate, startAsDay0ForDiff, locale]);

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
    <>
      {/* 分頁按鈕 */}
      <div className="flex gap-0.5 mb-4">
        <button 
          onClick={() => setActiveTab('addDays')}
          className={`text-lg flex-1 py-2.5 px-4 ${
            activeTab === 'addDays' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          } rounded-t-md font-medium transition-colors`}
        >
          {translations.calculator.tabs.addDays[lang]}
        </button>
        <button 
          onClick={() => setActiveTab('subtractDates')}
          className={`text-lg flex-1 py-2.5 px-4 ${
            activeTab === 'subtractDates' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          } rounded-t-md font-medium transition-colors`}
        >
          {translations.calculator.tabs.subtractDates[lang]}
        </button>
      </div>
      
      {/* 日期加天數介面 */}
      <div 
        className={`content-section ${
          activeTab === 'addDays' ? 'block' : 'hidden'
        }`}
      >
        <div className="mb-4 max-w-lg mx-auto">
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label htmlFor="start-date" className="text-lg font-medium">{translations.calculator.startDate[lang]}</label>
            </div>
            <div className="flex-1 flex">
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-lg flex-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
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
          
          {/* 計算方式選擇 */}
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label className="text-lg font-medium">{translations.calculator.startDateAs[lang]}</label>
            </div>
            <div className="flex-1 flex items-center justify-center gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="countingMethod"
                  checked={startAsDay0}
                  onChange={() => setStartAsDay0(true)}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-lg">{translations.calculator.day0[lang]}</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="countingMethod"
                  checked={!startAsDay0}
                  onChange={() => setStartAsDay0(false)}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-lg">{translations.calculator.day1[lang]}</span>
              </label>
            </div>
            <div className="w-12 flex justify-center relative">
              <button
                type="button"
                className="w-5 h-5 rounded-full bg-gray-400 hover:bg-gray-500 text-white text-xs font-bold flex items-center justify-center cursor-help transition-colors"
                onMouseEnter={() => {
                  if (tooltipTimeout) {
                    clearTimeout(tooltipTimeout);
                    setTooltipTimeout(null);
                  }
                  setShowTooltip(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setShowTooltip(false);
                  }, 1000); // 1秒延遲
                  setTooltipTimeout(timeout);
                }}
                onClick={() => setShowTooltip(!showTooltip)}
                aria-label="說明"
              >
                ?
              </button>
              {showTooltip && (
                <div 
                  className="absolute left-0 top-6 z-10 bg-gray-800 text-white text-xs rounded-md p-2 whitespace-pre-line shadow-lg min-w-[200px] select-text"
                  onMouseEnter={() => {
                    if (tooltipTimeout) {
                      clearTimeout(tooltipTimeout);
                      setTooltipTimeout(null);
                    }
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => {
                      setShowTooltip(false);
                    }, 500); // 0.5秒延遲
                    setTooltipTimeout(timeout);
                  }}
                >
                  <div className="mb-1 font-medium">{translations.calculator.day0[lang]}:</div>
                  <div className="mb-2">{translations.calculator.day0Explanation[lang]}</div>
                  <div className="mb-1 font-medium">{translations.calculator.day1[lang]}:</div>
                  <div>{translations.calculator.day1Explanation[lang]}</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label htmlFor="days-input" className="text-lg font-medium">{translations.calculator.days[lang]}</label>
            </div>
            <div className="flex-1">
              <input
                id="days-input"
                type="number"
                min="-999"
                max="999"
                step="1"
                value={daysInput}
                onChange={handleDaysChange}
                className="text-lg w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
              />
            </div>
            <div className='w-12'></div>
          </div>
          
          <div className="flex items-center">
            <div className="w-32 text-right pr-4">
              <label htmlFor="result-display" className="text-lg font-medium">{translations.calculator.result[lang]}</label>
            </div>
            <div className="flex-1">
              <input
                id="result-display"
                type="text"
                value={result}
                readOnly
                className="text-lg w-full px-3 py-2 border border-red-500 rounded-md text-red-600 text-center"
              />
            </div>
            <div className='w-12'></div>
          </div>
        </div>
      </div>
      
      {/* 日期相減介面 */}
      <div 
        className={`content-section ${
          activeTab === 'subtractDates' ? 'block' : 'hidden'
        }`}
      >
        <div className="mb-4 max-w-lg mx-auto">
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label htmlFor="start-date2" className="text-lg font-medium">{translations.calculator.startDate[lang]}</label>
            </div>
            <div className="flex-1 flex">
              <input
                id="start-date2"
                type="date"
                value={startDate2}
                onChange={(e) => setStartDate2(e.target.value)}
                className="text-lg flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
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
          
          {/* 計算方式選擇 */}
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label className="text-lg font-medium">{translations.calculator.startDateAs[lang]}</label>
            </div>
            <div className="flex-1 flex items-center justify-center gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="countingMethodDiff"
                  checked={startAsDay0ForDiff}
                  onChange={() => setStartAsDay0ForDiff(true)}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-lg">{translations.calculator.day0[lang]}</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="countingMethodDiff"
                  checked={!startAsDay0ForDiff}
                  onChange={() => setStartAsDay0ForDiff(false)}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-lg">{translations.calculator.day1[lang]}</span>
              </label>
            </div>
            <div className="w-12 flex justify-center relative">
              <button
                type="button"
                className="w-5 h-5 rounded-full bg-gray-400 hover:bg-gray-500 text-white text-xs font-bold flex items-center justify-center cursor-help transition-colors"
                onMouseEnter={() => {
                  if (tooltipTimeoutDiff) {
                    clearTimeout(tooltipTimeoutDiff);
                    setTooltipTimeoutDiff(null);
                  }
                  setShowTooltipDiff(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setShowTooltipDiff(false);
                  }, 1000); // 1秒延遲
                  setTooltipTimeoutDiff(timeout);
                }}
                onClick={() => setShowTooltipDiff(!showTooltipDiff)}
                aria-label="說明"
              >
                ?
              </button>
              {showTooltipDiff && (
                <div 
                  className="absolute left-0 top-6 z-10 bg-gray-800 text-white text-xs rounded-md p-2 whitespace-pre-line shadow-lg min-w-[200px] select-text"
                  onMouseEnter={() => {
                    if (tooltipTimeoutDiff) {
                      clearTimeout(tooltipTimeoutDiff);
                      setTooltipTimeoutDiff(null);
                    }
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => {
                      setShowTooltipDiff(false);
                    }, 500); // 0.5秒延遲
                    setTooltipTimeoutDiff(timeout);
                  }}
                >
                  <div className="mb-1 font-medium">{translations.calculator.day0[lang]}:</div>
                  <div className="mb-2">{translations.calculator.day0Explanation[lang]}</div>
                  <div className="mb-1 font-medium">{translations.calculator.day1[lang]}:</div>
                  <div>{translations.calculator.day1Explanation[lang]}</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label htmlFor="end-date" className="text-lg font-medium">{translations.calculator.endDate[lang]}</label>
            </div>
            <div className="flex-1 flex">
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-lg flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
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
            <div className="w-32 text-right pr-4">
              <label htmlFor="days-diff" className="text-lg font-medium">{translations.calculator.result[lang]}</label>
            </div>
            <div className="flex-1">
              <input
                id="days-diff"
                type="text"
                value={daysDiff}
                readOnly
                className="text-lg w-full px-3 py-2 border border-red-500 rounded-md text-red-600 text-center"
              />
            </div>
            <div className='w-12'></div>
          </div>
        </div>
      </div>
    </>
  );
}