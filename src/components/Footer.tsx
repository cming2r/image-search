'use client';

import { FC } from 'react';
import Link from 'next/link';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mt-1">
            <p>此工具僅供學習和個人使用，請尊重著作權並遵守各搜尋引擎的使用條款</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">
              本網站不儲存任何圖片搜尋記錄，只提供搜尋功能。
            </p>
            <p className="text-gray-500 text-sm mt-1">
              圖片搜尋服務由 Google、Bing、Yandex 等第三方搜尋引擎提供
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/3 hidden md:block"></div>
          <div className="text-center text-sm text-gray-500 md:flex-1">
            <p>Copyright &copy; {currentYear} - fyimg.com</p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end mt-2 md:mt-0 text-sm space-x-4">
            <Link href="/privacy-policy" className="text-blue-600 hover:underline">
              隱私權政策
            </Link>
            <Link href="/terms" className="text-blue-600 hover:underline">
              使用條款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;