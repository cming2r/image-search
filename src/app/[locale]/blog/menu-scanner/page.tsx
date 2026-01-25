'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { menuScannerTranslations } from './components/meta-translations';
import { Camera, Share2, BarChart3, Settings, ArrowRight, ExternalLink, Utensils, Coffee, Users, Calendar } from 'lucide-react';

export default function MenuScannerPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';

  const t = (key: keyof typeof menuScannerTranslations.content) => {
    return menuScannerTranslations.content[key][lang] || menuScannerTranslations.content[key].tw;
  };

  const useCaseIcons = [Utensils, Coffee, Users, Calendar];
  const useCases = ['useCase1', 'useCase2', 'useCase3', 'useCase4'] as const;

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://diin.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  {t('tryNow')}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
                <span className="inline-flex items-center justify-center px-6 py-4 bg-blue-500/30 text-white rounded-lg">
                  {t('freeToUse')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Camera className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {t('feature1Title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('feature1Desc')}
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <Share2 className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {t('feature2Title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('feature2Desc')}
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                    <BarChart3 className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {t('feature3Title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('feature3Desc')}
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                    <Settings className="h-7 w-7 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {t('feature4Title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('feature4Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
                {t('howItWorksTitle')}
              </h2>

              <div className="grid md:grid-cols-4 gap-6">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">{t('step1Title')}</h3>
                  <p className="text-sm text-gray-600">{t('step1Desc')}</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-gray-300 -mt-8" />
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">{t('step2Title')}</h3>
                  <p className="text-sm text-gray-600">{t('step2Desc')}</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-gray-300 -mt-8" />
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">{t('step3Title')}</h3>
                  <p className="text-sm text-gray-600">{t('step3Desc')}</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-gray-300 -mt-8" />
                </div>

                {/* Step 4 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    4
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">{t('step4Title')}</h3>
                  <p className="text-sm text-gray-600">{t('step4Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
                {t('useCaseTitle')}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {useCases.map((useCase, index) => {
                  const Icon = useCaseIcons[index];
                  return (
                    <div key={useCase} className="bg-white rounded-xl p-6 text-center shadow-sm">
                      <Icon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium">{t(useCase)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {t('ctaTitle')}
              </h2>
              <a
                href="https://diin.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-lg"
              >
                {t('ctaButton')}
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
