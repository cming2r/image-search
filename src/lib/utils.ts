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
      return `https://yandex.com/images/search?rpt=imageview&url=${encodedUrl}`;
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
