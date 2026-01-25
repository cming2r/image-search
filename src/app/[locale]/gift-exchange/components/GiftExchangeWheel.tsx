'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const giftExchangeTranslations = {
  wheel: {
    participantsLabel: {
      tw: "參與者名單",
      cn: "参与者名单",
      en: "Participants List",
      jp: "参加者リスト",
      es: "Lista de Participantes"
    },
    participantsPlaceholder: {
      tw: "輸入參與者名單，用空格分隔（如：小明 小華 小強）",
      cn: "输入参与者名单，用空格分隔（如：小明 小华 小强）",
      en: "Enter participant names, separated by spaces (e.g., John Mary David)",
      jp: "参加者名をスペースで区切って入力（例：太郎 花子 健太）",
      es: "Ingrese nombres de participantes, separados por espacios (ej: Juan María David)"
    },
    randomizeOrder: {
      tw: "隨機分佈參與者順序",
      cn: "随机分布参与者顺序",
      en: "Randomize participant order",
      jp: "参加者の順序をランダム化",
      es: "Aleatorizar orden de participantes"
    },
    showFinalResultDirectly: {
      tw: "直接顯示最終結果",
      cn: "直接显示最终结果",
      en: "Show final results directly",
      jp: "最終結果を直接表示",
      es: "Mostrar resultados finales directamente"
    },
    startButton: {
      tw: "開始抽籤",
      cn: "开始抽签",
      en: "Start Drawing",
      jp: "抽選開始",
      es: "Iniciar Sorteo"
    },
    noParticipantsError: {
      tw: "請至少輸入兩名參與者",
      cn: "请至少输入两名参与者",
      en: "Please enter at least two participants",
      jp: "少なくとも2人の参加者を入力してください",
      es: "Por favor ingrese al menos dos participantes"
    },
    quickAdd: {
      tw: "快速添加",
      cn: "快速添加",
      en: "Quick Add",
      jp: "クイック追加",
      es: "Agregar Rápido"
    },
    addButton: {
      tw: "添加",
      cn: "添加",
      en: "Add",
      jp: "追加",
      es: "Agregar"
    },
    currentParticipants: {
      tw: "目前參與者",
      cn: "目前参与者",
      en: "Current participants",
      jp: "現在の参加者",
      es: "Participantes actuales"
    },
    clearAll: {
      tw: "清除全部",
      cn: "清除全部",
      en: "Clear All",
      jp: "すべてクリア",
      es: "Limpiar Todo"
    },
    noParticipantsYet: {
      tw: "尚未添加參與者",
      cn: "尚未添加参与者",
      en: "No participants added yet",
      jp: "まだ参加者が追加されていません",
      es: "Aún no se han agregado participantes"
    },
    addedPrefix: {
      tw: "已添加",
      cn: "已添加",
      en: "Added",
      jp: "追加済み",
      es: "Agregado"
    },
    addedSuffix: {
      tw: "名參與者",
      cn: "名参与者",
      en: "participants",
      jp: "人の参加者",
      es: "participantes"
    },
    personSuffix: {
      tw: "人",
      cn: "人",
      en: "",
      jp: "人",
      es: ""
    }
  },
  createEventDescription: {
    tw: "點擊「開始抽籤」按鈕，系統會自動生成活動連結",
    cn: "点击「开始抽签」按钮，系统会自动生成活动链接",
    en: "Click the \"Start Drawing\" button, and the system will automatically generate an event link",
    jp: "「抽選開始」ボタンをクリックすると、システムは自動的にイベントリンクを生成します",
    es: "Haga clic en el botón \"Iniciar Sorteo\", y el sistema generará automáticamente un enlace del evento"
  }
};
import { useParams } from 'next/navigation';

