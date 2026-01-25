import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { menuScannerTranslations } from './components/meta-translations';

const keywordsList = {
  tw: ['揪團訂餐', '菜單掃描器', 'AI菜單識別', '團購訂餐', '辦公室訂餐', 'DiiN'],
  cn: ['揪团订餐', '菜单扫描器', 'AI菜单识别', '团购订餐', '办公室订餐', 'DiiN'],
  en: ['group order', 'menu scanner', 'AI menu recognition', 'team ordering', 'office food order', 'DiiN'],
  jp: ['グループ注文', 'メニュースキャナー', 'AIメニュー認識', 'チーム注文', 'オフィス注文', 'DiiN'],
  es: ['pedido grupal', 'escáner de menú', 'reconocimiento de menú AI', 'pedidos de equipo', 'pedidos de oficina', 'DiiN']
};

// 多語言FAQ數據
const faqsData = {
  tw: [
    {
      '@type': 'Question',
      name: '什麼是 DiiN 揪團訂餐助手？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN 是一款 AI 驅動的團隊訂餐助手，讓辦公室揪團訂餐變得簡單。只需上傳菜單照片，AI 自動識別菜品和價格，然後分享連結給同事收集訂單，系統會自動統計匯總。'
      }
    },
    {
      '@type': 'Question',
      name: 'DiiN 支援哪些菜單類型？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN 支援各種餐廳和飲品店的菜單，包括中式餐廳、手搖飲料店、便當店、西餐廳等。只要是清晰的菜單照片，AI 都能識別。'
      }
    },
    {
      '@type': 'Question',
      name: '如何分享訂單連結？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '創建訂單後，系統會生成一個專屬連結。您可以直接複製連結，透過 Slack、Teams、WhatsApp、LINE 或任何通訊軟體分享給同事。'
      }
    },
    {
      '@type': 'Question',
      name: 'DiiN 是免費的嗎？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是的，DiiN 提供免費使用。您可以直接訪問 diin.cc 開始使用揪團訂餐功能。'
      }
    }
  ],
  cn: [
    {
      '@type': 'Question',
      name: '什么是 DiiN 揪团订餐助手？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN 是一款 AI 驱动的团队订餐助手，让办公室揪团订餐变得简单。只需上传菜单照片，AI 自动识别菜品和价格，然后分享链接给同事收集订单，系统会自动统计汇总。'
      }
    },
    {
      '@type': 'Question',
      name: 'DiiN 支持哪些菜单类型？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN 支持各种餐厅和饮品店的菜单，包括中式餐厅、手摇饮料店、便当店、西餐厅等。只要是清晰的菜单照片，AI 都能识别。'
      }
    },
    {
      '@type': 'Question',
      name: '如何分享订单链接？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '创建订单后，系统会生成一个专属链接。您可以直接复制链接，透过 Slack、Teams、WhatsApp、LINE 或任何通讯软件分享给同事。'
      }
    },
    {
      '@type': 'Question',
      name: 'DiiN 是免费的吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是的，DiiN 提供免费使用。您可以直接访问 diin.cc 开始使用揪团订餐功能。'
      }
    }
  ],
  en: [
    {
      '@type': 'Question',
      name: 'What is DiiN Group Order Assistant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN is an AI-powered team ordering assistant that makes office group ordering simple. Just upload a menu photo, AI automatically recognizes items and prices, then share the link with colleagues to collect orders, and the system automatically summarizes everything.'
      }
    },
    {
      '@type': 'Question',
      name: 'What types of menus does DiiN support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN supports menus from various restaurants and beverage shops, including Chinese restaurants, bubble tea shops, lunch box stores, Western restaurants, and more. As long as the menu photo is clear, AI can recognize it.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I share the order link?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After creating an order, the system generates a unique link. You can copy the link directly and share it with colleagues via Slack, Teams, WhatsApp, LINE, or any messaging app.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is DiiN free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, DiiN is free to use. You can visit diin.cc directly to start using the group ordering feature.'
      }
    }
  ],
  jp: [
    {
      '@type': 'Question',
      name: 'DiiN グループ注文アシスタントとは？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN は AI 駆動のチーム注文アシスタントで、オフィスのグループ注文を簡単にします。メニュー写真をアップロードするだけで、AI が自動的に商品と価格を認識し、同僚にリンクを共有して注文を収集し、システムが自動的に集計します。'
      }
    },
    {
      '@type': 'Question',
      name: 'DiiN はどのような種類のメニューに対応していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN は中華料理店、タピオカ店、弁当店、洋食店など、さまざまなレストランや飲料店のメニューに対応しています。メニュー写真が鮮明であれば、AI が認識できます。'
      }
    },
    {
      '@type': 'Question',
      name: '注文リンクはどのように共有しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '注文を作成すると、システムが専用リンクを生成します。リンクを直接コピーして、Slack、Teams、WhatsApp、LINE などのメッセージアプリで同僚に共有できます。'
      }
    },
    {
      '@type': 'Question',
      name: 'DiiN は無料ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、DiiN は無料でご利用いただけます。diin.cc に直接アクセスして、グループ注文機能をお使いいただけます。'
      }
    }
  ],
  es: [
    {
      '@type': 'Question',
      name: '¿Qué es el Asistente de Pedidos Grupales DiiN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN es un asistente de pedidos grupales impulsado por IA que hace que los pedidos grupales de oficina sean simples. Solo sube una foto del menú, la IA reconoce automáticamente los artículos y precios, luego comparte el enlace con los colegas para recopilar pedidos, y el sistema resume todo automáticamente.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Qué tipos de menús soporta DiiN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DiiN soporta menús de varios restaurantes y tiendas de bebidas, incluyendo restaurantes chinos, tiendas de bubble tea, tiendas de loncheras, restaurantes occidentales y más. Mientras la foto del menú sea clara, la IA puede reconocerla.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo comparto el enlace del pedido?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Después de crear un pedido, el sistema genera un enlace único. Puedes copiar el enlace directamente y compartirlo con tus colegas a través de Slack, Teams, WhatsApp, LINE o cualquier aplicación de mensajería.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Es DiiN gratis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, DiiN es gratis. Puedes visitar diin.cc directamente para comenzar a usar la función de pedidos grupales.'
      }
    }
  ]
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/blog/menu-scanner/page.tsx');

