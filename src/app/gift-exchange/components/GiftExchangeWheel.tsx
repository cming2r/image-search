'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GiftExchangeWheel() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState('');
  const [quickAddCount, setQuickAddCount] = useState<number>(0);
  const router = useRouter();

  // 添加單一參與者
  const addParticipant = () => {
    if (!newParticipant.trim()) return;
    
    setParticipants(prev => [...prev, newParticipant.trim()]);
    setNewParticipant('');
  };

  // 快速添加指定數量的參與者
  const quickAddParticipants = () => {
    if (!quickAddCount || quickAddCount <= 0) return;
    
    const newParticipants = Array.from({ length: quickAddCount }, (_, i) => `${i + 1}`);
    setParticipants(prev => [...prev, ...newParticipants]);
    setQuickAddCount(0);
  };

  // 移除參與者
  const removeParticipant = (index: number) => {
    setParticipants(prev => prev.filter((_, i) => i !== index));
  };

  // 開始抽籤，創建新活動
  const startGiftExchange = async () => {
    if (participants.length < 2) {
      alert("至少需要2名參與者才能開始抽籤");
      return;
    }

    try {
      // 生成隨機4位代碼
      const randomId = Math.random().toString(36).substring(2, 6);
      
      // 創建活動數據
      const eventData = {
        code: randomId,
        participantCount: participants.length,
        participantNames: participants,
        results: [] // 初始時沒有結果
      };

      // 發送到API
      const response = await fetch('/api/gift-exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API錯誤詳情:', errorData);
        throw new Error(`創建活動失敗: ${errorData.error || response.statusText}`);
      }

      // 顯示成功訊息
      console.log(`活動創建成功，代碼: ${randomId}`);
      
      // 導航到活動頁面 - 使用replace而不是push可以避免返回按鈕返回到表單頁面
      router.replace(`/gift-exchange/${randomId}`);
    } catch (error) {
      console.error('開始抽籤錯誤:', error);
      // 顯示更詳細的錯誤訊息
      const errorMessage = error instanceof Error ? error.message : '未知錯誤';
      alert(`發生錯誤，請重試: ${errorMessage}`);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">參與者名單</h2>
        
        {/* 手動添加參與者 */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            placeholder="輸入參與者姓名"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button 
            onClick={addParticipant}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            添加
          </button>
        </div>
        
        {/* 快速添加指定數量 */}
        <div className="flex gap-2 mb-6">
          <input
            type="number"
            min="1"
            value={quickAddCount || ''}
            onChange={(e) => setQuickAddCount(parseInt(e.target.value) || 0)}
            placeholder="快速添加人數"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button 
            onClick={quickAddParticipants}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            快速添加
          </button>
        </div>
        
        {/* 參與者列表 */}
        {participants.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium mb-2">目前參與者 ({participants.length}人):</h3>
            <div className="flex flex-wrap gap-2">
              {participants.map((participant, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{participant}</span>
                  <button 
                    onClick={() => removeParticipant(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 開始抽籤按鈕 */}
        <button
          onClick={startGiftExchange}
          disabled={participants.length < 2}
          className={`w-full py-3 rounded-lg text-white font-medium
            ${participants.length < 2 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          開始抽籤
        </button>
      </div>
      
      {/* 參與者人數提示 */}
      {participants.length > 0 && (
        <div className="mt-8 text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-lg">已添加 <span className="font-bold">{participants.length}</span> 名參與者</p>
          <p className="text-sm text-gray-600 mt-1">
            {participants.length < 2 
              ? '至少需要2名參與者才能開始抽籤' 
              : '點擊「開始抽籤」按鈕創建新活動並進入抽籤頁面'}
          </p>
        </div>
      )}
    </div>
  );
}