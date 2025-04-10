import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '使用條款 ｜ fyimg',
  description: '使用fyimg.com服務前請閱讀我們的服務條款。了解用戶權利與責任，以及我們提供的服務內容與限制。',
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/terms'),
  },
  
  // OpenGraph標籤設定
  openGraph: {
    title: '使用條款 ｜ fyimg',
    description: '使用fyimg.com服務前請閱讀我們的服務條款。了解用戶權利與責任，以及我們提供的服務內容與限制。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/terms'),
    siteName: 'fyimg',
    images: [
      {
        url: getFullUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'fyimg使用條款',
      },
    ],
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title: '使用條款 ｜ fyimg',
    description: '使用fyimg.com服務前請閱讀我們的服務條款。了解用戶權利與責任，以及我們提供的服務內容與限制。',
    creator: '@fyimg',
    images: [getFullUrl('/og-image.png')],
  },
  
  // 確保其他必要的元數據
  keywords: '使用條款, 服務條款, 用戶協議, 法律聲明, 版權聲明',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};