import { Metadata } from 'next';
import { getFullUrl } from '@/lib/utils';

// 簡化的靜態 metadata
export const metadata: Metadata = {
  title: '交換禮物活動 | 轉盤抽籤工具',
  description: '使用轉盤隨機選擇交換禮物對象，增添活動驚喜與樂趣，提供公平透明的抽籤體驗。',
  alternates: {
    canonical: getFullUrl('/gift-exchange'),
  },
};

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