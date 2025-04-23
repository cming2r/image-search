import { Metadata } from 'next';
import { getFullUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 準備結構化數據所需的變數
const title = 'fyimg - 免費線上工具';
const description = 'fyimg網站提供圖片搜尋、日期計算器、預產期計算以及交換禮物抽籤等多種免費實用工具，幫助您提高工作與生活效率。';
const imageUrl = getFullUrl('/og-image.png');
const { created: datePublished, modified: dateModified } = getPageDates('src/app/page.tsx');
const language = 'zh-TW';

// 準備結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/', '首頁');
const webPageSchema = generateWebPageSchema(
  '/',
  title,
  description,
  imageUrl,
  language,
  datePublished,
  dateModified
);

// 為主頁設置明確的元數據
export const metadata: Metadata = {
  // 只覆蓋需要特定化的元數據，其他保留根layout設置
  // metadataBase 會從根 layout 繼承，不需要重複設置
  title,
  description,
  // 不需要重複設置 alternates.canonical，因為根layout已設置
  openGraph: {
    title,  // 不需要添加 " | fyimg"，因為根layout已設置模板
    description,
    // type, locale, siteName 會從根layout繼承
    url: getFullUrl('/'),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'fyimg 免費線上工具',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@fyimg',
    site: '@fyimg',
    images: [imageUrl],
  },
  keywords: '以圖搜圖, 日期計算器, 預產期計算器, 交換禮物抽籤, 線上工具',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        {/* 結構化數據 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        
        {/* 網站標題區域 */}
      <section className="w-full py-20 text-center relative overflow-hidden bg-blue-700 bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: "url('/images/home-bg.webp')" }}>
        {/* 半透明遮罩 - 確保文字可讀性 */}
        <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-md">
            <span className="text-white">fyimg</span>
            <span className="mx-2 text-white"> | </span>
            <span className="text-white">免費線上工具</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white font-light drop-shadow-md">
            提供各種實用工具，讓您的工作和生活更加便利高效
          </p>
        </div>
      </section>

      {/* 工具窗格區域 */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* 圖片搜尋窗格 */}
            <Link href="/image-search" className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/images/og-image-search.png" 
                    alt="以圖搜圖工具" 
                    width={600}
                    height={315}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-200 shadow-inner py-1 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="p-6 flex flex-col h-64">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">圖片搜尋</h2>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5rem]">
                    透過上傳圖片或輸入URL，一鍵使用Google、Bing、Yandex等
                    搜尋引擎進行反向圖片搜尋。支援手機與iPhone使用。
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-blue-600 group-hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                      開始使用
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 日期計算器窗格 */}
            <Link href="/date" className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/images/og-date.png" 
                    alt="日期計算器" 
                    width={600}
                    height={315}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-200 shadow-inner py-1 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="p-6 flex flex-col h-64">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">日期計算器</h2>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5rem]">
                    計算兩個日期之間的差距、日曆天數計算，以及從指定日期
                    加減天數。適用於專案管理與工期規劃。
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-green-600 group-hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                      開始使用
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 預產期計算器窗格 */}
            <Link href="/due-date-calculator" className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/images/og-due-date-calculator.webp" 
                    alt="預產期計算器" 
                    width={600}
                    height={315}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-200 shadow-inner py-1 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="p-6 flex flex-col h-64">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">預產期計算器</h2>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5rem]">
                    根據最後一次月經日期，計算預產期和懷孕週數。提供孕期
                    照護要點，幫助準媽媽平安度過懷孕過程。
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-purple-600 group-hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                      開始使用
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 禮物交換抽籤窗格 */}
            <Link href="/gift-exchange" className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/images/og-gift-exchange.png" 
                    alt="交換禮物抽籤工具" 
                    width={600}
                    height={315}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-200 shadow-inner py-1 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="p-6 flex flex-col h-64">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">交換禮物抽籤</h2>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5rem]">
                    輸入參與者名單，一鍵隨機分配送禮對象，支援排除特定
                    配對，適合公司、朋友聚會使用的抽籤工具。
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-red-600 group-hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                      開始使用
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 特色說明區 */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">為什麼選擇 fyimg 工具</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">完全免費</h3>
              <p className="text-gray-600">所有工具無需付費，無需註冊即可使用</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">安全無廣告</h3>
              <p className="text-gray-600">不保存敏感資料，無追蹤，無惱人廣告</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">支援手機</h3>
              <p className="text-gray-600">所有工具完美支援手機與平板設備</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              fyimg 致力於提供簡單易用且實用的線上工具，讓您的工作和生活更加便利。
              我們不斷優化和開發新功能，為用戶提供最佳體驗。
            </p>
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              有任何建議？請聯絡我們 →
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}