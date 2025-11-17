import { Metadata } from 'next';
import { getFullUrl } from '@/lib/utils';

const giftExchangeEventTranslations = {
  title: {
    zh: '交換禮物活動 | 轉盤抽籤工具',
    en: 'Gift Exchange Event | Wheel Drawing Tool',
    jp: 'ギフト交換イベント | ホイール抽選ツール',
    es: 'Evento de Intercambio de Regalos | Herramienta de Sorteo de Ruleta'
  },
  description: {
    zh: '使用轉盤隨機選擇交換禮物對象，增添活動驚喜與樂趣，提供公平透明的抽籤體驗。',
    en: 'Use the wheel to randomly select gift exchange partners, adding surprise and fun to events, providing a fair and transparent drawing experience.',
    jp: 'ホイールを使ってギフト交換相手をランダムに選択し、イベントにサプライズと楽しさを加え、公平で透明な抽選体験を提供します。',
    es: 'Use la ruleta para seleccionar aleatoriamente parejas de intercambio de regalos, agregando sorpresa y diversión a los eventos, proporcionando una experiencia de sorteo justa y transparente.'
  }
};

// 生成動態 metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale = 'en' } = await params;
  const title = giftExchangeEventTranslations.title[locale as keyof typeof giftExchangeEventTranslations.title] || giftExchangeEventTranslations.title.zh;
  const description = giftExchangeEventTranslations.description[locale as keyof typeof giftExchangeEventTranslations.description] || giftExchangeEventTranslations.description.zh;

  return {
    title,
    description,
    alternates: {
      canonical: getFullUrl(locale === 'en' ? '/gift-exchange' : `/${locale}/gift-exchange`),
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