import { Metadata, Viewport } from 'next';
import { getBaseUrl, getFullUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '聯絡我們';
const description = '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。';

// 預覽圖片
const imageUrl = getFullUrl('/og-image.png');

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/contact', '聯絡我們');
const webPageSchema = generateWebPageSchema(
  '/contact',
  title,
  description
);

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title: `${title} ｜ fyimg`, // 與網站標題模板保持一致
    description,
    // type, locale, siteName由根布局繼承
    url: getFullUrl('/contact'),
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
    title,
    description,
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
  
  // 結構化數據現在使用script標籤直接添加到layout中
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function ContactLayout({
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