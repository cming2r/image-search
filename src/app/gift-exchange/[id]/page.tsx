'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WheelCanvas from '../components/WheelCanvas';

interface GiftExchangeData {
  event_id: string;
  event_name: string;
  total_participants: number;
  participant_names: string[];
}

export default function GiftExchangeEvent() {
  const params = useParams();
  const eventId = params.id as string;
  
  const [eventData, setEventData] = useState<GiftExchangeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string>('');

  // 讀取活動數據
  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await fetch(`/api/gift-exchange?eventId=${eventId}`);
        
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
    
    if (eventId) {
      fetchEventData();
      
      // 生成分享連結
      if (typeof window !== 'undefined') {
        setShareLink(window.location.href);
      }
    }
  }, [eventId]);

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
            <h1>{eventData.event_name}</h1>
            <p className="text-sm text-gray-500">活動ID: {eventData.event_id}</p>
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
                    onSpin={(selected) => {
                      setSelectedParticipant(selected);
                    }}
                  />
                </div>
                
                {selectedParticipant && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                    <p className="text-lg">
                      選中: <span className="font-bold">{selectedParticipant}</span>
                    </p>
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