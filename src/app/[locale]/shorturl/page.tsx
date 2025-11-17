'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShortUrl from "@/app/[locale]/shorturl/components/shorturl";
import ArticleContent from "./components/ArticleContent";
import { shorturlTranslations } from './components/meta-translations';

export default function ShortUrlPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>{shorturlTranslations.meta.title[lang]}</h1>
            <p>
              {shorturlTranslations.meta.description[lang]}
            </p>
          </div>

          <ShortUrl />

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}