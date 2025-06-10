'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/app/[locale]/metadata';

interface LocaleRedirectProps {
  currentLocale: string;
}

export default function LocaleRedirect({ currentLocale }: LocaleRedirectProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Get saved language preference
    const savedLocale = localStorage.getItem('preferredLocale');
    
    // If no saved preference or already using the preferred locale, do nothing
    if (!savedLocale || savedLocale === currentLocale) return;
    
    // Validate saved locale
    if (!locales.includes(savedLocale as typeof locales[number])) return;

    // Generate the new path with the preferred locale
    let newPath = pathname;
    
    // Remove current locale prefix if exists
    for (const locale of locales) {
      if (pathname.startsWith(`/${locale}/`)) {
        newPath = pathname.replace(`/${locale}/`, '/');
        break;
      }
      if (pathname === `/${locale}`) {
        newPath = '/';
        break;
      }
    }
    
    // Add preferred locale prefix (except for zh which uses root path)
    if (savedLocale === 'zh') {
      // For Chinese, use the path without locale prefix
      router.replace(newPath);
    } else {
      // For other languages, add the locale prefix
      if (newPath === '/') {
        router.replace(`/${savedLocale}`);
      } else {
        router.replace(`/${savedLocale}${newPath}`);
      }
    }
  }, [currentLocale, pathname, router]);

  // This component doesn't render anything
  return null;
}