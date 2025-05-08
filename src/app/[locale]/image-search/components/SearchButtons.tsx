'use client';

import { FC, useState, ReactElement } from 'react';
import { useParams } from 'next/navigation';
import { saveSearchRecord, getDeviceType } from '@/lib/supabase';
import Image from 'next/image';
import translations from '../translations.json';

interface SearchButtonProps {
  imageUrl: string;
  onReset?: () => void;
}

interface SearchEngine {
  name: string;
  url: string;
  bgColor: string;
  hoverColor: string;
  icon: ReactElement;
}

const SearchButtons: FC<SearchButtonProps> = ({ imageUrl, onReset }) => {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const t = translations[locale as keyof typeof translations] || translations.zh;
  
  const [showWarning, setShowWarning] = useState<boolean>(false);
  
  // 當用戶點擊禁用的按鈕時顯示紅色警告
  const handleDisabledClick = (): void => {
    setShowWarning(true);
    
    // 3秒後恢復為灰色
    setTimeout(() => {
      setShowWarning(false);
    }, 3000);
  };
  
  // 讀取並更新本地搜索引擎記錄
  const updateLocalSearchEngines = (engineName: string): string[] => {
    // 嘗試從localStorage獲取當前圖片URL的搜索引擎列表
    try {
      const currentImageKey = `image_url_${imageUrl}`;
      let engines: string[] = [];
      
      const storedEngines = localStorage.getItem(currentImageKey);
      if (storedEngines) {
        try {
          engines = JSON.parse(storedEngines);
          if (!Array.isArray(engines)) {
            engines = [];
          }
        } catch {
          engines = [];
        }
      }
      
      // 如果引擎不在列表中，添加它
      if (!engines.includes(engineName)) {
        engines.push(engineName);
        localStorage.setItem(currentImageKey, JSON.stringify(engines));
      }
      
      return engines;
    } catch (error) {
      console.error('無法更新本地搜索引擎記錄:', error);
      return [engineName];
    }
  };
  
  // 處理點擊搜尋按鈕，僅更新搜尋引擎信息到Supabase (靜默記錄)
  const handleSearch = async (engineUrl: string, engineName: string): Promise<boolean> => {
    // 再次驗證URL的有效性
    if (!isValidImageUrl(imageUrl)) {
      console.error('無效的圖片URL');
      return false;
    }
    
    try {
      // 獲取設備類型
      const deviceType = getDeviceType();
      
      // 更新本地搜索引擎記錄
      const engines = updateLocalSearchEngines(engineName);
      console.log('本地搜索引擎記錄:', engines);
      
      // 僅更新搜尋引擎信息到Supabase，不獲取IP和國家
      saveSearchRecord({
        image_url: imageUrl,
        search_engine: engines, // 使用完整的引擎陣列
        device_type: deviceType
        // 不提供ip_address和country_code
      }).catch(err => {
        console.error('更新搜索引擎失敗:', err);
      });
      
      return true;
    } catch (error) {
      console.error('處理搜尋記錄失敗:', error);
      return true; // 即使保存失敗，仍允許打開連結
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
            alt="" 
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
            alt="" 
            width={14} 
            height={20} 
            className="filter brightness-0 invert" 
            priority
          />
        </div>
      )
    },
    {
      name: 'Yandex',
      url: `https://ya.ru/images/search?rpt=imageview&url=${encodeURIComponent(imageUrl)}`,
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      icon: (
        <div className="w-5 h-5 mr-2 flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/yandex.svg" 
            alt="" 
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
            alt="" 
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
          {showWarning ? t.form.uploadFirstWarning : t.form.uploadFirst}
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
      <p className="text-gray-600 text-center mb-2">{t.form.chooseEngine}</p>
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
              
              // 異步記錄搜尋，不阻塞用戶體驗
              handleSearch(engine.url, engine.name);
              
              // URL有效，立即打開鏈接
              window.open(engine.url, '_blank');
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
                
                // 異步記錄搜尋，不阻塞默認行為
                handleSearch(engine.url, engine.name);
              }
            }}
            className={`block w-full md:w-auto md:flex-1 ${engine.bgColor} ${engine.hoverColor} text-white px-4 py-3 rounded flex items-center justify-center transition-colors mb-3 md:mb-0`}
          >
            {engine.icon}
            {engine.name}
          </a>
        ))}
      </div>
      
      {/* 重置按鈕 - 僅在有圖片URL時顯示 */}
      {imageUrl && onReset && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onReset}
            className="bg-gray-700 hover:bg-gray-400 text-white font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
          >
            {locale === 'zh' ? '重置' : locale === 'jp' ? 'リセット' : 'Reset'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchButtons;