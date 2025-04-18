import { getFullUrl } from '@/lib/utils';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/', // 允許根路徑和所有未明確禁止的頁面
        disallow: [
          '/api/',    // 禁止API路徑及其所有子路徑
          '/admin/',  // 禁止管理頁面及其所有子路徑
          '/gift-exchange/*', // 禁止動態子路徑
        ],
      }
    ],
    sitemap: getFullUrl('/sitemap.xml'),
  };
}