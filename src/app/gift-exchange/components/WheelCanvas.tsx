'use client';

import { useState, useEffect } from 'react';

interface WheelCanvasProps {
  items: string[];
  onSpin: (selectedItem: string) => void;
}

export default function WheelCanvas({ items, onSpin }: WheelCanvasProps) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState(items.length || 6); // 使用項目數量或預設 6 個窗格
  const [clientSegments, setClientSegments] = useState<string[]>([]); // 客戶端渲染的窗格數據

  // 確保窗格數據僅在客戶端計算，並隨機排序
  useEffect(() => {
    // 使用項目數量設置段數（至少2個段）
    const itemCount = Math.max(items.length, 2);
    setSegments(itemCount);
    
    // 隨機排序項目
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    
    // 使用隨機排序後的項目作為顯示內容
    setClientSegments(shuffledItems);
  }, [items]);

  const spinWheel = () => {
    if (spinning) return;
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
      onSpin(items[resultIndex]);
      
      setSpinning(false);
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
  const round = (num: number) => Number(num.toFixed(2));

  // 沒有項目時顯示提示
  if (items.length === 0) {
    return <div className="text-center p-4 bg-gray-100 rounded-lg">沒有可用的參與者</div>;
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
          disabled={spinning}
          className={`px-6 py-3 text-white rounded-lg ${
            spinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {spinning ? '轉動中...' : '轉動轉盤'}
        </button>
        
        {result !== null && !spinning && (
          <div className="mt-2 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
            <span className="text-lg font-semibold">
              抽中: <strong>{clientSegments[result]}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}