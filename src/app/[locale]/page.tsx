import { Metadata } from 'next';
import { getFullUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 定義多語言內容
type LocaleContent = {
  title: string;
  description: string;
  subtitle: string;
  keywords: string;
  homeTitle: string;
  homeSubtitle: string;
  breadcrumbName: string;
  cardImageSearch: {
    title: string;
    description: string;
    startUsing: string;
  };
  cardDateCalculator: {
    title: string;
    description: string;
    startUsing: string;
  };
  cardDueDateCalculator: {
    title: string;
    description: string;
    startUsing: string;
  };
  cardGiftExchange: {
    title: string;
    description: string;
    startUsing: string;
  };
  whyChoose: {
    title: string;
    free: {
      title: string;
      description: string;
    };
    secure: {
      title: string;
      description: string;
    };
    mobile: {
      title: string;
      description: string;
    };
  };
  commitment: string;
  contactSuggestion: string;
};

// 定義各語言的內容
const localeContents: Record<string, LocaleContent> = {
  'zh': {
    title: 'fyimg - 免費線上工具',
    description: 'fyimg網站提供圖片搜尋、日期計算器、預產期計算以及交換禮物抽籤等多種免費實用工具，幫助您提高工作與生活效率。',
    subtitle: '提供各種實用工具，讓您的工作和生活更加便利高效',
    keywords: '以圖搜圖, 日期計算器, 預產期計算器, 交換禮物抽籤, 線上工具',
    homeTitle: 'fyimg | 免費線上工具',
    homeSubtitle: '提供各種實用工具，讓您的工作和生活更加便利高效',
    breadcrumbName: '首頁',
    cardImageSearch: {
      title: '圖片搜尋',
      description: '透過上傳圖片或輸入URL，一鍵使用Google、Bing、Yandex等搜尋引擎進行反向圖片搜尋。支援手機與iPhone使用。',
      startUsing: '開始使用'
    },
    cardDateCalculator: {
      title: '日期計算器',
      description: '計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理與工期規劃。',
      startUsing: '開始使用'
    },
    cardDueDateCalculator: {
      title: '預產期計算器',
      description: '根據最後一次月經日期，計算預產期和懷孕週數。提供孕期照護要點，幫助準媽媽平安度過懷孕過程。',
      startUsing: '開始使用'
    },
    cardGiftExchange: {
      title: '交換禮物抽籤',
      description: '輸入參與者名單，一鍵隨機分配送禮對象，支援排除特定配對，適合公司、朋友聚會使用的抽籤工具。',
      startUsing: '開始使用'
    },
    whyChoose: {
      title: '為什麼選擇 fyimg 工具',
      free: {
        title: '完全免費',
        description: '所有工具無需付費，無需註冊即可使用'
      },
      secure: {
        title: '隱私保護',
        description: '不保存敏感資料，無追蹤，保護用戶隱私'
      },
      mobile: {
        title: '支援手機',
        description: '所有工具完美支援手機與平板設備'
      }
    },
    commitment: 'fyimg 致力於提供簡單易用且實用的線上工具，讓您的工作和生活更加便利。我們不斷優化和開發新功能，為用戶提供最佳體驗。',
    contactSuggestion: '有任何建議？請聯絡我們 →'
  },
  'en': {
    title: 'fyimg - Free Online Tools',
    description: 'The fyimg website offers a variety of free useful tools including image search, date calculator, due date calculator, and gift exchange drawing to help you improve work and life efficiency.',
    subtitle: 'Providing various practical tools to make your work and life more convenient and efficient',
    keywords: 'reverse image search, date calculator, due date calculator, gift exchange draw, online tools',
    homeTitle: 'fyimg | Free Online Tools',
    homeSubtitle: 'Providing various practical tools to make your work and life more convenient and efficient',
    breadcrumbName: 'Home',
    cardImageSearch: {
      title: 'Image Search',
      description: 'Search with Google, Bing, Yandex and other search engines by uploading an image or entering a URL. Supports mobile and iPhone use.',
      startUsing: 'Start Using'
    },
    cardDateCalculator: {
      title: 'Date Calculator',
      description: 'Calculate the difference between two dates, calendar days, and add or subtract days from a specified date. Suitable for project management and work planning.',
      startUsing: 'Start Using'
    },
    cardDueDateCalculator: {
      title: 'Due Date Calculator',
      description: 'Calculate due date and pregnancy weeks based on last menstrual period. Provides pregnancy care points to help expectant mothers through pregnancy safely.',
      startUsing: 'Start Using'
    },
    cardGiftExchange: {
      title: 'Gift Exchange Draw',
      description: 'Enter a list of participants, randomly assign gift recipients with one click, support excluding specific pairings. Suitable for company and friend gatherings.',
      startUsing: 'Start Using'
    },
    whyChoose: {
      title: 'Why Choose fyimg Tools',
      free: {
        title: 'Completely Free',
        description: 'All tools are free to use without payment or registration'
      },
      secure: {
        title: 'Privacy Protected',
        description: 'No sensitive data storage, no tracking, protects user privacy'
      },
      mobile: {
        title: 'Mobile Support',
        description: 'All tools perfectly support mobile phones and tablet devices'
      }
    },
    commitment: 'fyimg is committed to providing simple, easy-to-use, and practical online tools to make your work and life more convenient. We continuously optimize and develop new features to provide the best experience for users.',
    contactSuggestion: 'Have any suggestions? Please contact us →'
  },
  'jp': {
    title: 'fyimg - 無料オンラインツール',
    description: 'fyimgウェブサイトは、画像検索、日付計算機、出産予定日計算機、ギフト交換抽選など、様々な無料の実用的なツールを提供し、仕事と生活の効率性を向上させるのに役立ちます。',
    subtitle: '様々な実用的なツールを提供し、あなたの仕事と生活をより便利で効率的にします',
    keywords: '画像検索, 日付計算機, 出産予定日計算機, ギフト交換抽選, オンラインツール',
    homeTitle: 'fyimg | 無料オンラインツール',
    homeSubtitle: '様々な実用的なツールを提供し、あなたの仕事と生活をより便利で効率的にします',
    breadcrumbName: 'ホーム',
    cardImageSearch: {
      title: '画像検索',
      description: '画像をアップロードするかURLを入力して、Google、Bing、Yandexなどの検索エンジンでリバース画像検索を行います。モバイルとiPhoneに対応しています。',
      startUsing: '使用開始'
    },
    cardDateCalculator: {
      title: '日付計算機',
      description: '2つの日付間の差、カレンダー日数の計算、指定された日付からの日数の加減算を計算します。プロジェクト管理や工期計画に適しています。',
      startUsing: '使用開始'
    },
    cardDueDateCalculator: {
      title: '出産予定日計算機',
      description: '最終月経日に基づいて出産予定日と妊娠週数を計算します。妊娠中のケアポイントを提供し、妊婦さんが安全に妊娠過程を経過するのを助けます。',
      startUsing: '使用開始'
    },
    cardGiftExchange: {
      title: 'ギフト交換抽選',
      description: '参加者リストを入力し、ワンクリックでギフトの受取人をランダムに割り当て、特定のペアリングの除外をサポート。会社や友人の集まりに適しています。',
      startUsing: '使用開始'
    },
    whyChoose: {
      title: 'なぜfyimgツールを選ぶのか',
      free: {
        title: '完全無料',
        description: 'すべてのツールは支払いや登録なしで無料で使用できます'
      },
      secure: {
        title: 'プライバシー保護',
        description: '機密データを保存せず、追跡なし、ユーザープライバシーを保護'
      },
      mobile: {
        title: 'モバイル対応',
        description: 'すべてのツールはスマートフォンとタブレットを完全にサポート'
      }
    },
    commitment: 'fyimgは、シンプルで使いやすく、実用的なオンラインツールを提供し、あなたの仕事と生活をより便利にすることに専念しています。私たちは継続的に最適化し、新機能を開発して、ユーザーに最高の体験を提供します。',
    contactSuggestion: '何か提案がありますか？お問い合わせください →'
  },
  'es': {
    title: 'fyimg - Herramientas Online Gratuitas',
    description: 'El sitio web fyimg ofrece una variedad de herramientas útiles gratuitas incluyendo búsqueda de imágenes, calculadora de fechas, calculadora de fecha de parto y sorteo de intercambio de regalos para ayudarte a mejorar la eficiencia en el trabajo y la vida.',
    subtitle: 'Proporcionando diversas herramientas prácticas para hacer tu trabajo y vida más conveniente y eficiente',
    keywords: 'buscar por imagen, calculadora de fechas, calculadora de fecha de parto, sorteo de intercambio de regalos, herramientas online',
    homeTitle: 'fyimg | Herramientas Online Gratuitas',
    homeSubtitle: 'Proporcionando diversas herramientas prácticas para hacer tu trabajo y vida más conveniente y eficiente',
    breadcrumbName: 'Inicio',
    cardImageSearch: {
      title: 'Buscar por Imagen',
      description: 'Busca con Google, Bing, Yandex y otros motores de búsqueda subiendo una imagen o ingresando una URL. Compatible con móviles e iPhone.',
      startUsing: 'Comenzar a Usar'
    },
    cardDateCalculator: {
      title: 'Calculadora de Fechas',
      description: 'Calcula la diferencia entre dos fechas, días del calendario, y suma o resta días desde una fecha específica. Ideal para gestión de proyectos y planificación laboral.',
      startUsing: 'Comenzar a Usar'
    },
    cardDueDateCalculator: {
      title: 'Calculadora de Fecha de Parto',
      description: 'Calcula la fecha de parto y semanas de embarazo basándose en la última menstruación. Proporciona consejos de cuidado prenatal para ayudar a las futuras madres durante el embarazo.',
      startUsing: 'Comenzar a Usar'
    },
    cardGiftExchange: {
      title: 'Sorteo de Intercambio de Regalos',
      description: 'Ingresa una lista de participantes, asigna aleatoriamente receptores de regalos con un clic, permite excluir emparejamientos específicos. Ideal para empresas y reuniones de amigos.',
      startUsing: 'Comenzar a Usar'
    },
    whyChoose: {
      title: 'Por Qué Elegir las Herramientas fyimg',
      free: {
        title: 'Completamente Gratis',
        description: 'Todas las herramientas son gratuitas sin pago ni registro requerido'
      },
      secure: {
        title: 'Privacidad Protegida',
        description: 'No almacena datos sensibles, sin rastreo, protege la privacidad del usuario'
      },
      mobile: {
        title: 'Compatible con Móviles',
        description: 'Todas las herramientas son perfectamente compatibles con teléfonos móviles y tablets'
      }
    },
    commitment: 'fyimg se compromete a proporcionar herramientas online simples, fáciles de usar y prácticas para hacer tu trabajo y vida más conveniente. Continuamente optimizamos y desarrollamos nuevas funciones para brindar la mejor experiencia a los usuarios.',
    contactSuggestion: '¿Tienes alguna sugerencia? Por favor contáctanos →'
  }
};

// 動態元數據生成函數
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // 使用 await 解析 params
  const { locale = 'zh' } = await params;
  const content = localeContents[locale] || localeContents.zh;
  
  // 設置 OpenGraph 語言格式
  const ogLocale = locale === 'zh' ? 'zh_TW' : locale === 'jp' ? 'ja_JP' : locale === 'es' ? 'es_ES' : 'en_US';
  
  const imageUrl = getFullUrl('/og-image.png');
  
  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url: getFullUrl(locale === 'zh' ? '/' : `/${locale}/`),
      locale: ogLocale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: content.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      creator: '@fyimg',
      site: '@fyimg',
      images: [imageUrl],
    },
    keywords: content.keywords,
    authors: [{ name: 'fyimg' }],
    creator: 'fyimg',
    publisher: 'fyimg',
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  // 使用 await 解析 params
  const { locale = 'zh' } = await params;
  const content = localeContents[locale] || localeContents.zh;
  
  // 生成結構化數據
  const language = locale === 'zh' ? 'zh-TW' : locale === 'jp' ? 'ja' : locale === 'es' ? 'es' : 'en';
  const imageUrl = getFullUrl('/og-image.png');
  const { created, modified } = getPageDates('src/app/[locale]/page.tsx');

  // 準備結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/', content.breadcrumbName);
  const webPageSchema = generateWebPageSchema(
    '/',
    content.title,
    content.description,
    imageUrl,
    language,
    created,
    modified
  );
  
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
            <span className="text-white">{content.homeTitle.split(' | ')[1]}</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white font-light drop-shadow-md">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* 工具窗格區域 */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* 圖片搜尋窗格 */}
            <Link href={`/${locale === 'zh' ? '' : locale + '/'}image-search`} className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/images/og-image-search.png" 
                    alt={content.cardImageSearch.title} 
                    width={600}
                    height={315}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-200 shadow-inner py-1 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="p-6 flex flex-col h-64">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {content.cardImageSearch.title}
                  </h2>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5rem]">
                    {content.cardImageSearch.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-blue-600 group-hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                      {content.cardImageSearch.startUsing}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 日期計算器窗格 */}
            <Link href={`/${locale === 'zh' ? '' : locale + '/'}date`} className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/images/og-date.png" 
                    alt={content.cardDateCalculator.title}
                    width={600}
                    height={315}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-200 shadow-inner py-1 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="p-6 flex flex-col h-64">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {content.cardDateCalculator.title}
                  </h2>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5rem]">
                    {content.cardDateCalculator.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-green-600 group-hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                      {content.cardDateCalculator.startUsing}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 預產期計算器窗格 */}
            <Link href={`/${locale === 'zh' ? '' : locale + '/'}due-date-calculator`} className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/images/og-due-date-calculator.webp" 
                    alt={content.cardDueDateCalculator.title} 
                    width={600}
                    height={315}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-200 shadow-inner py-1 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="p-6 flex flex-col h-64">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {content.cardDueDateCalculator.title}
                  </h2>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5rem]">
                    {content.cardDueDateCalculator.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-purple-600 group-hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                      {content.cardDueDateCalculator.startUsing}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 禮物交換抽籤窗格 */}
            <Link href={`/${locale === 'zh' ? '' : locale + '/'}gift-exchange`} className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/images/og-gift-exchange.png" 
                    alt={content.cardGiftExchange.title} 
                    width={600}
                    height={315}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-200 shadow-inner py-1 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="p-6 flex flex-col h-64">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {content.cardGiftExchange.title}
                  </h2>
                  <p className="text-gray-600 mb-4 flex-grow min-h-[4.5rem]">
                    {content.cardGiftExchange.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-red-600 group-hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                      {content.cardGiftExchange.startUsing}
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
          <h2 className="text-3xl font-bold text-center mb-8">{content.whyChoose.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.whyChoose.free.title}</h3>
              <p className="text-gray-600">{content.whyChoose.free.description}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.whyChoose.secure.title}</h3>
              <p className="text-gray-600">{content.whyChoose.secure.description}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.whyChoose.mobile.title}</h3>
              <p className="text-gray-600">{content.whyChoose.mobile.description}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              {content.commitment}
            </p>
            <Link href={`/${locale === 'zh' ? '' : locale + '/'}contact`} className="text-blue-600 hover:text-blue-800 font-medium">
              {content.contactSuggestion}
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}