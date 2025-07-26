import { Metadata } from 'next';
import { videoUrlTranslations } from './components/meta-translations';

interface VideoUrlLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locale || 'zh') as 'zh' | 'en' | 'jp' | 'es';
  
  const translations = videoUrlTranslations.meta;
  
  const keywords = {
    zh: '影片短網址,影片URL縮短,影片連結,短網址連結,影片分享,MP4短網址,影片上傳,免費工具',
    en: 'video short URL,video URL shortener,video link,short link,video sharing,MP4 short URL,video upload,free tool',
    jp: '動画短縮URL,動画URLショートナー,動画リンク,短縮リンク,動画共有,MP4短縮URL,動画アップロード,無料ツール',
    es: 'URL corta de video,acortador de URL de video,enlace de video,enlace corto,compartir video,URL corta MP4,subir video,herramienta gratuita'
  };
  
  return {
    title: translations.title[lang],
    description: translations.description[lang],
    keywords: keywords[lang],
    openGraph: {
      title: translations.title[lang],
      description: translations.description[lang],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: translations.title[lang],
      description: translations.description[lang],
    },
  };
}

export default function VideoUrlLayout({ children }: VideoUrlLayoutProps) {
  return children;
}