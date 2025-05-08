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

// IP信息緩存 - 5分鐘內有效
const ipCache = {
  data: null as { ip_address: string; country_code: string } | null,
  timestamp: 0,
  expiryTime: 5 * 60 * 1000 // 5分鐘
};

// IP供應商優先順序 - 可以根據需要調整
const IP_PROVIDERS = [
  { name: 'ipinfo.io', url: 'https://ipinfo.io/json' },
  { name: 'ipify-ipapi', ipUrl: 'https://api.ipify.org?format=json', geoUrl: (ip: string) => `https://ipapi.co/${ip}/json/` },
  { name: 'ipwho.is', ipUrl: 'https://api.ipify.org?format=json', geoUrl: (ip: string) => `https://ipwho.is/${ip}` }
];

// 獲取用戶IP和國家代碼 - 加強版本
async function fetchIPInfo() {
  // 1. 檢查緩存是否有效
  const now = Date.now();
  if (ipCache.data && ipCache.data.ip_address && ipCache.data.country_code !== 'XX' && 
      (now - ipCache.timestamp < ipCache.expiryTime)) {
    console.log('使用緩存的IP信息:', ipCache.data);
    return ipCache.data;
  }
  
  // 初始化一個有效但最低優先順序的結果
  let bestResult = { ip_address: '', country_code: 'XX' };
  let foundComplete = false;
  
  // 2. 嘗試多個數據源獲取IP和地理信息
  for (const provider of IP_PROVIDERS) {
    try {
      console.log(`嘗試使用 ${provider.name} 獲取IP信息`);
      
      if (provider.url) {
        // 單一請求獲取所有信息的提供商 (如 ipinfo.io)
        const response = await fetch(provider.url);
        if (response.ok) {
          const data = await response.json();
          
          // 檢查是否有完整的IP和國家信息
          const ip = data.ip || '';
          const country = data.country || data.country_code || 'XX';
          
          if (ip && country !== 'XX') {
            // 找到完整信息，立即使用
            bestResult = { ip_address: ip, country_code: country };
            foundComplete = true;
            break;
          } else if (ip && !bestResult.ip_address) {
            // 至少有IP信息，作為備用
            bestResult = { ip_address: ip, country_code: country };
          }
        }
      } else if (provider.ipUrl && provider.geoUrl) {
        // 兩步獲取信息的提供商 (如 ipify + ipapi.co)
        const ipResponse = await fetch(provider.ipUrl);
        if (!ipResponse.ok) continue;
        
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        
        if (!ip) continue;
        
        // 已有IP信息，設為備用結果
        if (!bestResult.ip_address) {
          bestResult = { ip_address: ip, country_code: 'XX' };
        }
        
        // 嘗試獲取地理信息
        const geoResponse = await fetch(provider.geoUrl(ip));
        if (!geoResponse.ok) continue;
        
        const geoData = await geoResponse.json();
        const country = geoData.country_code || geoData.country || 'XX';
        
        if (country !== 'XX') {
          // 找到完整信息
          bestResult = { ip_address: ip, country_code: country };
          foundComplete = true;
          break;
        }
      }
    } catch (error) {
      console.error(`使用 ${provider.name} 獲取IP信息失敗:`, error);
      // 繼續嘗試下一個提供商
    }
  }
  
  // 3. 優先使用完整信息，或至少有IP的結果
  if (foundComplete || bestResult.ip_address) {
    // 只有在找到有效結果時才更新緩存
    ipCache.data = bestResult;
    ipCache.timestamp = now;
    console.log('成功獲取IP信息:', bestResult);
    return bestResult;
  }
  
  // 4. 如果所有提供商都失敗，但有舊緩存，使用舊緩存
  if (ipCache.data) {
    console.log('所有提供商失敗，使用過期的緩存IP信息');
    return ipCache.data;
  }
  
  // 5. 最後的後備方案
  console.error('無法獲取任何IP信息');
  return { ip_address: '', country_code: 'XX' };
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