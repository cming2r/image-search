import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/og-image.png'));

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '隱私政策 ｜ fyimg',
  description: 'fyimg 的隱私政策。了解我們如何收集、使用和保護您的個人資訊。',
  
  // OpenGraph標籤設定
  openGraph: {
    title: '隱私政策 ｜ fyimg',
    description: 'fyimg 的隱私政策。了解我們如何收集、使用和保護您的個人資訊。',
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
    title: '隱私政策 ｜ fyimg',
    description: 'fyimg 的隱私政策。了解我們如何收集、使用和保護您的個人資訊。',
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
};

// 生成結構化數據函數
function generateSchemaJsonLd() {
  try {
    const breadcrumbSchema = generateBreadcrumbSchema('/privacy-policy', '隱私政策');
    const webPageSchema = generateWebPageSchema(
      '/privacy-policy',
      '隱私政策 ｜ fyimg',
      'fyimg 的隱私政策。了解我們如何收集、使用和保護您的個人資訊。'
    );
    
    return JSON.stringify([breadcrumbSchema, webPageSchema]);
  } catch (error) {
    console.error('Error generating Schema JSON-LD:', error);
    return JSON.stringify({}); // 返回空對象避免渲染錯誤
  }
}

export default function PrivacyPolicyLayout({
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