export default function GiftExchangeWheel() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  
  // 初始為空數組，避免服務器/客戶端水合問題
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState('');
  const [quickAddCount, setQuickAddCount] = useState<number>(6);
  const router = useRouter();
  
  // 使用 useEffect 在客戶端掛載後讀取 localStorage
  useEffect(() => {
    try {
      const savedParticipants = localStorage.getItem('giftExchangeParticipants');
      if (savedParticipants) {
        setParticipants(JSON.parse(savedParticipants));
      }
    } catch (error) {
      console.error('Error loading participants from localStorage:', error);
    }
  }, []);

  // 更新參與者列表並保存到localStorage
  const updateParticipants = (newList: string[]) => {
    setParticipants(newList);
    // 只在客戶端執行時存儲到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('giftExchangeParticipants', JSON.stringify(newList));
    }
  };

  // 添加參與者（支持空格分隔多個名字，過濾重複）
  const addParticipant = () => {
    if (!newParticipant.trim()) return;

    // 按空格分隔輸入，處理多個名字
    const names = newParticipant.split(/\s+/).filter(name => name.trim() !== '');

    if (names.length > 0) {
      // 過濾掉已存在的名字
      const uniqueNames = names.filter(name => !participants.includes(name));
      if (uniqueNames.length > 0) {
        const updatedList = [...participants, ...uniqueNames];
        updateParticipants(updatedList);
      }
      setNewParticipant('');
    }
  };

  // 快速設定數字參與者為 1 到 N（保留非數字參與者）
  const quickAddParticipants = () => {
    if (!quickAddCount || quickAddCount <= 0) return;

    // 過濾出非純數字的參與者（保留名字）
    const nonNumberParticipants = participants.filter(p => isNaN(parseInt(p)) || parseInt(p).toString() !== p);

    // 創建 1 到 N 的數字參與者
    const numberParticipants = Array.from({ length: quickAddCount }, (_, i) => `${i + 1}`);

    // 合併：非數字參與者 + 數字參與者
    const updatedList = [...nonNumberParticipants, ...numberParticipants];
    updateParticipants(updatedList);
  };

  // 移除參與者
  const removeParticipant = (index: number) => {
    const updatedList = participants.filter((_, i) => i !== index);
    updateParticipants(updatedList);
  };

  // 開始抽籤，創建新活動
  const startGiftExchange = async () => {
    if (participants.length < 2) {
      alert(giftExchangeTranslations.wheel.noParticipantsError[lang]);
      return;
    }

    try {
      // 生成隨機4位代碼
      const randomId = Math.random().toString(36).substring(2, 6);
      
      // 取得選項狀態
      const randomizeOrder = document.getElementById('randomize-order') as HTMLInputElement;
      const showResultsDirectly = document.getElementById('show-results-directly') as HTMLInputElement;
      
      // 準備參與者名單，如果需要隨機順序則打亂
      const participantNames = [...participants];
      if (randomizeOrder && randomizeOrder.checked) {
        // 使用 Fisher-Yates 洗牌算法隨機排序
        for (let i = participantNames.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [participantNames[i], participantNames[j]] = [participantNames[j], participantNames[i]];
        }
      }
      
      // 如果直接顯示結果，則提前生成結果數組
      let results: string[] = [];
      if (showResultsDirectly && showResultsDirectly.checked) {
        // 創建隨機分佈的結果數組
        results = [...participantNames];
        
        // 使用 Fisher-Yates 洗牌算法隨機排序結果數組
        for (let i = results.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [results[i], results[j]] = [results[j], results[i]];
        }
      }
      
      // 創建活動數據 - 只包含數據庫有的欄位
      const eventData = {
        code: randomId,
        participantCount: participantNames.length,
        participantNames: participantNames,
        results: results // 如果需要直接顯示結果，這裡會包含預生成的結果
      };

      // 發送到API
      console.log(`發送 POST 請求到: /api/gift-exchange`);
      const response = await fetch(`/api/gift-exchange`, {
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
      
      // 獲取勾選框值
      const isShowResultsDirectly = showResultsDirectly && showResultsDirectly.checked;
      
      // 導航到活動頁面 - 使用push而不是replace，這樣能保留瀏覽歷史
      // 將選項作為查詢參數傳遞，而不是存入數據庫
      router.push(`/${locale}/gift-exchange/${randomId}?showResults=${isShowResultsDirectly ? 1 : 0}`);
    } catch (error) {
      console.error('開始抽籤錯誤:', error);
      // 顯示更詳細的錯誤訊息
      const errorMessage = error instanceof Error ? error.message : '未知錯誤';
      if (locale === 'en') {
        alert(`Error occurred, please try again: ${errorMessage}`);
      } else if (locale === 'jp') {
        alert(`エラーが発生しました。再試行してください: ${errorMessage}`);
      } else {
        alert(`發生錯誤，請重試: ${errorMessage}`);
      }
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">{giftExchangeTranslations.wheel.participantsLabel[lang]}</h2>
        
        {/* 手動添加參與者 */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            onKeyDown={(e) => {
              // 只在沒有正在進行中文輸入時處理 Enter 鍵
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault();
                addParticipant();
              }
            }}
            placeholder={giftExchangeTranslations.wheel.participantsPlaceholder[lang]}
            className="flex-1 px-3 py-2 border rounded"
          />
          <button 
            onClick={addParticipant}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {giftExchangeTranslations.wheel.addButton[lang]}
          </button>
        </div>
        
        {/* 快速添加指定數量 */}
        <div className="flex gap-2 mb-6 justify-end">
          <input
            type="number"
            min="1"
            value={quickAddCount || ''}
            onChange={(e) => setQuickAddCount(parseInt(e.target.value) || 0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                quickAddParticipants();
              }
            }}
            placeholder="人數"
            className="w-24 px-3 py-2 border rounded text-center"
            title="輸入人數 (預設 6 人)"
          />
          <button 
            onClick={quickAddParticipants}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {giftExchangeTranslations.wheel.quickAdd[lang]}
          </button>
        </div>
        
        {/* 參與者列表 - 無論是否有參與者都顯示 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{giftExchangeTranslations.wheel.currentParticipants[lang]} ({participants.length}{giftExchangeTranslations.wheel.personSuffix[lang]}):</h3>
            {participants.length > 0 && (
              <button
                onClick={() => updateParticipants([])}
                className="text-sm text-red-500 hover:text-red-700 px-2 py-1 rounded border border-red-200 hover:border-red-400"
              >
                {giftExchangeTranslations.wheel.clearAll[lang]}
              </button>
            )}
          </div>
          {participants.length === 0 ? (
            <div className="text-gray-500 italic">{giftExchangeTranslations.wheel.noParticipantsYet[lang]}</div>
          ) : (
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
          )}
        </div>
        {/* 附加選項 */}
        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="randomize-order"
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-700">{giftExchangeTranslations.wheel.randomizeOrder[lang]}</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="show-results-directly"
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-700">{giftExchangeTranslations.wheel.showFinalResultDirectly[lang]}</span>
          </label>
        </div>
        
        {/* 開始抽籤按鈕 */}
        <button
          onClick={startGiftExchange}
          disabled={participants.length < 2}
          className={`w-full py-3 rounded-lg text-white font-medium
            ${participants.length < 2 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {giftExchangeTranslations.wheel.startButton[lang]}
        </button>
      </div>
      
      {/* 參與者人數提示 */}
      {participants.length > 0 && (
        <div className="mt-8 text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-lg">{giftExchangeTranslations.wheel.addedPrefix[lang]} <span className="font-bold">{participants.length}</span> {giftExchangeTranslations.wheel.addedSuffix[lang]}</p>
          <p className="text-sm text-gray-600 mt-1">
            {participants.length < 2 
              ? giftExchangeTranslations.wheel.noParticipantsError[lang] 
              : giftExchangeTranslations.createEventDescription[lang]}
          </p>
        </div>
      )}
    </div>
  );
}