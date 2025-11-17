'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageForm from "@/app/[locale]/image-search/components/ImageForm";
import ArticleContent from "./components/ArticleContent";
import { imageSearchTranslations } from './components/meta-translations';

export default function ImageSearch() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>{imageSearchTranslations.meta.title[lang]}</h1>
            <p>
              {imageSearchTranslations.meta.description[lang]}
            </p>
          </div>

          <Suspense fallback={
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          }>
            <ImageForm />
          </Suspense>

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}