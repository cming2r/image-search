import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// 從環境變數獲取Supabase URL和匿名密鑰
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 創建Supabase客戶端實例
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 創建瀏覽器端Supabase客戶端實例 (支援Auth功能)
export function createClientForBrowser() {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  );
}

// 檢查用戶是否為管理員
export async function isAdmin(userId: string | undefined) {
  if (!userId) return false;
  
  // 通過檢查特定的管理員表或標記來確定用戶是否為管理員
  // 這裡我們使用簡單的白名單方式，將來可以改為資料庫查詢
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  
  // 獲取用戶資料
  const { data: userData, error } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId)
    .single();
    
  if (error || !userData) return false;
  
  return adminEmails.includes(userData.email);
}

// 定義搜索記錄接口
export interface SearchRecord {
  image_url: string;
  search_engine: string | string[];  // 現在支持字串或字串數組
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

// 獲取用戶IP和國家代碼
async function fetchIPInfo() {
  try {
    // 使用公共API獲取IP信息
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      throw new Error('無法獲取IP地址');
    }
    const data = await response.json();
    const ip = data.ip;

    // 使用公共API獲取國家代碼
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!geoResponse.ok) {
      return { ip_address: ip, country_code: 'XX' };
    }
    const geoData = await geoResponse.json();
    
    return {
      ip_address: ip,
      country_code: geoData.country_code || 'XX'
    };
  } catch (error) {
    console.error('獲取IP信息失敗:', error);
    return { ip_address: '', country_code: 'XX' };
  }
}

// 簡化版的保存搜尋記錄函數
export async function saveSearchRecord(record: SearchRecord) {
  // 記錄基本信息到控制台
  console.log('正在保存搜尋記錄:', record);
  
  try {
    // 確保 search_engine 是數組
    let searchEngine = record.search_engine;
    if (!Array.isArray(searchEngine)) {
      searchEngine = searchEngine ? [searchEngine] : [];
    }
    
    // 獲取IP地址和國家代碼
    const ipInfo = await fetchIPInfo();
    
    // 簡單插入記錄 - 不再嘗試更新
    const { error } = await supabase
      .from('image_searches')
      .insert([{
        image_url: record.image_url,
        search_engine: searchEngine,
        device_type: record.device_type || getDeviceType(),
        browser: record.browser || getUserAgentInfo().browser,
        os: record.os || getUserAgentInfo().os,
        ip_address: record.ip_address || ipInfo.ip_address,
        country_code: record.country_code || ipInfo.country_code,
        searched_at: new Date().toISOString()
      }]);
      
    if (error) {
      // 忽略主鍵衝突錯誤 (image_url 已存在)，但記錄其他錯誤
      if (error.code !== '23505') {
        console.error('保存記錄失敗:', error);
        return { success: false, error };
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('保存記錄時出現異常:', error);
    return { success: false, error };
  }
}

// 記錄圖片上傳或URL輸入，初始搜索引擎為空數組
export async function saveImageUrl(imageUrl: string) {
  try {
    console.log('保存圖片URL:', imageUrl);
    
    const deviceType = typeof window !== 'undefined' ? getDeviceType() : 'unknown';
    const { browser, os } = getUserAgentInfo();
    
    // 獲取IP地址和國家代碼
    const ipInfo = await fetchIPInfo();
    
    // 簡單插入記錄 - 不再嘗試更新
    const { error } = await supabase
      .from('image_searches')
      .insert([{
        image_url: imageUrl,
        search_engine: [],
        device_type: deviceType,
        browser: browser,
        os: os,
        ip_address: ipInfo.ip_address,
        country_code: ipInfo.country_code,
        searched_at: new Date().toISOString()
      }]);
      
    if (error) {
      // 忽略主鍵衝突錯誤 (image_url 已存在)，但記錄其他錯誤
      if (error.code !== '23505') {
        console.error('保存圖片URL失敗:', error);
        return { success: false, error };
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('保存圖片URL時出現異常:', error);
    return { success: false, error };
  }
}