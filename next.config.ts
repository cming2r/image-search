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
  // 注意：在 Next.js App Router 中，國際化路由配置方式與 Pages Router 不同
  // 現在使用 [locale] 路徑參數和中間件處理，而不是 i18n 配置選項
  experimental: {
    // 啟用任何需要的實驗性功能
  },
};

// 直接導出配置，不使用 withNextIntl
export default nextConfig;
