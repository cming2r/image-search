import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { getBaseUrl, getFullUrl } from "@/lib/utils";

// 簡化的基礎元數據，僅包含通用設置
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'fyimg',
    template: '%s ｜ fyimg',
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
    locale: 'zh_TW',
    siteName: 'fyimg', // 全局設置品牌名稱
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        {/* 全站共用的基礎設定，特定頁面的結構化數據在各自的layout.tsx中使用script標籤實現 */}
      </head>
      <body suppressHydrationWarning>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
