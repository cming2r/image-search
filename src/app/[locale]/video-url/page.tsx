'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoUrlUpload from "./components/VideoUrlUpload";
import ArticleContent from "./components/ArticleContent";
import { videoUrlTranslations } from './components/meta-translations';

export default function VideoUrlPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1>
              {videoUrlTranslations.meta.title[lang]}
            </h1>
            <p className="text-lg text-gray-600">
              {videoUrlTranslations.meta.description[lang]}
            </p>
          </div>

          <VideoUrlUpload locale={locale} />

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}