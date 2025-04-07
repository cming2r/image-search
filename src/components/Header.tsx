'use client';

import { FC } from 'react';
import Link from 'next/link';

const Header: FC = () => {
  // 使用 Next.js 的 Link 組件自動處理導航，不需要手動重載頁面
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link href="/image-search" className="text-xl font-bold text-blue-600 flex items-center">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            以圖搜圖
          </Link>
          <nav className="ml-6">
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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;