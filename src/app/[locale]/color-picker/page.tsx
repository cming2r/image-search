'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ColorPicker from "@/app/[locale]/color-picker/components/ColorPicker";
import ArticleContent from "./components/ArticleContent";
import { colorPickerTranslations } from './components/meta-translations';

export default function ColorPickerPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1>{colorPickerTranslations.meta.title[lang]}</h1>
            <p>
              {colorPickerTranslations.meta.description[lang]}
            </p>
          </div>

          <ColorPicker />

          <ArticleContent locale={locale} />
        </section>
      </main>
      <Footer />
    </>
  );
}