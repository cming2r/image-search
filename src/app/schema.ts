// 定義 Schema.org 類型

interface WebApplicationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
  author: {
    '@type': string;
    name: string;
  };
  potentialAction: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export function generateSchemaMarkup(): WebApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '圖片搜尋工具',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://fyimg.com',
    description: '上傳圖片或輸入圖片網址，一鍵使用Google、Bing、TinEye等搜尋引擎搜索相似圖片',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: '圖片搜尋工具團隊',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://fyimg.com'}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首頁',
        item: process.env.NEXT_PUBLIC_BASE_URL || 'https://fyimg.com',
      },
    ],
  };
}

export function generateFAQSchema(): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '什麼是反向圖片搜尋？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '反向圖片搜尋是一種使用圖片作為搜尋輸入（而不是文字）的搜尋方式。通過上傳圖片或提供圖片的URL，搜尋引擎會找到與該圖片相似或相關的其他圖片和網頁。',
        },
      },
      {
        '@type': 'Question',
        name: '如何使用這個工具搜尋圖片？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '您可以通過兩種方式使用本工具：1) 直接輸入圖片的網址，然後點擊"搜尋此圖片"；2) 上傳您本地電腦上的圖片文件。之後選擇您想使用的搜尋引擎（如Google、Bing、TinEye等）進行搜尋。',
        },
      },
      {
        '@type': 'Question',
        name: '這個工具支持哪些搜尋引擎？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '本工具支持多種流行的圖片搜尋引擎，包括Google圖片搜尋、Bing圖片搜尋、TinEye以及SauceNAO等。您可以根據需要選擇最適合的搜尋引擎。',
        },
      },
    ],
  };
}