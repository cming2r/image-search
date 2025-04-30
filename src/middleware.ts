import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 支援的語言列表
const locales = ['zh', 'en', 'jp'];
const defaultLocale = 'zh';

// 檢查路徑是否為靜態資源或特殊路徑
function isStaticOrSpecialPath(pathname: string) {
  return (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/static/') || 
    pathname.includes('.') || // 靜態資源
    pathname === '/favicon.ico'
  );
}

// 檢查是否為 API 路由
function isApiRoute(pathname: string) {
  return pathname.startsWith('/api/');
}

export async function middleware(request: NextRequest) {
  // 檢查頁面路徑
  const requestUrl = new URL(request.url);
  const pathname = requestUrl.pathname;
  
  // 跳過靜態檔案和特殊路徑的處理
  if (isStaticOrSpecialPath(pathname)) {
    return NextResponse.next();
  }
  
  // 特殊處理根路徑
  // 注意：我們不再將根路徑重定向到 /zh/，而是直接使用根路徑作為中文版
  if (pathname === '/') {
    // 將根路徑重寫到默認語言的頁面組件，但保持URL為 /
    const response = NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, request.url));
    return response;
  }
  
  // API 路由特殊處理 - 始終重寫到默認語言的 API 路由
  if (isApiRoute(pathname)) {
    const rewritePath = pathname.replace('/api/', `/${defaultLocale}/api/`);
    const rewriteUrl = new URL(rewritePath, request.url);
    
    // 保留查詢參數
    requestUrl.searchParams.forEach((value, key) => {
      rewriteUrl.searchParams.set(key, value);
    });
    
    console.log(`Middleware: 將 API 請求 ${pathname} 重寫到 ${rewriteUrl.pathname}`);
    return NextResponse.rewrite(rewriteUrl);
  }
  
  // 檢查路徑的第一段是否為有效的語言代碼
  const segments = pathname.split('/');
  const firstSegment = segments.length > 1 ? segments[1] : '';
  
  // 如果路徑不包含有效的語言代碼，則重寫為默認語言內容，但保持URL不變（中文版使用根路徑）
  if (!locales.includes(firstSegment)) {
    // 使用重寫而不是重定向，保持URL不變但使用中文版內容
    const rewriteUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    
    // 保留所有查詢參數
    requestUrl.searchParams.forEach((value, key) => {
      rewriteUrl.searchParams.set(key, value);
    });
    
    console.log(`Middleware:${pathname} use ${rewriteUrl.pathname} `);
    return NextResponse.rewrite(rewriteUrl);
  }
  
  // 處理管理員身份驗證
  if (pathname.startsWith(`/${firstSegment}/admin`) && 
      !pathname.includes('/admin/login')) {
    
    // 檢查所有 cookie，確保 Supabase 會話可用
    // 注意：我們不需要過濾 cookie，因為 Supabase 客戶端會直接使用 request.cookies.get
    
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
      
      // 如果未登入，則重定向到登入頁面，並附帶當前路徑作為重定向目標
      if (!session) {
        const loginUrl = new URL(`/${firstSegment}/admin/login`, request.url);
        // 添加當前路徑作為登入後重定向目標
        loginUrl.searchParams.append('redirectTo', pathname);
        console.log(`Middleware: 用戶未登入，重定向到 ${loginUrl.toString()}`);
        return NextResponse.redirect(loginUrl);
      }
      
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
      const loginUrl = new URL(`/${firstSegment}/admin/login`, request.url);
      // 添加當前路徑作為登入後重定向目標
      loginUrl.searchParams.append('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // 非管理頁面，直接放行
  return NextResponse.next();
}

// 設置 middleware 處理所有路徑的請求，排除靜態資源
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};