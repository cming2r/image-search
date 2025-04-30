// next-intl 配置
import { getRequestConfig } from 'next-intl/server';

// 支援的語言列表
export const locales = ['zh', 'en', 'jp'] as const;
export const defaultLocale = 'zh';

export default getRequestConfig(async ({ locale }) => {
  // 確保 locale 是字符串類型，如果是 undefined 則使用默認語言
  const safeLocale = locale || defaultLocale;
  
  return {
    locale: safeLocale, // 使用安全的 locale 值
    messages: {}, // 這裡保留空對象，因為我們使用直接引用 translations.json
    timeZone: 'Asia/Taipei',
    now: new Date(),
  };
});