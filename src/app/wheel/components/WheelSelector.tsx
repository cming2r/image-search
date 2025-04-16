'use client';

import { useState, useEffect } from 'react';

export default function WheelSelector() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState(8); // 預設 8 個窗格
  const [clientSegments, setClientSegments] = useState<number[]>([]); // 客戶端渲染的窗格數據

  // 確保窗格數據僅在客戶端計算
  useEffect(() => {
    setClientSegments(Array.from({ length: segments }, (_, i) => i + 1));
  }, [segments]);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const randomSegment = Math.floor(Math.random() * segments);
    const segmentAngle = randomSegment * (360 / segments);
    const fullRotations = 360 * (5 + Math.random() * 5);
    const totalRotation = rotation + fullRotations + segmentAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      const adjustedRotation = (totalRotation + 90) % 360;
      const finalSegment = Math.floor((adjustedRotation + 360) % 360 / (360 / segments));
      setResult(segments - finalSegment);
      setSpinning(false);
    }, 5000);
  };

  const handleSegmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 2 && value <= 36) {
      setSegments(value);
    }
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

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="segments-input" className="text-lg font-semibold">
          人數 (2-36):
        </label>
        <input
          id="segments-input"
          type="number"
          min="2"
          max="36"
          value={segments}
          onChange={handleSegmentsChange}
          className="p-2 border rounded-lg w-20 text-center"
        />
      </div>
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
            {clientSegments.map((number, index) => {
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
                    className={segmentColors[index % segmentColors.length]}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-lg font-bold"
                    transform={`rotate(-${rotation}, ${textX}, ${textY})`}
                  >
                    {number}
                  </text>
                </g>
              );
            })}
          </g>
          <polygon points="48,5 52,5 50,15" fill="black" />
        </svg>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <button
          onClick={spinWheel}
          disabled={spinning}
          className={`px-6 py-3 text-white rounded-lg ${
            spinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          轉動
        </button>
        {result && (
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
            <span className="text-xl font-semibold">
              抽中 {result} 號
            </span>
          </div>
        )}
      </div>
    </div>
  );
}