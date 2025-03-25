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
      url: getFullUrl('/privacy-policy'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getFullUrl('/terms'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];

  return [...staticRoutes];
}