import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 定義表單數據的接口
interface ContactFormData {
  name?: string;
  email?: string;
  message?: string;
}

// 自定義驗證函數
function validateContactForm(data: ContactFormData) {
  const errors: Record<string, string> = {};
  
  // 驗證名稱
  if (!data.name || data.name.trim() === '') {
    errors.name = '姓名為必填欄位';
  }
  
  // 驗證電子郵件
  if (!data.email || data.email.trim() === '') {
    errors.email = '電子郵件為必填欄位';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = '請輸入有效的電子郵件地址';
    }
  }
  
  // 驗證訊息
  if (!data.message || data.message.trim() === '') {
    errors.message = '訊息為必填欄位';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export async function POST(req: Request) {
  try {
    // 解析請求體
    const body = await req.json();
    
    // 驗證資料
    const validation = validateContactForm(body);
    if (!validation.valid) {
      return NextResponse.json({ 
        success: false, 
        error: '表單驗證失敗', 
        details: validation.errors 
      }, { status: 400 });
    }
    
    const { name, email, message } = body;
    
    // 儲存到 Supabase
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
      console.error('Supabase 儲存錯誤:', error);
      return NextResponse.json({ 
        success: false, 
        error: '儲存訊息失敗' 
      }, { status: 500 });
    }
    
    // 成功回應
    return NextResponse.json({ 
      success: true, 
      message: '訊息已成功送出，我們會盡快回覆您。' 
    });
    
  } catch (error) {
    console.error('處理聯絡表單錯誤:', error);
    return NextResponse.json({ 
      success: false, 
      error: '處理請求時發生錯誤',
      details: error instanceof Error ? error.message : '未知錯誤'
    }, { status: 500 });
  }
}