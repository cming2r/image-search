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
 * 保存联系表单消息到数据库
 * @param data 表单数据
 * @returns 保存结果
 */
export async function saveContactMessage(data: ContactFormData) {
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
    
    // 存储到 Supabase
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        { 
          name,
          email,
          message,
          created_at: new Date().toISOString()
        }
      ]);
    
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