import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '隱私權政策 ｜ fyimg',
  description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/privacy-policy'),
  },
  
  // OpenGraph標籤設定
  openGraph: {
    title: '隱私權政策 ｜ fyimg',
    description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/privacy-policy'),
    siteName: 'fyimg',
    images: [
      {
        url: getFullUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'fyimg隱私權政策',
      },
    ],
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title: '隱私權政策 ｜ fyimg',
    description: '了解fyimg.com如何收集、使用和保護您的個人資料。我們重視用戶隱私，確保資料安全是我們的首要任務。',
    creator: '@fyimg',
    images: [getFullUrl('/og-image.png')],
  },
  
  // 確保其他必要的元數據
  keywords: '隱私權政策, 個人資料保護, 用戶隱私, 數據安全, 隱私聲明',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};