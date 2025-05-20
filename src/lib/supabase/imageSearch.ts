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

// 获取用户设备类型
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

// 获取浏览器和操作系统信息 - 简化版以减少包大小
export function getUserAgentInfo() {
  // 返回一个简单的结果，不做复杂检测
  return { 
    browser: 'unknown',
    os: 'unknown'
  };
}

// 从外部服务获取IP和国家代码信息
async function fetchIPInfo() {
  try {
    // 确认是否在客户端环境
    if (typeof window === 'undefined') {
      // 服务器端不进行IP检测，仅记录日志
      console.log('服务器端不进行IP检测');
      return { ip_address: '', country_code: 'XX' };
    }
    
    // 客户端环境下获取IP信息
    console.log('正在获取IP信息...');
    
    // 使用两个备选API以提高成功率
    // 先尝试 ipapi.co
    try {
      const response = await fetch('https://ipapi.co/json/');
      
      if (response.ok) {
        const data = await response.json();
        console.log('成功从ipapi.co获取IP信息');
        
        return { 
          ip_address: data.ip || '', 
          country_code: data.country_code || '' 
        };
      }
    } catch (apiError) {
      console.error('ipapi.co获取失败，尝试备选API', apiError);
    }
    
    // 如果第一个API失败，尝试另一个API
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      
      if (response.ok) {
        const ipData = await response.json();
        const ip = ipData.ip;
        
        // 得到IP后，尝试获取地理位置信息
        if (ip) {
          const geoResponse = await fetch(`https://ipwho.is/${ip}`);
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            console.log('成功从备选API获取IP信息');
            
            return {
              ip_address: ip,
              country_code: geoData.country_code || ''
            };
          }
        }
        
        // 如果只能获取IP但没有地理位置
        return {
          ip_address: ip || '',
          country_code: ''
        };
      }
    } catch (backupError) {
      console.error('备选API也获取失败', backupError);
    }
    
    // 所有尝试都失败
    console.warn('所有IP获取尝试均失败');
    return { ip_address: '', country_code: 'XX' };
  } catch (error) {
    console.error('IP信息获取过程中发生异常:', error);
    // 发生错误时返回空值，以便应用程序仍然可以运行
    return { ip_address: '', country_code: 'XX' };
  }
}

// 提取共用的数据准备逻辑 - 简化版
function prepareRecordData(imageUrl: string, searchEngine?: string | string[], userProvidedData?: Partial<SearchRecord>) {
  // 处理搜索引擎数组
  const engines = !searchEngine ? [] : (
    Array.isArray(searchEngine) ? searchEngine : (searchEngine ? [searchEngine] : [])
  );
  
  // 获取设备信息 - 仅基本信息
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

// 保存或更新搜索记录函数 - 使用原子更新操作
export async function saveSearchRecord(record: SearchRecord) {
  console.log('正在保存搜索记录:', record);
  
  try {
    // 获取IP地址和国家代码
    const ipInfo = await fetchIPInfo();
    
    // 准备共用数据
    const { imageUrl, engines, deviceType, browser, os, timestamp } = 
      prepareRecordData(record.image_url, record.search_engine, record);
    
    // 优先使用有效的IP信息
    // 先检查记录中提供的IP，若无效则使用fetchIPInfo获取的IP
    const ip_address = record.ip_address && record.ip_address !== '' ? 
      record.ip_address : (ipInfo.ip_address || '');
    
    // 同样地处理国家代码
    const country_code = record.country_code && record.country_code !== '' && record.country_code !== 'XX' ? 
      record.country_code : (ipInfo.country_code && ipInfo.country_code !== 'XX' ? ipInfo.country_code : '');
    
    // 使用RPC函数更新记录
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
      console.error('执行RPC更新记录失败:', updateError);
      return { success: false, error: updateError };
    }
    
    console.log('搜索引擎记录更新成功', {
      ip_address: ip_address || '(无)',
      country_code: country_code || '(无)'
    });
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
    
    // 获取IP地址和国家代码
    const ipInfo = await fetchIPInfo();
    
    // 准备共用数据
    const { deviceType, browser, os, timestamp } = prepareRecordData(imageUrl);
    
    // 确保我们只使用有效的IP和国家代码
    // 检查IP是否有效
    const ip_address = ipInfo.ip_address || '';
    console.log('取得的IP地址:', ip_address);
    
    // 检查国家代码是否有效
    const country_code = ipInfo.country_code && ipInfo.country_code !== 'XX' ? ipInfo.country_code : '';
    console.log('取得的国家代码:', country_code || '(无)');
    
    // 使用RPC函数创建初始记录
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