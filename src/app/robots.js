import { getFullUrl } from '@/lib/utils';

/**
 * 網站 robots.txt 生成函數
 * 控制搜索引擎如何爬取網站內容
 * 應放置在 src/app 目錄下，而非 [locale] 內
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/', // 允許根路徑和所有未明確禁止的頁面
        disallow: [
          // 核心禁止規則，適用於所有語言版本（包含根路徑和語言前綴版本）
          '/*/api/*',            // 禁止所有API路徑（不論語言前綴）
          '/*/admin/*',          // 禁止所有管理頁面（不論語言前綴）
          '/*/gift-exchange/*',  // 禁止所有動態禮物交換頁面（不論語言前綴）
          
          // 為了向後兼容和確保舊版爬蟲正確解析，明確列出根路徑版本
          '/api/',
          '/admin/',
          '/gift-exchange/*',
        ],
      }
    ],
    sitemap: getFullUrl('/sitemap.xml'),
  };
}