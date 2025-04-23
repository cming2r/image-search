import { Metadata } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '隱私政策';
const description = 'fyimg 的隱私政策。了解我們如何收集、使用和保護您的個人資訊。';

// 預覽圖片
const imageUrl = getFullUrl('/og-image.png');

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
    title: `${title} ｜ fyimg`, // 與網站標題模板保持一致
    description,
    // type, locale, siteName由根布局繼承
    url: getFullUrl('/privacy-policy'),
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
  
  // 結構化數據現在使用script標籤直接添加到layout中
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 使用標準腳本標籤添加 JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {children}
    </>
  );
}