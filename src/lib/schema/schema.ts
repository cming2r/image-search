// 定義 Schema.org 類型
import { getBaseUrl, getFullUrl } from '../utils';

// 通用的 Person author 常量
export const AUTHOR = {
  '@type': 'Person',
  '@id': `${getBaseUrl()}/about/#author`,
  name: 'fyimg 編輯團隊',
  url: getBaseUrl(),
  image: {
    '@type': 'ImageObject',
    '@id': `${getBaseUrl()}#authorImage`,
    url: getFullUrl('/og-image.png'),
    width: 1200,
    height: 630,
    caption: 'fyimg 編輯團隊'
  }
};

// 通用的 Organization publisher 常量
export const PUBLISHER = {
  '@type': 'Organization',
  '@id': `${getBaseUrl()}#organization`,
  name: 'fyimg',
  logo: {
    '@type': 'ImageObject',
    '@id': `${getBaseUrl()}#logo`,
    url: getFullUrl('/og-image.png'),
    width: 1200,
    height: 630,
    caption: 'fyimg'
  }
};

export interface WebApplicationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  inLanguage?: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
    validFrom?: string;
    priceValidUntil?: string;
  };
  author: typeof AUTHOR;
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
  author?: typeof AUTHOR;
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
    publisher?: typeof PUBLISHER;
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
  };
  datePublished: string;
  dateModified: string;
  keywords?: string[];
  wordCount?: number;
  author: typeof AUTHOR;
  publisher: typeof PUBLISHER;
  inLanguage?: string;
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
    url?: string;
    name?: string;
    datePublished?: string;
    dateModified?: string;
    inLanguage?: string;
    primaryImageOfPage?: {
      '@type': string;
      '@id'?: string;
      url: string;
      width?: number;
      height?: number;
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
  validFrom: string = '2025-01-01T00:00:00Z',
  language: string = 'zh-TW',
): WebApplicationSchema {
  const url = getFullUrl(path);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory,
    operatingSystem: 'Windows, macOS, iOS, Android, Web',
    inLanguage: language,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: url,
      validFrom: validFrom,
      priceValidUntil: '2030-12-31T23:59:59Z'
    },
    author: AUTHOR,
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
    author: AUTHOR,
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
      publisher: PUBLISHER,
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
  language: string = 'zh-TW',
  keywords: string[] = [],
  wordCount?: number
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
      caption: title
    },
    datePublished: datePublished,
    dateModified: dateModified,
    inLanguage: language,
    keywords: keywords,
    wordCount: wordCount,
    author: AUTHOR,
    publisher: PUBLISHER,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': webpageId,
      url: fullUrl,
      name: title
    }
  };
}

export function generateFAQSchema(
  faqs: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>
): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs
  };
}