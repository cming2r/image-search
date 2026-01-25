'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// Footer translations
const footerTranslations = {
  disclaimer: {
    tw: "此工具僅供學習和個人使用，請尊重著作權並遵守各搜尋引擎的使用條款。本網站不儲存任何圖片搜尋記錄，只提供搜尋功能。圖片搜尋服務由 Google、Bing、Yandex 等第三方搜尋引擎提供。",
    cn: "此工具仅供学习和个人使用，请尊重著作权并遵守各搜寻引擎的使用条款。本网站不储存任何图片搜寻记录，只提供搜寻功能。图片搜寻服务由 Google、Bing、Yandex 等第三方搜寻引擎提供。",
    en: "This tool is for learning and personal use only. Please respect copyright and comply with the terms of use of each search engine. This website does not store any image search records, only provides search functionality. Image search services are provided by third-party search engines such as Google, Bing, Yandex, etc.",
    jp: "このツールは学習および個人使用のみを目的としています。著作権を尊重し、各検索エンジンの利用規約を遵守してください。このウェブサイトは画像検索記録を保存せず、検索機能のみを提供します。画像検索サービスはGoogle、Bing、Yandexなどのサードパーティ検索エンジンによって提供されています。",
    es: "Esta herramienta es solo para uso educativo y personal. Por favor, respeta los derechos de autor y cumple con los términos de uso de cada motor de búsqueda. Este sitio web no almacena ningún registro de búsqueda de imágenes, solo proporciona funcionalidad de búsqueda. Los servicios de búsqueda de imágenes son proporcionados por motores de búsqueda de terceros como Google, Bing, Yandex, etc."
  },
  links: {
    contact: {
      tw: "聯絡我們",
      cn: "联络我们",
      en: "Contact Us",
      jp: "お問い合わせ",
      es: "Contáctanos"
    },
    terms: {
      tw: "使用條款",
      cn: "使用条款",
      en: "Terms of Use",
      jp: "利用規約",
      es: "Términos de Uso"
    },
    privacy: {
      tw: "隱私權政策",
      cn: "隐私权政策",
      en: "Privacy Policy",
      jp: "プライバシーポリシー",
      es: "Política de Privacidad"
    }
  }
};

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const params = useParams();
  // 從路徑參數中獲取當前語言
  const locale = (params?.locale as string) || 'en';
  
  // 獲取翻譯文字的函數
  const getTranslation = (key: 'disclaimer') => {
    return footerTranslations[key][locale as 'tw' | 'en' | 'jp' | 'es'] || footerTranslations[key].tw;
  };

  const getLinkTranslation = (key: keyof typeof footerTranslations.links) => {
    return footerTranslations.links[key][locale as 'tw' | 'en' | 'jp' | 'es'] || footerTranslations.links[key].tw;
  };
  
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center">
          <div>
            <p className="footer-text text-center">
              {getTranslation('disclaimer')}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/3 hidden md:block"></div>
          <div className="text-center md:flex-1">
            <p className="footer-text">Copyright &copy; {currentYear} - fyimg.com</p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end mt-2 md:mt-0 space-x-4">
            <Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className="text-blue-600 hover:underline">
              {getLinkTranslation('contact')}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}privacy-policy`} className="text-blue-600 hover:underline">
              {getLinkTranslation('privacy')}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}terms`} className="text-blue-600 hover:underline">
              {getLinkTranslation('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;