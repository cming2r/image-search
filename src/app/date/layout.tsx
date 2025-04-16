import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '日期計算器 - 日曆天數計算';
const description = '免費線上日期計算工具，可計算兩個日期之間的差距、日曆天數計算，以及從指定日期加減天數。適用於專案管理、工期規劃及日程安排。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-date.png'));

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/date'),
    siteName: 'fyimg',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '日期計算器與日曆天計算工具',
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
  
  // 其他metadata
  alternates: {
    canonical: getFullUrl('/date'),
  },
  
  keywords: '日期計算器, 日曆天, 日期差距計算, 工作天計算, 專案管理, 工期計算, 時程規劃',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg'
};

// 生成結構化數據函數
function generateSchemaJsonLd() {
  try {
    const breadcrumbSchema = generateBreadcrumbSchema('/date', '日期計算器');
    const webPageSchema = generateWebPageSchema(
      '/date',
      title,
      description
    );
    const faqSchema = generateFAQSchema('date');
    
    // 添加豐富的 Article Schema
    const articleSchema = generateArticleSchema(
      '/date',
      title,
      description,
      imageUrl,
      '2025-01-01',  // 發布日期
      '2025-01-15',  // 修改日期
      'zh-TW'        // 語言
    );
    
    return JSON.stringify([breadcrumbSchema, webPageSchema, faqSchema, articleSchema]);
  } catch (error) {
    console.error('Error generating Schema JSON-LD:', error);
    return JSON.stringify({}); // 返回空對象避免渲染錯誤
  }
}

export default function DateLayout({
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