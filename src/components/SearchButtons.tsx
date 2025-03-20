'use client';

import { FC, useState, ReactElement } from 'react';

interface SearchButtonProps {
  imageUrl: string;
}

interface SearchEngine {
  name: string;
  url: string;
  bgColor: string;
  hoverColor: string;
  icon: ReactElement;
}

const SearchButtons: FC<SearchButtonProps> = ({ imageUrl }) => {
  const [showWarning, setShowWarning] = useState<boolean>(false);
  
  // 當用戶點擊禁用的按鈕時顯示紅色警告
  const handleDisabledClick = (): void => {
    setShowWarning(true);
    
    // 3秒後恢復為灰色
    setTimeout(() => {
      setShowWarning(false);
    }, 3000);
  };
  
  // 搜尋引擎的圖片搜尋URL結構
  const searchEngines: SearchEngine[] = [
    {
      name: 'Google',
      url: `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#FFFFFF" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FFFFFF" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#FFFFFF" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      )
    },
    {
      name: 'Bing',
      url: `https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIHMP&sbisrc=UrlPaste&q=imgurl:${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M5.71 2h4.76L22 11.8v.2l-8.04 3.71-8.25-3.71V2zm0 0M5.71 2L4 3.03v11.94l7 3.85 7.98-3.85.02-1L5.71 2z"/>
        </svg>
      )
    },
    {
      name: 'TinEye',
      url: `https://tineye.com/search?url=${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm9 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    },
    {
      name: 'SauceNAO',
      url: `https://saucenao.com/search.php?url=${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"/>
        </svg>
      )
    }
  ];

  // 如果沒有圖片URL，則返回禁用的按鈕
  if (!imageUrl) {
    return (
      <div className="mt-4">
        <p className={`${showWarning ? 'text-red-500 font-medium' : 'text-gray-500'} text-center mb-2`}>
          {showWarning ? '!!請先輸入圖片網址或上傳圖片!!' : '請先輸入圖片網址或上傳圖片'}
        </p>
        <div className="flex flex-col md:flex-row md:flex-wrap md:gap-2">
          {searchEngines.map((engine) => (
            <div
              key={engine.name}
              onClick={handleDisabledClick}
              role="button"
              aria-disabled="true"
              className={`w-full md:w-auto md:flex-1 ${engine.bgColor} opacity-50 text-white px-4 py-3 rounded flex items-center justify-center cursor-not-allowed mb-3 md:mb-0`}
            >
              {engine.icon}
              {engine.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-gray-600 text-center mb-2">選擇搜尋引擎進行圖片搜尋</p>
      <div className="flex flex-col md:flex-row md:flex-wrap md:gap-2">
        {searchEngines.map((engine) => (
          <a
            key={engine.name}
            href={engine.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full md:w-auto md:flex-1 ${engine.bgColor} ${engine.hoverColor} text-white px-4 py-3 rounded flex items-center justify-center transition-colors mb-3 md:mb-0`}
          >
            {engine.icon}
            {engine.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchButtons;