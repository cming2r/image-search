import { Metadata } from 'next';
import { getFullUrl, getVersionedImageUrl } from '@/lib/utils';

// 這個函數會根據動態路由參數生成元數據
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // 在實際應用中，可以在這裡根據 ID 從資料庫獲取活動信息
  // const giftExchange = await fetchGiftExchangeData(params.id);
  
  return {
    title: `交換禮物活動 #${params.id} | 轉盤抽籤工具`,
    description: '使用轉盤隨機選擇交換禮物對象，增添活動驚喜與樂趣，提供公平透明的抽籤體驗。',
    
    // OpenGraph 信息
    openGraph: {
      title: `交換禮物活動 #${params.id} | 轉盤抽籤工具`,
      description: '使用轉盤隨機選擇交換禮物對象，增添活動驚喜與樂趣，提供公平透明的抽籤體驗。',
      url: getFullUrl(`/gift-exchange/${params.id}`),
      siteName: 'fyimg',
      images: [
        {
          url: getVersionedImageUrl(getFullUrl('/images/og-gift-exchange.png')),
          width: 1200,
          height: 630,
          alt: '禮物交換抽籤轉盤工具',
          type: 'image/png',
        },
      ],
      locale: 'zh_TW',
      type: 'website',
    },
    
    // Twitter 信息
    twitter: {
      card: 'summary_large_image',
      title: `交換禮物活動 #${params.id} | 轉盤抽籤工具`,
      description: '使用轉盤隨機選擇交換禮物對象，增添活動驚喜與樂趣，提供公平透明的抽籤體驗。',
      creator: '@fyimg',
      site: '@fyimg',
      images: [getVersionedImageUrl(getFullUrl('/images/og-gift-exchange.png'))],
    },
    
    // 確保用戶可以從動態頁面返回主頁
    alternates: {
      canonical: getFullUrl(`/gift-exchange/${params.id}`),
    },
  };
}

export default function GiftExchangeEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  );
}