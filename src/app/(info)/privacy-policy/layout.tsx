import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '隱私政策';
const description = 'fyimg 的隱私政策。了解我們如何收集、使用和保護您的個人資訊。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/og-image.png'));

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/privacy-policy', '隱私政策');
const webPageSchema = generateWebPageSchema(
  '/privacy-policy',
  title,
  description
);

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph標籤設定
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/privacy-policy'),
    siteName: 'fyimg',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'fyimg隱私政策',
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
    canonical: getFullUrl('/privacy-policy'),
  },
  
  keywords: '隱私政策, 資料保護, fyimg, 用戶隱私',
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

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}