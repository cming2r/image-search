'use client';

import { FC, useState, ReactElement } from 'react';
import { saveSearchRecord, getDeviceType } from '@/lib/supabase';
import Image from 'next/image';

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
  
  // 處理點擊搜尋按鈕，保存詳細的搜尋記錄到Supabase (靜默記錄)
  const handleSearch = async (engineUrl: string, engineName: string): Promise<boolean> => {
    // 再次驗證URL的有效性
    if (!isValidImageUrl(imageUrl)) {
      console.error('無效的圖片URL');
      return false;
    }
    
    try {
      // 獲取設備類型
      const deviceType = getDeviceType();
      
      // 靜默保存詳細搜尋記錄到Supabase
      await saveSearchRecord({
        image_url: imageUrl,
        search_engine: engineName,
        device_type: deviceType
      });
      
      // 成功或失敗都繼續打開鏈接
      return true;
    } catch (error) {
      // 只在控制台記錄錯誤，不顯示給用戶
      console.error('保存搜尋記錄失敗:', error);
      
      // 即使保存失敗，仍允許打開連結
      return true;
    }
  };
  
  // 搜尋引擎的圖片搜尋URL結構
  const searchEngines: SearchEngine[] = [
    {
      name: 'Google',
      url: `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      icon: (
        <div className="w-5 h-5 mr-2 flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/google.svg" 
            alt="Google" 
            width={20} 
            height={20} 
            className="filter brightness-0 invert" 
            priority
          />
        </div>
      )
    },
    {
      name: 'Bing',
      url: `https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIHMP&sbisrc=UrlPaste&q=imgurl:${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      icon: (
        <div className="w-5 h-5 mr-2 flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/bing.svg" 
            alt="Bing" 
            width={14} 
            height={20} 
            className="filter brightness-0 invert" 
            priority
          />
        </div>
      )
    },
    {
      name: 'TinEye',
      url: `https://tineye.com/search?url=${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      icon: (
        <div className="w-5 h-5 mr-2 flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/tineye.png" 
            alt="TinEye" 
            width={20} 
            height={20} 
            className="filter brightness-0 invert" 
            priority
          />
        </div>
      )
    },
    {
      name: 'SauceNAO',
      url: `https://saucenao.com/search.php?url=${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      icon: (
        <div className="w-5 h-5 mr-2 flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/SauceNAO.png" 
            alt="SauceNAO" 
            width={20} 
            height={20} 
            className="filter brightness-0 invert" 
            priority
          />
        </div>
      )
    }
  ];

  // 檢查輸入的URL是否有效的圖片URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    
    // 檢查URL格式
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;
    if (!urlPattern.test(url)) return false;
    
    // 檢查URL是否以常見圖片格式結尾
    const imageExtensionPattern = /\.(jpe?g|png|gif|bmp|webp|svg|heic|heif|tiff?|avif)(\?.*)?$/i;
    return imageExtensionPattern.test(url);
  };

  // 如果沒有有效的圖片URL，則返回禁用的按鈕
  if (!isValidImageUrl(imageUrl)) {
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

  // 已移除顯示保存狀態的提示訊息函數

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
            onClick={(e) => {
              // 左鍵點擊處理
              e.preventDefault(); // 先阻止默認事件
              
              // 再次驗證URL有效性
              if (!isValidImageUrl(imageUrl)) {
                // 如果URL無效，顯示警告
                setShowWarning(true);
                setTimeout(() => {
                  setShowWarning(false);
                }, 3000);
                return false;
              }
              
              // URL有效，立即打開鏈接，不等待數據保存
              window.open(engine.url, '_blank');
              
              // 後台異步記錄搜尋，不阻塞用戶體驗
              handleSearch(engine.url, engine.name)
                .catch(err => console.error('記錄搜尋失敗:', err));
              
              return false; // 阻止默認事件
            }}
            onAuxClick={(e) => {
              // 處理中鍵點擊 (e.button === 1)
              if (e.button === 1) {
                // 先驗證URL有效性
                if (!isValidImageUrl(imageUrl)) {
                  // 無效URL，阻止默認行為並顯示警告
                  e.preventDefault();
                  setShowWarning(true);
                  setTimeout(() => {
                    setShowWarning(false);
                  }, 3000);
                  return false;
                }
                
                // URL有效，異步記錄搜尋，不阻塞默認行為
                handleSearch(engine.url, engine.name)
                  .catch(err => console.error('記錄搜尋失敗:', err));
              }
            }}
            className={`block w-full md:w-auto md:flex-1 ${engine.bgColor} ${engine.hoverColor} text-white px-4 py-3 rounded flex items-center justify-center transition-colors mb-3 md:mb-0`}
          >
            {engine.icon}
            {engine.name}
          </a>
        ))}
      </div>
      {/* 移除狀態顯示 */}
    </div>
  );
};

export default SearchButtons;