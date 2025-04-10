import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
  description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/image-search'),
  },
  
  // OpenGraph標籤設定
  openGraph: {
    title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
    url: getFullUrl('/image-search'),
    siteName: '圖片搜尋工具',
    images: [
      {
        url: getFullUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
    creator: '@fyimg',
    images: [getFullUrl('/og-image.png')],
  },
  
  // 確保其他必要的元數據
  keywords: '以圖搜圖, 反向圖片搜尋, Google圖片搜尋, Bing圖片搜尋, Yandex圖片搜尋, 手機搜圖, iPhone圖片搜尋',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};