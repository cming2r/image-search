'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: 'top-right' | 'top-center' | 'bottom-center' | 'bottom-right';
  showCloseButton?: boolean;
}

export default function Toast({
  message,
  isVisible,
  onClose,
  type = 'success',
  duration = 3000,
  position = 'top-center',
  showCloseButton = true
}: ToastProps) {
  const [isShowing, setIsShowing] = useState(false);
  
  // 根據類型選擇樣式和圖標
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };
  
  // 根據位置選擇樣式
  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-center':
      default:
        return 'top-4 left-1/2 -translate-x-1/2';
    }
  };
  
  // 獲取適合的圖標
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };
  
  // 處理通知顯示和自動關閉
  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      
      if (duration > 0) {
        // 設置計時器自動關閉
        const timer = setTimeout(() => {
          setIsShowing(false);
          setTimeout(() => {
            onClose();
          }, 300); // 淡出動畫後再完全關閉
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsShowing(false);
    }
  }, [isVisible, duration, onClose]);
  
  if (!isVisible) return null;
  
  const handleClose = () => {
    setIsShowing(false);
    setTimeout(onClose, 300);
  };
  
  // 處理點擊事件（如果要點擊整個通知關閉）
  const handleClick = () => {
    if (!showCloseButton) {
      handleClose();
    }
  };
  
  // 決定入場/退場動畫
  const getAnimationClass = () => {
    const baseAnimation = 'transition-all duration-300 ease-in-out ';
    
    if (position.includes('top')) {
      return baseAnimation + (isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4');
    } else {
      return baseAnimation + (isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4');
    }
  };
  
  return (
    <div 
      className={`fixed ${getPositionStyles()} z-50 ${getAnimationClass()}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div 
        className={`px-4 py-3 rounded-md shadow-md border ${getTypeStyles()} flex items-center justify-between max-w-sm`}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {getIcon()}
          <span className="text-sm">{message}</span>
        </div>
        
        {showCloseButton && (
          <button
            className="ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="關閉"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}