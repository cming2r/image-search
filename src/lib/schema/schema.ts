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
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
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
  primaryImageOfPage?: {
    '@type': string;
    '@id'?: string;
    url: string;
    width?: number;
    height?: number;
    inLanguage?: string;
  };
  breadcrumb?: {
    '@type': string;
    '@id'?: string;
    itemListElement: Array<{
      '@type': string;
      position: number;
      item: {
        '@type': string;
        '@id'?: string;
        name: string;
      };
    }>;
  };
  isPartOf?: {
    '@type': string;
    '@id'?: string;
    url?: string;
    name?: string;
    publisher?: {
      '@type': string;
      '@id'?: string;
      name: string;
      logo?: {
        '@type': string;
        '@id'?: string;
        url: string;
        contentUrl?: string;
        caption?: string;
        inLanguage?: string;
      };
    };
    inLanguage?: string;
  };
  inLanguage?: string;
}

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  '@id'?: string;
  headline: string;
  description: string;
  url: string;
  name?: string;
  image: string | Array<string> | {
    '@type': string;
    '@id'?: string;
    url: string;
    width?: number;
    height?: number;
    caption?: string;
    inLanguage?: string;
  };
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    '@id'?: string;
    name: string;
    url?: string;
    image?: {
      '@type': string;
      '@id'?: string;
      url: string;
      caption?: string;
    };
    inLanguage?: string;
    sameAs?: string | string[];
    logo?: {
      '@type': string;
      '@id'?: string;
      url: string;
      contentUrl?: string;
      caption?: string;
      inLanguage?: string;
    };
    worksFor?: {
      '@type': string;
      '@id'?: string;
      name: string;
      logo?: {
        '@type': string;
        '@id'?: string;
        url: string;
        contentUrl?: string;
        caption?: string;
        inLanguage?: string;
      };
    };
  };
  publisher: {
    '@type': string;
    '@id'?: string;
    name: string;
    logo?: {
      '@type': string;
      '@id'?: string;
      url: string;
      contentUrl?: string;
      width?: number;
      height?: number;
      caption?: string;
      inLanguage?: string;
    };
  };
  inLanguage?: string;
  isPartOf?: {
    '@type': string;
    '@id'?: string;
    url?: string;
    name?: string;
  };
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
    url?: string;
    name?: string;
    datePublished?: string;
    dateModified?: string;
    isPartOf?: {
      '@type': string;
      '@id'?: string;
      url?: string;
      name?: string;
      publisher?: {
        '@type': string;
        '@id'?: string;
        name: string;
        logo?: {
          '@type': string;
          '@id'?: string;
          url: string;
          contentUrl?: string;
          caption?: string;
          inLanguage?: string;
        };
      };
      inLanguage?: string;
    };
    inLanguage?: string;
    primaryImageOfPage?: {
      '@type': string;
      '@id'?: string;
      url: string;
      width?: number;
      height?: number;
      inLanguage?: string;
    };
    breadcrumb?: {
      '@type': string;
      '@id'?: string;
      itemListElement: Array<{
        '@type': string;
        position: number;
        item: {
          '@type': string;
          '@id'?: string;
          name: string;
        };
      }>;
    };
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

