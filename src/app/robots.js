import { getFullUrl } from '@/lib/utils';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/', // 允許根路徑和所有未明確禁止的頁面
        disallow: [
          '/api',    // 禁止API根路徑
          '/api/*',  // 禁止所有API端點
          '/admin',   // 禁止根管理頁面
          '/admin/*', // 禁止所有管理子頁面
          '/gift-exchange/*', // 禁止動態子路徑
        ],
      }
    ],
    sitemap: getFullUrl('/sitemap.xml'),
  };
}