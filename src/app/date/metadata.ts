import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';

// 為了確保完全覆蓋root layout中的基礎metadata，我們明確定義所有需要的字段
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '日期計算器 - 日曆天數計算 ｜ fyimg',
  description: '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。',
  
  // 確保OpenGraph標籤是完整的
  openGraph: {
    title: '日期計算器 - 日曆天數計算 ｜ fyimg',
    description: '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/date'),
    siteName: '日期計算工具',
    images: [
      {
        url: getFullUrl('/images/og-date.png'),
        width: 1200,
        height: 630,
        alt: '日期計算器與日曆天計算工具',
      },
    ],
  },
  
  // 確保Twitter卡片標籤是完整的
  twitter: {
    card: 'summary_large_image',
    title: '日期計算器 - 日曆天數計算 ｜ fyimg',
    description: '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。',
    creator: '@fyimg',  // 需要覆蓋根metadata中的creator
    images: [getFullUrl('/images/og-date.png')],
  },
  
  // 其他metadata
  alternates: {
    canonical: getFullUrl('/date'),
  },
  
  keywords: '日期計算器, 日曆天, 日期差距計算, 工作天計算, 專案管理, 工期計算, 時程規劃',
  
  // 確保覆蓋根級metadata的其他字段
  authors: [{ name: '日期計算工具團隊' }],
  creator: '日期計算工具團隊',
  publisher: '日期計算工具',
  
  // 保持格式檢測設置一致
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // 保持robots設置一致
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
};