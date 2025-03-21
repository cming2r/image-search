export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/admin/*'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://fyimg.com'}/sitemap.xml`,
  };
}