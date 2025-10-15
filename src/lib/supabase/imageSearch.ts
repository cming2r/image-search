import { supabase } from '.';

// 定义搜索记录接口
export interface SearchRecord {
  image_url: string;
  search_engine: string | string[];  // 现在支持字符串或字符串数组
  device_type: string;
  country_code?: string;  // ISO 3166-1 Alpha-2 国家代码
  browser?: string;
  os?: string;
  ip_address?: string;  // 用户IP地址
}



// 使用統一的設備檢測 API 獲取所有資訊
async function fetchDeviceInfo() {
  try {
    // 確認是否在客戶端環境
    if (typeof window === 'undefined') {
      // 服務器端返回預設值
      return { 
        ip_address: '', 
        country_code: 'XX',
        device_type: 'unknown',
        browser: 'unknown',
        os: 'unknown'
      };
    }
    
    // 調用統一的設備檢測 API
    const response = await fetch('/api/device-info');
    
    if (response.ok) {
      const data = await response.json();
      return {
        ip_address: data.ip_address || '',
        country_code: data.country_code || 'XX',
        device_type: data.device_type || 'unknown',
        browser: data.browser || 'unknown',
        os: data.os || 'unknown'
      };
    } else {
      console.error('設備檢測 API 調用失敗');
    }
  } catch (error) {
    console.error('設備檢測 API 錯誤:', error);
  }
  
  // 失敗時返回預設值
  return { 
    ip_address: '', 
    country_code: 'XX',
    device_type: 'unknown',
    browser: 'unknown',
    os: 'unknown'
  };
}

// 提取共用的数据准备逻辑 - 简化版（僅處理基本數據）
function prepareRecordData(imageUrl: string, searchEngine?: string | string[]) {
  // 处理搜索引擎数组
  const engines = !searchEngine ? [] : (
    Array.isArray(searchEngine) ? searchEngine : (searchEngine ? [searchEngine] : [])
  );
  
  return {
    imageUrl,
    engines,
    timestamp: new Date().toISOString()
  };
}

// 保存或更新搜索记录函数 - 直接使用 Supabase 查詢（不使用 RPC）
export async function saveSearchRecord(record: SearchRecord) {

  try {
    // 获取完整的設備資訊（包括 IP、地理位置等）
    const deviceInfo = await fetchDeviceInfo();

    // 准备共用数据
    const { imageUrl, engines } =
      prepareRecordData(record.image_url, record.search_engine);

    // 优先使用记录中提供的信息，否则使用 API 检测的信息
    const ip_address = record.ip_address && record.ip_address !== '' ?
      record.ip_address : deviceInfo.ip_address;

    const country_code = record.country_code && record.country_code !== '' && record.country_code !== 'XX' ?
      record.country_code : (deviceInfo.country_code !== 'XX' ? deviceInfo.country_code : null);

    const device_type = record.device_type || deviceInfo.device_type;
    const browser = record.browser || deviceInfo.browser;
    const os = record.os || deviceInfo.os;

    // 檢查是否已存在該圖片URL的記錄（只取第一筆，避免多筆記錄導致查詢失敗）
    const { data: existingRecords, error: selectError } = await supabase
      .from('image_searches')
      .select('id, search_engine')
      .eq('image_url', imageUrl)
      .order('searched_at', { ascending: false })
      .limit(1);

    if (selectError) {
      console.error('查詢現有記錄失敗:', selectError);
      return { success: false, error: selectError };
    }

    const existingRecord = existingRecords && existingRecords.length > 0 ? existingRecords[0] : null;

    if (existingRecord) {
      // 更新現有記錄：合併搜尋引擎列表
      const existingEngines = Array.isArray(existingRecord.search_engine)
        ? existingRecord.search_engine
        : [];
      const mergedEngines = Array.from(new Set([...existingEngines, ...engines]));

      const { error: updateError } = await supabase
        .from('image_searches')
        .update({
          search_engine: mergedEngines,
          device_type,
          browser,
          os,
          ip_address,
          country_code,
          searched_at: new Date().toISOString() // 直接使用當前時間，避免時區問題
        })
        .eq('id', existingRecord.id);

      if (updateError) {
        console.error('更新記錄失敗:', updateError);
        return { success: false, error: updateError };
      }
    } else {
      // 創建新記錄
      const { error: insertError } = await supabase
        .from('image_searches')
        .insert({
          image_url: imageUrl,
          search_engine: engines,
          device_type,
          browser,
          os,
          ip_address,
          country_code,
          searched_at: new Date().toISOString() // 直接使用當前時間，避免時區問題
        });

      if (insertError) {
        console.error('插入記錄失敗:', insertError);
        return { success: false, error: insertError };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('保存记录时出现异常:', error);
    return { success: false, error };
  }
}

// 记录图片上传或URL输入，初始搜索引擎为空数组
export async function saveImageUrl(imageUrl: string) {
  try {

    // 获取完整的設備資訊（包括 IP、地理位置等）
    const deviceInfo = await fetchDeviceInfo();

    // 确保我们只使用有效的IP和国家代码
    const ip_address = deviceInfo.ip_address || '';
    const country_code = deviceInfo.country_code && deviceInfo.country_code !== 'XX' ? deviceInfo.country_code : null;

    // 檢查是否已存在該圖片URL的記錄（只取第一筆，避免多筆記錄導致查詢失敗）
    const { data: existingRecords, error: selectError } = await supabase
      .from('image_searches')
      .select('id')
      .eq('image_url', imageUrl)
      .order('searched_at', { ascending: false })
      .limit(1);

    if (selectError) {
      console.error('查詢現有記錄失敗:', selectError);
      return { success: false, error: selectError };
    }

    const existingRecord = existingRecords && existingRecords.length > 0 ? existingRecords[0] : null;

    // 只有不存在時才創建新記錄
    if (!existingRecord) {
      const { error: insertError } = await supabase
        .from('image_searches')
        .insert({
          image_url: imageUrl,
          search_engine: [], // 空的搜尋引擎陣列
          device_type: deviceInfo.device_type,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          ip_address,
          country_code,
          searched_at: new Date().toISOString() // 直接使用當前時間，避免時區問題
        });

      if (insertError) {
        console.error('插入初始記錄失敗:', insertError);
        return { success: false, error: insertError };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('保存图片URL时出现异常:', error);
    return { success: false, error };
  }
}