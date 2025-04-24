'use client';

import { useEffect, useRef } from 'react';

interface PregnancyTimelineProps {
  currentWeeks: number;
}

export default function PregnancyTimeline({ currentWeeks }: PregnancyTimelineProps) {
  const weekMarkerLineRef = useRef<SVGLineElement>(null);
  const weekMarkerCircleRef = useRef<SVGCircleElement>(null);
  const weekMarkerTextRef = useRef<SVGTextElement>(null);
  
  // 更新週數標記
  useEffect(() => {
    // 限制週數範圍在0-40週之間
    const weeks = Math.min(Math.max(currentWeeks, 0), 40);
    
    // 計算x座標位置（線性插值）
    const startX = 50;   // 0週的X座標
    const endX = 750;    // 40週的X座標
    const position = startX + (endX - startX) * (weeks / 40);
    
    // 更新SVG元素位置
    if (weekMarkerLineRef.current && weekMarkerCircleRef.current && weekMarkerTextRef.current) {
      weekMarkerLineRef.current.setAttribute('x1', position.toString());
      weekMarkerLineRef.current.setAttribute('x2', position.toString());
      weekMarkerCircleRef.current.setAttribute('cx', position.toString());
      weekMarkerTextRef.current.setAttribute('x', position.toString());
      weekMarkerTextRef.current.textContent = `👶${weeks}週`;
    }
  }, [currentWeeks]);
  
  return (
    <div className="container">
      <svg id="timeline" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        {/* 背景 */}
        <rect width="800" height="400" fill="white"/>
        {/* 主時間軸 */}
        <line x1="50" y1="200" x2="750" y2="200" stroke="#2c3e50" strokeWidth="3"/>
        {/* 週期標記 */}
        <g fontFamily="Arial, sans-serif" fontSize="18">
          {/* 週數標記 - 移到上方 */}
          <g textAnchor="middle" fontWeight="bold">
              <text x="50" y="170">0週</text>
              <text x="277" y="170">13週</text>
              <text x="557" y="170">29週</text>
              <text x="750" y="170">40週</text>
          </g>
          {/* 第一孕期 */}
          <rect x="50" y="180" width="227" height="40" fill="#FF91A4" opacity="0.4"/>
          <text x="163" y="140" textAnchor="middle" fill="#C71585" fontWeight="bold">第一孕期</text>
          {/* 第二孕期 */}
          <rect x="277" y="180" width="280" height="40" fill="#90EE90" opacity="0.4"/>
          <text x="417" y="140" textAnchor="middle" fill="#228B22" fontWeight="bold">第二孕期</text>
          {/* 第三孕期 */}
          <rect x="557" y="180" width="193" height="40" fill="#87CEEB" opacity="0.4"/>
          <text x="654" y="140" textAnchor="middle" fill="#4169E1" fontWeight="bold">第三孕期</text>
        </g>
        {/* 重要里程碑 */}
        <g fontFamily="Arial, sans-serif" fontSize="12">
          {/* 第一孕期里程碑 */}
          <circle cx="164" cy="200" r="6" fill="#C71585"/>
          <line x1="164" y1="200" x2="164" y2="270" stroke="#C71585" strokeWidth="1" strokeDasharray="2"/>
          <rect x="114" y="270" width="100" height="40" rx="5" fill="#FF91A4" opacity="0.2"/>
          <text x="164" y="285" textAnchor="middle" fill="#C71585">心跳開始</text>
          <text x="164" y="300" textAnchor="middle" fill="#C71585">(6-7週)</text>

          <circle cx="260" cy="200" r="6" fill="#C71585"/>
          <line x1="260" y1="200" x2="260" y2="330" stroke="#C71585" strokeWidth="1" strokeDasharray="2"/>
          <rect x="210" y="330" width="100" height="40" rx="5" fill="#FF91A4" opacity="0.2"/>
          <text x="260" y="345" textAnchor="middle" fill="#C71585">器官發育完成</text>
          <text x="260" y="360" textAnchor="middle" fill="#C71585">(12週)</text>

          {/* 第二孕期里程碑 */}
          <circle cx="365" cy="200" r="6" fill="#228B22"/>
          <line x1="365" y1="200" x2="365" y2="270" stroke="#228B22" strokeWidth="1" strokeDasharray="2"/>
          <rect x="315" y="270" width="100" height="40" rx="5" fill="#90EE90" opacity="0.2"/>
          <text x="365" y="285" textAnchor="middle" fill="#228B22">胎動感受</text>
          <text x="365" y="300" textAnchor="middle" fill="#228B22">(16-20週)</text>

          <circle cx="400" cy="200" r="6" fill="#228B22"/>
          <line x1="400" y1="200" x2="400" y2="330" stroke="#228B22" strokeWidth="1" strokeDasharray="2"/>
          <rect x="350" y="330" width="100" height="40" rx="5" fill="#90EE90" opacity="0.2"/>
          <text x="400" y="345" textAnchor="middle" fill="#228B22">性別辨識</text>
          <text x="400" y="360" textAnchor="middle" fill="#228B22">(20週)</text>

          {/* 第三孕期里程碑 */}
          <circle cx="662" cy="200" r="6" fill="#4169E1"/>
          <line x1="662" y1="200" x2="662" y2="270" stroke="#4169E1" strokeWidth="1" strokeDasharray="2"/>
          <rect x="612" y="270" width="100" height="40" rx="5" fill="#87CEEB" opacity="0.2"/>
          <text x="662" y="285" textAnchor="middle" fill="#4169E1">肺部成熟</text>
          <text x="662" y="300" textAnchor="middle" fill="#4169E1">(34-36週)</text>

          <circle cx="680" cy="200" r="6" fill="#4169E1"/>
          <line x1="680" y1="200" x2="680" y2="330" stroke="#4169E1" strokeWidth="1" strokeDasharray="2"/>
          <rect x="630" y="330" width="100" height="40" rx="5" fill="#87CEEB" opacity="0.2"/>
          <text x="680" y="345" textAnchor="middle" fill="#4169E1">胎位定位</text>
          <text x="680" y="360" textAnchor="middle" fill="#4169E1">(36週)</text>
        </g>
        {/* 標題 */}
        <text x="400" y="60" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#2c3e50">懷孕週期發展時程表</text>
        {/* 當前週數標記 */}
        <line 
          id="weekMarkerLine" 
          ref={weekMarkerLineRef}
          x1="85" 
          y1="200" 
          x2="85" 
          y2="240" 
          stroke="#FF4500" 
          strokeWidth="3"
        />
        <circle 
          id="weekMarkerCircle" 
          ref={weekMarkerCircleRef}
          cx="85" 
          cy="200" 
          r="8" 
          fill="#FF4500"
        />
        <text 
          id="weekMarkerText" 
          ref={weekMarkerTextRef}
          x="85" 
          y="260" 
          textAnchor="middle" 
          fontFamily="Arial, sans-serif" 
          fontSize="16" 
          fontWeight="bold" 
          fill="#FF4500"
        >
          👶4週
        </text>
      </svg>
    </div>
  );
}