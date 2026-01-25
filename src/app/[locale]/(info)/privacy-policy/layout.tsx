import { getBaseUrl, getFullUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema, formatJSON } from '@/lib/schema';

// 多語言標題和描述
const titles = {
  tw: '隱私權政策',
  cn: '隐私权政策',
  en: 'Privacy Policy',
  jp: 'プライバシーポリシー',
  es: 'Política de Privacidad'
};

const descriptions = {
  tw: 'fyimg.com 的隱私權政策。了解我們如何收集、使用、分享和保護您的個人資訊。',
  cn: 'fyimg.com 的隐私权政策。了解我们如何收集、使用、分享和保护您的个人资讯。',
  en: 'Privacy Policy of fyimg.com. Learn how we collect, use, share, and protect your personal information.',
  jp: 'fyimg.comのプライバシーポリシー。当社が個人情報をどのように収集、使用、共有、保護するかについて説明します。',
  es: 'Política de Privacidad de fyimg.com. Aprenda cómo recolectamos, usamos, compartimos y protegemos su información personal.'
};

// 預覽圖片
const imageUrl = getFullUrl('/og-image.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params;
  const title = titles[locale as keyof typeof titles] || titles.tw;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.tw;
  
  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph標籤設定
    openGraph: {
      title: title,
      description,
      url: getFullUrl(locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'tw' ? 'fyimg隱私權政策' :
               locale === 'cn' ? 'fyimg隐私权政策' :
               locale === 'en' ? 'fyimg Privacy Policy' :
               locale === 'jp' ? 'fyimgプライバシーポリシー' :
               locale === 'es' ? 'fyimg Política de Privacidad' : 'fyimg Privacy Policy',
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
      canonical: getFullUrl(locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`),
      languages: {
        'zh-TW': getFullUrl('/tw/privacy-policy'),
        'zh-CN': getFullUrl('/cn/privacy-policy'),
        'en': getFullUrl('/privacy-policy'),
        'ja': getFullUrl('/jp/privacy-policy'),
        'es': getFullUrl('/es/privacy-policy'),
      },
    },

    // 關鍵字、作者及發布者信息
    keywords: locale === 'tw' ? '隱私權政策, 資料保護, fyimg, 用戶隱私, Cookie, 數據安全' :
              locale === 'cn' ? '隐私权政策, 资料保护, fyimg, 用户隐私, Cookie, 数据安全' :
              locale === 'en' ? 'privacy policy, data protection, fyimg, user privacy, cookie, data security' :
              locale === 'jp' ? 'プライバシーポリシー, データ保護, fyimg, ユーザープライバシー, Cookie, データセキュリティ' :
              locale === 'es' ? 'política de privacidad, protección de datos, fyimg, privacidad del usuario, cookie, seguridad de datos' :
              'privacy policy, data protection, fyimg, user privacy, cookie, data security',
    authors: [{ name: 'fyimg開發團隊' }],
    creator: 'fyimg開發團隊',
    publisher: 'fyimg',
  };
}

export default async function PrivacyPolicyLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'en' } = await params;
  
  // 根據當前語言生成結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/privacy-policy', titles[locale as keyof typeof titles] || titles.tw, locale);
  const webPageSchema = generateWebPageSchema(
    '/privacy-policy',
    titles[locale as keyof typeof titles] || titles.tw,
    descriptions[locale as keyof typeof descriptions] || descriptions.tw,
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