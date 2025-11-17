'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
const wheelTranslations = {
  noParticipantsError: {
    zh: "請至少輸入兩名參與者",
    en: "Please enter at least two participants",
    jp: "少なくとも2人の参加者を入力してください",
    es: "Por favor ingrese al menos dos participantes"
  },
  spinningText: {
    zh: "轉動中...",
    en: "Spinning...",
    jp: "回転中...",
    es: "Girando..."
  },
  loading: {
    zh: "載入中...",
    en: "Loading...",
    jp: "読み込み中...",
    es: "Cargando..."
  },
  spinButton: {
    zh: "轉動轉盤",
    en: "Spin the Wheel",
    jp: "ホイールを回す",
    es: "Girar la Ruleta"
  },
  resultsTitle: {
    zh: "抽籤結果",
    en: "Drawing Results",
    jp: "抽選結果",
    es: "Resultados del Sorteo"
  }
};

interface WheelCanvasProps {
  items: string[];
  onSpin: (selectedItem: string) => void;
}

export default function WheelCanvas({ items, onSpin }: WheelCanvasProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';
  
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState(items.length || 6); // 使用項目數量或預設 6 個窗格
  const [clientSegments, setClientSegments] = useState<string[]>([]); // 客戶端渲染的窗格數據
  const [disabled, setDisabled] = useState(false); // 新增禁用狀態，防止連續點擊

  // 初始設置輪盤參數，或者在 items 變化時更新
  useEffect(() => {
    if (items.length > 0) {
      // 輪盤項目已更新
      const itemCount = Math.max(items.length, 2);
      setSegments(itemCount);
      
      // 只有當輪盤未旋轉且未禁用時才更新客戶端段落
      if (!spinning && !disabled) {
        setClientSegments([...items]);
      }
    }
  }, [items, spinning, disabled]);
  
  const spinWheel = () => {
    if (spinning || disabled) return;
    
    // 禁用按鈕，防止連續點擊
    setDisabled(true);
    
    // 開始旋轉輪盤
    startSpinning();
  };
  
  const startSpinning = () => {
    setSpinning(true);
    setResult(null);
    
    // 生成隨機段落和旋轉角度
    const randomSegment = Math.floor(Math.random() * segments);
    const segmentAngle = randomSegment * (360 / segments);
    const fullRotations = 360 * (5 + Math.random() * 5);
    const totalRotation = rotation + fullRotations + segmentAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      // 計算結果 (與WheelSelector完全相同的邏輯)
      const adjustedRotation = (totalRotation + 90) % 360;
      const finalSegment = Math.floor((adjustedRotation + 360) % 360 / (360 / segments));
      const result = segments - finalSegment;
      
      // 將1-based結果轉換為0-based索引 (簡化後的邏輯)
      const resultIndex = (result - 1 + segments) % segments;
      
      // 設置結果並通知父組件
      setResult(resultIndex);
      
      // 確保使用clientSegments而不是原始items，以保持一致性
      onSpin(clientSegments[resultIndex]);
      
      setSpinning(false);
      
      // 等待3秒後重置轉盤
      setTimeout(() => {
        // 重置轉盤準備下一輪
        
        // 重置內部狀態
        setResult(null);
        setRotation(0);
        
        // 重置內部狀態和啟用按鈕
        setDisabled(false);
        
        // 直接通知父組件更新參與者列表
        if (typeof onSpin === 'function') {
          onSpin("__UPDATE_WHEEL__");
        }
      }, 3000);
    }, 5000);
  };

  const segmentColors = [
    'fill-red-400',
    'fill-teal-400',
    'fill-blue-400',
    'fill-green-400',
    'fill-yellow-200',
    'fill-pink-300',
    'fill-purple-400',
    'fill-orange-400',
    'fill-indigo-400',
    'fill-lime-400',
    'fill-amber-400',
    'fill-emerald-400',
  ];

  // 格式化浮點數，固定 2 位小數
  const round = (num: number) => parseFloat(num.toFixed(2));

  // 沒有項目時顯示提示
  if (items.length === 0) {
    return <div className="text-center p-4 bg-gray-100 rounded-lg">{wheelTranslations.noParticipantsError[lang]}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-72 h-72">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center',
              transition: spinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
            }}
          >
            <circle cx="50" cy="50" r="50" fill="#e5e7eb" />
            {clientSegments.map((item, index) => {
              const angle = index * (360 / segments);
              const radians = (angle * Math.PI) / 180;
              const nextAngle = (angle + 360 / segments) * (Math.PI / 180);
              const x1 = round(50 + 50 * Math.cos(radians));
              const y1 = round(50 + 50 * Math.sin(radians));
              const x2 = round(50 + 50 * Math.cos(nextAngle));
              const y2 = round(50 + 50 * Math.sin(nextAngle));
              const textAngle = angle + 180 / segments;
              const textRadians = (textAngle * Math.PI) / 180;
              const textX = round(50 + 35 * Math.cos(textRadians));
              const textY = round(50 + 35 * Math.sin(textRadians));

              return (
                <g key={index}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                    className={`${segmentColors[index % segmentColors.length]} ${
                      !spinning && result === index ? 'stroke-yellow-500 stroke-[3px]' : ''
                    }`}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-lg font-bold"
                    transform={`rotate(-${rotation}, ${textX}, ${textY})`}
                  >
                    {item}
                  </text>
                </g>
              );
            })}
          </g>
          <polygon points="48,5 52,5 50,15" fill="black" />
        </svg>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={spinWheel}
          disabled={spinning || disabled}
          className={`px-6 py-3 text-white rounded-lg ${
            spinning || disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {spinning ? wheelTranslations.spinningText[lang] : disabled ? wheelTranslations.loading[lang] : wheelTranslations.spinButton[lang]}
        </button>
        
        {result !== null && !spinning && (
          <div className="mt-2 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
            <span className="text-lg font-semibold">
              {wheelTranslations.resultsTitle[lang]}: <strong>{clientSegments[result]}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}