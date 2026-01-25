'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/app/[locale]/metadata';

interface LocaleRedirectProps {
  currentLocale: string;
}

export default function LocaleRedirect({ currentLocale }: LocaleRedirectProps) {
  const pathname = usePathname();
  const router = useRouter();
  const hasRedirected = useRef(false);
  const lastPathname = useRef(pathname);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Skip admin routes to avoid conflicts with middleware auth logic
    if (pathname.includes('/admin')) return;

    // Reset redirect flag when pathname changes
    if (pathname !== lastPathname.current) {
      hasRedirected.current = false;
      lastPathname.current = pathname;
    }

    // Prevent multiple redirects for the same pathname
    if (hasRedirected.current) return;

    // Get saved language preference
    let savedLocale = localStorage.getItem('preferredLocale');

    // Migrate old 'zh' locale to 'tw'
    if (savedLocale === 'zh') {
      savedLocale = 'tw';
      localStorage.setItem('preferredLocale', 'tw');
    }

    // If no saved preference or already using the preferred locale, do nothing
    if (!savedLocale || savedLocale === currentLocale) return;

    // Validate saved locale
    if (!locales.includes(savedLocale as typeof locales[number])) return;

    // Mark as redirected to prevent loops
    hasRedirected.current = true;

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
    
    // Add preferred locale prefix (except for en which uses root path)
    let targetPath: string;
    if (savedLocale === 'en') {
      // For English, use the path without locale prefix
      targetPath = newPath;
    } else {
      // For other languages, add the locale prefix
      if (newPath === '/') {
        targetPath = `/${savedLocale}`;
      } else {
        targetPath = `/${savedLocale}${newPath}`;
      }
    }

    // Only redirect if the target path is different from current path
    if (targetPath !== pathname) {
      router.replace(targetPath);
    } else {
      // If we're already at the correct path, reset the flag
      hasRedirected.current = false;
    }
  }, [currentLocale, pathname, router]);

  // This component doesn't render anything
  return null;
}