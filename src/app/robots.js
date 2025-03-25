import { getFullUrl } from '@/lib/utils';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/admin/*'],
    },
    sitemap: getFullUrl('/sitemap.xml'),
  };
}