import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';

export const baseMetadata: Metadata = {
  title: {
    default: 'fyimg',
    template: '%s - fyimg',
  },
  description: 'fyimg提供多種實用工具，包括圖片搜尋、日期計算、到期日計算等線上免費功能，幫助您提高工作效率。',
  keywords: [
    '以圖搜圖',
    '日期計算',
    '到期日計算',
    '線上工具',
    '實用工具',
  ],
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    title: 'Home - fyimg',
    description: 'fyimg提供多種實用工具，包括圖片搜尋、日期計算、到期日計算等線上免費功能，幫助您提高工作效率。',
    url: getFullUrl('/'),
    siteName: 'fyimg',
    images: [
      {
        url: getFullUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'fyimg - 實用線上工具',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home - fyimg',
    description: 'fyimg提供多種實用工具，包括圖片搜尋、日期計算、到期日計算等線上免費功能，幫助您提高工作效率。',
    creator: '@fyimg',
    images: [getFullUrl('/og-image.png')],
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