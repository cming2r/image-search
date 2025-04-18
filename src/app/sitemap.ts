import { getFullUrl, getPageDates } from '@/lib/utils';
import { MetadataRoute } from 'next';

/**
 * 從Git日期字符串轉換為Date對象
 * @param dateString Git日期字符串，通常是ISO格式
 * @returns Date對象
 */
function parseGitDate(dateString: string): Date {
  // 嘗試解析日期字符串
  try {
    // 兼容不同格式的日期字符串
    return new Date(dateString);
  } catch {
    // 如果日期解析失敗，使用當前日期作為後備
    console.warn(`無法解析日期: ${dateString}，使用當前日期`);
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 定義所有需要包含在sitemap中的路由
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
  const sitemapItems: MetadataRoute.Sitemap = routes.map(route => {
    // 獲取頁面的Git日期
    const { modified } = getPageDates(route);
    
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
      // 資訊頁面，如隱私政策等
      priority = 0.3;
      changeFrequency = 'monthly';
    }
    
    return {
      url: getFullUrl(route),
      lastModified: parseGitDate(modified),
      changeFrequency,
      priority,
    };
  });

  return sitemapItems;
}