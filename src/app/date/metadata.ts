import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '日期計算器 | 日曆天計算工具 - fyimg.com',
  description: '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。',
  openGraph: {
    title: '日期計算器 | 日曆天計算工具 - fyimg.com',
    description: '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。',
    type: 'website',
    locale: 'zh_TW',
    url: '/date',
    siteName: '圖片搜尋工具',
    images: [
      {
        url: '/images/og-date.png',
        width: 1200,
        height: 630,
        alt: '日期計算器與日曆天計算工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '日期計算器 | 日曆天計算工具 - fyimg.com',
    description: '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。',
    images: ['/images/og-date.png'],
  },
  alternates: {
    canonical: '/date',
  },
  keywords: '日期計算器, 日曆天, 日期差距計算, 工作天計算, 專案管理, 工期計算, 時程規劃',
};