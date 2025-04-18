'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import WheelCanvas from '../components/WheelCanvas';

interface GiftExchangeData {
  code: string;
  participant_count: number;
  participant_names: string[];
  results?: string[];
  show_results_directly?: boolean;
}

export default function GiftExchangeEvent() {
  const params = useParams();
  const code = params.id as string;
  
  const [eventData, setEventData] = useState<GiftExchangeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [wheelParticipants, setWheelParticipants] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' | 'info' | 'warning' });

  // 讀取活動數據
  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await fetch(`/api/gift-exchange?code=${code}`);
        
        if (!response.ok) {
          throw new Error('無法加載活動數據');
        }
        
        const data = await response.json();
        setEventData(data);
        
        // 從URL查詢參數獲取showResults選項
        const searchParams = new URLSearchParams(window.location.search);
        const showDirectly = searchParams.get('showResults') === '1';
        
        // 計算剩餘參與者的輔助函數
        const getRemaining = (data: GiftExchangeData) => {
          if (data.results && data.results.length > 0) {
            // 過濾掉已選中的參與者
            return data.participant_names.filter(
              (name: string) => !data.results?.includes(name)
            );
          }
          // 如果沒有結果，則所有參與者都可選
          return data.participant_names || [];
        };
        
        // 如果已經設置為直接顯示結果，並且結果為空，
        // 那麼自動生成結果（環形配對）
        if (showDirectly && (!data.results || data.results.length === 0)) {
          // 創建一個從頭到尾的配對（環形）
          const autoResults = [...data.participant_names];
          
          // 發送 PATCH 請求，一次性添加所有結果
          for (const participant of autoResults) {
            await fetch('/api/gift-exchange', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code: code,
                result: participant
              }),
            });
          }
          
          // 重新獲取數據以獲取更新後的結果
          const refreshResponse = await fetch(`/api/gift-exchange?code=${code}`);
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            setEventData(refreshData);
            // 設置空的輪盤參與者（因為所有人都已經配對完成）
            setWheelParticipants([]);
          }
        } else {
          // 否則，正常設置輪盤參與者列表
          setWheelParticipants(getRemaining(data));
        }
      } catch {
        // 記錄獲取活動數據錯誤
        setError('無法加載活動數據，請確認連結是否正確');
      } finally {
        setLoading(false);
      }
    }
    
    if (code) {
      fetchEventData();
      
      // 生成分享連結
      if (typeof window !== 'undefined') {
        setShareLink(window.location.href);
      }
    }
  }, [code]);

  // 複製分享連結
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        // 顯示成功提示，不使用 alert
        setToast({
          visible: true,
          message: '已複製連結',
          type: 'success'
        });
      })
      .catch(() => {
        // 複製連結失敗顯示錯誤提示
        setToast({
          visible: true,
          message: '複製連結失敗',
          type: 'error'
        });
      });
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">正在載入活動資料...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !eventData) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error || '無法加載活動'}</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* 通知提示 */}
      <Toast 
        message={toast.message}
        isVisible={toast.visible}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
        position="top-center"
        duration={2000}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>交換禮物抽籤</h1>
            <div className="flex items-center justify-center mt-3 text-sm">
              <div className="flex items-center">
                <span className="text-gray-500">活動代碼:</span>
                <span className="ml-1 font-medium">{eventData.code}</span>
              </div>
              <span className="mx-3 text-gray-300">|</span>
              <div className="flex items-center">
                <span className="text-gray-500">活動連結:</span>
                <div className="flex ml-1 space-x-1">
                  <button 
                    onClick={copyShareLink}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-1 rounded-full transition-colors duration-200 flex items-center justify-center"
                    title="複製連結"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: '交換禮物抽籤',
                          text: `禮物交換活動 - 代碼: ${eventData.code}`,
                          url: shareLink
                        }).catch(() => {
                          // 分享失敗時嘗試複製
                          copyShareLink();
                          setToast({
                            visible: true,
                            message: '系統分享失敗，已複製連結',
                            type: 'info'
                          });
                        });
                      } else {
                        copyShareLink();
                      }
                    }}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-1 rounded-full transition-colors duration-200 flex items-center justify-center"
                    title="分享連結"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 轉盤區域 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">抽籤轉盤</h2>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500">
                轉盤參與者: {wheelParticipants.length} 人
              </div>
            </div>
            
            {wheelParticipants.length > 0 || (eventData?.results && eventData.results.length === eventData.participant_names.length) ? (
              <>
                {wheelParticipants.length > 0 && (
                <div className="max-w-md mx-auto mb-4">
                  
                  <WheelCanvas 
                    items={wheelParticipants}
                    onSpin={async (selectedItem) => {
                      // 特殊信號表示重置輪盤
                      if (selectedItem === "__UPDATE_WHEEL__") {
                        // 開始更新輪盤
                        
                        try {
                          // 防止重複更新
                          if (isUpdating) {
                            // 跳過重複更新
                            return;
                          }
                          
                          // 設置更新中狀態
                          setIsUpdating(true);
                          
                          // 進行API調用
                          const refreshResponse = await fetch(`/api/gift-exchange?code=${code}`);
                          if (refreshResponse.ok) {
                            const refreshData = await refreshResponse.json();
                            // 成功獲取數據
                            
                            // 先更新整個事件數據
                            setEventData(refreshData);
                            
                            // 計算剩餘參與者的統一函數
                            const getRemaining = (data: GiftExchangeData) => {
                              if (data.results && data.results.length > 0) {
                                return data.participant_names.filter(
                                  (name: string) => !data.results?.includes(name)
                                );
                              }
                              return data.participant_names || [];
                            };
                            
                            // 獲取可用參與者
                            const newRemaining = getRemaining(refreshData);
                            
                            // 更新輪盤參與者列表
                            setWheelParticipants(newRemaining);
                            
                            // 直接清除更新狀態
                            setIsUpdating(false);
                          }
                          
                        } catch {
                          // 發生API錯誤時也要清除更新狀態
                          setIsUpdating(false);
                        }
                        return;
                      }
                      
                      try {
                        // 發送 PATCH 請求，將新結果添加到數據庫
                        const response = await fetch('/api/gift-exchange', {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            code: code,
                            result: selectedItem
                          }),
                        });
                        
                        if (response.ok) {
                          const data = await response.json();
                          // 更新本地數據
                          setEventData(data.data[0]);
                          
                          // 保存結果但不立即更新輪盤參與者列表
                          // 輪盤會維持當前狀態，直到收到 __UPDATE_WHEEL__ 信號才更新
                          
                          // 判斷是否只剩下最後兩個人
                          if (wheelParticipants.length === 2) {
                            // 這是倒數第二個人被抽出，還剩一個人，自動添加最後一個人
                            setTimeout(async () => {
                              // 獲取剩下的最後一個人
                              const lastPerson = wheelParticipants.find(p => p !== selectedItem);
                              if (lastPerson) {
                                // 發送 PATCH 請求，將最後一個人添加到結果中
                                await fetch('/api/gift-exchange', {
                                  method: 'PATCH',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    code: code,
                                    result: lastPerson
                                  }),
                                });
                                
                                // 刷新數據獲取完整結果
                                const finalResponse = await fetch(`/api/gift-exchange?code=${code}`);
                                if (finalResponse.ok) {
                                  const finalData = await finalResponse.json();
                                  setEventData(finalData);
                                  // 清空輪盤參與者，因為已經全部抽完
                                  setWheelParticipants([]);
                                }
                              }
                            }, 3000); // 等待輪盤動畫完成後執行
                          }
                        } else {
                          // 結果更新失敗
                        }
                      } catch {
                        // 保存抽籤結果錯誤
                      }
                    }}
                  />
                </div>
                )}
                
                {/* 最終結果窗格 - 完成所有抽籤時展示 */}
                {eventData?.results && eventData.participant_names.length === eventData.results.length && (
                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-3 text-green-700">抽籤已完成！最終結果</h3>
                    <div className="space-y-3">
                      {eventData.results.map((result, index) => {
                        // 獲取此人要送禮物給誰
                        const resultsArray = eventData.results || [];
                        const giftRecipient = resultsArray[(index + 1) % resultsArray.length];
                        
                        return (
                          <div key={`final-result-${index}`} className="py-2 flex items-center gap-2 bg-white p-3 rounded-md">
                            <span className="font-medium text-gray-700">{result}</span>
                            <span className="text-gray-400">送禮物給</span>
                            <span className="font-medium text-gray-700">{giftRecipient}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* 進行中結果窗格 - 尚未完成所有抽籤時顯示 */}
                {eventData?.results && eventData.results.length > 0 && eventData.participant_names.length > eventData.results.length && (
                  <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-3">抽籤結果記錄 ({eventData.results.length}/{eventData.participant_names.length})</h3>
                    <div className="space-y-2">
                      {eventData.results.map((result, index) => {
                        // 獲取下一個結果（如果有）
                        const nextResult = eventData.results?.[index + 1] || "";
                        
                        return (
                          <div key={`result-${index}`} className="py-1 flex items-center gap-2">
                            <span className="font-medium">{result}</span>
                            <span className="text-gray-400">→</span>
                            {eventData.results && index < eventData.results.length - 1 && (
                              <span className="font-medium">{nextResult}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-lg font-medium">沒有參與者</p>
                <p className="mt-2">請返回主頁添加參與者</p>
              </div>
            )}
          </div>
          {/* 返回按鈕 */}
          <div className="mt-8 text-center">
            <Link 
              href="/gift-exchange" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              返回主頁
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}