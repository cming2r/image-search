import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 檢查頁面路徑
  const requestUrl = new URL(request.url);
  const pathname = requestUrl.pathname;
  
  // 如果路徑是管理頁面但不是登入頁面，則檢查是否已登入
  if (pathname.startsWith('/admin') && 
      !pathname.startsWith('/admin/login') && 
      !pathname.includes('.') && // 排除靜態資源
      !pathname.includes('api/')) { // 排除 API 路由
    
    // 檢查所有 cookie，查找 Supabase 會話 cookie
    const allCookies = request.cookies.getAll();
    const supabaseCookies = allCookies.filter(cookie => 
      cookie.name.startsWith('sb-') || 
      cookie.name === 'supabase-auth-token'
    );
    
    // 輸出檢測到的 Supabase cookie
    console.log(`Middleware: 檢測到 ${supabaseCookies.length} 個 Supabase 相關 cookie`);
    supabaseCookies.forEach(cookie => {
      console.log(`Cookie: ${cookie.name}, Value Length: ${cookie.value.length}`);
    });
    
    // 創建 Supabase 客戶端
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => {
            return request.cookies.get(name)?.value;
          },
          set: () => {
            // 我們不會在這裡設置 cookie，所以留空
          },
          remove: () => {
            // 我們不會在這裡移除 cookie，所以留空
          },
        },
      }
    );
    
    try {
      // 獲取身份驗證會話
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      
      console.log(`Middleware: 檢查會話狀態，路徑=${pathname}, 是否已登入=${!!session}`);
      
      // 如果未登入，則重定向到登入頁面，並附帶當前路徑作為重定向目標
      if (!session) {
        const loginUrl = new URL('/admin/login', request.url);
        // 添加當前路徑作為登入後重定向目標
        loginUrl.searchParams.append('redirectTo', pathname);
        console.log(`Middleware: 用戶未登入，重定向到 ${loginUrl.toString()}`);
        return NextResponse.redirect(loginUrl);
      }
      
      console.log(`Middleware: 用戶已登入，允許訪問 ${pathname}`);
      
      // 如果已登入，添加標記並返回
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-middleware-auth-status', 'authenticated');
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Middleware: 檢查身份驗證時出錯:", error);
      // 出錯時重定向到登入頁面
      const loginUrl = new URL('/admin/login', request.url);
      // 添加當前路徑作為登入後重定向目標
      loginUrl.searchParams.append('redirectTo', pathname);
      console.log(`Middleware: 身份驗證出錯，重定向到 ${loginUrl.toString()}`);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // 非管理頁面，直接放行
  return NextResponse.next();
}

// 設置 middleware 處理所有 /admin 路徑的請求，除了 .js、.css 等靜態資源
export const config = {
  matcher: ['/admin/:path*'],
};