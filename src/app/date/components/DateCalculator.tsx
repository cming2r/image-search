'use client';

import { useState, useEffect } from 'react';

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
      
      // 格式化日期為 yyyy/MM/dd
      const year = start.getFullYear();
      const month = String(start.getMonth() + 1).padStart(2, '0');
      const day = String(start.getDate()).padStart(2, '0');
      
      setResult(`${year}/${month}/${day}（${weekday}）`);
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
          日期加天數
        </button>
        <button 
          onClick={() => setActiveTab('subtractDates')}
          className={`text-lg flex-1 py-2.5 px-4 ${
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
        <div className="mb-4 max-w-lg mx-auto">
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label htmlFor="start-date" className="text-lg font-medium">起始日期：</label>
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
          
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label htmlFor="days-input" className="text-lg font-medium">天數：</label>
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
              <label htmlFor="result-display" className="text-lg font-medium">計算結果：</label>
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
              <label htmlFor="start-date2" className="text-lg font-medium">起始日期：</label>
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
          
          <div className="flex items-center mb-4">
            <div className="w-32 text-right pr-4">
              <label htmlFor="end-date" className="text-lg font-medium">結束日期：</label>
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
              <label htmlFor="days-diff" className="text-lg font-medium">計算結果：</label>
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