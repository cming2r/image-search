import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { locales } from "./metadata";
import LocaleRedirect from "@/components/LocaleRedirect";

// 定義有效的靜態路徑參數
export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

// 一個簡單的布局組件
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 函數內部準備參數，使用 await 解析 params
  let htmlLang = 'en'; // 默認值

  // 獲取URL中的語言代碼
  const { locale = 'en' } = await params;
  
  // 使用 switch 處理語言代碼
  switch (locale) {
    case 'en':
      htmlLang = 'en';
      break;
    case 'jp':
      htmlLang = 'ja';
      break;
    case 'zh':
    default:
      htmlLang = 'zh-TW';
      break;
  }
  
  // 使用更明確的HTML結構和換行
  return (
    <html lang={htmlLang} className="block">
      <head className="block">
        {/* 頭部元數據已由Next.js處理 */}
        <meta name="schema-format" content="preserve" />
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5238540470214596"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      
      <body suppressHydrationWarning className="block">
        <LocaleRedirect currentLocale={locale} />
        <div className="block">
          {children}
        </div>
        
        {/* 分析工具 */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}