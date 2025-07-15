'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

// 圖片搜尋記錄接口
interface ImageSearch {
  id: number;
  image_url: string;
  search_engine: string | string[];
  device_type: string;
  country_code: string;
  browser: string;
  os: string;
  ip_address: string;
  searched_at: string;
  created_at: string;
}

// 定義排序方向類型
type SortDirection = 'asc' | 'desc';

// 定義排序欄位類型
type SortField = 'searched_at' | 'search_engine' | 'country_code' | 'device_type' | 'browser' | 'os' | 'ip_address';

export default function AdminPage() {
  const router = useRouter();
  const [searches, setSearches] = useState<ImageSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('searched_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const recordsPerPage = 50;
  
  // 檢查用戶是否已登入且是管理員
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsCheckingAuth(true);
      try {
        // 獲取當前 session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setIsAuthenticated(true);
          
          // 管理員電子郵件列表
          const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
          
          // 檢查用戶是否為管理員 (檢查電子郵件)
          const userEmail = session.user.email;
          const isAdminUser = userEmail ? adminEmails.includes(userEmail) : false;
          
          
          setIsAdmin(isAdminUser);
          
          // 如果不是管理員，重定向到登入頁面
          if (!isAdminUser) {
              window.location.href = '/admin/login?error=not_admin'; // 使用window.location以確保完整頁面刷新
          }
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
          window.location.href = '/admin/login';
        }
      } catch {
        setIsAuthenticated(false);
        setIsAdmin(false);
        window.location.href = '/admin/login?error=auth_check_failed';
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuthStatus();
    
    // 監聽身份驗證狀態變化
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsAuthenticated(true);
        
        if (session) {
          // 管理員電子郵件列表
          const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
          
          // 檢查用戶是否為管理員 (檢查電子郵件)
          const userEmail = session.user.email;
          const isAdminUser = userEmail ? adminEmails.includes(userEmail) : false;
          
          
          setIsAdmin(isAdminUser);
          
          // 如果不是管理員，重定向到登入頁面
          if (!isAdminUser) {
              window.location.href = '/admin/login?error=not_admin'; // 使用window.location以確保完整頁面刷新
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAdmin(false);
        router.push('/admin/login');
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);
  
  // 處理登出
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push('/admin/login');
  };

  // 加載搜尋記錄
  useEffect(() => {
    // 只有當用戶已認證且是管理員時才加載數據
    if (!isAuthenticated || !isAdmin || isCheckingAuth) {
      return;
    }
    
    const fetchSearches = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        
        // 檢查表是否存在
        const { error: tableError } = await supabase
          .from('image_searches')
          .select('id', { count: 'exact', head: true });
          
        if (tableError) {
          
          // 檢查是否是權限錯誤 (RLS)
          if (tableError.code === 'PGRST301' || 
              tableError.message?.includes('permission denied') || 
              tableError.message?.includes('access denied')) {
            supabase.auth.getUser().then(({ data: { user }}) => {
              setError(`權限錯誤: 你的帳戶 (${user?.email}) 沒有權限訪問數據表。請確保 Supabase 後端已將此帳戶設置為管理員。`);
            });
          } else {
            // 其他錯誤，顯示示例數據
            setSearches([{
              id: 1,
              image_url: 'https://example.com/image.jpg',
              search_engine: '示例 (模擬數據)',
              device_type: '示例',
              country_code: 'XX',
              browser: '示例',
              os: '示例',
              ip_address: '0.0.0.0',
              searched_at: new Date().toISOString(),
              created_at: new Date().toISOString()
            }]);
            setTotalRecords(1);
            setTotalPages(1);
            setError(`數據表錯誤: ${tableError.message}。這可能是因為表不存在或缺少權限。顯示示例數據。`);
          }
          
          setIsLoading(false);
          return;
        }
        
        // 計算分頁偏移量
        const from = (currentPage - 1) * recordsPerPage;
        const to = from + recordsPerPage - 1;
        
        // 獲取記錄總數
        const { count, error: countError } = await supabase
          .from('image_searches')
          .select('*', { count: 'exact', head: true });
        
        if (countError) {
          throw countError;
        }
          
        if (count !== null) {
          setTotalRecords(count);
          setTotalPages(Math.ceil(count / recordsPerPage));
        } else {
        }
        
        // 獲取當前頁的記錄
        const { data, error: dataError } = await supabase
          .from('image_searches')
          .select('*')
          .order(sortField, { ascending: sortDirection === 'asc' })
          .range(from, to);
        
        if (dataError) {
          throw dataError;
        }
        
        setSearches(data || []);
      } catch (err) {
        setError('加載搜尋記錄時發生錯誤: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSearches();
  }, [sortField, sortDirection, currentPage, isAuthenticated, isAdmin, isCheckingAuth]);

  // 處理排序
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // 已經按此欄位排序，切換排序方向
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 更改排序欄位，預設為降序
      setSortField(field);
      setSortDirection('desc');
    }
    
    // 回到第一頁
    setCurrentPage(1);
  };

  // 格式化日期時間
  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss', { locale: zhTW });
    } catch {
      return '無效日期';
    }
  };

  // 構建分頁按鈕
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // 計算顯示的頁碼範圍
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // 調整開始頁碼，確保顯示足夠的頁碼按鈕
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // 添加第一頁按鈕
    if (startPage > 1) {
      pages.push(
        <button
          key="first"
          onClick={() => setCurrentPage(1)}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
        >
          1
        </button>
      );
      
      // 添加省略號
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-1">
            ...
          </span>
        );
      }
    }
    
    // 添加頁碼按鈕
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded border ${
            i === currentPage
            ? 'bg-blue-600 text-white'
            : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // 添加最後一頁按鈕
    if (endPage < totalPages) {
      // 添加省略號
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-1">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key="last"
          onClick={() => setCurrentPage(totalPages)}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
        >
          {totalPages}
        </button>
      );
    }
    
    return (
      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="text-sm text-gray-700">
            顯示第 <span className="font-medium">{(currentPage - 1) * recordsPerPage + 1}</span> 到{' '}
            <span className="font-medium">
              {Math.min(currentPage * recordsPerPage, totalRecords)}
            </span>{' '}
            筆，共 <span className="font-medium">{totalRecords}</span> 筆記錄
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一頁
          </button>
          {pages}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一頁
          </button>
        </div>
      </div>
    );
  };

  // 渲染排序指示器
  const renderSortIndicator = (field: SortField) => {
    if (field !== sortField) return null;
    
    return sortDirection === 'asc' ? (
      <span className="ml-1">↑</span>
    ) : (
      <span className="ml-1">↓</span>
    );
  };

  // 顯示加載狀態
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">正在載入管理員面板...</p>
        </div>
      </div>
    );
  }
  
  // 已登入且是管理員，顯示管理頁面
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            圖片搜尋記錄
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            顯示用戶進行的圖片搜尋記錄
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          登出
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-10">
          <svg className="animate-spin h-10 w-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-500">載入中...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('searched_at')}
                    className="group inline-flex items-center"
                  >
                    搜尋時間
                    {renderSortIndicator('searched_at')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('search_engine')}
                    className="group inline-flex items-center"
                  >
                    搜尋引擎
                    {renderSortIndicator('search_engine')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  圖片網址
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('device_type')}
                    className="group inline-flex items-center"
                  >
                    設備類型
                    {renderSortIndicator('device_type')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('country_code')}
                    className="group inline-flex items-center"
                  >
                    國家
                    {renderSortIndicator('country_code')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('browser')}
                    className="group inline-flex items-center"
                  >
                    瀏覽器
                    {renderSortIndicator('browser')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('os')}
                    className="group inline-flex items-center"
                  >
                    操作系統
                    {renderSortIndicator('os')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '200px', minWidth: '200px', maxWidth: '200px' }}>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSort('ip_address')}
                      className="group inline-flex items-center"
                    >
                      {showImages ? '圖片預覽' : 'IP地址'}
                      {renderSortIndicator('ip_address')}
                    </button>
                    <button
                      onClick={() => setShowImages(!showImages)}
                      className="px-2 py-1 text-xs bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
                      title={showImages ? '顯示IP地址' : '顯示圖片預覽'}
                    >
                      {showImages ? '顯示IP' : '顯示圖片'}
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searches.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    暫無記錄
                  </td>
                </tr>
              ) : (
                searches.map((search) => (
                  <tr key={search.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {formatDateTime(search.searched_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <div className="space-y-1">
                        {(() => {
                          const engines = typeof search.search_engine === 'string' 
                            ? search.search_engine.split(',').map(e => e.trim())
                            : Array.isArray(search.search_engine) 
                            ? search.search_engine
                            : [String(search.search_engine)];
                          
                          return engines.map((engine: string, index: number) => (
                            <div key={index} className="whitespace-nowrap">
                              {engine}
                            </div>
                          ));
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                      <a
                        href={search.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        title={search.image_url}
                      >
                        {search.image_url.substring(0, 30)}...
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {search.device_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {search.country_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {search.browser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {search.os}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ width: '200px', minWidth: '200px', maxWidth: '200px' }}>
                      <div className="w-44 h-32 flex items-center">
                        {showImages ? (
                          <a 
                            href={search.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="查看原圖"
                            className="w-full h-full flex items-center justify-center"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={search.image_url} 
                              alt="搜尋圖片" 
                              className="max-w-full max-h-full object-contain rounded border border-gray-200"
                              onError={(e) => {
                                // 圖片載入失敗時顯示替代文字
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '無法載入圖片';
                                }
                              }}
                            />
                          </a>
                        ) : (
                          <span className="text-gray-800 block w-full truncate" title={search.ip_address || '未記錄'}>{search.ip_address || '未記錄'}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {renderPagination()}
        </div>
      )}
    </div>
  );
}