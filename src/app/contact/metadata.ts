import { Metadata } from 'next';
import { getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: '聯絡我們 ｜ fyimg',
  description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
  openGraph: {
    title: '聯絡我們 ｜ fyimg',
    description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/contact'),
    siteName: '圖片搜尋工具',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具聯絡我們',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '聯絡我們 ｜ fyimg',
    description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: getFullUrl('/contact'),
  },
};