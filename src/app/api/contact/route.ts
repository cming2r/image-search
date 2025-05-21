import { NextResponse } from 'next/server';
import { saveContactMessage, ContactFormData } from '@/lib/supabase/contact';

export async function POST(req: Request) {
  try {
    // 解析请求体
    const body = await req.json();
    
    // 使用模块化函数保存联系表单消息
    const result = await saveContactMessage(body as ContactFormData);
    
    if (!result.success) {
      // 验证失败
      if (result.details && typeof result.details === 'object') {
        return NextResponse.json({ 
          success: false, 
          error: result.error, 
          details: result.details 
        }, { status: 400 });
      }
      
      // 其他错误
      console.error('保存联系表单失败:', result.error);
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 });
    }
    
    // 成功响应
    return NextResponse.json({ 
      success: true, 
      message: result.message 
    });
    
  } catch (error) {
    console.error('处理联系表单错误:', error);
    return NextResponse.json({ 
      success: false, 
      error: '处理请求时发生错误',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}