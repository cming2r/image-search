import { createClient } from '@supabase/supabase-js';

// 從環境變數獲取Supabase URL和匿名密鑰
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 創建Supabase客戶端實例
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 定義搜索記錄接口
export interface SearchRecord {
  image_url: string;
  search_engine: string;
  device_type: string;
  country_code?: string;  // ISO 3166-1 Alpha-2 國家代碼
  browser?: string;
  os?: string;
  ip_address?: string;  // 用戶IP地址
}

// 獲取用戶設備類型
export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

// 獲取瀏覽器和操作系統信息
export function getUserAgentInfo() {
  if (typeof window === 'undefined') {
    return { 
      browser: 'unknown',
      os: 'unknown'
    };
  }

  const ua = navigator.userAgent;
  
  // 檢測瀏覽器
  let browser = 'unknown';
  if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (ua.indexOf('Safari') > -1) browser = 'Safari';
  else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) browser = 'IE';
  else if (ua.indexOf('Edge') > -1) browser = 'Edge';
  
  // 檢測操作系統
  let os = 'unknown';
  if (ua.indexOf('Windows') > -1) os = 'Windows';
  else if (ua.indexOf('Mac') > -1) os = 'MacOS';
  else if (ua.indexOf('X11') > -1) os = 'UNIX';
  else if (ua.indexOf('Linux') > -1) os = 'Linux';
  else if (ua.indexOf('Android') > -1) os = 'Android';
  else if (ua.indexOf('iOS') > -1) os = 'iOS';

  return { browser, os };
}

// 創建保存搜尋記錄的函數
export async function saveSearchRecord(record: SearchRecord) {
  try {
    // 嘗試獲取IP信息和國家代碼 (ISO 3166-1 Alpha-2)
    let countryCode = 'XX'; // 未知國家的備用代碼
    let ipAddress = '0.0.0.0'; // 未知IP的備用值
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        // 使用ISO 3166-1 Alpha-2國家代碼
        countryCode = data.country || 'XX';
        // 獲取IP地址
        ipAddress = data.ip || '0.0.0.0';
      }
    } catch (error) {
      console.error('獲取IP和國家信息失敗:', error);
    }

    // 獲取用戶代理信息（只取瀏覽器和操作系統，不儲存完整user_agent）
    const { browser, os } = getUserAgentInfo();

    const { data, error } = await supabase
      .from('image_searches')
      .insert([
        { 
          image_url: record.image_url,
          search_engine: record.search_engine,
          device_type: record.device_type,
          country_code: countryCode,
          browser: browser,
          os: os,
          ip_address: ipAddress,
          searched_at: new Date().toISOString()
        }
      ]);
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('保存搜尋記錄失敗:', error);
    return { success: false, error };
  }
}

// 保留向後兼容的函數
export async function saveImageUrl(imageUrl: string) {
  try {
    const deviceType = typeof window !== 'undefined' ? getDeviceType() : 'unknown';
    
    return await saveSearchRecord({
      image_url: imageUrl,
      search_engine: 'unknown',
      device_type: deviceType
    });
  } catch (error) {
    console.error('保存圖片URL失敗:', error);
    return { success: false, error };
  }
}