export function generateWebApplicationSchema(
  path: string,
  name: string,
  description: string,
  applicationCategory: string = 'UtilityApplication',
  ratingValue: string = '4.8',
  ratingCount: string = '150',
): WebApplicationSchema {
  const url = getFullUrl(path);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'fyimg',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: '5',
      worstRating: '1'
    }
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

  if (path) {
    // 分割路徑並過濾空段
    const pathSegments = path.split('/').filter(Boolean);
    let currentUrl = baseUrl;
    
    // 處理多層路徑
    pathSegments.forEach((segment, index) => {
      currentUrl += `/${segment}`;
      
      // 處理路徑段名稱
      let segmentName;
      if (index === pathSegments.length - 1 && pageName) {
        // 如果是最後一段，優先使用提供的pageName
        segmentName = pageName;
      } else {
        // 將連字符轉為空格，並大寫首字母
        segmentName = segment.charAt(0).toUpperCase() + 
                     segment.slice(1).replace(/-/g, ' ');
      }
      
      itemListElement.push({
        '@type': 'ListItem',
        position: index + 2, // 首頁是位置1，所以從2開始
        name: segmentName,
        item: currentUrl,
      });
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

export function generateWebPageSchema(
  path: string, 
  title: string, 
  description: string, 
  imageUrl?: string, 
  language: string = 'zh-TW', 
  datePublished: string = '2025-01-01T00:00:00+08:00',
  dateModified: string = '2025-01-01T00:00:00+08:00',
  removeBreadcrumb: boolean = false
): WebPageSchema {
  const fullUrl = getFullUrl(path);
  const baseUrl = getBaseUrl();
  const pathSegments = path.split('/').filter(Boolean);
  
  // 準備麵包屑項目
  const breadcrumbItems = [];
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: 1,
    item: {
      '@type': 'Thing',
      '@id': baseUrl,
      name: '首頁'
    }
  });
  
  if (pathSegments.length > 0) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Thing',
        '@id': fullUrl,
        name: pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + 
              pathSegments[pathSegments.length - 1].slice(1).replace(/-/g, ' ')
      }
    });
  }

  const schema: WebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: fullUrl,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Organization',
      name: 'fyimg',
    },
  };

  // 如果提供了圖片URL，添加primaryImageOfPage和其他豐富屬性
  if (imageUrl) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      '@id': imageUrl,
      url: imageUrl,
      width: 1200,
      height: 630,
      inLanguage: language
    };
    
    // 只有在不移除breadcrumb時才添加
    if (!removeBreadcrumb) {
      schema.breadcrumb = {
        '@type': 'BreadcrumbList',
        '@id': `${fullUrl}#breadcrumb`,
        itemListElement: breadcrumbItems
      };
    }
    
    schema.isPartOf = {
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      url: baseUrl,
      name: 'fyimg',
      publisher: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: 'fyimg',
      },
      inLanguage: language
    };
    
    schema.inLanguage = language;
  }

  return schema;
}

export function generateArticleSchema(
  path: string, 
  title: string, 
  description: string, 
  imageUrl: string,
  datePublished: string = '2025-01-01T00:00:00+08:00',
  dateModified: string = '2025-01-01T00:00:00+08:00',
  language: string = 'zh-TW'
): ArticleSchema {
  const fullUrl = getFullUrl(path);
  const baseUrl = getBaseUrl();
  const richSnippetId = `${fullUrl}#richSnippet`;
  const webpageId = `${fullUrl}#webpage`;
  const pathSegments = path.split('/').filter(Boolean);
  
  // 準備麵包屑項目 - 這些項目不再在ArticleSchema中使用，
  // 因為現在我們將這些數據放在WebPageSchema中
  const breadcrumbItems = [];
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: 1,
    item: {
      '@type': 'Thing',
      '@id': baseUrl,
      name: '首頁'
    }
  });
  
  if (pathSegments.length > 0) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Thing',
        '@id': fullUrl,
        name: pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + 
              pathSegments[pathSegments.length - 1].slice(1).replace(/-/g, ' ')
      }
    });
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': richSnippetId,
    headline: title,
    description: description,
    url: fullUrl,
    name: title,
    image: {
      '@type': 'ImageObject',
      '@id': imageUrl,
      url: imageUrl,
      width: 1200,
      height: 630,
      caption: title,
      inLanguage: language
    },
    datePublished: datePublished,
    dateModified: dateModified,
    inLanguage: language,
    author: {
      '@type': 'Organization',
      '@id': `${baseUrl}/about/#organization`,
      name: 'fyimg',
      url: baseUrl,
      sameAs: baseUrl,
      logo: {
        '@type': 'ImageObject',
        '@id': `${baseUrl}#logo`,
        url: getFullUrl('/og-image.png'),
        contentUrl: getFullUrl('/og-image.png'),
        caption: 'fyimg',
        inLanguage: language
      }
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'fyimg',
      logo: {
        '@type': 'ImageObject',
        '@id': `${baseUrl}#logo`,
        url: getFullUrl('/og-image.png'),
        contentUrl: getFullUrl('/og-image.png'),
        width: 1200,
        height: 630,
        caption: 'fyimg',
        inLanguage: language
      }
    },
    isPartOf: {
      '@type': 'WebPage',
      '@id': webpageId,
      url: fullUrl,
      name: title
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': webpageId,
      url: fullUrl
    }
  };
}

