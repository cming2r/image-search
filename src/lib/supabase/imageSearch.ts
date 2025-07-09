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

// 保存或更新搜索记录函数 - 使用原子更新操作
export async function saveSearchRecord(record: SearchRecord) {
  console.log('正在保存搜索记录:', record);
  
  try {
    // 获取完整的設備資訊（包括 IP、地理位置等）
    const deviceInfo = await fetchDeviceInfo();
    
    // 准备共用数据
    const { imageUrl, engines, timestamp } = 
      prepareRecordData(record.image_url, record.search_engine);
    
    // 优先使用记录中提供的信息，否则使用 API 检测的信息
    const ip_address = record.ip_address && record.ip_address !== '' ? 
      record.ip_address : deviceInfo.ip_address;
    
    const country_code = record.country_code && record.country_code !== '' && record.country_code !== 'XX' ? 
      record.country_code : (deviceInfo.country_code !== 'XX' ? deviceInfo.country_code : '');
    
    const device_type = record.device_type || deviceInfo.device_type;
    const browser = record.browser || deviceInfo.browser;
    const os = record.os || deviceInfo.os;
    
    // 使用RPC函数更新记录
    const { error: updateError } = await supabase.rpc(
      'update_search_record',
      {
        p_image_url: imageUrl,
        p_search_engines: engines,
        p_device_type: device_type,
        p_browser: browser,
        p_os: os,
        p_ip_address: ip_address,
        p_country_code: country_code,
        p_searched_at: timestamp
      }
    );
    
    if (updateError) {
      console.error('执行RPC更新记录失败:', updateError);
      return { success: false, error: updateError };
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
    console.log('保存图片URL:', imageUrl);
    
    // 获取完整的設備資訊（包括 IP、地理位置等）
    const deviceInfo = await fetchDeviceInfo();
    
    // 准备共用数据
    const { timestamp } = prepareRecordData(imageUrl);
    
    // 确保我们只使用有效的IP和国家代码
    const ip_address = deviceInfo.ip_address || '';
    const country_code = deviceInfo.country_code && deviceInfo.country_code !== 'XX' ? deviceInfo.country_code : '';
    
    // 使用RPC函数创建初始记录
    const { error: rpcError } = await supabase.rpc(
      'create_initial_search_record',
      {
        p_image_url: imageUrl,
        p_device_type: deviceInfo.device_type,
        p_browser: deviceInfo.browser,
        p_os: deviceInfo.os,
        p_ip_address: ip_address,
        p_country_code: country_code,
        p_searched_at: timestamp
      }
    );
    
    if (rpcError) {
      console.error('执行RPC创建初始记录失败:', rpcError);
      return { success: false, error: rpcError };
    }
    
    console.log('初始图片记录创建成功', {
      ip_address: ip_address || '(无)',
      country_code: country_code || '(无)'
    });
    return { success: true };
  } catch (error) {
    console.error('保存图片URL时出现异常:', error);
    return { success: false, error };
  }
}