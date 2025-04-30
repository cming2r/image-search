'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { locales } from '@/app/[locale]/metadata';

interface LanguageSwitcherProps {
  className?: string;
  currentLocale: string;
}

export default function LanguageSwitcher({ className = '', currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 語言顯示名稱
  const languageNames: Record<string, string> = {
    zh: '中文',
    en: 'English',
    jp: '日本語',
  };
  
  // 處理點擊外部關閉下拉菜單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 根據當前路徑和語言生成新路徑
  const getLocalizedPath = (locale: string) => {
    // 特殊處理 defaultLocale (zh)
    if (locale === 'zh') {
      // 從路徑中移除當前語言前綴
      let path = pathname;
      
      // 檢查當前路徑是否有語言前綴
      for (const loc of locales) {
        if (pathname.startsWith(`/${loc}/`)) {
          path = pathname.replace(`/${loc}/`, '/');
          break;
        }
        // 處理根路徑的特殊情況
        if (pathname === `/${loc}`) {
          path = '/';
          break;
        }
      }
      
      return path;
    } else {
      // 其他語言: 添加語言前綴
      let path = pathname;
      
      // 檢查當前路徑是否有語言前綴
      for (const loc of locales) {
        if (pathname.startsWith(`/${loc}/`)) {
          path = pathname.replace(`/${loc}/`, '/');
          break;
        }
        // 處理根路徑的特殊情況
        if (pathname === `/${loc}`) {
          path = '/';
          break;
        }
      }
      
      // 如果是根路徑，直接返回 /語言代碼
      if (path === '/') {
        return `/${locale}`;
      }
      
      // 否則返回 /語言代碼/路徑
      return `/${locale}${path}`;
    }
  };

  return (
    <div className={`language-switcher relative ${className}`} ref={dropdownRef}>
      {/* 當前語言按鈕 */}
      <button
        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{languageNames[currentLocale]}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* 下拉選單 */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50"
          role="menu"
        >
          {locales.map((locale) => {
            const isActive = currentLocale === locale;
            
            return (
              <Link
                key={locale}
                href={getLocalizedPath(locale)}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'font-bold bg-gray-50' : ''}`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                {languageNames[locale]}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}