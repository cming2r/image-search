import { Metadata } from 'next';
import { getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: '隱私權政策 - fyimg.com',
  description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
  openGraph: {
    title: '隱私權政策 - 以圖搜圖工具 | fyimg.com',
    description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/privacy-policy'),
    siteName: '圖片搜尋工具',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具隱私權政策',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '隱私權政策 - 以圖搜圖工具 | fyimg.com',
    description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: getFullUrl('/privacy-policy'),
  },
};