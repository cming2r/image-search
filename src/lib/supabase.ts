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

// 提取共用的數據準備邏輯
function prepareRecordData(imageUrl: string, searchEngine?: string | string[], userProvidedData?: Partial<SearchRecord>) {
  // 處理搜索引擎數組
  const engines = !searchEngine ? [] : (
    Array.isArray(searchEngine) ? searchEngine : (searchEngine ? [searchEngine] : [])
  );
  
  // 獲取設備信息
  const deviceType = userProvidedData?.device_type || getDeviceType();
  const userAgent = getUserAgentInfo();
  const browser = userProvidedData?.browser || userAgent.browser;
  const os = userProvidedData?.os || userAgent.os;
  
  return {
    imageUrl,
    engines,
    deviceType,
    browser,
    os,
    timestamp: new Date().toISOString()
  };
}

// 定義記錄數據接口
interface RecordData {
  device_type: string;
  browser: string;
  os: string;
  ip_address?: string;
  country_code?: string;
  searched_at: string;
}

// 共用的插入記錄邏輯
async function insertSearchRecord(imageUrl: string, searchEngine: string[], baseData: RecordData) {
  const { error: insertError } = await supabase
    .from('image_searches')
    .insert([{
      image_url: imageUrl,
      search_engine: searchEngine,
      ...baseData
    }]);
    
  if (insertError) {
    // 如果有主鍵衝突，視為成功
    if (insertError.code === '23505') {
      console.log('檢測到鍵衝突，記錄可能已存在');
      return { success: true };
    }
    
    console.error('插入記錄失敗:', insertError);
    return { success: false, error: insertError };
  }
  
  console.log('新記錄創建成功');
  return { success: true };
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
    
    // 嘗試使用RPC函數更新記錄
    const { data: updateResult, error: updateError } = await supabase.rpc(
      'update_search_record',
      {
        p_image_url: imageUrl,
        p_search_engines: engines,
        p_device_type: deviceType,
        p_browser: browser,
        p_os: os,
        p_ip_address: record.ip_address || ipInfo.ip_address,
        p_country_code: record.country_code || ipInfo.country_code,
        p_searched_at: timestamp
      }
    );
    
    if (updateError) {
      console.error('執行RPC更新記錄失敗:', updateError);
      
      // 回退方案: 使用標準API
      // 先嘗試查詢記錄
      const { data: records, error: queryError } = await supabase
        .from('image_searches')
        .select('id, search_engine')
        .eq('image_url', imageUrl);
      
      if (queryError) {
        console.error('查詢記錄失敗:', queryError);
        return { success: false, error: queryError };
      }
      
      if (records && records.length > 0) {
        // 記錄存在，更新
        const existingRecord = records[0];
        let updatedEngines = [...engines];
        
        if (existingRecord.search_engine && Array.isArray(existingRecord.search_engine)) {
          // 合併搜索引擎並去重
          updatedEngines = [...new Set([...existingRecord.search_engine, ...engines])];
        }
        
        // 使用記錄ID更新
        const { error: updateRecordError } = await supabase
          .from('image_searches')
          .update({
            search_engine: updatedEngines,
            device_type: deviceType,
            browser: browser,
            os: os,
            ip_address: record.ip_address || ipInfo.ip_address,
            country_code: record.country_code || ipInfo.country_code,
            searched_at: timestamp
          })
          .eq('id', existingRecord.id);
        
        if (updateRecordError) {
          console.error('更新記錄失敗:', updateRecordError);
          return { success: false, error: updateRecordError };
        }
        
        console.log('記錄已成功更新 (API)');
        return { success: true };
      }
      
      // 記錄不存在，創建新記錄
      return await insertSearchRecord(imageUrl, engines, {
        device_type: deviceType,
        browser: browser,
        os: os,
        ip_address: record.ip_address || ipInfo.ip_address,
        country_code: record.country_code || ipInfo.country_code,
        searched_at: timestamp
      });
    }
    
    console.log('RPC操作成功完成:', updateResult);
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
    
    // 嘗試使用RPC函數創建初始記錄
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      'create_initial_search_record',
      {
        p_image_url: imageUrl,
        p_device_type: deviceType,
        p_browser: browser,
        p_os: os,
        p_ip_address: ipInfo.ip_address,
        p_country_code: ipInfo.country_code,
        p_searched_at: timestamp
      }
    );
    
    if (rpcError) {
      console.error('執行RPC創建初始記錄失敗:', rpcError);
      
      // 回退方案: 使用標準API
      // 檢查記錄是否已存在
      const { data: records, error: queryError } = await supabase
        .from('image_searches')
        .select('id')
        .eq('image_url', imageUrl);
      
      if (queryError) {
        console.error('查詢圖片URL記錄失敗:', queryError);
        return { success: false, error: queryError };
      }
      
      if (records && records.length > 0) {
        // 記錄已存在，不需要操作
        console.log('圖片URL記錄已存在 (API)');
        return { success: true };
      }
      
      // 記錄不存在，創建新記錄
      return await insertSearchRecord(imageUrl, [], {
        device_type: deviceType,
        browser: browser,
        os: os,
        ip_address: ipInfo.ip_address,
        country_code: ipInfo.country_code,
        searched_at: timestamp
      });
    }
    
    console.log('RPC操作成功完成:', rpcResult);
    return { success: true };
  } catch (error) {
    console.error('保存圖片URL時出現異常:', error);
    return { success: false, error };
  }
}