import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateSchemaMarkup, generateFAQSchema } from '@/lib/schema';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/og-image.png'));

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋',
  description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/image-search'),
    siteName: 'fyimg',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '圖片搜尋工具',
        type: 'image/png', // 指定圖片MIME類型增強兼容性
      },
    ],
  },
  
  // Twitter卡片設定 - 為X.com平台優化
  twitter: {
    card: 'summary_large_image',
    title: '以圖搜圖 - 支援iphone手機及多個引擎圖片搜尋',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、Yandex等進行反向圖片搜尋，並且支援手機iphone搜圖。',
    creator: '@fyimg',
    site: '@fyimg',  // 添加站點標籤增強Twitter卡片顯示
    images: [imageUrl],
  },
  
  // 確保其他必要的元數據
  keywords: '以圖搜圖, 反向圖片搜尋, Google圖片搜尋, Bing圖片搜尋, Yandex圖片搜尋, 手機搜圖, iPhone圖片搜尋',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

// 生成結構化數據函數
function generateSchemaJsonLd() {
  try {
    const webAppSchema = generateSchemaMarkup();
    const breadcrumbSchema = generateBreadcrumbSchema();
    const faqSchema = generateFAQSchema('image');
    
    return JSON.stringify([webAppSchema, breadcrumbSchema, faqSchema]);
  } catch (error) {
    console.error('Error generating Schema JSON-LD:', error);
    return JSON.stringify({}); // 返回空對象避免渲染錯誤
  }
}

export default function ImageSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 使用標準script標籤添加JSON-LD結構化數據 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchemaJsonLd() }}
      />
      {children}
    </>
  );
}