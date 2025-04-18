import { Metadata } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '預產期計算器 - 懷孕週數計算工具';
const description = '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。';

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-due-date-calculator.webp'));

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // 基本HTML標籤 - 有些平台會先讀取這些
  viewport: 'width=device-width, initial-scale=1',
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'zh_TW',
    url: getFullUrl('/due-date-calculator'),
    siteName: 'fyimg',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '預產期計算器工具圖示',
        type: 'image/webp', // 指定圖片MIME類型增強兼容性
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
    canonical: getFullUrl('/due-date-calculator'),
  },
  
  // 確保其他必要的元數據
  keywords: '預產期計算器, 懷孕週數, 內格萊氏法則, 孕期照護, 孕婦保健',
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

// 生成結構化數據函數
function generateSchemaJsonLd() {
  try {
    const breadcrumbSchema = generateBreadcrumbSchema('/due-date-calculator', '預產期計算器');
    const webPageSchema = generateWebPageSchema(
      '/due-date-calculator',
      title,
      description
    );
    const faqSchema = generateFAQSchema('duedate');
    
    // 添加豐富的 Article Schema
    const articleSchema = generateArticleSchema(
      '/due-date-calculator',
      title,
      description,
      imageUrl,
      '2025-01-01T00:00:00+08:00',  // 發布日期 (ISO 8601 格式帶時區)
      '2025-01-20T00:00:00+08:00',  // 修改日期 (ISO 8601 格式帶時區)
      'zh-TW'        // 語言
    );
    
    return JSON.stringify([breadcrumbSchema, webPageSchema, faqSchema, articleSchema]);
  } catch (error) {
    console.error('Error generating Schema JSON-LD:', error);
    return JSON.stringify({}); // 返回空對象避免渲染錯誤
  }
}

export default function DueDateLayout({
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