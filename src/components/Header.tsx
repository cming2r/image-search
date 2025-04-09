'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

// 簡單的防抖函數
function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 切換選單狀態
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // 關閉選單
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // 監聽螢幕寬度變化，使用防抖優化性能
  useEffect(() => {
    const handleResize = debounce(() => {
      // 當螢幕寬度大於等於 768px 時自動關閉行動版選單
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    }, 200);
    
    // 初始檢查
    handleResize();
    
    // 添加監聽
    window.addEventListener('resize', handleResize);
    
    // 清理函數
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link href="/image-search" className="text-xl font-bold text-blue-600 flex items-center" onClick={closeMenu}>
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="hidden sm:inline">fyimg - 以圖搜圖</span>
            <span className="sm:hidden">fyimg</span>
          </Link>
          
          <div className="flex items-center">
            {/* 聯絡我們圖標 - 手機版放在選單按鈕左邊 */}
            <Link 
              href="/contact" 
              className="md:hidden mr-4 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="聯絡我們"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
            
            {/* 行動版選單按鈕 */}
            <button 
              className="md:hidden flex items-center"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
              aria-expanded={isMenuOpen}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* 桌面版選單 */}
          <nav className="hidden md:flex items-center ml-6">
            <ul className="flex space-x-6">
              <li>
                <Link href="/date" className="text-lg text-gray-600 hover:text-blue-600 transition-colors">
                  日期計算器
                </Link>
              </li>
              <li>
                <a href="https://vvrl.cc" className="text-lg text-gray-600 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                  縮網址服務
                </a>
              </li>
            </ul>
            
            {/* 聯絡我們圖標 - 桌面版放在最右邊 */}
            <Link 
              href="/contact" 
              className="ml-6 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="聯絡我們"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </nav>
        </div>
        
        {/* 行動版下拉選單 */}
        <div 
          className={`md:hidden bg-white py-4 mt-2 rounded-lg shadow-lg border border-gray-100 transform transition-transform duration-200 ease-in-out ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 hidden'}`}
          role="navigation"
        >
            <ul className="flex flex-col space-y-3">
              <li>
                <Link 
                  href="/image-search" 
                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  onClick={closeMenu}
                >
                  以圖搜圖
                </Link>
              </li>
              <li>
                <Link 
                  href="/date" 
                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  onClick={closeMenu}
                >
                  日期計算器
                </Link>
              </li>
              <li>
                <a 
                  href="https://vvrl.cc" 
                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  縮網址服務
                </a>
              </li>
            </ul>
          </div>
      </div>
    </header>
  );
};

export default Header;