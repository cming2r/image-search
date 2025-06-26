import { getFullUrl, FILE_DATES } from '@/lib/utils';
import * as fs from 'fs';
import * as path from 'path';
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
 * 直接從文件系統取得檔案的最後修改日期
 * @param filePath 檔案路徑，相對於專案根目錄
 * @returns 文件最後修改日期作為 Date 物件
 */
function getFileModifiedDateFromFilesystem(filePath: string): Date {
  try {
    // 確保路徑存在 (如果路徑是相對的，轉換為絕對路徑)
    const projectRoot = process.cwd();
    const fullPath = path.join(projectRoot, filePath);
    
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      console.log(`從文件系統讀取 ${filePath} 的修改日期: ${stats.mtime.toISOString()}`);
      return stats.mtime;
    } else {
      console.warn(`文件不存在: ${fullPath}`);
      return new Date();
    }
  } catch (error) {
    console.error(`獲取文件修改日期錯誤: ${error instanceof Error ? error.message : String(error)}`);
    return new Date();
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
  // 載入時列印 FILE_DATES 物件的大小，用於驗證是否重新載入
  console.log(`\n=========== SITEMAP 開始生成 ===========`);
  console.log(`sitemap.ts 模組載入，FILE_DATES 包含 ${Object.keys(FILE_DATES).length} 個路徑`);
  console.log(`首頁日期: ${FILE_DATES['/src/app/[locale]/page.tsx']?.modified || '未找到'}`);
  console.log(`圖片搜尋日期: ${FILE_DATES['/src/app/[locale]/image-search/page.tsx']?.modified || '未找到'}`);
  console.log(`禮物交換日期: ${FILE_DATES['/src/app/[locale]/gift-exchange/page.tsx']?.modified || '未找到'}`);
  console.log(`========================================\n`);
  // 定義所有語言和對應的 hreflang
  const LANGUAGES: LanguageConfig[] = [
    { code: '', hreflang: 'zh' }, // 中文（根路徑）
    { code: 'en', hreflang: 'en' }, // 英文
    { code: 'es', hreflang: 'es' }, // 西班牙文
    { code: 'jp', hreflang: 'ja' }, // 日文
  ];

  // 定義所有需要包含在sitemap中的基礎路由及其配置
  const ROUTES: RouteConfig[] = [
    { 
      path: '/', 
      name: '首頁',
      priority: 1.0,
      changeFrequency: 'weekly',
      supportedLanguages: ['zh', 'en', 'es', 'ja'] // 支持所有語言
    },
    { 
      path: '/image-search', 
      name: '圖片搜尋',
      priority: 0.9,
      changeFrequency: 'weekly',
      supportedLanguages: ['zh', 'en', 'es', 'ja']
    },
    { 
      path: '/date', 
      name: '日期計算器',
      priority: 0.8,
      changeFrequency: 'weekly',
      supportedLanguages: ['zh', 'en', 'es', 'ja']
    },
    { 
      path: '/due-date-calculator', 
      name: '預產期計算器',
      priority: 0.8,
      changeFrequency: 'weekly',
      supportedLanguages: ['zh', 'en', 'es', 'ja']
    },
    { 
      path: '/gift-exchange', 
      name: '禮物交換',
      priority: 0.7,
      changeFrequency: 'weekly', 
      supportedLanguages: ['zh', 'en', 'es', 'ja']
    },
    { 
      path: '/shorturl', 
      name: '短網址',
      priority: 0.7,
      changeFrequency: 'weekly', 
      supportedLanguages: ['zh', 'en', 'es', 'ja']
    },
    { 
      path: '/contact', 
      name: '聯繫我們',
      priority: 0.5,
      changeFrequency: 'monthly',
      supportedLanguages: ['zh', 'en', 'es', 'ja']
    },
    { 
      path: '/privacy-policy', 
      name: '隱私政策',
      priority: 0.3,
      changeFrequency: 'monthly',
      supportedLanguages: ['zh', 'en', 'es', 'ja']
    },
    { 
      path: '/terms', 
      name: '服務條款',
      priority: 0.3,
      changeFrequency: 'monthly',
      supportedLanguages: ['zh', 'en', 'es', 'ja']
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
    
    // 直接構建可能的文件路徑，避免路由轉換的複雜性
    let pageFilePath = '';
    if (rootRoute === '/') {
      pageFilePath = 'src/app/[locale]/page.tsx';
    } else {
      pageFilePath = `src/app/[locale]${rootRoute}/page.tsx`;
    }
    
    // 雙重檢查 - 檢查 FILE_DATES 中的日期
    const normalizedPath = `/${pageFilePath}`;
    console.log(`檢查 FILE_DATES 是否包含路徑: ${normalizedPath}`);
    
    // 從 FILE_DATES 獲取日期
    if (normalizedPath in FILE_DATES) {
      console.log(`FILE_DATES 中的日期: ${JSON.stringify(FILE_DATES[normalizedPath])}`);
    }
    
    // 直接從文件系統獲取日期 (這是最可靠的方法)
    const fileSystemDate = getFileModifiedDateFromFilesystem(pageFilePath);
    
    // 輸出對比信息
    console.log(`路由 ${rootRoute} (文件: ${pageFilePath})`);
    
    // 使用文件系統獲取的日期作為最終日期
    const parsedDate = fileSystemDate;
    
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