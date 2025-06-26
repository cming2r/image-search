'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageForm from "@/app/[locale]/image-search/components/ImageForm";
import ArticleContent from "./components/ArticleContent";
import { imageSearchTranslations } from './components/meta-translations';

export default function ImageSearch() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
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

          <ImageForm />

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}