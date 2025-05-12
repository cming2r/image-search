import type { NextConfig } from "next";

// next-intl 配置
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 嚴格模式有助於發現潛在問題
  reactStrictMode: true,
  // 注意：在 Next.js App Router 中，國際化路由配置方式與 Pages Router 不同
  // 現在使用 [locale] 路徑參數和中間件處理，而不是 i18n 配置選項
  experimental: {
    // 減少 polyfills，只針對現代瀏覽器
    optimizePackageImports: ['next', 'react', 'react-dom'],
  },
  // SWC 優化在新版 Next.js 中默認啟用



  eslint: {
    ignoreDuringBuilds: false,
  },
};

// 直接導出配置，不使用 withNextIntl
export default nextConfig;
