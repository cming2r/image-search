import { getFullUrl, getPageDates } from '@/lib/utils';
import { MetadataRoute } from 'next';

/**
 * 定義路由配置的類型
 */
type RouteConfig = {
  path: string;
  name: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  supportedLanguages: string[];
};

/**
 * 定義語言配置的類型
 */
type LanguageConfig = {
  code: string;
  hreflang: string;
};

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
function getRouteDate(fullRoute: string, languages: LanguageConfig[]): { modified: string } {
  // 判斷當前環境，僅在開發環境輸出詳細日誌
  const isDev = process.env.NODE_ENV === 'development';
  
  // 獲取基本路由（去除語言前綴）
  const getBaseRoute = () => {
    const languageCodes = languages.map(lang => lang.code).filter(Boolean);
    const languagePattern = languageCodes.length > 0 
      ? new RegExp(`^/(${languageCodes.join('|')})/`) 
      : /^\/$/;
    return fullRoute.replace(languagePattern, '/');
  };
  
  try {
    // 先嘗試使用完整路由
    try {
      return getPageDates(fullRoute);
    } catch {
      // 如果失敗，嘗試使用基本路由（去除語言前綴）
      const baseRoute = getBaseRoute();
      if (fullRoute !== baseRoute) {
        return getPageDates(baseRoute);
      }
      
      // 如果仍然失敗，嘗試使用明確的文件路徑
      // 針對新的目錄結構
      const filePath = `src/app/[locale]${baseRoute === '/' ? '' : baseRoute}/page.tsx`;
      return getPageDates(filePath);
    }
  } catch {
    // 所有方法都失敗，使用當前日期作為後備修改日期
    if (isDev) {
      console.warn(`無法獲取 ${fullRoute} 的修改日期，使用當前日期作為後備`);
    }
    
    return {
      modified: new Date().toISOString()
    };
  }
}

