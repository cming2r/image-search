import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

const titles = {
  zh: '短網址產生器 - 縮短網址工具',
  en: 'URL Shortener - Short Link Generator',
  jp: 'URL短縮ツール - 短縮リンクジェネレーター'
};

const descriptions = {
  zh: '免費短網址產生器，快速將長網址縮短為簡潔易分享的短連結，支援自訂短網址、點擊統計與安全連結管理。',
  en: 'Free URL shortener to quickly convert long URLs into concise, shareable short links. Features custom URLs, click analytics, and secure link management.',
  jp: '無料のURL短縮ツールで、長いURLを簡潔で共有しやすい短いリンクに素早く変換できます。カスタムURL、クリック分析、安全なリンク管理機能付き。'
};

const keywordsList = {
  zh: ['短網址', '縮短網址', '短連結產生器', 'URL縮短工具'],
  en: ['url shortener', 'short link', 'link shortener', 'short url generator'],
  jp: ['URL短縮', '短縮リンク', 'リンク短縮ツール', 'URL短縮ジェネレーター']
};

const faqsData = {
  zh: [
    {
      '@type': 'Question',
      name: '什麼是短網址？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '短網址是將冗長的網址轉換成簡短連結的服務，讓網址更容易分享、記憶和輸入，常用於社交媒體、行銷活動和即時通訊。'
      }
    },
    {
      '@type': 'Question',
      name: '如何使用短網址工具？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '使用很簡單：1) 將長網址貼到輸入框中，2) 點擊「縮短網址」按鈕，3) 複製產生的短網址並分享。確保輸入的網址包含 http:// 或 https://。'
      }
    },
    {
      '@type': 'Question',
      name: '短網址有什麼優點？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '短網址讓分享更方便，減少字符數量，在社交媒體上看起來更簡潔，容易記憶和輸入，還可以追蹤點擊統計（即將推出）。'
      }
    }
  ],
  en: [
    {
      '@type': 'Question',
      name: 'What is a URL shortener?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A URL shortener is a service that converts long URLs into short, easy-to-share links that are perfect for social media, marketing campaigns, and messaging apps.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I use the URL shortener tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Its simple: 1) Paste your long URL into the input field, 2) Click the "Shorten URL" button, 3) Copy the generated short URL and share it. Make sure your URL includes http:// or https://.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of short URLs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Short URLs make sharing more convenient, reduce character count, look cleaner on social media, are easier to remember and type, and can provide click analytics (coming soon).'
      }
    }
  ],
  jp: [
    {
      '@type': 'Question',
      name: 'URL短縮とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'URL短縮は、長いURLを短くて共有しやすいリンクに変換するサービスで、ソーシャルメディア、マーケティングキャンペーン、メッセージングアプリに最適です。'
      }
    },
    {
      '@type': 'Question',
      name: 'URL短縮ツールの使い方は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '簡単です：1) 長いURLを入力フィールドに貼り付け、2) 「URL短縮」ボタンをクリック、3) 生成された短いURLをコピーして共有します。URLにhttp://またはhttps://が含まれていることを確認してください。'
      }
    }
  ]
};

const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/shorturl/page.tsx');

const langMap = {
  'zh': 'zh-TW',
  'en': 'en',
  'jp': 'ja'
};

const imageUrl = getFullUrl('/images/og-image.png');

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'zh' } = await params;
  const title = titles[locale as keyof typeof titles] || titles.zh;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  const ogTitle = locale === 'zh' ? `短網址產生器` : 
                  locale === 'en' ? `URL Shortener` : 
                  `URL短縮ツール`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'zh' ? '/shorturl' : `/${locale}/shorturl`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? '短網址產生器工具界面' : 
               locale === 'en' ? 'URL Shortener Tool Interface' :
               'URL短縮ツールインターフェース',
          type: 'image/png',
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fyimg',
      site: '@fyimg',
      images: [imageUrl],
    },
    
    alternates: {
      canonical: getFullUrl(locale === 'zh' ? '/shorturl' : `/${locale}/shorturl`),
      languages: {
        'zh-TW': getFullUrl('/shorturl'),
        'en': getFullUrl('/en/shorturl'),
        'ja': getFullUrl('/jp/shorturl'),
      },
    },
    
    keywords,
    authors: [{ name: 'fyimg開發團隊' }],
    creator: 'fyimg開發團隊',
    publisher: 'fyimg',
  };
}

export default async function ShortUrlLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  const { locale = 'zh' } = await params;
  const language = langMap[locale as keyof typeof langMap] || 'zh-TW';
  
  const title = titles[locale as keyof typeof titles] || titles.zh;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.zh;
  
  const breadcrumbSchema = generateBreadcrumbSchema('/shorturl', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/shorturl',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,
    2100,
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/shorturl',
    locale === 'zh' ? '短網址產生器工具' :
    locale === 'en' ? 'URL Shortener Tool' :
    'URL短縮ツール',
    description,
    'WebApplication',
    '4.8',
    '156',
    datePublished,
    language,
    locale
  );
  
  return (
    <>
      <script
        type="application/ld+json"
      >{`
${formatJSON(breadcrumbSchema)}
`}</script>

      <script
        type="application/ld+json"
      >{`
${formatJSON(faqSchema)}
`}</script>

      <script
        type="application/ld+json"
      >{`
${formatJSON(articleSchema)}
`}</script>

      <script
        type="application/ld+json"
      >{`
${formatJSON(webApplicationSchema)}
`}</script>
      {children}
    </>
  );
}