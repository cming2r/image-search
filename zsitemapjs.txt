import { getBaseUrl, getFullUrl } from '@/lib/utils';

export default function sitemap() {
  // 使用固定的更新日期，只有在內容實際更新時才手動更改這些日期
  const staticRoutes = [
    {
      url: getBaseUrl(),
      lastModified: new Date('2025-04-10'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: getFullUrl('/image-search'),
      lastModified: new Date('2025-04-10'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: getFullUrl('/date'),
      lastModified: new Date('2025-03-15'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getFullUrl('/due-date-calculator'),
      lastModified: new Date('2025-03-15'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getFullUrl('/gift-exchange'),
      lastModified: new Date('2025-04-05'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getFullUrl('/contact'),
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: getFullUrl('/privacy-policy'),
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: getFullUrl('/terms'),
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly',
      priority: 0.3,
    }
  ];

  return [...staticRoutes];
}