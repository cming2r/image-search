'use client';

import { FC, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { Image as ImageIcon, ChevronDown, Mail, Menu, X, LogOut } from 'lucide-react';
// Header translations
const headerTranslations = {
  home: {
    tw: "首頁",
    cn: "首页",
    en: "Home",
    jp: "ホーム",
    es: "Inicio"
  },
  tools: {
    tw: "線上工具",
    cn: "线上工具",
    en: "Online Tools",
    jp: "オンラインツール",
    es: "Herramientas en Línea"
  },
  imageSearch: {
    tw: "以圖搜圖",
    cn: "以图搜图",
    en: "Image Search",
    jp: "画像検索",
    es: "Buscar por Imagen"
  },
  calculator: {
    tw: "日期計算器",
    cn: "日期计算器",
    en: "Date Calculator",
    jp: "日付計算機",
    es: "Calculadora de Fechas"
  },
  dueDate: {
    tw: "預產期計算器",
    cn: "预产期计算器",
    en: "Due Date Calculator",
    jp: "出産予定日計算機",
    es: "Calculadora de Fecha de Parto"
  },
  giftExchange: {
    tw: "交換禮物抽籤",
    cn: "交换礼物抽签",
    en: "Gift Exchange Draw",
    jp: "ギフト交換抽選",
    es: "Sorteo de Intercambio de Regalos"
  },
  about: {
    tw: "關於",
    cn: "关于",
    en: "About",
    jp: "について",
    es: "Acerca de"
  },
  contact: {
    tw: "聯絡我們",
    cn: "联络我们",
    en: "Contact Us",
    jp: "お問い合わせ",
    es: "Contáctanos"
  },
  terms: {
    tw: "使用條款",
    cn: "使用条款",
    en: "Terms of Use",
    jp: "利用規約",
    es: "Términos de Uso"
  },
  privacy: {
    tw: "隱私權政策",
    cn: "隐私权政策",
    en: "Privacy Policy",
    jp: "プライバシーポリシー",
    es: "Política de Privacidad"
  },
  admin: {
    tw: "管理頁面",
    cn: "管理页面",
    en: "Admin Panel",
    jp: "管理ページ",
    es: "Panel de Administración"
  },
  logout: {
    tw: "登出",
    cn: "登出",
    en: "Logout",
    jp: "ログアウト",
    es: "Cerrar Sesión"
  },
  urlShortener: {
    tw: "縮網址服務",
    cn: "缩网址服务",
    en: "URL Shortener",
    jp: "URL短縮サービス",
    es: "Servicio de Acortador de URL"
  },
  imageUrl: {
    tw: "圖片URL",
    cn: "图片URL",
    en: "Image URL",
    jp: "画像URL",
    es: "URL de Imagen"
  },
  fileUrl: {
    tw: "檔案URL",
    cn: "档案URL",
    en: "File URL",
    jp: "ファイルURL",
    es: "URL de Archivo"
  },
  videoUrl: {
    tw: "影片URL",
    cn: "影片URL",
    en: "Video URL",
    jp: "動画URL",
    es: "URL de Video"
  },
  menuScanner: {
    tw: "揪團訂餐-菜單掃描器",
    cn: "揪团订餐-菜单扫描器",
    en: "Group Order - Menu Scanner",
    jp: "グループ注文 - メニュースキャナー",
    es: "Pedido Grupal - Escáner de Menú"
  }
};

// 簡單的防抖函數
function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// 生成外部網址（根據當前語言添加路徑）
function getExternalUrl(baseUrl: string, locale: string): string {
  // en 使用根路徑，其他語言添加前綴
  if (locale === 'en') {
    return baseUrl;
  }
  return `${baseUrl}/${locale}`;
}

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  // 從路徑參數中獲取當前語言
  const locale = (params?.locale as string) || 'en';
  
  // 獲取翻譯文字的函數
  const getTranslation = (key: keyof typeof headerTranslations) => {
    return headerTranslations[key][locale as keyof typeof headerTranslations[typeof key]] || headerTranslations[key].tw;
  };
  
  // 切換選單狀態
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // 關閉選單
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // 由於我們使用CSS hover實現下拉，不再需要這些Toggle函數和監聽器
  
  // 檢查用戶登入狀態
  useEffect(() => {
    // 初始檢查
    const checkAuthStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        setIsLoggedIn(!!session);
      } catch (err) {
        console.error('檢查登入狀態失敗:', err);
      }
    };
    
    // 立即檢查一次
    checkAuthStatus();
    
    // 設置監聽器，當身份驗證狀態發生變化時觸發
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setIsLoggedIn(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // 監聽螢幕寬度變化，使用防抖優化性能
  useEffect(() => {
    const handleResize = debounce(() => {
      // 當螢幕寬度大於等於 1024px 時自動關閉行動版選單
      if (window.innerWidth >= 1024) {
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
    <header className="bg-white shadow-sm block relative z-50">
      <div className="container mx-auto px-4 py-4 block">
        <div className="flex justify-between items-center max-w-5xl mx-auto w-full">
          {/* 左側 Logo */}
          <div className="flex-shrink-0">
            <Link
              href={`/${locale === 'en' ? '' : locale}`}
              className="text-2xl font-bold text-blue-600 flex items-center tracking-wider"
              onClick={closeMenu}
            >
              <span>FYimg</span>
            </Link>
          </div>
          
          {/* 中間的導航菜單 */}
          <nav className="hidden lg:flex items-center justify-center flex-grow mx-8">
            <div className="flex space-x-8">
              <Link href={`/${locale === 'en' ? '' : locale + '/'}image-search`}
                className="text-lg text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              >
                <ImageIcon className="h-6 w-6 mr-2" />
                {getTranslation('imageSearch')}
              </Link>
              <div className="relative group" ref={dateDropdownRef}>
                <Link href={`/${locale === 'en' ? '' : locale + '/'}date`}
                  className="text-lg text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {getTranslation('calculator')}
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                </Link>

                {/* 下拉選單 - 使用全局CSS類實現延遲效果 */}
                <div
                  className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 header-dropdown-menu"
                  role="menu"
                >
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}date`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    role="menuitem"
                  >
                    {getTranslation('calculator')}
                  </Link>
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}due-date-calculator`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    role="menuitem"
                  >
                    {getTranslation('dueDate')}
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <a
                  href={getExternalUrl('https://diin.cc', locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  {getTranslation('tools')}
                  <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-500 text-white">
                    NEW
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                </a>

                <div
                  className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 header-dropdown-menu"
                  role="menu"
                >
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}gift-exchange`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    role="menuitem"
                  >
                    {getTranslation('giftExchange')}
                  </Link>
                  <a
                    href={getExternalUrl('https://diin.cc', locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    role="menuitem"
                  >
                    {getTranslation('menuScanner')}
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-500 text-white animate-pulse">
                      NEW
                    </span>
                  </a>
                </div>
              </div>
              <div className="relative group">
                <Link href={`/${locale === 'en' ? '' : locale + '/'}shorturl`}
                  className="text-lg text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  {getTranslation('urlShortener')}
                  <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                </Link>

                <div
                  className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 header-dropdown-menu"
                  role="menu"
                >
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}shorturl`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    role="menuitem"
                  >
                    {getTranslation('urlShortener')}
                  </Link>
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}file-url`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    role="menuitem"
                  >
                    {getTranslation('fileUrl')}
                  </Link>
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}image-url`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    role="menuitem"
                  >
                    {getTranslation('imageUrl')}
                  </Link>
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}video-url`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    role="menuitem"
                  >
                    {getTranslation('videoUrl')}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          {/* 右側功能區 */}
          <div className="flex items-center">
            {/* 語言切換器 - 在桌面版和手機版都顯示 */}
            <div className="mr-4">
              <LanguageSwitcher 
                currentLocale={locale} 
                className="text-sm" 
              />
            </div>
            
            {/* 聯絡我們圖標 - 手機版放在選單按鈕左邊 */}
            <Link
              href={`/${locale === 'en' ? '' : locale + '/'}contact`}
              className="lg:hidden mr-4 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="聯絡我們"
            >
              <Mail className="h-6 w-6" />
            </Link>
            
            {/* 登入狀態 Google 圖標和登出按鈕 - 手機版 */}
            {isLoggedIn && (
              <div className="lg:hidden flex items-center">
                <Link
                  href={`/${locale === 'en' ? '' : locale + '/'}admin`}
                  className="mr-3 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Admin Panel"
                  title="Admin Panel"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                    </g>
                  </svg>
                </Link>

                <button
                  onClick={async () => {
                    try {
                      // 使用前端 Supabase 客戶端登出
                      await supabase.auth.signOut();
                      window.location.href = '/';
                    } catch (err) {
                      console.error('登出失敗:', err);
                    }
                  }}
                  className="mr-4 text-gray-600 hover:text-red-600 transition-colors"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            )}
            
            {/* 行動版選單按鈕 */}
            <button
              className="lg:hidden flex items-center"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
            
            {/* 聯絡我們圖標 - 桌面版放在最右邊 */}
            <Link
              href={`/${locale === 'en' ? '' : locale + '/'}contact`}
              className="hidden lg:block text-gray-600 hover:text-blue-600 transition-colors"
              aria-label={getTranslation('contact')}
              title={getTranslation('contact')}
            >
              <Mail className="h-6 w-6" />
            </Link>
            
            {/* 登入狀態 Google 圖標和登出按鈕 - 桌面版 */}
            {isLoggedIn && (
              <>
                <Link
                  href={`/${locale === 'en' ? '' : locale + '/'}admin`}
                  className="hidden lg:block ml-4 text-gray-600 hover:text-blue-600 transition-colors tooltip"
                  aria-label={getTranslation('admin')}
                  title={getTranslation('admin')}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                    </g>
                  </svg>
                </Link>
                <button
                  onClick={async () => {
                    try {
                      // 使用前端 Supabase 客戶端登出
                      await supabase.auth.signOut();
                      // 重新加載頁面
                      window.location.href = '/';
                    } catch (err) {
                      console.error('登出失敗:', err);
                    }
                  }}
                  className="hidden lg:block ml-3 text-gray-600 hover:text-red-600 transition-colors tooltip"
                  aria-label={getTranslation('logout')}
                  title={getTranslation('logout')}
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* 行動版下拉選單 */}
        <div 
          className={`lg:hidden py-4 mt-2 transform transition-transform duration-200 ease-in-out ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 hidden'}`}
          role="navigation"
        >
            
            <ul className="flex flex-col space-y-3">
              <li>
                <Link
                  href={`/${locale === 'en' ? '' : locale + '/'}image-search`}
                  className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  onClick={closeMenu}
                >
                  <ImageIcon className="h-6 w-6 mr-2" />
                  {getTranslation('imageSearch')}
                </Link>
              </li>
              <li>
                <div className="flex w-full items-center justify-between">
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}date`}
                    className="flex-grow px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('calculator')}
                  </Link>
                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {
                      // 展開子選單實現方式
                      const subMenu = document.getElementById('date-submenu');
                      if (subMenu) {
                        subMenu.classList.toggle('hidden');
                      }
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div id="date-submenu" className="hidden pl-4 bg-gray-50">
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}date`}
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('calculator')}
                  </Link>
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}due-date-calculator`}
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('dueDate')}
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex w-full items-center justify-between">
                  <a
                    href={getExternalUrl('https://diin.cc', locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 flex items-center"
                    onClick={closeMenu}
                  >
                    {getTranslation('tools')}
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-500 text-white">
                      NEW
                    </span>
                  </a>
                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {
                      // 展開子選單實現方式
                      const subMenu = document.getElementById('tools-submenu');
                      if (subMenu) {
                        subMenu.classList.toggle('hidden');
                      }
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div id="tools-submenu" className="hidden pl-4 bg-gray-50">
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}gift-exchange`}
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('giftExchange')}
                  </Link>
                  <a
                    href={getExternalUrl('https://diin.cc', locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('menuScanner')}
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-500 text-white animate-pulse">
                      NEW
                    </span>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex w-full items-center justify-between">
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}shorturl`}
                    className="flex-grow px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('urlShortener')}
                  </Link>
                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {
                      // 展開子選單實現方式
                      const subMenu = document.getElementById('url-submenu');
                      if (subMenu) {
                        subMenu.classList.toggle('hidden');
                      }
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div id="url-submenu" className="hidden pl-4 bg-gray-50">
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}shorturl`}
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('urlShortener')}
                  </Link>
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}file-url`}
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('fileUrl')}
                  </Link>
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}image-url`}
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('imageUrl')}
                  </Link>
                  <Link
                    href={`/${locale === 'en' ? '' : locale + '/'}video-url`}
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMenu}
                  >
                    {getTranslation('videoUrl')}
                  </Link>
                </div>
              </li>
              
              {/* 如果用戶已登入，顯示管理頁面和登出選項 */}
              {isLoggedIn && (
                <>
                  <li>
                    <Link
                      href={`/${locale === 'en' ? '' : locale + '/'}admin`}
                      className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      onClick={closeMenu}
                    >
                      <span className="mr-2">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                          </g>
                        </svg>
                      </span>
                      {getTranslation('admin')}
                    </Link>
                  </li>
                  <li>
                    <button
                      className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-red-600"
                      onClick={async () => {
                        try {
                          // 使用前端 Supabase 客戶端登出
                          await supabase.auth.signOut();
                          window.location.href = '/';
                        } catch (err) {
                          console.error('登出失敗:', err);
                        } finally {
                          closeMenu();
                        }
                      }}
                    >
                      <LogOut className="w-6 h-6 mr-2" />
                      {getTranslation('logout')}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
      </div>
    </header>
  );
};

export default Header;