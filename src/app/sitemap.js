import { getBaseUrl, getFullUrl } from '@/lib/utils';

export default function sitemap() {
  const staticRoutes = [
    {
      url: getBaseUrl(),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: getFullUrl('/date'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getFullUrl('/privacy-policy'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getFullUrl('/terms'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  ];

  return [...staticRoutes];
}