import { getBaseUrl, getFullUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, formatJSON } from '@/lib/schema';

// 多語言標題和描述
const titles = {
  zh: '聯絡我們',
  en: 'Contact Us',
  jp: 'お問い合わせ',
  es: 'Contáctanos'
};

const descriptions = {
  zh: '有任何問題、建議或回饋嗎？請與我們聯絡，我們會盡快回覆您。',
  en: 'Have questions, suggestions, or feedback? Please contact us, and we will get back to you as soon as possible.',
  jp: 'ご質問、ご提案、またはフィードバックがありますか？お問い合わせください。できるだけ早くご返信いたします。',
  es: '¿Tiene preguntas, sugerencias o comentarios? Contáctenos y le responderemos lo antes posible.'
};

// 預覽圖片
const imageUrl = getFullUrl('/og-image.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'zh' } = await params;
  const title = titles[locale as keyof typeof titles] || titles.zh;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.zh;
  
  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph標籤設定
    openGraph: {
      title: title,
      description,
      url: getFullUrl(locale === 'zh' ? '/contact' : `/${locale}/contact`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? 'fyimg聯絡我們' : 
               locale === 'en' ? 'fyimg Contact Us' : 
               locale === 'jp' ? 'fyimgお問い合わせ' :
               locale === 'es' ? 'fyimg Contáctanos' : 'fyimg Contact Us',
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
    
    // 規範連結（確保SEO正確性）
    alternates: {
      canonical: getFullUrl(locale === 'zh' ? '/contact' : `/${locale}/contact`),
      languages: {
        'zh-TW': getFullUrl('/contact'),
        'en': getFullUrl('/en/contact'),
        'ja': getFullUrl('/jp/contact'),
        'es': getFullUrl('/es/contact'),
      },
    },
    
    // 關鍵字、作者及發布者信息
    keywords: locale === 'zh' ? '聯絡我們, 客戶服務, 回饋, 意見反饋, 問題諮詢' : 
              locale === 'en' ? 'contact us, customer service, feedback, inquiry, support' :
              locale === 'jp' ? 'お問い合わせ, カスタマーサービス, フィードバック, お問い合わせフォーム, サポート' :
              locale === 'es' ? 'contáctanos, servicio al cliente, comentarios, consulta, soporte' :
              'contact us, customer service, feedback, inquiry, support',
    authors: [{ name: 'fyimg開發團隊' }],
    creator: 'fyimg開發團隊',
    publisher: 'fyimg',
  };
}

export default async function ContactLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'zh' } = await params;
  
  // 根據當前語言生成結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/contact', titles[locale as keyof typeof titles] || titles.zh, locale);
  const webPageSchema = generateWebPageSchema(
    '/contact',
    titles[locale as keyof typeof titles] || titles.zh,
    descriptions[locale as keyof typeof descriptions] || descriptions.zh,
    locale
  );
  
  return (
    <>
      {/* 結構化數據標記 - 為每個數據類型使用獨立標記 */}
      <script
        type="application/ld+json"
      >{`
${formatJSON(breadcrumbSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(webPageSchema)}
`}</script>
      {children}
    </>
  );
}