export function generateFAQSchema(type?: 'image' | 'date' | 'duedate' | 'giftexchange'): FAQSchema {
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
        text: '您可以通過兩種方式使用本工具：1) 直接輸入圖片的網址，然後點擊"搜尋此圖片"；2) 上傳您本地電腦上的圖片文件。之後選擇您想使用的搜尋引擎（如Google、Bing、Yandex等）進行搜尋。',
      },
    },
    {
      '@type': 'Question',
      name: '這個工具支持哪些搜尋引擎？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本工具支持多種流行的圖片搜尋引擎，包括Google圖片搜尋、Bing圖片搜尋、Yandex以及SauceNAO等。您可以根據需要選擇最適合的搜尋引擎。',
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

  // 禮物交換轉盤相關 FAQ
  const giftExchangeFAQs = [
    {
      '@type': 'Question',
      name: '什麼是交換禮物抽籤？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '交換禮物抽籤是一種活動組織方式，參與者通過隨機抽籤決定要送禮物給誰。每個人既是送禮者也是收禮者，這種方式能確保公平性並增加活動的趣味性。',
      },
    },
    {
      '@type': 'Question',
      name: '如何使用這個交換禮物抽籤工具？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '使用方法簡單：1) 輸入所有參與者的名字；2) 點擊「開始抽籤」創建一個禮物交換活動；3) 使用轉盤抽出收禮物和送禮物的人；4) 系統自動記錄每次抽籤結果；5) 可以通過連結分享活動給所有參與者。',
      },
    },
    {
      '@type': 'Question',
      name: '交換禮物抽籤需要收費嗎？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不需要，我們的交換禮物抽籤工具完全免費。無需註冊或提供個人資料，任何人都可以直接在網站上使用所有功能。',
      },
    },
    {
      '@type': 'Question',
      name: '轉盤的結果是隨機的嗎？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是的，我們的轉盤使用標準的隨機算法，確保每次轉動都是完全隨機的，沒有任何人為操作可能。轉盤的動畫效果增加了趣味性，但最終結果是公平且隨機的。',
      },
    },
    {
      '@type': 'Question',
      name: '如何分享我的禮物交換活動？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '創建活動後，系統會生成一個唯一的活動代碼和活動連結。您可以通過點擊分享圖標直接複製連結，然後通過社交媒體、即時通訊軟件或電子郵件分享給所有參與者。',
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

  // 預產期計算器相關 FAQ
  const duedateFAQs = [
    {
      '@type': 'Question',
      name: '孕期週數怎麼算',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '孕期以最後一次經期為第一天，到預產期約為40週。因此，通常知道自己懷孕時，大概都已到第5週或第六週。若有規劃備孕，建議用手機的「健康」軟體，紀錄自己每一次的月經週期。當第一次看婦產科時，醫生通常會詢問上一次月經的第一天為幾月幾號，依此來計算預產期。',
      },
    },
    {
      '@type': 'Question',
      name: '預產期計算方式',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '懷孕預產期的計算通常採用內格萊氏法則（Naegele\'s rule），這是由德國婦產科醫生 Franz Karl Naegele 發明的方法。計算方式是以最後一次月經的第一天為基準，加上一年，減三個月，加上七天，即可得出預估的分娩日期。這個方法假設婦女的月經週期為28天，排卵日在月經週期的第14天。例如最後一次月經第一天為6月1號，「減三個月加上七天加一年」則為隔年3月8日。一般來說，預產期大約40個星期，因此將最後一次月經的第一天加上280天，可得到跟Naegele\'s rule計算一樣的結果。',
      },
    },
    {
      '@type': 'Question',
      name: '預產期和實際分娩日期會有差異嗎？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是的，預產期只是一個估計值，實際分娩日期可能會有所差異。研究顯示，只有約5%的孕婦會在預產期當天分娩，大多數分娩發生在預產期前後兩週內。影響分娩時間的因素包括：寶寶發育情況、母體健康狀況、是否為初產等。',
      },
    },
    {
      '@type': 'Question',
      name: '如果我不確定最後一次月經的日期怎麼辦？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '如果不確定最後一次月經的確切日期，建議：1) 嘗試回憶最接近的日期；2) 諮詢醫生安排超音波檢查，通過測量胎兒大小來估計懷孕週數；3) 參考孕早期的血液檢查結果，如hCG或PAPP-A水平來輔助判斷。',
      },
    },
    {
      '@type': 'Question',
      name: '什麼是三個孕期（孕早期、孕中期和孕晚期）？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '懷孕期間可以劃分成三個階段，分別為妊娠第一期（未滿13週）、妊娠第二期（13-29週）、妊娠第三期（29週以上）。不同孕期有不同的身體變化和照護重點。',
      },
    },
  ];

  // 根據類型返回相應的 FAQ
  let mainEntity;
  if (type === 'date') {
    mainEntity = dateFAQs;
  } else if (type === 'duedate') {
    mainEntity = duedateFAQs;
  } else if (type === 'giftexchange') {
    mainEntity = giftExchangeFAQs;
  } else {
    mainEntity = imageFAQs;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}