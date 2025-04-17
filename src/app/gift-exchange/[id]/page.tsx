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
  const [participants, setParticipants] = useState<string[]>([]);
  const [shareLink, setShareLink] = useState<string>('');

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
        setParticipants(data.participant_names || []);
        
      } catch (err) {
        console.error('獲取活動數據錯誤:', err);
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
      .catch(err => {
        console.error('複製連結失敗:', err);
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
            <p className="text-sm text-gray-500">活動代碼: {eventData.code}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <input 
                type="text" 
                value={shareLink} 
                readOnly 
                className="px-3 py-2 border rounded text-sm w-64"
              />
              <button 
                onClick={copyShareLink}
                className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
              >
                複製連結
              </button>
            </div>
          </div>

          {/* 轉盤區域 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">抽籤轉盤</h2>
            
            {participants.length > 0 ? (
              <>
                <div className="max-w-md mx-auto mb-4">
                  <WheelCanvas 
                    items={participants} 
                    onSpin={async (selectedItem) => {
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
                        } else {
                          console.error('更新結果失敗');
                        }
                      } catch (err) {
                        console.error('保存抽籤結果錯誤:', err);
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