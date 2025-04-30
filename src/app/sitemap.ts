import { getFullUrl, getPageDates } from '@/lib/utils';
import { MetadataRoute } from 'next';

/**
 * 從Git日期字符串轉換為Date對象
 * @param dateString Git日期字符串，通常是ISO格式
 * @returns Date對象
 */
function parseGitDate(dateString: string): Date {
  try {
    return new Date(dateString);
  } catch {
    console.warn(`無法解析日期: ${dateString}，使用當前日期`);
    return new Date();
  }
}

/**
 * 處理國際化路徑的日期獲取
 * @param fullRoute 完整路徑，可能包含語言前綴
 * @param languages 支援的語言配置
 * @returns 頁面的Git日期
 */
function getRouteDate(fullRoute: string, languages: { code: string; hreflang: string }[]) {
  // 判斷當前環境，僅在開發環境輸出詳細日誌
  const isDev = process.env.NODE_ENV === 'development';
  const logInfo = (message: string) => isDev && console.info(`[Sitemap] ${message}`);
  
  // 獲取基本路由（去除語言前綴）
  const getBaseRoute = () => {
    const languageCodes = languages.map(lang => lang.code).filter(Boolean);
    const languagePattern = languageCodes.length > 0 
      ? new RegExp(`^/(${languageCodes.join('|')})/`) 
      : /^\/$/;
    return fullRoute.replace(languagePattern, '/');
  };
  
  // 優先嘗試方法列表，按優先順序
  const tryMethods = [
    // 方法1: 直接使用完整路由
    () => {
      logInfo(`嘗試使用完整路由: ${fullRoute}`);
      return getPageDates(fullRoute);
    },
    
    // 方法2: 使用基本路由（去除語言前綴）
    () => {
      const baseRoute = getBaseRoute();
      if (fullRoute !== baseRoute) {
        logInfo(`嘗試使用基本路由: ${baseRoute}`);
        return getPageDates(baseRoute);
      }
      throw new Error('基本路由與完整路由相同');
    },
    
    // 方法3: 嘗試使用明確的文件路徑
    () => {
      const baseRoute = getBaseRoute();
      
      // 嘗試各種可能的文件路徑
      const paths = [
        // 1. 新目錄結構 [locale]
        `src/app/[locale]${baseRoute === '/' ? '' : baseRoute}/page.tsx`,
        
        // 2. 舊目錄結構
        `src/app${baseRoute === '/' ? '' : baseRoute}/page.tsx`,
        
        // 3. 特定語言頁面
        fullRoute !== baseRoute ? `src/app${fullRoute}/page.tsx` : undefined
      ].filter((p): p is string => Boolean(p));
      
      // 嘗試每個可能的路徑
      for (const path of paths) {
        try {
          logInfo(`嘗試使用文件路徑: ${path}`);
          const result = getPageDates(path);
          logInfo(`成功從文件路徑 ${path} 獲取日期`);
          return result;
        } catch {
          // 繼續下一個路徑
        }
      }
      throw new Error('所有文件路徑嘗試都失敗');
    }
  ];
  
  // 依次嘗試每個方法
  for (const method of tryMethods) {
    try {
      return method();
    } catch (error) {
      // 繼續嘗試下一個方法
      if (error instanceof Error) {
        logInfo(`嘗試失敗: ${error.message}`);
      }
    }
  }
  
  // 所有方法都失敗，使用後備日期
  if (isDev) {
    console.warn(`無法獲取 ${fullRoute} 的日期，使用當前日期作為後備`);
  }
  
  const now = new Date();
  return {
    created: now.toISOString(),
    modified: now.toISOString()
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 定義所有語言和對應的 hreflang
  const languages = [
    { code: '', hreflang: 'zh' }, // 中文（根路徑）
    { code: 'en', hreflang: 'en' }, // 英文
    { code: 'jp', hreflang: 'ja' }, // 日文
  ];

  // 定義所有需要包含在sitemap中的基礎路由
  const routes = [
    '/',                   // 首頁
    '/image-search',       // 圖片搜尋
    '/date',               // 日期計算器
    '/due-date-calculator', // 預產期計算器
    '/gift-exchange',      // 禮物交換
    '/contact',            // 聯繫我們
    '/privacy-policy',     // 隱私政策
    '/terms',              // 服務條款
  ];

  // 生成sitemap項目
  const sitemapItems: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // 預先計算此路由的所有語言URL和修改日期
    const routeData = languages.map(lang => {
      const langPrefix = lang.code ? `/${lang.code}` : '';
      const fullRoute = `${langPrefix}${route === '/' ? '' : route}`;
      const url = getFullUrl(fullRoute);
      
      // 獲取修改日期 (如果非必要，可考慮延遲計算)
      const { modified } = getRouteDate(fullRoute, languages);
      
      return {
        lang,
        fullRoute,
        url,
        modified
      };
    });
    
    // 一次性生成語言替代鏈接
    const alternates = {
      languages: routeData.reduce((acc, item) => {
        acc[item.lang.hreflang] = item.url;
        return acc;
      }, {} as Record<string, string>),
    };

    // 定義基本優先級和更新頻率
    let priority = 0.7;
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';

    // 根據路由調整優先級和更新頻率
    if (route === '/' || route === '/image-search') {
      priority = 1.0;
      changeFrequency = 'weekly';
    } else if (route === '/date' || route === '/due-date-calculator' || route === '/gift-exchange') {
      priority = 0.9;
      changeFrequency = 'weekly';
    } else {
      priority = 0.3;
      changeFrequency = 'monthly';
    }

    // 為每種語言添加sitemap項目 (使用預先計算的數據)
    for (const item of routeData) {
      sitemapItems.push({
        url: item.url,
        lastModified: parseGitDate(item.modified),
        changeFrequency,
        priority,
        alternates,
      });
    }
  }

  return sitemapItems;
}