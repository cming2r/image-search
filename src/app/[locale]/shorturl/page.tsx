'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShortUrl from "@/app/[locale]/shorturl/components/shorturl";

export default function ShortUrlPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';

  const titles = {
    zh: '短網址產生器',
    en: 'URL Shortener',
    jp: 'URL短縮ツール'
  };

  const subtitles = {
    zh: '快速將長網址縮短為易於分享的短連結',
    en: 'Quickly shorten long URLs into easy-to-share short links',
    jp: '長いURLを簡単に共有できる短いリンクに素早く短縮'
  };

  const title = titles[locale as keyof typeof titles] || titles.zh;
  const subtitle = subtitles[locale as keyof typeof subtitles] || subtitles.zh;

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>

          <ShortUrl />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">使用方法</h2>
            <ol className="ml-6 list-decimal space-y-2 mt-4">
              <li>在上方輸入框中貼上或輸入您想要縮短的長網址</li>
              <li>點擊「縮短網址」按鈕</li>
              <li>複製產生的短網址並分享給其他人</li>
            </ol>

            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <p className="text-blue-700 font-medium flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                小提示<br />
                確保您輸入的是完整且有效的網址，並包含 http:// 或 https://
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">什麼是短網址？</h2>
            <div className="space-y-4">
              <p>
                短網址（URL Shortener）是一種將冗長的網址轉換成簡短、易於分享連結的工具。當您有一個非常長的網址時，短網址可以幫助您：
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>在社交媒體上更容易分享</li>
                <li>減少訊息中的字符數量</li>
                <li>讓網址看起來更簡潔美觀</li>
                <li>便於記憶和輸入</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-3">使用場景</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <h3 className="font-medium text-blue-700">社交媒體分享</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  在 Facebook、Twitter、LINE 等平台分享文章或商品連結時更簡潔
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <h3 className="font-medium text-green-700">即時通訊</h3>
                </div>
                <p className="text-green-700 text-sm">
                  在 WhatsApp、Telegram 等即時通訊軟體中傳送連結更方便
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="font-medium text-purple-700">行銷宣傳</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  在印刷品、名片、廣告中使用簡短易讀的網址
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-medium text-amber-700">統計追蹤</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  監控連結點擊次數及用戶來源分析（即將推出）
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}