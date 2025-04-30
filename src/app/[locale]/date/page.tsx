'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DateCalculator from "./components/DateCalculator";
import { useParams } from "next/navigation";
import translations from "./translations.json";

export default function DatePage() {
  // 從URL參數中獲取當前語言
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  
  // 獲取對應語言的翻譯
  const t = translations[locale as keyof typeof translations] || translations.zh;
  
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          {/* 標題區 */}
          <div className="title-container">
            <h1>{t.meta.title}</h1>
            <p>{t.meta.description}</p>
          </div>
          
          <DateCalculator />
          
          {/* 說明區 */}
          <div className="content-section">
            <h2>{t.about.title}</h2>
            <p>
              {t.about.description}
            </p>
            <ul>
              {t.about.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p>
              {t.about.usage}
            </p>
          </div>
          
          {/* 日曆天說明區 */}
          <div className="content-section">
            <h2>{t.calendarDays.definition.title}</h2>
            <p>{t.calendarDays.definition.p1}</p>
            <p>{t.calendarDays.definition.p2}</p>
            <p>{t.calendarDays.definition.p3}</p>
            <p>{t.calendarDays.definition.p4}</p>
            
            <h2>{t.calendarDays.difference.title}</h2>
            <p>{t.calendarDays.difference.p1}</p>
            <p>{t.calendarDays.difference.p2}</p>
            
            <h2>{t.calendarDays.application.title}</h2>
            <ul>
              {t.calendarDays.application.items.map((item, index) => (
                <li key={index} className="mb-2">
                  <strong>{item.title}</strong>
                  {item.content}
                </li>
              ))}
            </ul>
            
            <h2>{t.calendarDays.considerations.title}</h2>
            <ul className="list-disc pl-6 mb-3">
              {t.calendarDays.considerations.items.map((item, index) => (
                <li key={index} className="mb-2">
                  <strong>{item.title}</strong>
                  {item.content}
                </li>
              ))}
            </ul>
            
            <p>
              {t.calendarDays.considerations.conclusion}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}