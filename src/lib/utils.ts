/**
 * 獲取網站基礎 URL
 * 在開發環境和生產環境中保持一致的 URL 格式
 */
export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://fyimg.com";
};

/**
 * 根據相對路徑生成完整 URL
 * @param path 相對路徑，例如 '/about'
 */
export const getFullUrl = (path: string = "/"): string => {
  const baseUrl = getBaseUrl();
  // 確保 path 以 / 開頭，避免路徑拼接錯誤
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};

/**
 * 為URL添加版本參數，幫助社交媒體平台刷新緩存
 * @param url 原始URL
 * @returns 添加版本參數的URL
 */
export const getVersionedImageUrl = (url: string): string => {
  // 使用當前日期作為版本號，每天自動更新
  const version = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${version}`;
};

/**
 * 生成搜尋引擎的圖片搜尋URL
 * @param {string} engine - 搜尋引擎名稱
 * @param {string} imageUrl - 圖片URL
 * @returns {string} - 搜尋URL
 */
export function generateSearchUrl(engine: string, imageUrl: string): string {
  if (!imageUrl) return "";

  const encodedUrl = encodeURIComponent(imageUrl);

  switch (engine.toLowerCase()) {
    case "google":
      return `https://www.google.com/searchbyimage?image_url=${encodedUrl}`;
    case "bing":
      return `https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIHMP&sbisrc=UrlPaste&q=imgurl:${encodedUrl}`;
    case "yandex":
      return `https://ya.ru/images/search?rpt=imageview&url=${encodedUrl}`;
    case "tineye":
      return `https://tineye.com/search?url=${encodedUrl}`;
    default:
      return "";
  }
}

/**
 * 格式化檔案大小
 * @param {number} bytes - 位元組數
 * @returns {string} - 格式化後的檔案大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * 驗證URL是否為有效的圖片URL
 * @param {string} url - 要驗證的URL
 * @returns {boolean} - 是否為有效的圖片URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;

  // 簡單的URL格式驗證
  const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;
  if (!urlPattern.test(url)) return false;

  // 檢查URL是否以常見圖片擴展名結尾 (不是100%準確，但足夠基本驗證)
  const imageExtensions = /\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i;
  return imageExtensions.test(url);
}

// 存儲文件日期信息的類型
export interface GitDates {
  created: string;
  modified: string;
  routePath?: string; // 可選，對應的Next.js路由路徑
}

// 構建時Git日期信息 - 會在構建時被替換
// 格式: { 文件路徑: { created: ISO日期, modified: ISO日期 } }
// 注意：此變數需要在構建過程中填充實際值
export const FILE_DATES: Record<string, GitDates> = {
  "/src/app/page.tsx": {
    created: "2025-03-20 21:37:52 +0800",
    modified: "2025-04-07 21:30:32 +0800",
    routePath: "/",
  },
  "/src/app/image-search/page.tsx": {
    created: "2025-04-07 21:30:32 +0800",
    modified: "2025-04-12 00:21:30 +0800",
    routePath: "/image-search",
  },
  "/src/app/due-date-calculator/page.tsx": {
    created: "2025-04-09 23:50:15 +0800",
    modified: "2025-04-12 00:38:55 +0800",
    routePath: "/due-date-calculator",
  },
  "/src/app/date/page.tsx": {
    created: "2025-03-27 00:21:15 +0800",
    modified: "2025-04-12 00:21:30 +0800",
    routePath: "/date",
  },
  "/src/app/gift-exchange/page.tsx": {
    created: "2025-04-17 01:10:09 +0800",
    modified: "2025-04-18 17:46:20 +0800",
    routePath: "/gift-exchange",
  },
  "/src/app/admin/page.tsx": {
    created: "2025-04-13 00:15:22 +0800",
    modified: "2025-04-13 00:15:22 +0800",
    routePath: "/admin",
  },
  "/src/app/gift-exchange/[id]/page.tsx": {
    created: "2025-04-17 01:10:09 +0800",
    modified: "2025-04-18 11:45:48 +0800",
    routePath: "/gift-exchange/[id]",
  },
  "/src/app/admin/login/page.tsx": {
    created: "2025-04-13 00:15:22 +0800",
    modified: "2025-04-13 00:18:52 +0800",
    routePath: "/admin/login",
  },
  "/src/app/(info)/terms/page.tsx": {
    created: "2025-04-18 11:45:48 +0800",
    modified: "2025-04-18 11:45:48 +0800",
    routePath: "/terms",
  },
  "/src/app/(info)/privacy-policy/page.tsx": {
    created: "2025-04-18 11:45:48 +0800",
    modified: "2025-04-18 11:45:48 +0800",
    routePath: "/privacy-policy",
  },
  "/src/app/(info)/contact/page.tsx": {
    created: "2025-04-18 11:45:48 +0800",
    modified: "2025-04-18 11:45:48 +0800",
    routePath: "/contact",
  },
};

/**
 * 獲取頁面的Git創建和修改日期
 * @param pathOrRoute 可以是文件路徑（相對於項目根目錄）或Next.js路由路徑
 * @param fallbackCreated 如果找不到文件的創建日期，則使用此日期
 * @param fallbackModified 如果找不到文件的修改日期，則使用此日期
 * @returns 包含創建和修改日期的對象
 */
export function getPageDates(
  pathOrRoute: string,
  fallbackCreated: string = "2025-01-01T00:00:00+08:00",
  fallbackModified: string = "2025-01-15T00:00:00+08:00",
): GitDates {
  // 嘗試規範化路徑
  const normalizedPath = pathOrRoute.startsWith("/")
    ? pathOrRoute
    : `/${pathOrRoute}`;

  // 方法1：直接查找精確的文件路徑
  if (FILE_DATES[normalizedPath]) {
    // 提取創建和修改日期，不返回routePath屬性
    const { created, modified } = FILE_DATES[normalizedPath];
    return { created, modified };
  }

  // 方法2：嘗試將路徑作為路由路徑與routePath屬性匹配
  for (const key in FILE_DATES) {
    if (FILE_DATES[key].routePath === normalizedPath) {
      const { created, modified } = FILE_DATES[key];
      return { created, modified };
    }
  }

  // 方法3：嘗試擴展為page.tsx路徑
  if (!normalizedPath.endsWith(".tsx")) {
    // 處理可能的路由路徑，轉換為文件路徑
    const routeAsFilePath =
      normalizedPath === "/"
        ? "/src/app/page.tsx"
        : `/src/app${normalizedPath}/page.tsx`;

    if (FILE_DATES[routeAsFilePath]) {
      const { created, modified } = FILE_DATES[routeAsFilePath];
      return { created, modified };
    }
  }

  // 方法4：如果是文件路徑，嘗試查找同目錄的page.tsx文件
  if (normalizedPath.includes(".") && normalizedPath.includes("/")) {
    const dirPath = normalizedPath.substring(
      0,
      normalizedPath.lastIndexOf("/"),
    );
    const pageFilePath = `${dirPath}/page.tsx`;

    if (FILE_DATES[pageFilePath]) {
      const { created, modified } = FILE_DATES[pageFilePath];
      return { created, modified };
    }
  }

  // 找不到信息時使用後備日期
  console.log(`未找到 "${pathOrRoute}" 的日期信息，使用默認日期。`);
  return {
    created: fallbackCreated,
    modified: fallbackModified,
  };
}
