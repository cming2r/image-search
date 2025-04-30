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
  "/src/app/[locale]/page.tsx": {
    created: "2025-03-20T12:47:14.723Z",
    modified: "2025-04-29T16:29:01.681Z",
    routePath: "/",
  },
  "/src/app/[locale]/image-search/page.tsx": {
    created: "2025-04-07T12:26:51.406Z",
    modified: "2025-04-27T16:20:45.200Z",
    routePath: "/image-search",
  },
  "/src/app/[locale]/gift-exchange/page.tsx": {
    created: "2025-04-14T14:01:41.615Z",
    modified: "2025-04-27T16:32:40.220Z",
    routePath: "/gift-exchange",
  },
  "/src/app/[locale]/due-date-calculator/page.tsx": {
    created: "2025-04-09T14:42:07.891Z",
    modified: "2025-04-27T16:26:04.606Z",
    routePath: "/due-date-calculator",
  },
  "/src/app/[locale]/admin/page.tsx": {
    created: "2025-04-12T07:02:33.163Z",
    modified: "2025-04-12T16:14:55.711Z",
    routePath: "/admin",
  },
  "/src/app/[locale]/date/page.tsx": {
    created: "2025-03-26T15:08:21.170Z",
    modified: "2025-04-27T14:04:02.420Z",
    routePath: "/date",
  },
  "/src/app/[locale]/gift-exchange/[id]/page.tsx": {
    created: "2025-04-16T15:27:12.647Z",
    modified: "2025-04-28T13:55:47.509Z",
    routePath: "/gift-exchange/[id]",
  },
  "/src/app/[locale]/admin/login/page.tsx": {
    created: "2025-04-12T07:44:25.655Z",
    modified: "2025-04-12T16:18:39.205Z",
    routePath: "/admin/login",
  },
  "/src/app/[locale]/(info)/terms/page.tsx": {
    created: "2025-03-23T13:01:27.924Z",
    modified: "2025-04-30T14:55:43.706Z",
    routePath: "/terms",
  },
  "/src/app/[locale]/(info)/privacy-policy/page.tsx": {
    created: "2025-03-23T13:01:26.083Z",
    modified: "2025-04-30T14:51:25.860Z",
    routePath: "/privacy-policy",
  },
  "/src/app/[locale]/(info)/contact/page.tsx": {
    created: "2025-04-08T14:11:35.558Z",
    modified: "2025-04-30T15:02:58.220Z",
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
  fallbackCreated: string = "2025-01-01T00:00:00Z",
  fallbackModified: string = "2025-01-15T00:00:00Z",
): GitDates {
  // 特定頁面的固定創建日期 - 這些不會被構建過程改變
  const fixedCreatedDates: Record<string, string> = {
    // 新目錄結構
    "src/app/[locale]/image-search/page.tsx": "2025-04-07 21:30:32 +0800",
    "src/app/[locale]/page.tsx": "2025-03-20 21:37:52 +0800",
    "src/app/[locale]/due-date-calculator/page.tsx":
      "2025-04-09 23:50:15 +0800",
    "src/app/[locale]/date/page.tsx": "2025-03-27 00:21:15 +0800",
    "src/app/[locale]/gift-exchange/page.tsx": "2025-04-17 01:10:09 +0800",
    "src/app/[locale]/admin/page.tsx": "2025-04-13 00:15:22 +0800",
    "src/app/[locale]/gift-exchange/[id]/page.tsx": "2025-04-17 01:10:09 +0800",
    "src/app/[locale]/admin/login/page.tsx": "2025-04-13 00:15:22 +0800",
    "src/app/[locale]/(info)/terms/page.tsx": "2025-04-18 11:45:48 +0800",
    "src/app/[locale]/(info)/privacy-policy/page.tsx":
      "2025-04-18 11:45:48 +0800",
    "src/app/[locale]/(info)/contact/page.tsx": "2025-04-18 11:45:48 +0800",

    // 舊目錄結構 (保留向後兼容)
    "src/app/image-search/page.tsx": "2025-04-07 21:30:32 +0800",
    "src/app/page.tsx": "2025-03-20 21:37:52 +0800",
    "src/app/due-date-calculator/page.tsx": "2025-04-09 23:50:15 +0800",
    "src/app/date/page.tsx": "2025-03-27 00:21:15 +0800",
    "src/app/gift-exchange/page.tsx": "2025-04-17 01:10:09 +0800",
    "src/app/admin/page.tsx": "2025-04-13 00:15:22 +0800",
    "src/app/gift-exchange/[id]/page.tsx": "2025-04-17 01:10:09 +0800",
    "src/app/admin/login/page.tsx": "2025-04-13 00:15:22 +0800",
    "src/app/(info)/terms/page.tsx": "2025-04-18 11:45:48 +0800",
    "src/app/(info)/privacy-policy/page.tsx": "2025-04-18 11:45:48 +0800",
    "src/app/(info)/contact/page.tsx": "2025-04-18 11:45:48 +0800",
  };

  // 嘗試規範化路徑
  const normalizedPath = pathOrRoute.startsWith("/")
    ? pathOrRoute
    : `/${pathOrRoute}`;

  // 方法1：直接查找精確的文件路徑
  if (FILE_DATES[normalizedPath]) {
    // 提取創建和修改日期，不返回routePath屬性
    const { created, modified } = FILE_DATES[normalizedPath];

    // 如果是固定創建日期的頁面，使用固定的創建日期
    const finalCreated = fixedCreatedDates[pathOrRoute] || created;

    return {
      created: formatDateToISO(finalCreated),
      modified: formatDateToISO(modified),
    };
  }

  // 方法2：嘗試將路徑作為路由路徑與routePath屬性匹配
  for (const key in FILE_DATES) {
    if (FILE_DATES[key].routePath === normalizedPath) {
      const { created, modified } = FILE_DATES[key];

      // 檢查是否有與當前路由對應的文件路徑
      let matchingFilePath = null;
      for (const fixedPath in fixedCreatedDates) {
        if (FILE_DATES[`/${fixedPath}`]?.routePath === normalizedPath) {
          matchingFilePath = fixedPath;
          break;
        }
      }

      // 如果找到匹配的固定日期，使用它
      const finalCreated = matchingFilePath
        ? fixedCreatedDates[matchingFilePath]
        : created;

      return {
        created: formatDateToISO(finalCreated),
        modified: formatDateToISO(modified),
      };
    }
  }

  // 方法3：嘗試擴展為page.tsx路徑 (適應新的目錄結構)
  if (!normalizedPath.endsWith(".tsx")) {
    // 處理可能的路由路徑，嘗試新的目錄結構
    const newRouteAsFilePath =
      normalizedPath === "/"
        ? "/src/app/[locale]/page.tsx"
        : `/src/app/[locale]${normalizedPath}/page.tsx`;

    // 同時也嘗試舊的目錄結構 (向後兼容)
    const oldRouteAsFilePath =
      normalizedPath === "/"
        ? "/src/app/page.tsx"
        : `/src/app${normalizedPath}/page.tsx`;

    // 優先使用新目錄結構
    if (FILE_DATES[newRouteAsFilePath]) {
      const { created, modified } = FILE_DATES[newRouteAsFilePath];

      // 構建對應的非絕對路徑格式，用於檢查固定日期
      const nonAbsolutePath = newRouteAsFilePath.substring(1); // 移除開頭的斜線

      // 檢查是否為固定創建日期的頁面
      const finalCreated = fixedCreatedDates[nonAbsolutePath] || created;

      return {
        created: formatDateToISO(finalCreated),
        modified: formatDateToISO(modified),
      };
    }

    // 如果找不到新路徑，嘗試舊路徑
    if (FILE_DATES[oldRouteAsFilePath]) {
      const { created, modified } = FILE_DATES[oldRouteAsFilePath];

      // 構建對應的非絕對路徑格式，用於檢查固定日期
      const nonAbsolutePath = oldRouteAsFilePath.substring(1); // 移除開頭的斜線

      // 檢查是否為固定創建日期的頁面
      const finalCreated = fixedCreatedDates[nonAbsolutePath] || created;

      return {
        created: formatDateToISO(finalCreated),
        modified: formatDateToISO(modified),
      };
    }
  }

  // 方法4：如果是文件路徑，嘗試查找同目錄的page.tsx文件
  if (normalizedPath.includes(".") && normalizedPath.includes("/")) {
    const dirPath = normalizedPath.substring(
      0,
      normalizedPath.lastIndexOf("/"),
    );
    const pageFilePath = `${dirPath}/page.tsx`;

    // 尝试将路径格式化为新目录结构格式
    // 例如：将 /src/components/Header.tsx 转换为 /src/app/[locale]/../components/Header.tsx
    let localeAdjustedPath = "";
    if (normalizedPath.includes("/src/")) {
      const pathAfterSrc = normalizedPath.split("/src/")[1];
      if (!pathAfterSrc.startsWith("app/[locale]")) {
        localeAdjustedPath = `/src/app/[locale]/../${pathAfterSrc}`;
      }
    }

    // 优先使用现有路径
    if (FILE_DATES[pageFilePath]) {
      const { created, modified } = FILE_DATES[pageFilePath];

      // 構建對應的非絕對路徑格式，用於檢查固定日期
      const nonAbsolutePath = pageFilePath.substring(1); // 移除開頭的斜線

      // 檢查是否為固定創建日期的頁面
      const finalCreated = fixedCreatedDates[nonAbsolutePath] || created;

      return {
        created: formatDateToISO(finalCreated),
        modified: formatDateToISO(modified),
      };
    }

    // 尝试调整后的路径
    if (localeAdjustedPath && FILE_DATES[localeAdjustedPath]) {
      const { created, modified } = FILE_DATES[localeAdjustedPath];
      return {
        created: formatDateToISO(created),
        modified: formatDateToISO(modified),
      };
    }
  }

  // 找不到信息時使用後備日期
  console.log(`未找到 "${pathOrRoute}" 的日期信息，使用默認日期。`);
  return {
    created: fallbackCreated,
    modified: fallbackModified,
  };
}

/**
 * 將日期格式標準化為ISO 8601格式，並轉換為UTC時間
 * @param dateStr 日期字符串，可能是多種格式
 * @returns 標準化的UTC時間ISO字符串
 */
function formatDateToISO(dateStr: string): string {
  try {
    // 處理特殊格式，如 "2025-04-12 00:21:30 +0800"
    if (dateStr.includes(" +")) {
      const date = new Date(dateStr.replace(" +", "+"));
      return date.toISOString(); // 轉換為UTC時間的ISO格式
    }

    // 如果已經是ISO格式（包括時區信息）
    if (
      dateStr.includes("T") &&
      (dateStr.includes("Z") || dateStr.includes("+"))
    ) {
      const date = new Date(dateStr);
      return date.toISOString(); // 轉換為UTC時間的ISO格式
    }

    // 對於其他格式，盡力解析
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date.toISOString();
  } catch (error) {
    console.error(`日期格式轉換錯誤: ${dateStr}`, error);
    // 返回原始字符串，以防解析失敗
    return dateStr;
  }
}
