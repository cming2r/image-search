'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WheelCanvas from '../components/WheelCanvas';

interface GiftExchangeData {
  code: string;
  participant_count: number;
  participant_names: string[];
  results?: string[];
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
        
        // 設置輪盤參與者列表
        setWheelParticipants(getRemaining(data));
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
        alert('已複製連結');
      })
      .catch(() => {
        // 複製連結失敗處理
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
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>禮物交換活動</h1>
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
                          // 分享失敗處理
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
            
            {wheelParticipants.length > 0 ? (
              <>
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
                        } else {
                          // 結果更新失敗
                        }
                      } catch {
                        // 保存抽籤結果錯誤
                      }
                    }}
                  />
                </div>
                
                {/* 結果窗格 */}
                {eventData?.results && eventData.results.length > 0 && (
                  <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-3">抽籤結果記錄</h3>
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
        </section>
      </main>
      <Footer />
    </>
  );
}