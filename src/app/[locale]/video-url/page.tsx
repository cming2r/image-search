'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoUrlUpload from "./components/VideoUrlUpload";
import ArticleContent from "./components/ArticleContent";
import { videoUrlTranslations } from './components/meta-translations';

export default function VideoUrlPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

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
              <a href="https://vvrl.cc/video">
    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
Page testing... Visit vvrl.cc
    </button>
  </a>
          </div>

          <VideoUrlUpload locale={locale} />

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}