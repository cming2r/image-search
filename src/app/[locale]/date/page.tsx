'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DateCalculator from "./components/DateCalculator";
import ArticleContent from "./components/ArticleContent";
import { useParams } from "next/navigation";
import { metaTranslations } from "./components/meta-translations";

export default function DatePage() {
  // 從URL參數中獲取當前語言
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  

  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          {/* 標題區 */}
          <div className="title-container">
            <h1>{metaTranslations.meta.title[lang]}</h1>
            <p>{metaTranslations.meta.description[lang]}</p>
          </div>
          
          <DateCalculator />
          
          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}