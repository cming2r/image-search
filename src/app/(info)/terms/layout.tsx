import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '服務條款';
const description = 'fyimg 的服務條款。使用本網站即表示您同意遵守這些條款。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/og-image.png'));

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/terms', '服務條款');
const webPageSchema = generateWebPageSchema(
  '/terms',
  title,
  description
);

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph標籤設定
  openGraph: {
    title: `${title} ｜ fyimg`, // 與網站標題模板保持一致
    description,
    // type, locale, siteName由根布局繼承
    url: getFullUrl('/terms'),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'fyimg服務條款',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter卡片設定
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@fyimg',
    site: '@fyimg',
    images: [imageUrl],
  },
  
  // 其他metadata
  alternates: {
    canonical: getFullUrl('/terms'),
  },
  
  keywords: '服務條款, 使用條款, fyimg, 法律條款',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
  
  // 直接在 metadata 中添加結構化數據 (JSON-LD)
  other: {
    'application/ld+json': [
      JSON.stringify(breadcrumbSchema),
      JSON.stringify(webPageSchema)
    ]
  }
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}