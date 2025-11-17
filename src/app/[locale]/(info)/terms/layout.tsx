import { getBaseUrl, getFullUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, formatJSON } from '@/lib/schema';

// 多語言標題和描述
const titles = {
  zh: '使用條款',
  en: 'Terms of Service',
  jp: '利用規約',
  es: 'Términos de Servicio'
};

const descriptions = {
  zh: '使用 fyimg 網站及其服務前，請閱讀我們的使用條款和條件。',
  en: 'Please read our terms and conditions before using the fyimg website and its services.',
  jp: 'fyimgウェブサイトとそのサービスを使用する前に、利用規約をお読みください。',
  es: 'Por favor lea nuestros términos y condiciones antes de usar el sitio web de fyimg y sus servicios.'
};

// 預覽圖片
const imageUrl = getFullUrl('/og-image.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params;
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
      url: getFullUrl(locale === 'en' ? '/terms' : `/${locale}/terms`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? 'fyimg使用條款' : 
               locale === 'en' ? 'fyimg Terms of Service' : 
               locale === 'jp' ? 'fyimg利用規約' :
               locale === 'es' ? 'fyimg Términos de Servicio' : 'fyimg Terms of Service',
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
      canonical: getFullUrl(locale === 'en' ? '/terms' : `/${locale}/terms`),
      languages: {
        'zh-TW': getFullUrl('/terms'),
        'en': getFullUrl('/en/terms'),
        'ja': getFullUrl('/jp/terms'),
        'es': getFullUrl('/es/terms'),
      },
    },
    
    // 關鍵字、作者及發布者信息
    keywords: locale === 'zh' ? '使用條款, 服務條款, fyimg, 用戶條款, 網站規範' : 
              locale === 'en' ? 'terms of service, terms and conditions, fyimg, user terms, website rules' :
              locale === 'jp' ? '利用規約, サービス条件, fyimg, ユーザー条件, ウェブサイトルール' :
              locale === 'es' ? 'términos de servicio, términos y condiciones, fyimg, términos de usuario, reglas del sitio web' :
              'terms of service, terms and conditions, fyimg, user terms, website rules',
    authors: [{ name: 'fyimg開發團隊' }],
    creator: 'fyimg開發團隊',
    publisher: 'fyimg',
  };
}

export default async function TermsLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'en' } = await params;
  
  // 根據當前語言生成結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/terms', titles[locale as keyof typeof titles] || titles.zh, locale);
  const webPageSchema = generateWebPageSchema(
    '/terms',
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