/**
 * 生成網站的站點地圖 (Sitemap)
 * 
 * 注意：您在瀏覽器中直接訪問 /sitemap.xml 時可能看到的是簡化的文本版本。
 * 實際的 XML 包含更豐富的結構，包括語言替代鏈接。
 * 
 * 查看完整 XML 的方法：
 * 1. 使用 curl http://localhost:3000/sitemap.xml > sitemap.xml 命令將其保存到文件
 * 2. 使用瀏覽器的"查看源代碼"功能（右鍵點擊頁面，選擇"查看頁面源代碼"）
 * 3. 使用網絡開發工具檢查網絡請求（F12 開發者工具 -> Network 標籤）
 * 
 * @returns MetadataRoute.Sitemap - Next.js 站點地圖配置
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // 定義所有語言和對應的 hreflang
  const LANGUAGES: LanguageConfig[] = [
    { code: '', hreflang: 'zh' }, // 中文（根路徑）
    { code: 'en', hreflang: 'en' }, // 英文
    { code: 'jp', hreflang: 'ja' }, // 日文
  ];

  // 定義所有需要包含在sitemap中的基礎路由及其配置
  const ROUTES: RouteConfig[] = [
    { 
      path: '/', 
      name: '首頁',
      priority: 1.0,
      changeFrequency: 'weekly',
      supportedLanguages: ['zh', 'en', 'ja'] // 支持所有語言
    },
    { 
      path: '/image-search', 
      name: '圖片搜尋',
      priority: 0.9,
      changeFrequency: 'weekly',
      supportedLanguages: ['zh', 'en', 'ja']
    },
    { 
      path: '/date', 
      name: '日期計算器',
      priority: 0.8,
      changeFrequency: 'weekly',
      supportedLanguages: ['zh', 'en', 'ja']
    },
    { 
      path: '/due-date-calculator', 
      name: '預產期計算器',
      priority: 0.8,
      changeFrequency: 'weekly',
      supportedLanguages: ['zh', 'en', 'ja']
    },
    { 
      path: '/gift-exchange', 
      name: '禮物交換',
      priority: 0.7,
      changeFrequency: 'weekly', 
      supportedLanguages: ['zh', 'en', 'ja']
    },
    { 
      path: '/contact', 
      name: '聯繫我們',
      priority: 0.5,
      changeFrequency: 'monthly',
      supportedLanguages: ['zh', 'en', 'ja']
    },
    { 
      path: '/privacy-policy', 
      name: '隱私政策',
      priority: 0.3,
      changeFrequency: 'monthly',
      supportedLanguages: ['zh', 'en', 'ja']
    },
    { 
      path: '/terms', 
      name: '服務條款',
      priority: 0.3,
      changeFrequency: 'monthly',
      supportedLanguages: ['zh', 'en', 'ja']
    },
  ];

  /**
   * 生成sitemap項目 - 每個基本路由只有一個URL項目
   * 
   * 對於每個頁面，我們添加:
   * 1. 主URL (例如 /)
   * 2. 語言替代URL (zh, en, ja)
   * 3. 優先級和更新頻率
   */
  const sitemapItems: MetadataRoute.Sitemap = [];
  
  /**
   * 檢查路由在特定語言中是否可用
   * @param route 路由配置
   * @param langHreflang 語言代碼
   * @returns 是否支持該語言
   */
  const isRouteAvailableInLanguage = (route: RouteConfig, langHreflang: string): boolean => {
    return route.supportedLanguages.includes(langHreflang);
  };

  // 為每個路由處理所有語言版本
  for (const route of ROUTES) {
    const baseRoute = route.path;
    
    // 先獲取根路徑的日期，所有語言版本都使用相同的日期
    const rootRoute = baseRoute === '/' ? '' : baseRoute;
    const { modified } = getRouteDate(rootRoute, LANGUAGES);
    const parsedDate = parseGitDate(modified);
    
    // 處理每種語言版本
    for (const lang of LANGUAGES) {
      // 檢查該路由是否支持此語言
      if (isRouteAvailableInLanguage(route, lang.hreflang)) {
        // 生成該語言下的URL
        const langPrefix = lang.code ? `/${lang.code}` : '';
        const fullRoute = `${langPrefix}${baseRoute === '/' ? '' : baseRoute}`;
        const url = getFullUrl(fullRoute);
        
        // 所有語言版本使用相同的日期
        sitemapItems.push({
          url,
          lastModified: parsedDate,
          changeFrequency: route.changeFrequency,
          priority: route.priority
        });
      }
    }
  }
  
  // 只在開發環境中輸出調試信息
  if (process.env.NODE_ENV === 'development') {
    console.log('\n======= Sitemap 生成信息 =======');
    console.log(`生成的 sitemap 包含 ${sitemapItems.length} 個 URL 項目`);
    
    // 按路由類型統計
    const routeTypeCount = {
      mainPages: ROUTES.filter((r: RouteConfig) => r.priority >= 0.9).length,
      toolPages: ROUTES.filter((r: RouteConfig) => r.priority >= 0.7 && r.priority < 0.9).length,
      infoPages: ROUTES.filter((r: RouteConfig) => r.priority < 0.7).length
    };
    console.log(`路由類型統計: 主要頁面: ${routeTypeCount.mainPages}, 工具頁面: ${routeTypeCount.toolPages}, 資訊頁面: ${routeTypeCount.infoPages}`);
    
    // 輸出示例 XML 結構以便於了解實際生成的內容
    console.log('\n實際生成的 XML 結構示例（第一個 URL）:');
    if (sitemapItems.length > 0) {
      const firstItem = sitemapItems[0];
      console.log(`<url>
  <loc>${firstItem.url}</loc>
  <lastmod>${firstItem.lastModified instanceof Date ? 
    firstItem.lastModified.toISOString() : 
    firstItem.lastModified}</lastmod>
  <changefreq>${firstItem.changeFrequency}</changefreq>
  <priority>${firstItem.priority}</priority>
</url>`);
    }
    console.log('\n===================================\n');
  }

  // 返回處理好的 sitemap 項目，Next.js 將自動轉換為 XML 格式
  return sitemapItems;
}