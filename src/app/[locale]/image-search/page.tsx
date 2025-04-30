'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageForm from "@/app/[locale]/image-search/components/ImageForm";
import translations from './translations.json';

export default function ImageSearch() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const t = translations[locale as keyof typeof translations] || translations.zh;

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>{t.title}</h1>
            <p>
              {t.subtitle}
            </p>
          </div>

          <ImageForm />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">{t.howToUse.title}</h2>
            <ol className="ml-6 list-decimal space-y-2 mt-4">
              {t.howToUse.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <p className="text-blue-700 font-medium flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.howToUse.tip}<br />
                {t.howToUse.tipContent}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">{t.whatIs.title}</h2>
            <div className="space-y-4">
              {t.whatIs.content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">{t.searchEngines.title}</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">{t.searchEngines.google.title}</h3>
                <div className="mt-3 space-y-3">
                  {t.searchEngines.google.content.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-teal-700">{t.searchEngines.bing.title}</h3>
                <div className="mt-3 space-y-3">
                  {t.searchEngines.bing.content.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-red-700">{t.searchEngines.yandex.title}</h3>
                <div className="mt-3 space-y-3">
                  {t.searchEngines.yandex.content.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-purple-700">{t.searchEngines.sauceNAO.title}</h3>
                <div className="mt-3 space-y-3">
                  {t.searchEngines.sauceNAO.content.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-gray-700">{t.searchEngines.tineye.title}</h3>
                <div className="mt-3 space-y-3">
                  {t.searchEngines.tineye.content.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-red-600 font-medium mt-2 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{t.searchEngines.tineye.note}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-3">{t.useCases.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="font-medium text-blue-700">{t.useCases.cases.verifyImage.title}</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  {t.useCases.cases.verifyImage.content}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                  <h3 className="font-medium text-green-700">{t.useCases.cases.findMaterials.title}</h3>
                </div>
                <p className="text-green-700 text-sm">
                  {t.useCases.cases.findMaterials.content}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <h3 className="font-medium text-purple-700">{t.useCases.cases.identifyObjects.title}</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  {t.useCases.cases.identifyObjects.content}
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  <h3 className="font-medium text-amber-700">{t.useCases.cases.animeSource.title}</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  {t.useCases.cases.animeSource.content}
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="font-medium text-red-700">{t.useCases.cases.protectCopyright.title}</h3>
                </div>
                <p className="text-red-700 text-sm">
                  {t.useCases.cases.protectCopyright.content}
                </p>
              </div>
              
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <h3 className="font-medium text-cyan-700">{t.useCases.cases.findProducts.title}</h3>
                </div>
                <p className="text-cyan-700 text-sm">
                  {t.useCases.cases.findProducts.content}
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
              <p className="text-lg font-medium text-indigo-700">
                {t.useCases.callToAction.title}
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                {t.useCases.callToAction.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">{t.faq.title}</h2>
            
            <div className="space-y-6">
              {t.faq.questions.map((item, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-blue-700">{item.question}</h3>
                  <p className="mt-2">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-3">{t.whyChooseUs.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium text-blue-700">{t.whyChooseUs.features.multiEngine.title}</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  {t.whyChooseUs.features.multiEngine.content}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium text-green-700">{t.whyChooseUs.features.free.title}</h3>
                </div>
                <p className="text-green-700 text-sm">
                  {t.whyChooseUs.features.free.content}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-medium text-purple-700">{t.whyChooseUs.features.crossPlatform.title}</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  {t.whyChooseUs.features.crossPlatform.content}
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="font-medium text-amber-700">{t.whyChooseUs.features.easyToUse.title}</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  {t.whyChooseUs.features.easyToUse.content}
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="font-medium text-red-700">{t.whyChooseUs.features.privacy.title}</h3>
                </div>
                <p className="text-red-700 text-sm">
                  {t.whyChooseUs.features.privacy.content}
                </p>
              </div>
              
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <h3 className="font-medium text-cyan-700">{t.whyChooseUs.features.clean.title}</h3>
                </div>
                <p className="text-cyan-700 text-sm">
                  {t.whyChooseUs.features.clean.content}
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
              <p className="text-lg font-medium text-indigo-700">
                {t.whyChooseUs.callToAction.title}
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                {t.whyChooseUs.callToAction.subtitle}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}