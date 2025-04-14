import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/og-image.png'));

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: '聯絡我們',
  description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
  
  // 基本HTML標籤 - 有些平台會先讀取這些
  viewport: 'width=device-width, initial-scale=1',
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title: '聯絡我們',
    description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/contact'),
    siteName: 'fyimg',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'fyimg聯絡我們',
        type: 'image/png', // 指定圖片MIME類型增強兼容性
      },
    ],
  },
  
  // Twitter卡片設定 - 為X.com平台優化
  twitter: {
    card: 'summary_large_image',
    title: '聯絡我們',
    description: '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。',
    creator: '@fyimg',
    site: '@fyimg',  // 添加站點標籤增強Twitter卡片顯示
    images: [imageUrl],
  },
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/contact'),
  },
  
  // 確保其他必要的元數據
  keywords: '聯絡我們, 客戶服務, 意見反饋, 問題諮詢, fyimg客服',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

// 生成結構化數據函數
function generateSchemaJsonLd() {
  try {
    const breadcrumbSchema = generateBreadcrumbSchema('/contact', '聯絡我們');
    const webPageSchema = generateWebPageSchema(
      '/contact',
      '聯絡我們',
      '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。'
    );
    
    return JSON.stringify([breadcrumbSchema, webPageSchema]);
  } catch (error) {
    console.error('Error generating Schema JSON-LD:', error);
    return JSON.stringify({}); // 返回空對象避免渲染錯誤
  }
}

export default function ContactLayout({
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