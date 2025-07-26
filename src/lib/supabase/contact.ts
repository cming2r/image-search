import { supabase } from '.';

/**
 * 联系表单数据接口
 */
export interface ContactFormData {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * 验证联系表单数据
 * @param data 表单数据
 * @returns 验证结果
 */
export function validateContactForm(data: ContactFormData) {
  const errors: Record<string, string> = {};
  
  // 验证名称
  if (!data.name || data.name.trim() === '') {
    errors.name = '姓名为必填字段';
  }
  
  // 验证电子邮件（选填）
  if (data.email && data.email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = '请输入有效的电子邮件地址';
    }
  }
  
  // 验证消息
  if (!data.message || data.message.trim() === '') {
    errors.message = '消息为必填字段';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * 設備資訊介面
 */
export interface DeviceInfo {
  device_type?: string;
  browser?: string;
  os?: string;
  country_code?: string;
  ip_address?: string;
}

/**
 * 資料庫插入資料介面
 */
interface ContactMessageInsert {
  name: string;
  email: string;
  message: string;
  created_at: string;
  device_type?: string;
  browser?: string;
  os?: string;
  country_code?: string;
  ip_address?: string;
}

/**
 * 保存联系表单消息到数据库
 * @param data 表单数据
 * @param deviceInfo 設備資訊
 * @returns 保存结果
 */
export async function saveContactMessage(data: ContactFormData, deviceInfo?: DeviceInfo) {
  try {
    // 验证数据
    const validation = validateContactForm(data);
    if (!validation.valid) {
      return { 
        success: false, 
        error: '表单验证失败', 
        details: validation.errors 
      };
    }
    
    const { name, email, message } = data;
    
    // 準備插入資料
    const insertData: ContactMessageInsert = {
      name: name!, // 通過驗證後確保存在
      email: email || '', // email 可以為空字符串
      message: message!, // 通過驗證後確保存在
      created_at: new Date().toISOString(),
      // 如果有設備資訊，則添加到插入資料中
      device_type: deviceInfo?.device_type,
      browser: deviceInfo?.browser,
      os: deviceInfo?.os,
      country_code: deviceInfo?.country_code,
      ip_address: deviceInfo?.ip_address
    };

    // 存储到 Supabase
    const { error } = await supabase
      .from('contact_messages')
      .insert([insertData]);
    
    if (error) {
      console.error('Supabase 存储错误:', error);
      return { 
        success: false, 
        error: '存储消息失败',
        details: error
      };
    }
    
    // 成功响应
    return { 
      success: true, 
      message: '消息已成功送出，我们会尽快回复您。' 
    };
  } catch (error) {
    console.error('处理联系表单错误:', error);
    return { 
      success: false, 
      error: '处理请求时发生错误',
      details: error instanceof Error ? error.message : '未知错误'
    };
  }
}