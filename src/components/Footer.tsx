'use client';

import { FC } from 'react';

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
        <div className="mt-4 text-center text-sm text-gray-500">
          
          <p>
          Copyright &copy; {currentYear} - fyimg.com
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;