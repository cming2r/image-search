import { Metadata } from "next";
import { getBaseUrl, getFullUrl } from "@/lib/utils";

// 定義有效的語言代碼（順序：英文、西班牙文、日文、簡體中文、繁體中文）
export const locales = ['en', 'es', 'jp', 'cn', 'tw'] as const;
export type Locale = typeof locales[number];

// 簡化的基礎元數據，僅包含通用設置
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'fyimg',
    template: '%s',
  },
  description: 'fyimg提供多種實用工具，包括圖片搜尋、日期計算、到期日計算等線上免費功能，幫助您提高工作效率。',
  icons: {
    icon: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // 設置主頁的 canonical URL
  alternates: {
    canonical: getFullUrl('/'),
    languages: {
      'en': getFullUrl('/'),
      'zh-TW': getFullUrl('/tw/'),
      'zh-CN': getFullUrl('/cn/'),
      'ja': getFullUrl('/jp/'),
      'es': getFullUrl('/es/'),
    },
  },
  // 默認搜索引擎行為設置 - 對所有公開頁面適用
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  // 全局OpenGraph基本設置
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'fyimg', // 全局設置品牌名稱
  },
};