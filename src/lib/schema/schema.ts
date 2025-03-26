// 定義 Schema.org 類型
import { getBaseUrl, getFullUrl } from '../utils';

export interface WebApplicationSchema {
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

export interface WebPageSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': string;
    name: string;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQSchema {
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
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '圖片搜尋工具',
    url: baseUrl,
    description: '一款免費的圖片搜尋工具，支援上傳圖片或輸入圖片網址，使用Google、Bing、TinEye等多種引擎進行反向圖片搜尋，適用於手機和桌面設備。',
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
        urlTemplate: `${baseUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(path?: string, pageName?: string): BreadcrumbSchema {
  const baseUrl = getBaseUrl();
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首頁',
      item: baseUrl,
    },
  ];

  // 如果有提供路徑和頁面名稱，則添加到麵包屑
  if (path && pageName) {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: pageName,
      item: getFullUrl(path),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

export function generateWebPageSchema(path: string, title: string, description: string): WebPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: getFullUrl(path),
    datePublished: '2025-01-01',
    dateModified: '2025-01-01',
    author: {
      '@type': 'Organization',
      name: '圖片搜尋工具團隊',
    },
  };
}

export function generateFAQSchema(type?: 'image' | 'date'): FAQSchema {
  // 圖片搜尋相關 FAQ
  const imageFAQs = [
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
    {
      '@type': 'Question',
      name: '這個工具是否支援手機搜尋？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是的，本工具完全支援手機搜尋，包括iPhone和Android設備。您可以通過手機瀏覽器訪問網站並上傳圖片進行搜尋。',
      },
    },
  ];

  // 日期計算器相關 FAQ
  const dateFAQs = [
    {
      '@type': 'Question',
      name: '什麼是日曆天？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '日曆天是指專案開始到結束的實際天數，包含了工作日、週末以及法定假日。它反映了專案所占用的時間，與工作天不同，日曆天計算包含所有日期，不考慮是否為工作日。',
      },
    },
    {
      '@type': 'Question',
      name: '如何計算兩個日期之間的日曆天數？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '使用我們的日期計算器，選擇「日期相減」選項，然後輸入起始日期和結束日期，系統將自動計算出這兩個日期之間的天數差距。例如，若專案於3月1日開始，並於3月31日結束，則日曆天數為30天。',
      },
    },
    {
      '@type': 'Question',
      name: '日曆天和工作天有什麼區別？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '日曆天包含所有的日期（包括周末和法定假日），而工作天則只計算實際工作日，不包含週末及法定假日。例如，一個為期7天的專案可能只有5個工作天，因為其中包含了週末。',
      },
    },
    {
      '@type': 'Question',
      name: '如何使用日期計算器進行日期加減計算？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '選擇「日期加天數」選項，輸入起始日期和要加減的天數（可為正數或負數），系統將自動計算出結果日期。例如，若從2025年3月15日加上10天，結果將顯示為2025年3月25日。',
      },
    },
    {
      '@type': 'Question',
      name: '日曆天計算在專案管理中有什麼應用？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '日曆天計算用於專案時程管理，有助於：1) 專案進度追蹤：比較實際與計劃時間；2) 資源分配與優化：合理安排人力和物力；3) 風險管理：識別可能導致延遲的因素，如節假日安排等。',
      },
    },
  ];

  // 根據類型返回相應的 FAQ
  const mainEntity = type === 'date' ? dateFAQs : imageFAQs;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}