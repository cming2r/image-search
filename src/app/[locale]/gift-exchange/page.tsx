'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GiftExchangeWheel from "./components/GiftExchangeWheel";
import ArticleContent from "./components/ArticleContent";
import { giftExchangeTranslations } from './components/meta-translations';

export default function GiftExchange() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>{giftExchangeTranslations.meta.title[lang]}</h1>
            <p>
              {giftExchangeTranslations.meta.description[lang]}
            </p>
          </div>

          <GiftExchangeWheel />

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}