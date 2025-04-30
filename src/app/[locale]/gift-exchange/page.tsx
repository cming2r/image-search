'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GiftExchangeWheel from "./components/GiftExchangeWheel";
import translations from './translations.json';

export default function GiftExchange() {
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

          <GiftExchangeWheel />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">{t.howToUse.title}</h2>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2">
                {t.howToUse.steps.map((step, index) => (
                  <li key={index} className="pl-2">
                    <span className="font-medium">{step.step}：</span>
                    {step.description}
                    {step.options && (
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-700">
                        {step.options.map((option, i) => (
                          <li key={i}><span className="italic">{option.split(' - ')[0]}</span> - {option.split(' - ')[1]}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
              <div className="bg-blue-50 p-3 rounded-lg mt-4">
                <p className="text-blue-700 font-medium">{t.howToUse.tip}：</p>
                <p className="text-blue-600 text-sm">{t.howToUse.tipContent}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">{t.whatIs.title}</h2>
            <div className="space-y-3">
              {t.whatIs.content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h3 className="font-medium text-green-700">{t.whatIs.types.title}</h3>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-green-700">
                    {t.whatIs.types.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg">
                  <h3 className="font-medium text-amber-700">{t.whatIs.benefits.title}</h3>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-amber-700">
                    {t.whatIs.benefits.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <p className="mt-3">
                {t.whatIs.conclusion}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">{t.faqs.title}</h2>
            
            <div className="space-y-6">
              {t.faqs.questions.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-blue-700">{faq.question}</h3>
                  <p className="mt-2">
                    {faq.answer}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium text-blue-700">{t.whyChooseUs.features.funInteraction.title}</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  {t.whyChooseUs.features.funInteraction.content}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="font-medium text-purple-700">{t.whyChooseUs.features.easyToUse.title}</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  {t.whyChooseUs.features.easyToUse.content}
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <h3 className="font-medium text-amber-700">{t.whyChooseUs.features.autoSave.title}</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  {t.whyChooseUs.features.autoSave.content}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="font-medium text-cyan-700">{t.whyChooseUs.features.fair.title}</h3>
                </div>
                <p className="text-cyan-700 text-sm">
                  {t.whyChooseUs.features.fair.content}
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