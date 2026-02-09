'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DueDateCalculator from "./components/DueDateCalculator";
import ArticleContent from "./components/ArticleContent";
import { useState, useEffect } from 'react';
import { metaTranslations } from './components/meta-translations';

export default function DueDatePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  
  const [currentWeeks, setCurrentWeeks] = useState<number>(4);
  
  // 從DueDateCalculator組件獲取當前週數
  useEffect(() => {
    // 仿站實現，訪問localStorage獲取數據
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        const lastPeriodDate = localStorage.getItem('lastPeriodDate');
        if (lastPeriodDate) {
          const lmpDate = new Date(lastPeriodDate);
          const today = new Date();
          
          lmpDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          
          const diffTime = today.getTime() - lmpDate.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays >= 0) {
            const weeks = Math.floor(diffDays / 7);
            setCurrentWeeks(weeks > 40 ? 40 : weeks);
          }
        }
      };
      
      // 初始化
      handleStorageChange();
      
      // 添加事件監聽器
      window.addEventListener('storage', handleStorageChange);
      
      // 清理
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          {/* 標題區 */}
          <div className="title-container mb-6">
            <h1>{metaTranslations.meta.title[lang]}</h1>
            <p>{metaTranslations.meta.description[lang]}</p>
          </div>
          
          <DueDateCalculator />
          
          <ArticleContent locale={locale} currentWeeks={currentWeeks} />
          
        </section>
      </main>
      <Footer />
    </div>
  );
}