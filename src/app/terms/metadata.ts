import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '使用條款 - fyimg.com',
  description: '使用fyimg.com圖片搜尋服務前請閱讀我們的服務條款。了解用戶權利與責任，以及我們提供的服務內容與限制。',
  openGraph: {
    title: '使用條款 - 以圖搜圖工具 | fyimg.com',
    description: '使用fyimg.com圖片搜尋服務前請閱讀我們的服務條款。了解用戶權利與責任，以及我們提供的服務內容與限制。',
    type: 'website',
    locale: 'zh_TW',
    url: '/terms',
    siteName: '圖片搜尋工具',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具使用條款',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '使用條款 - 以圖搜圖工具 | fyimg.com',
    description: '使用fyimg.com圖片搜尋服務前請閱讀我們的服務條款。了解用戶權利與責任，以及我們提供的服務內容與限制。',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/terms',
  },
};