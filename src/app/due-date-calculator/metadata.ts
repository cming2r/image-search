import type { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
  description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/due-date-calculator'),
  },
  
  // OpenGraph標籤設定
  openGraph: {
    title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
    description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
    url: getFullUrl('/due-date-calculator'),
    siteName: 'fyimg',
    images: [
      {
        url: getFullUrl('/images/og-due-date-calculator.webp'),
        width: 1200,
        height: 630,
        alt: '預產期計算器工具圖示',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
    description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
    creator: '@fyimg',
    images: [getFullUrl('/images/og-due-date-calculator.webp')],
  },
  
  // 確保其他必要的元數據
  keywords: '預產期計算器, 懷孕週數, 內格萊氏法則, 孕期照護, 孕婦保健',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};