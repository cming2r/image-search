import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  title: {
    default: '以圖搜圖 - 圖片搜尋工具 | fyimg',
    template: '%s | 圖片搜尋工具',
  },
  description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、TinEye等進行反向圖片搜尋，並且支援手機iphone搜圖。',
  keywords: [
    '以圖搜圖',
    '反向圖片搜尋',
    'Google圖片',
    'SauceNAO',
    '手機搜圖',
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
    title: '以圖搜圖 - 圖片搜尋工具 | fyimg',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、TinEye等進行反向圖片搜尋，並且支援手機iphone搜圖。',
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
    title: '以圖搜圖 - 圖片搜尋工具 | fyimg',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、TinEye等進行反向圖片搜尋，並且支援手機iphone搜圖。',
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
};