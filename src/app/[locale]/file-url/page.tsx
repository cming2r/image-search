'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUrlUpload from "./components/FileUrlUpload";
import ArticleContent from "./components/ArticleContent";
import { fileUrlTranslations } from './components/meta-translations';

export default function FileUrlPage() {
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
              {fileUrlTranslations.meta.title[lang]}
            </h1>
            <p className="text-lg text-gray-600">
              {fileUrlTranslations.meta.description[lang]}
            </p>
          </div>

          <FileUrlUpload locale={locale} />

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}