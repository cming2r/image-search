'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
const wheelTranslations = {
  noParticipantsError: {
    tw: "請至少輸入兩名參與者",
    cn: "请至少输入两名参与者",
    en: "Please enter at least two participants",
    jp: "少なくとも2人の参加者を入力してください",
    es: "Por favor ingrese al menos dos participantes"
  },
  spinningText: {
    tw: "轉動中...",
    cn: "转动中...",
    en: "Spinning...",
    jp: "回転中...",
    es: "Girando..."
  },
  loading: {
    tw: "載入中...",
    cn: "加载中...",
    en: "Loading...",
    jp: "読み込み中...",
    es: "Cargando..."
  },
  spinButton: {
    tw: "轉動轉盤",
    cn: "转动转盘",
    en: "Spin the Wheel",
    jp: "ホイールを回す",
    es: "Girar la Ruleta"
  },
  resultsTitle: {
    tw: "抽籤結果",
    cn: "抽签结果",
    en: "Drawing Results",
    jp: "抽選結果",
    es: "Resultados del Sorteo"
  },
  quickResult: {
    tw: "直接抽取",
    cn: "直接抽取",
    en: "Quick Draw",
    jp: "直接抽選",
    es: "Sorteo Directo"
  },
  designateResult: {
    tw: "指定結果",
    cn: "指定结果",
    en: "Designate",
    jp: "指定する",
    es: "Designar"
  },
  selectPlaceholder: {
    tw: "選擇參與者...",
    cn: "选择参与者...",
    en: "Select participant...",
    jp: "参加者を選択...",
    es: "Seleccionar participante..."
  }
};

interface WheelCanvasProps {
  items: string[];
  onSpin: (selectedItem: string) => void;
}

export default function WheelCanvas({ items, onSpin }: WheelCanvasProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState(items.length || 6); // 使用項目數量或預設 6 個窗格
  const [clientSegments, setClientSegments] = useState<string[]>([]); // 客戶端渲染的窗格數據
  const [disabled, setDisabled] = useState(false); // 新增禁用狀態，防止連續點擊
  const [selectedDesignate, setSelectedDesignate] = useState<string>(''); // 指定結果的選擇

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

  // 快速結果 - 直接選取隨機結果，跳過動畫
  const quickResult = () => {
    if (spinning || disabled) return;

    // 禁用按鈕
    setDisabled(true);

    // 隨機選取一個結果
    const randomIndex = Math.floor(Math.random() * clientSegments.length);

    // 設置結果
    setResult(randomIndex);

    // 通知父組件
    onSpin(clientSegments[randomIndex]);

    // 等待短暫時間後重置
    setTimeout(() => {
      setResult(null);
      setDisabled(false);

      // 通知父組件更新參與者列表
      if (typeof onSpin === 'function') {
        onSpin("__UPDATE_WHEEL__");
      }
    }, 1500);
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
      // 計算結果 (指針在右邊/0度方向)
      const adjustedRotation = totalRotation % 360;
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

  // 現代化配色（2024 流行色系）
  const segmentColors = [
    'fill-[#6366F1]', // Indigo
    'fill-[#EC4899]', // Pink
    'fill-[#14B8A6]', // Teal
    'fill-[#F97316]', // Orange
    'fill-[#8B5CF6]', // Violet
    'fill-[#06B6D4]', // Cyan
    'fill-[#EF4444]', // Red
    'fill-[#22C55E]', // Green
    'fill-[#A855F7]', // Purple
    'fill-[#0EA5E9]', // Sky
    'fill-[#F59E0B]', // Amber
    'fill-[#10B981]', // Emerald
    'fill-[#E11D48]', // Rose
    'fill-[#3B82F6]', // Blue
    'fill-[#84CC16]', // Lime
    'fill-[#D946EF]', // Fuchsia
  ];

  // 格式化浮點數，固定 2 位小數
  const round = (num: number) => parseFloat(num.toFixed(2));

  // 根據參與者數量計算字體大小（SVG viewBox 100x100）
  const getFontSize = () => {
    if (segments <= 10) return 7.5;
    return 6.5;
  };

  // 沒有項目時顯示提示
  if (items.length === 0) {
    return <div className="text-center p-4 bg-gray-100 rounded-lg">{wheelTranslations.noParticipantsError[lang]}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
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
              // 文字距離圓心的位置
              const textRadius = 32;
              const textX = round(50 + textRadius * Math.cos(textRadians));
              const textY = round(50 + textRadius * Math.sin(textRadians));

              // 文字沿扇區方向旋轉，並確保始終正向可讀
              // 計算文字在螢幕上的最終角度
              const screenAngle = ((textAngle + rotation) % 360 + 360) % 360;
              // 如果指向左邊（90-270度），需要翻轉 180 度保持可讀
              const needsFlip = screenAngle > 90 && screenAngle < 270;
              // 文字旋轉：沿扇區方向 + 翻轉（如需要）
              const textRotation = textAngle + (needsFlip ? 180 : 0);

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
                    className="fill-white font-bold"
                    style={{ fontSize: `${getFontSize()}px` }}
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                  >
                    {item.length > 8 ? item.slice(0, 7) + '…' : item}
                  </text>
                </g>
              );
            })}
          </g>
          <polygon points="95,48 95,52 85,50" fill="black" />
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

        <div className="flex items-center gap-2">
          <button
            onClick={quickResult}
            disabled={spinning || disabled}
            className={`h-9 px-4 min-w-30 text-sm rounded-lg ${
              spinning || disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {wheelTranslations.quickResult[lang]}
          </button>
          <select
            value={selectedDesignate}
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setSelectedDesignate(value);
                // 直接執行指定結果
                setTimeout(() => {
                  if (spinning || disabled) return;
                  setDisabled(true);
                  const selectedIndex = clientSegments.findIndex(s => s === value);
                  if (selectedIndex !== -1) {
                    setResult(selectedIndex);
                    onSpin(value);
                    setTimeout(() => {
                      setResult(null);
                      setDisabled(false);
                      setSelectedDesignate('');
                      onSpin("__UPDATE_WHEEL__");
                    }, 1500);
                  } else {
                    setDisabled(false);
                    setSelectedDesignate('');
                  }
                }, 0);
              }
            }}
            disabled={spinning || disabled}
            className={`h-9 px-3 min-w-30 text-sm rounded-lg border cursor-pointer ${
              spinning || disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
            }`}
          >
            <option value="">{wheelTranslations.designateResult[lang]}</option>
            {clientSegments.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

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