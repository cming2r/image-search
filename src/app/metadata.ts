import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  title: {
    default: '圖片搜尋工具 | 使用Google、Bing等引擎搜索圖片',
    template: '%s | 圖片搜尋工具',
  },
  description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、TinEye等多個搜尋引擎進行反向圖片搜尋',
  keywords: [
    '圖片搜尋',
    '反向圖片搜尋',
    'Google圖片',
    'Bing圖片',
    'TinEye圖片',
    'SauceNAO',
    '以圖搜圖',
  ],
  authors: [{ name: '圖片搜尋工具團隊' }],
  creator: '圖片搜尋工具團隊',
  publisher: '圖片搜尋工具',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://fyimg.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '圖片搜尋工具 | 使用多引擎進行反向圖片搜尋',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、TinEye等進行反向圖片搜尋',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://fyimg.com',
    siteName: '圖片搜尋工具',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '圖片搜尋工具 | 多引擎反向圖片搜尋',
    description: '上傳圖片或輸入圖片網址，一鍵使用多個搜尋引擎進行反向圖片搜尋',
    creator: '@imagetool',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    bing: 'bing-verification-code',
  },
};