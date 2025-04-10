import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '日期計算器 - 日曆天數計算 ｜ fyimg',
  description: '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。',
  
  // OpenGraph標籤設定
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
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title: '日期計算器 - 日曆天數計算 ｜ fyimg',
    description: '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。',
    creator: '@fyimg',
    images: [getFullUrl('/images/og-date.png')],
  },
  
  // 其他metadata
  alternates: {
    canonical: getFullUrl('/date'),
  },
  
  keywords: '日期計算器, 日曆天, 日期差距計算, 工作天計算, 專案管理, 工期計算, 時程規劃',
  authors: [{ name: '日期計算工具團隊' }],
  creator: '日期計算工具團隊',
  publisher: '日期計算工具',
};

export default function DateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}