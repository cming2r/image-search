import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// 从环境变量获取Supabase URL和匿名密钥
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 创建Supabase客户端实例
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 创建浏览器端Supabase客户端实例 (支持Auth功能)
export function createClientForBrowser() {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  );
}

// 從其他文件導入所有 Supabase 功能
import { saveImageUrl, saveSearchRecord } from './imageSearch';
import { createGiftExchange, updateGiftExchangeResult, getGiftExchange } from './giftExchange';
import { saveContactMessage, validateContactForm } from './contact';
import { 
  isAdmin, 
  checkAdminPermission
} from './auth';
import { 
  createShortUrl, 
  getShortUrl, 
  updateClickCount
} from './shorturl';

// 重新导出所有函数
export {
  // 图像搜索功能
  saveImageUrl,
  saveSearchRecord,
  
  // 礼物交换功能
  createGiftExchange,
  updateGiftExchangeResult,
  getGiftExchange,
  
  // 联系表单功能
  saveContactMessage,
  validateContactForm,
  
  // 身份验证和管理员功能
  isAdmin,
  checkAdminPermission,
  
  // 短網址功能
  createShortUrl,
  getShortUrl,
  updateClickCount
};

// 导出所有类型
export type { SearchRecord } from './imageSearch';
export type { ContactFormData } from './contact';
export type { GiftExchangeData } from './giftExchange';
export type { ShortUrlData, CreateShortUrlParams } from './shorturl';