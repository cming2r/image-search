'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DueDateCalculator from "./components/DueDateCalculator";
import PregnancyTimeline from "./components/PregnancyTimeline";
import { useState, useEffect } from 'react';
import translations from './translations.json';

export default function DueDatePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const t = translations[locale as keyof typeof translations] || translations.zh;
  
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
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          {/* 標題區 */}
          <div className="title-container mb-6">
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
          
          <DueDateCalculator />
          
          {/* 說明區 */}
          <div className="content-section mb-6">
            <h2>{t.toolFeatures.title}</h2>
            <ul>
              {t.toolFeatures.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* 預產期說明區 */}
          <div className="content-section mb-6">
            <h2>{t.weekCalculation.title}</h2>
            <p>
              {t.weekCalculation.content}
            </p>
            
            <h2>{t.dueDateCalculation.title}</h2>
            <p>
              {t.dueDateCalculation.content1}
            </p>
            <p>
              {t.dueDateCalculation.content2}
            </p>
            <p>
              {t.dueDateCalculation.content3}
            </p>
            <p>
              {t.dueDateCalculation.content4}
            </p>
            <p className="italic text-gray-600">
              {t.dueDateCalculation.note}
            </p>
            
            <h2>{t.pregnancyPrecautions.title}</h2>
            <p>
              {t.pregnancyPrecautions.content}
            </p>
            
            <PregnancyTimeline currentWeeks={currentWeeks} />
            
            <ul className="mb-4">
              {t.pregnancyPrecautions.generalPrecautions.map((precaution, index) => (
                <li key={index}>{precaution}</li>
              ))}
            </ul>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">{t.pregnancyPrecautions.firstTrimester.title}</h3>
                <h4 className="font-medium">{t.pregnancyPrecautions.firstTrimester.diet.title}</h4>
                <ul className="mb-2">
                  {t.pregnancyPrecautions.firstTrimester.diet.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="font-medium">{t.pregnancyPrecautions.firstTrimester.discomfort.title}</h4>
                <ul className="mb-2">
                  {t.pregnancyPrecautions.firstTrimester.discomfort.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="font-medium">{t.pregnancyPrecautions.firstTrimester.exercise.title}</h4>
                <ul>
                  {t.pregnancyPrecautions.firstTrimester.exercise.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">{t.pregnancyPrecautions.secondTrimester.title}</h3>
                <h4 className="font-medium">{t.pregnancyPrecautions.secondTrimester.diet.title}</h4>
                <ul className="mb-2">
                  {t.pregnancyPrecautions.secondTrimester.diet.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="font-medium">{t.pregnancyPrecautions.secondTrimester.weight.title}</h4>
                <ul className="mb-2">
                  {t.pregnancyPrecautions.secondTrimester.weight.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="font-medium">{t.pregnancyPrecautions.secondTrimester.skin.title}</h4>
                <ul>
                  {t.pregnancyPrecautions.secondTrimester.skin.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">{t.pregnancyPrecautions.thirdTrimester.title}</h3>
                <h4 className="font-medium">{t.pregnancyPrecautions.thirdTrimester.diet.title}</h4>
                <ul className="mb-2">
                  {t.pregnancyPrecautions.thirdTrimester.diet.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="font-medium">{t.pregnancyPrecautions.thirdTrimester.sleep.title}</h4>
                <ul className="mb-2">
                  {t.pregnancyPrecautions.thirdTrimester.sleep.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="font-medium">{t.pregnancyPrecautions.thirdTrimester.observation.title}</h4>
                <ul>
                  {t.pregnancyPrecautions.thirdTrimester.observation.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <h2>{t.prenatalCheckup.title}</h2>
            <p>
              {t.prenatalCheckup.content1}
            </p>
            <p>
              {t.prenatalCheckup.content2}
              <a href="https://womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline font-semibold underline" aria-label="美國婦女健康辦公室網站，將在新視窗開啟">
                {t.prenatalCheckup.source}
              </a>
              {t.prenatalCheckup.content3}
            </p>
            <ul className="mb-2">
              {t.prenatalCheckup.checkupFrequency.map((frequency, index) => (
                <li key={index}>{frequency}</li>
              ))}
            </ul>
            <p className="italic text-gray-600">
              {t.prenatalCheckup.note}
            </p>
            
            <h2>{t.highRiskPregnancy.title}</h2>
            <p>
              {t.highRiskPregnancy.content1}
              <a href="https://womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests#6" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline font-semibold underline" aria-label="美國婦女健康辦公室(OWH)網站，將在新視窗開啟">
                {t.highRiskPregnancy.source}
              </a>
              {t.highRiskPregnancy.content2}
            </p>
            <ul className="mb-2">
              {t.highRiskPregnancy.riskFactors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
            <p>
              {t.highRiskPregnancy.content3}
            </p>
            <p>
              {t.highRiskPregnancy.content4}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}