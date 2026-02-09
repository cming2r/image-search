'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // 處理登出並跳轉 - 必須在使用前定義
  const handleLogoutAndRedirect = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/'; // 重定向到首頁
    } catch {
      // 即使登出失敗，仍然嘗試跳轉到首頁
      window.location.href = '/';
    }
  }, []);

  // 檢查查詢參數中的錯誤和 hash 中的 token
  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (typeof window !== 'undefined') {
        // 檢查 hash 中是否有 access_token（Supabase OAuth 回調）
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          
          try {
            // 手動處理 OAuth 回調
            const { error } = await supabase.auth.getSession();
            
            if (error) {
              console.error('處理 OAuth 回調失敗:', error);
              setLoginError('登入失敗，請稍後再試');
              // 清除 URL 中的 hash
              window.history.replaceState({}, document.title, window.location.pathname);
              return;
            }
            
            // 如果成功獲取 session，讓 checkAuthStatus 處理後續邏輯
            // 清除 URL 中的 hash
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
          } catch (err) {
            console.error('處理 OAuth 回調時發生錯誤:', err);
            setLoginError('登入過程中發生錯誤');
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
          }
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        
        if (error === 'not_admin') {
          setLoginError('您的帳戶沒有管理員權限，將在5秒後自動登出並返回首頁');
          setCountdown(5);
        } else if (error === 'auth_check_failed') {
          setLoginError('身份驗證檢查失敗，請稍後再試');
        } else if (error) {
          setLoginError('登入過程中發生錯誤，請稍後再試');
        }
      }
    };
    
    handleOAuthCallback();
  }, []);

  // 檢查用戶是否已登入且是管理員
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        
        // 如果 URL 中有 hash token，先等待一下讓 Supabase 處理
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          // 給 Supabase 時間處理 hash 中的 token
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // 管理員電子郵件列表
          const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
          
          // 檢查用戶是否為管理員 (檢查電子郵件)
          const userEmail = session.user.email;
          const isAdminUser = userEmail ? adminEmails.includes(userEmail) : false;
          
          
          if (isAdminUser) {
            router.push('/admin');
          } else {
            setLoginError('您的帳戶沒有管理員權限，將在5秒後自動登出並返回首頁');
            setCountdown(5);
          }
        } else {
        }
      } catch {
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuthStatus();
  }, [router]);

  // 處理倒數登出
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown <= 0) {
      // 登出並返回首頁
      handleLogoutAndRedirect();
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
      setLoginError(`您的帳戶沒有管理員權限，將在${countdown - 1}秒後自動登出並返回首頁`);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, handleLogoutAndRedirect]);

  // 處理登入
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setLoginError(null);
      
      // 使用 Supabase 的 Google OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // 改為重定向回登入頁面，讓客戶端處理 token
          redirectTo: `${window.location.origin}/admin/login`,
          // 只要求最小權限，減少警告的嚴重性
          scopes: 'email',
          queryParams: {
            prompt: 'select_account'
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      // 輸出更詳細的錯誤日誌
      console.error('登入失敗:', {
        error,
        redirectUrl: `${window.location.origin}/api/auth/callback`,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
      });
      
      let errorMessage = '登入失敗，請稍後再試';
      
      if (error instanceof Error) {
        errorMessage = `錯誤: ${error.message}`;
        console.error('錯誤詳情:', error.message, error.stack);
      }
      
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  // 處理手動登出
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.reload(); // 重新載入頁面
    } catch {
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">正在檢查身份驗證狀態...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">管理員登入</h2>
        
        {loginError && (
          <div className={`${countdown !== null ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4 mb-6`} role="alert">
            <p>{loginError}</p>
            {countdown === null && loginError.includes('管理員權限') && (
              <button
                onClick={handleLogout}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
              >
                立即登出
              </button>
            )}
            {countdown !== null && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: `${(countdown / 5) * 100}%` }}></div>
                </div>
                <button
                  onClick={handleLogoutAndRedirect}
                  className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-sm hover:bg-yellow-700"
                >
                  立即返回首頁
                </button>
              </div>
            )}
          </div>
        )}
        
        <button
          onClick={handleLogin}
          disabled={isLoading || countdown !== null}
          className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-xs bg-white hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              處理中...
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              使用 Google 登入
            </span>
          )}
        </button>
        
        <div className="mt-4 text-sm text-center space-y-2">
          <p className="text-gray-500">
            只有管理員帳戶可以訪問管理頁面
          </p>
        </div>
      </div>
    </div>
  );
}