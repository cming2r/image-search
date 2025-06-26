'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShortUrl from "@/app/[locale]/shorturl/components/shorturl";

export default function ShortUrlPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';

  const titles = {
    zh: '短網址產生器',
    en: 'URL Shortener',
    jp: 'URL短縮ツール',
    es: 'Acortador de URL'
  };

  const subtitles = {
    zh: '快速將長網址縮短為易於分享的短連結',
    en: 'Quickly shorten long URLs into easy-to-share short links',
    jp: '長いURLを簡単に共有できる短いリンクに素早く短縮',
    es: 'Acorta rápidamente URLs largas en enlaces cortos fáciles de compartir'
  };

  const title = titles[locale as keyof typeof titles] || titles.zh;
  const subtitle = subtitles[locale as keyof typeof subtitles] || subtitles.zh;

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>

          <ShortUrl />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">
              {locale === 'zh' ? '使用方法' :
               locale === 'en' ? 'How to Use' :
               locale === 'jp' ? '使い方' :
               'Cómo Usar'}
            </h2>
            <ol className="ml-6 list-decimal space-y-2 mt-4">
              <li>
                {locale === 'zh' ? '在上方輸入框中貼上或輸入您想要縮短的長網址' :
                 locale === 'en' ? 'Paste or enter the long URL you want to shorten in the input field above' :
                 locale === 'jp' ? '上の入力フィールドに短縮したい長いURLを貼り付けまたは入力します' :
                 'Pega o ingresa la URL larga que quieres acortar en el campo de entrada de arriba'}
              </li>
              <li>
                {locale === 'zh' ? '點擊「縮短網址」按鈕' :
                 locale === 'en' ? 'Click the "Shorten URL" button' :
                 locale === 'jp' ? '「URL短縮」ボタンをクリックします' :
                 'Haz clic en el botón "Acortar URL"'}
              </li>
              <li>
                {locale === 'zh' ? '複製產生的短網址並分享給其他人' :
                 locale === 'en' ? 'Copy the generated short URL and share it with others' :
                 locale === 'jp' ? '生成された短いURLをコピーして他の人と共有します' :
                 'Copia la URL corta generada y compártela con otros'}
              </li>
            </ol>

            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <p className="text-blue-700 font-medium flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {locale === 'zh' ? '小提示' :
                 locale === 'en' ? 'Tip' :
                 locale === 'jp' ? 'ヒント' :
                 'Consejo'}<br />
                {locale === 'zh' ? '確保您輸入的是完整且有效的網址，並包含 http:// 或 https://' :
                 locale === 'en' ? 'Make sure you enter a complete and valid URL, including http:// or https://' :
                 locale === 'jp' ? 'http://またはhttps://を含む完全で有効なURLを入力してください' :
                 'Asegúrate de ingresar una URL completa y válida, incluyendo http:// o https://'}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">
              {locale === 'zh' ? '什麼是短網址？' :
               locale === 'en' ? 'What is a URL Shortener?' :
               locale === 'jp' ? 'URL短縮とは何ですか？' :
               '¿Qué es un Acortador de URL?'}
            </h2>
            <div className="space-y-4">
              <p>
                {locale === 'zh' ? '短網址（URL Shortener）是一種將冗長的網址轉換成簡短、易於分享連結的工具。當您有一個非常長的網址時，短網址可以幫助您：' :
                 locale === 'en' ? 'A URL shortener is a tool that converts long URLs into short, easy-to-share links. When you have a very long URL, a URL shortener can help you:' :
                 locale === 'jp' ? 'URL短縮は、長いURLを短くて共有しやすいリンクに変換するツールです。非常に長いURLをお持ちの場合、URL短縮は以下のことを協助します：' :
                 'Un acortador de URL es una herramienta que convierte URLs largas en enlaces cortos y fáciles de compartir. Cuando tienes una URL muy larga, un acortador de URL puede ayudarte a:'}
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  {locale === 'zh' ? '在社交媒體上更容易分享' :
                   locale === 'en' ? 'Share more easily on social media' :
                   locale === 'jp' ? 'ソーシャルメディアでより簡単に共有する' :
                   'Compartir más fácilmente en redes sociales'}
                </li>
                <li>
                  {locale === 'zh' ? '減少訊息中的字符數量' :
                   locale === 'en' ? 'Reduce character count in messages' :
                   locale === 'jp' ? 'メッセージ内の文字数を減らす' :
                   'Reducir el conteo de caracteres en mensajes'}
                </li>
                <li>
                  {locale === 'zh' ? '讓網址看起來更簡潔美觀' :
                   locale === 'en' ? 'Make URLs look cleaner and more attractive' :
                   locale === 'jp' ? 'URLをより清潔で魅力的に見せる' :
                   'Hacer que las URLs se vean más limpias y atractivas'}
                </li>
                <li>
                  {locale === 'zh' ? '便於記憶和輸入' :
                   locale === 'en' ? 'Easier to remember and type' :
                   locale === 'jp' ? '記憶しやすく、入力しやすくする' :
                   'Más fácil de recordar y escribir'}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-3">
              {locale === 'zh' ? '使用場景' :
               locale === 'en' ? 'Use Cases' :
               locale === 'jp' ? '使用シーン' :
               'Casos de Uso'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <h3 className="font-medium text-blue-700">
                    {locale === 'zh' ? '社交媒體分享' :
                     locale === 'en' ? 'Social Media Sharing' :
                     locale === 'jp' ? 'ソーシャルメディアシェア' :
                     'Compartir en Redes Sociales'}
                  </h3>
                </div>
                <p className="text-blue-700 text-sm">
                  {locale === 'zh' ? '在 Facebook、Twitter、LINE 等平台分享文章或商品連結時更簡潔' :
                   locale === 'en' ? 'More concise when sharing articles or product links on platforms like Facebook, Twitter, LINE' :
                   locale === 'jp' ? 'Facebook、Twitter、LINEなどのプラットフォームで記事や商品リンクを共有するときにより簡潔' :
                   'Más conciso al compartir artículos o enlaces de productos en plataformas como Facebook, Twitter, LINE'}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <h3 className="font-medium text-green-700">
                    {locale === 'zh' ? '即時通訊' :
                     locale === 'en' ? 'Instant Messaging' :
                     locale === 'jp' ? 'インスタントメッセージング' :
                     'Mensajería Instantánea'}
                  </h3>
                </div>
                <p className="text-green-700 text-sm">
                  {locale === 'zh' ? '在 WhatsApp、Telegram 等即時通訊軟體中傳送連結更方便' :
                   locale === 'en' ? 'More convenient to send links in instant messaging apps like WhatsApp, Telegram' :
                   locale === 'jp' ? 'WhatsApp、Telegramなどのインスタントメッセージングアプリでリンクを送信するのがより便利' :
                   'Más conveniente para enviar enlaces en aplicaciones de mensajería instantánea como WhatsApp, Telegram'}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="font-medium text-purple-700">
                    {locale === 'zh' ? '行銷宣傳' :
                     locale === 'en' ? 'Marketing & Promotion' :
                     locale === 'jp' ? 'マーケティング・プロモーション' :
                     'Marketing y Promoción'}
                  </h3>
                </div>
                <p className="text-purple-700 text-sm">
                  {locale === 'zh' ? '在印刷品、名片、廣告中使用簡短易讀的網址' :
                   locale === 'en' ? 'Use short, easy-to-read URLs in printed materials, business cards, and advertisements' :
                   locale === 'jp' ? '印刷物、名刺、広告で短くて読みやすいURLを使用' :
                   'Usar URLs cortas y fáciles de leer en materiales impresos, tarjetas de visita y anuncios'}
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-medium text-amber-700">
                    {locale === 'zh' ? '統計追蹤' :
                     locale === 'en' ? 'Analytics & Tracking' :
                     locale === 'jp' ? '分析・トラッキング' :
                     'Análisis y Seguimiento'}
                  </h3>
                </div>
                <p className="text-amber-700 text-sm">
                  {locale === 'zh' ? '監控連結點擊次數及用戶來源分析（即將推出）' :
                   locale === 'en' ? 'Monitor link click counts and user source analysis (coming soon)' :
                   locale === 'jp' ? 'リンクのクリック数とユーザーソース分析を監視（近日公開予定）' :
                   'Monitorear conteos de clics de enlaces y análisis de origen de usuarios (próximamente)'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}