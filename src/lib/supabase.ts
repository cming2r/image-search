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

// 獲取瀏覽器和操作系統信息 - 簡化版以減少包大小
export function getUserAgentInfo() {
  // 返回一個簡單的結果，不做複雜檢測
  return { 
    browser: 'unknown',
    os: 'unknown'
  };
}

// 簡化版的IP獲取函數 - 由服務器處理大部分邏輯
async function fetchIPInfo() {
  // 簡單返回空值，真正的IP檢測將在服務器端處理
  return { ip_address: '', country_code: 'XX' };
}

// 提取共用的數據準備邏輯 - 簡化版
function prepareRecordData(imageUrl: string, searchEngine?: string | string[], userProvidedData?: Partial<SearchRecord>) {
  // 處理搜索引擎數組
  const engines = !searchEngine ? [] : (
    Array.isArray(searchEngine) ? searchEngine : (searchEngine ? [searchEngine] : [])
  );
  
  // 獲取設備信息 - 僅基本信息
  const deviceType = userProvidedData?.device_type || getDeviceType();
  
  return {
    imageUrl,
    engines,
    deviceType,
    browser: 'browser',
    os: 'os',
    timestamp: new Date().toISOString()
  };
}

// 保存或更新搜尋記錄函數 - 使用原子更新操作
export async function saveSearchRecord(record: SearchRecord) {
  console.log('正在保存搜尋記錄:', record);
  
  try {
    // 獲取IP地址和國家代碼
    const ipInfo = await fetchIPInfo();
    
    // 準備共用數據
    const { imageUrl, engines, deviceType, browser, os, timestamp } = 
      prepareRecordData(record.image_url, record.search_engine, record);
    
    // 優先使用有效的IP信息
    const ip_address = record.ip_address && record.ip_address !== '' ? 
      record.ip_address : (ipInfo.ip_address || '');
    
    const country_code = record.country_code && record.country_code !== 'XX' ? 
      record.country_code : (ipInfo.country_code !== 'XX' ? ipInfo.country_code : '');
    
    // 使用RPC函數更新記錄
    const { error: updateError } = await supabase.rpc(
      'update_search_record',
      {
        p_image_url: imageUrl,
        p_search_engines: engines,
        p_device_type: deviceType,
        p_browser: browser,
        p_os: os,
        p_ip_address: ip_address,
        p_country_code: country_code,
        p_searched_at: timestamp
      }
    );
    
    if (updateError) {
      console.error('執行RPC更新記錄失敗:', updateError);
      return { success: false, error: updateError };
    }
    
    console.log('搜索引擎記錄更新成功', {
      ip_address: ip_address || '(無)',
      country_code: country_code || '(無)'
    });
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
    
    // 獲取IP地址和國家代碼
    const ipInfo = await fetchIPInfo();
    
    // 準備共用數據
    const { deviceType, browser, os, timestamp } = prepareRecordData(imageUrl);
    
    // 確保我們只使用有效的IP和國家代碼
    const ip_address = ipInfo.ip_address || '';
    const country_code = ipInfo.country_code !== 'XX' ? ipInfo.country_code : '';
    
    // 使用RPC函數創建初始記錄
    const { error: rpcError } = await supabase.rpc(
      'create_initial_search_record',
      {
        p_image_url: imageUrl,
        p_device_type: deviceType,
        p_browser: browser,
        p_os: os,
        p_ip_address: ip_address,
        p_country_code: country_code,
        p_searched_at: timestamp
      }
    );
    
    if (rpcError) {
      console.error('執行RPC創建初始記錄失敗:', rpcError);
      return { success: false, error: rpcError };
    }
    
    console.log('初始圖片記錄創建成功', {
      ip_address: ip_address || '(無)',
      country_code: country_code || '(無)'
    });
    return { success: true };
  } catch (error) {
    console.error('保存圖片URL時出現異常:', error);
    return { success: false, error };
  }
}