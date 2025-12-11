import { MetadataRoute } from 'next';
import { getFullUrl } from '@/lib/utils';

/**
 * 網站 robots.txt 生成函數
 * 控制搜索引擎如何爬取網站內容
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // 核心禁止規則，適用於所有語言版本
          '/*/api/*',
          '/*/admin/*',
          '/*/gift-exchange/*',
          // 根路徑版本
          '/api/',
          '/admin/',
          '/gift-exchange/*',
        ],
      },
    ],
    sitemap: getFullUrl('/sitemap.xml'),
  };
}
