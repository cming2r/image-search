import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '聯絡我們 ｜ fyimg',
  description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
  
  // OpenGraph標籤設定
  openGraph: {
    title: '聯絡我們 ｜ fyimg',
    description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/contact'),
    siteName: 'fyimg',
    images: [
      {
        url: getFullUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'fyimg聯絡我們',
      },
    ],
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title: '聯絡我們 ｜ fyimg',
    description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
    creator: '@fyimg',
    images: [getFullUrl('/og-image.png')],
  },
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/contact'),
  },
  
  // 確保其他必要的元數據
  keywords: '聯絡我們, 客戶服務, 意見反饋, 問題諮詢, fyimg客服',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}