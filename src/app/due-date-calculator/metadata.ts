import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
  description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
  alternates: {
    canonical: `${getBaseUrl()}/due-date-calculator`,
  },
  openGraph: {
    title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
    description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
    url: `${getBaseUrl()}/due-date-calculator`,
    siteName: 'fyimg.com',
    images: [
      {
        url: `${getBaseUrl()}/images/og-due-date-calculator.webp`,
        width: 1200,
        height: 630,
        alt: '預產期計算器工具圖示',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
    description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
    images: [`${getBaseUrl()}/images/og-due-date-calculator.webp`],
  },
};