'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import translations from './translations.json';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const params = useParams();
  // 從路徑參數中獲取當前語言
  const locale = (params?.locale as string) || 'zh';
  
  // 獲取對應語言的翻譯
  const t = translations[locale as keyof typeof translations] || translations.zh;
  
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center">
          <div>
            <p className="footer-text text-center">
              {t.footer.disclaimer}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/3 hidden md:block"></div>
          <div className="text-center md:flex-1">
            <p className="footer-text">Copyright &copy; {currentYear} - fyimg.com</p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end mt-2 md:mt-0 space-x-4">
            <Link href={`/${locale === 'zh' ? '' : locale + '/'}contact`} className="text-blue-600 hover:underline">
              {t.footer.links.contact}
            </Link>
            <Link href={`/${locale === 'zh' ? '' : locale + '/'}privacy-policy`} className="text-blue-600 hover:underline">
              {t.footer.links.privacy}
            </Link>
            <Link href={`/${locale === 'zh' ? '' : locale + '/'}terms`} className="text-blue-600 hover:underline">
              {t.footer.links.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;