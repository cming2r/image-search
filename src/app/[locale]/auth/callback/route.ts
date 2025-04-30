import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // 獲取 URL 參數
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    console.log(`Auth Callback: 處理 Supabase 回調...`);
    
    // 如果有錯誤參數，重定向到錯誤頁面
    if (error) {
      console.error(`Auth Callback: 收到 OAuth 錯誤: ${error}, ${errorDescription}`);
      return NextResponse.redirect(`${req.nextUrl.origin}/admin/login?error=${error}`);
    }
    
    // 如果沒有 code 參數，也視為錯誤
    if (!code) {
      console.error('Auth Callback: 缺少授權碼');
      return NextResponse.redirect(`${req.nextUrl.origin}/admin/login?error=missing_code`);
    }
    
    // 創建 Supabase 客戶端
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => {
            return cookieStore.get(name)?.value;
          },
          set: (name, value, options) => {
            cookieStore.set({ name, value, ...options });
          },
          remove: (name, options) => {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    
    // 使用授權碼交換會話
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      console.error('授權碼交換失敗:', exchangeError);
      return NextResponse.redirect(`${req.nextUrl.origin}/admin/login?error=auth_error`);
    }
    
    console.log('授權碼交換成功');
    
    if (data.session) {
      console.log(`用戶 ${data.session.user.email} 登入成功`);
    }
    
    // 重定向到管理頁面
    return NextResponse.redirect(`${req.nextUrl.origin}/admin`);
  } catch (err) {
    console.error('Auth Callback: 回調處理錯誤:', err);
    return NextResponse.redirect(`${new URL(req.url).origin}/admin/login?error=callback_error`);
  }
}