import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 啟用 JSON-LD 腳本標籤格式
  experimental: {
    useJSONLDScriptTags: true,
  },
};

export default nextConfig;
