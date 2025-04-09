import { Metadata } from 'next';
import { getFullUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
  description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
  alternates: {
    canonical: getFullUrl('/image-search'),
  },
  openGraph: {
    title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
    url: getFullUrl('/image-search'),
    siteName: '圖片搜尋工具',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋 ｜ fyimg',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
    creator: '@imagetool',
    images: ['/og-image.png'],
  },
};