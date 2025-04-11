import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/og-image.png'));

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '服務條款 ｜ fyimg',
  description: 'fyimg 的服務條款。使用本網站即表示您同意遵守這些條款。',
  
  // OpenGraph標籤設定
  openGraph: {
    title: '服務條款 ｜ fyimg',
    description: 'fyimg 的服務條款。使用本網站即表示您同意遵守這些條款。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/terms'),
    siteName: 'fyimg',
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
    title: '服務條款 ｜ fyimg',
    description: 'fyimg 的服務條款。使用本網站即表示您同意遵守這些條款。',
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
};

// 生成結構化數據函數
function generateSchemaJsonLd() {
  try {
    const breadcrumbSchema = generateBreadcrumbSchema('/terms', '服務條款');
    const webPageSchema = generateWebPageSchema(
      '/terms',
      '服務條款 ｜ fyimg',
      'fyimg 的服務條款。使用本網站即表示您同意遵守這些條款。'
    );
    
    return JSON.stringify([breadcrumbSchema, webPageSchema]);
  } catch (error) {
    console.error('Error generating Schema JSON-LD:', error);
    return JSON.stringify({}); // 返回空對象避免渲染錯誤
  }
}

export default function TermsLayout({
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