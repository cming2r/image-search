import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-due-date-calculator.webp'));

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
  description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
  
  // 基本HTML標籤 - 有些平台會先讀取這些
  viewport: 'width=device-width, initial-scale=1',
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
    description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/due-date-calculator'),
    siteName: 'fyimg',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '預產期計算器工具圖示',
        type: 'image/webp', // 指定圖片MIME類型增強兼容性
      },
    ],
  },
  
  // Twitter卡片設定 - 為X.com平台優化
  twitter: {
    card: 'summary_large_image',
    title: '預產期計算器 - 懷孕週數計算工具 ｜ fyimg',
    description: '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。',
    creator: '@fyimg',
    site: '@fyimg',  // 添加站點標籤增強Twitter卡片顯示
    images: [imageUrl],
  },
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/due-date-calculator'),
  },
  
  // 確保其他必要的元數據
  keywords: '預產期計算器, 懷孕週數, 內格萊氏法則, 孕期照護, 孕婦保健',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

export default function DueDateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}