// 語言對應表
const langMap = {
  'tw': 'zh-TW',
  'cn': 'zh-CN',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片 (可以之後添加)
const imageUrl = getFullUrl('/images/og-menu-scanner.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params;
  const title = menuScannerTranslations.meta.title[locale as keyof typeof menuScannerTranslations.meta.title] || menuScannerTranslations.meta.title.tw;
  const description = menuScannerTranslations.meta.description[locale as keyof typeof menuScannerTranslations.meta.description] || menuScannerTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;

  const ogTitle = locale === 'tw' ? '揪團訂餐助手 - DiiN' :
                  locale === 'cn' ? '揪团订餐助手 - DiiN' :
                  locale === 'en' ? 'Group Order Assistant - DiiN' :
                  locale === 'jp' ? 'グループ注文アシスタント - DiiN' :
                  'Asistente de Pedidos Grupales - DiiN';

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,

    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'en' ? '/blog/menu-scanner' : `/${locale}/menu-scanner`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'tw' ? '揪團訂餐助手 DiiN 介面' :
               locale === 'en' ? 'DiiN Group Order Assistant Interface' :
               locale === 'jp' ? 'DiiN グループ注文アシスタント インターフェース' :
               'Interfaz del Asistente de Pedidos Grupales DiiN',
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

    alternates: {
      canonical: getFullUrl(locale === 'en' ? '/blog/menu-scanner' : `/${locale}/menu-scanner`),
      languages: {
        'zh-TW': getFullUrl('/tw/menu-scanner'),
        'zh-CN': getFullUrl('/cn/menu-scanner'),
        'en': getFullUrl('/blog/menu-scanner'),
        'ja': getFullUrl('/jp/menu-scanner'),
        'es': getFullUrl('/es/menu-scanner'),
      },
    },

    keywords,
    authors: [{ name: 'fyimg開發團隊' }],
    creator: 'fyimg開發團隊',
    publisher: 'fyimg',
  };
}

export default async function MenuScannerLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  const { locale = 'en' } = await params;
  const language = langMap[locale as keyof typeof langMap] || 'zh-TW';

  const title = menuScannerTranslations.meta.title[locale as keyof typeof menuScannerTranslations.meta.title] || menuScannerTranslations.meta.title.tw;
  const description = menuScannerTranslations.meta.description[locale as keyof typeof menuScannerTranslations.meta.description] || menuScannerTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;

  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.tw;

  const breadcrumbSchema = generateBreadcrumbSchema('/blog/menu-scanner', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/blog/menu-scanner',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,
    1500,
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/blog/menu-scanner',
    locale === 'tw' ? '揪團訂餐助手 - AI菜單掃描器' :
    locale === 'cn' ? '揪团订餐助手 - AI菜单扫描器' :
    locale === 'en' ? 'Group Order Assistant - AI Menu Scanner' :
    locale === 'jp' ? 'グループ注文アシスタント - AIメニュースキャナー' :
    'Asistente de Pedidos Grupales - Escáner de Menú AI',
    description,
    'UtilityApplication',
    '4.9',
    '230',
    datePublished,
    language,
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
      >{`
${formatJSON(breadcrumbSchema)}
`}</script>

      <script
        type="application/ld+json"
      >{`
${formatJSON(faqSchema)}
`}</script>

      <script
        type="application/ld+json"
      >{`
${formatJSON(articleSchema)}
`}</script>

      <script
        type="application/ld+json"
      >{`
${formatJSON(webApplicationSchema)}
`}</script>
      {children}
    </>
  );
}
