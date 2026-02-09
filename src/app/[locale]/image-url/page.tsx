'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUrlUpload from "./components/ImageUrlUpload";
import ArticleContent from "./components/ArticleContent";
import { imageUrlTranslations } from './components/meta-translations';

export default function ImageUrlPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';

  return (
    <>
      <Header />
      <main className="grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1>
              {imageUrlTranslations.meta.title[lang]}
            </h1>
            <p className="text-lg text-gray-600">
              {imageUrlTranslations.meta.description[lang]}
            </p>
          </div>

          <ImageUrlUpload locale={locale} />

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}