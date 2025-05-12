import { getBaseUrl, getFullUrl } from '@/lib/utils';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';

// 多語言標題和描述
const titles = {
  zh: '隱私權政策',
  en: 'Privacy Policy',
  jp: 'プライバシーポリシー'
};

const descriptions = {
  zh: 'fyimg.com 的隱私權政策。了解我們如何收集、使用、分享和保護您的個人資訊。',
  en: 'Privacy Policy of fyimg.com. Learn how we collect, use, share, and protect your personal information.',
  jp: 'fyimg.comのプライバシーポリシー。当社が個人情報をどのように収集、使用、共有、保護するかについて説明します。'
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
      url: getFullUrl(locale === 'zh' ? '/privacy-policy' : `/${locale}/privacy-policy`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? 'fyimg隱私權政策' : 
               locale === 'en' ? 'fyimg Privacy Policy' : 
               'fyimgプライバシーポリシー',
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
      canonical: getFullUrl(locale === 'zh' ? '/privacy-policy' : `/${locale}/privacy-policy`),
      languages: {
        'zh-TW': getFullUrl('/privacy-policy'),
        'en': getFullUrl('/en/privacy-policy'),
        'ja': getFullUrl('/jp/privacy-policy'),
      },
    },
    
    // 關鍵字、作者及發布者信息
    keywords: locale === 'zh' ? '隱私權政策, 資料保護, fyimg, 用戶隱私, Cookie, 數據安全' : 
              locale === 'en' ? 'privacy policy, data protection, fyimg, user privacy, cookie, data security' :
              'プライバシーポリシー, データ保護, fyimg, ユーザープライバシー, Cookie, データセキュリティ',
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
  const { locale = 'zh' } = await params;
  
  // 根據當前語言生成結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/privacy-policy', titles[locale as keyof typeof titles] || titles.zh, locale);
  const webPageSchema = generateWebPageSchema(
    '/privacy-policy',
    titles[locale as keyof typeof titles] || titles.zh,
    descriptions[locale as keyof typeof descriptions] || descriptions.zh,
    locale
  );
  
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