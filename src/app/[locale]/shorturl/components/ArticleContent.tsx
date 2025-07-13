'use client';

import { shorturlTranslations } from './meta-translations';

interface ArticleContentProps {
  locale: string;
}

const shorturlContentTranslations = {
  howToUse: {
    title: {
      zh: "如何使用此工具？",
      en: "How to Use This Tool?",
      jp: "このツールの使い方",
      es: "¿Cómo Usar Esta Herramienta?"
    },
    steps: {
      zh: [
        "在輸入框中貼上或輸入您想要縮短的長網址",
        "點擊「縮短網址」按鈕生成短連結",
        "複製產生的短網址並分享給其他人",
        "點擊「自訂縮網址」可前往 vvrl.cc 進行進階設定"
      ],
      en: [
        "Paste or enter the long URL you want to shorten in the input field",
        "Click the \"Shorten URL\" button to generate a short link",
        "Copy the generated short URL and share it with others",
        "Click \"Custom Short URL\" to go to vvrl.cc for advanced settings"
      ],
      jp: [
        "入力フィールドに短縮したい長いURLを貼り付けまたは入力します",
        "「URL短縮」ボタンをクリックして短いリンクを生成します",
        "生成された短いURLをコピーして他の人と共有します",
        "「カスタム短縮URL」をクリックしてvvrl.ccで高度な設定を行います"
      ],
      es: [
        "Pega o ingresa la URL larga que quieres acortar en el campo de entrada",
        "Haz clic en el botón \"Acortar URL\" para generar un enlace corto",
        "Copia la URL corta generada y compártela con otros",
        "Haz clic en \"URL Corta Personalizada\" para ir a vvrl.cc para configuraciones avanzadas"
      ]
    },
    tip: {
      zh: "小提示：",
      en: "Tip:",
      jp: "ヒント：",
      es: "Consejo:"
    },
    tipContent: {
      zh: "確保您輸入的是完整且有效的網址，並包含 http:// 或 https://。短網址會永久有效且無使用次數限制。",
      en: "Make sure you enter a complete and valid URL, including http:// or https://. Short URLs are permanently valid with no usage limits.",
      jp: "http://またはhttps://を含む完全で有効なURLを入力してください。短縮URLは永続的に有効で使用回数制限はありません。",
      es: "Asegúrate de ingresar una URL completa y válida, incluyendo http:// o https://. Las URLs cortas son válidas permanentemente sin límites de uso."
    }
  },
  whatIs: {
    title: {
      zh: "什麼是短網址？",
      en: "What is a URL Shortener?",
      jp: "URL短縮とは何ですか？",
      es: "¿Qué es un Acortador de URL?"
    },
    content: {
      zh: [
        "短網址（URL Shortener）是一種將冗長的網址轉換成簡短、易於分享連結的工具。當您有一個非常長的網址時，短網址可以幫助您在社交媒體上更容易分享、減少訊息中的字符數量、讓網址看起來更簡潔美觀，以及便於記憶和輸入。",
        "我們的短網址服務使用6位字符代碼，安全可靠且永久有效。無論是在 Facebook、Twitter、LINE 等社交平台分享，還是在 WhatsApp、Telegram 等即時通訊軟體中傳送，或是在印刷品、名片、廣告中使用，短網址都能提供更好的使用體驗。",
        "此外，短網址還有助於追蹤點擊統計和用戶來源分析（即將推出），讓您能夠更好地了解分享效果和受眾反應。"
      ],
      en: [
        "A URL shortener is a tool that converts long URLs into short, easy-to-share links. When you have a very long URL, a URL shortener can help you share more easily on social media, reduce character count in messages, make URLs look cleaner and more attractive, and make them easier to remember and type.",
        "Our URL shortening service uses 6-character codes that are secure, reliable, and permanently valid. Whether sharing on social platforms like Facebook, Twitter, LINE, sending in instant messaging apps like WhatsApp, Telegram, or using in printed materials, business cards, and advertisements, short URLs provide a better user experience.",
        "Additionally, short URLs help with click tracking and user source analysis (coming soon), allowing you to better understand sharing effectiveness and audience response."
      ],
      jp: [
        "URL短縮は、長いURLを短くて共有しやすいリンクに変換するツールです。非常に長いURLをお持ちの場合、URL短縮はソーシャルメディアでより簡単に共有し、メッセージ内の文字数を減らし、URLをより清潔で魅力的に見せ、記憶しやすく入力しやすくします。",
        "当URL短縮サービスは、安全で信頼性が高く永続的に有効な6文字コードを使用します。Facebook、Twitter、LINEなどのソーシャルプラットフォームでの共有、WhatsApp、Telegramなどのインスタントメッセージングアプリでの送信、または印刷物、名刺、広告での使用において、短縮URLはより良いユーザー体験を提供します。",
        "さらに、短縮URLはクリック追跡とユーザーソース分析（近日公開予定）に役立ち、共有効果とオーディエンスの反応をより良く理解できるようにします。"
      ],
      es: [
        "Un acortador de URL es una herramienta que convierte URLs largas en enlaces cortos y fáciles de compartir. Cuando tienes una URL muy larga, un acortador de URL puede ayudarte a compartir más fácilmente en redes sociales, reducir el conteo de caracteres en mensajes, hacer que las URLs se vean más limpias y atractivas, y hacerlas más fáciles de recordar y escribir.",
        "Nuestro servicio de acortamiento de URL usa códigos de 6 caracteres que son seguros, confiables y válidos permanentemente. Ya sea compartiendo en plataformas sociales como Facebook, Twitter, LINE, enviando en aplicaciones de mensajería instantánea como WhatsApp, Telegram, o usando en materiales impresos, tarjetas de visita y anuncios, las URLs cortas proporcionan una mejor experiencia de usuario.",
        "Además, las URLs cortas ayudan con el seguimiento de clics y análisis de origen de usuarios (próximamente), permitiéndote entender mejor la efectividad del compartir y la respuesta de la audiencia."
      ]
    }
  },
  features: {
    title: {
      zh: "短網址功能特色",
      en: "Short URL Features",
      jp: "短縮URL機能特徴",
      es: "Características de URL Corta"
    },
    items: {
      zh: [
        "快速將長網址縮短為易於分享的短連結",
        "6位字符代碼，安全可靠",
        "永久有效，無使用次數限制",
        "支援自訂短網址（透過 vvrl.cc）",
        "適用於各種社交媒體和通訊平台",
        "統計追蹤功能（即將推出）"
      ],
      en: [
        "Quickly shorten long URLs into easy-to-share short links",
        "6-character code, secure and reliable",
        "Permanently valid, no usage limit",
        "Support custom short URLs (via vvrl.cc)",
        "Suitable for various social media and communication platforms",
        "Statistics tracking feature (coming soon)"
      ],
      jp: [
        "長いURLを簡単に共有できる短いリンクに素早く短縮",
        "6文字コードで安全かつ信頼性が高い",
        "永久有効、使用回数制限なし",
        "カスタム短縮URLをサポート（vvrl.cc経由）",
        "様々なソーシャルメディアやコミュニケーションプラットフォームに適用",
        "統計追跡機能（近日公開予定）"
      ],
      es: [
        "Acorta rápidamente URLs largas en enlaces cortos fáciles de compartir",
        "Código de 6 caracteres, seguro y confiable",
        "Válido permanentemente, sin límite de uso",
        "Soporte para URLs cortas personalizadas (vía vvrl.cc)",
        "Adecuado para varias redes sociales y plataformas de comunicación",
        "Función de seguimiento de estadísticas (próximamente)"
      ]
    }
  },
  whyChooseUs: {
    title: {
      zh: "為什麼選擇我們的短網址工具？",
      en: "Why Choose Our URL Shortener Tool?",
      jp: "なぜ当短縮URLツールを選ぶのか？",
      es: "¿Por Qué Elegir Nuestra Herramienta de Acortamiento de URL?"
    },
    features: {
      simple: {
        title: {
          zh: "簡單易用",
          en: "Simple and Easy",
          jp: "シンプルで使いやすい",
          es: "Simple y Fácil"
        },
        content: {
          zh: "只需輸入長網址，一鍵生成短連結，操作簡單直觀，無需註冊即可使用。",
          en: "Just enter a long URL and generate a short link with one click. Simple and intuitive operation without registration required.",
          jp: "長いURLを入力するだけで、ワンクリックで短いリンクを生成。シンプルで直感的な操作で、登録不要で使用可能。",
          es: "Solo ingresa una URL larga y genera un enlace corto con un clic. Operación simple e intuitiva sin necesidad de registro."
        }
      },
      reliable: {
        title: {
          zh: "安全可靠",
          en: "Safe and Reliable",
          jp: "安全で信頼性が高い",
          es: "Seguro y Confiable"
        },
        content: {
          zh: "採用安全的短網址生成演算法，確保每個短連結的唯一性和安全性，永久有效。",
          en: "Uses secure short URL generation algorithms to ensure uniqueness and security of each short link, permanently valid.",
          jp: "安全な短縮URL生成アルゴリズムを使用して、各短いリンクの一意性と安全性を確保し、永続的に有効。",
          es: "Utiliza algoritmos seguros de generación de URL corta para garantizar la unicidad y seguridad de cada enlace corto, válido permanentemente."
        }
      },
      free: {
        title: {
          zh: "完全免費",
          en: "Completely Free",
          jp: "完全無料",
          es: "Completamente Gratis"
        },
        content: {
          zh: "提供免費的短網址服務，無使用次數限制，無廣告干擾，專注於提供最佳用戶體驗。",
          en: "Provides free URL shortening service with no usage limits, no advertisements, focusing on delivering the best user experience.",
          jp: "使用回数制限なし、広告なしの無料短縮URLサービスを提供し、最高のユーザー体験の提供に焦点を当てています。",
          es: "Proporciona servicio gratuito de acortamiento de URL sin límites de uso, sin anuncios, enfocándose en brindar la mejor experiencia de usuario."
        }
      },
      custom: {
        title: {
          zh: "自訂功能",
          en: "Customization",
          jp: "カスタマイズ機能",
          es: "Personalización"
        },
        content: {
          zh: "支援自訂短網址功能，透過 vvrl.cc 可設定個人化的短連結，滿足不同需求。",
          en: "Supports custom short URL functionality. Through vvrl.cc, you can set personalized short links to meet different needs.",
          jp: "カスタム短縮URL機能をサポート。vvrl.ccを通じて個人化された短いリンクを設定でき、様々なニーズに対応。",
          es: "Soporta funcionalidad de URL corta personalizada. A través de vvrl.cc, puedes configurar enlaces cortos personalizados para satisfacer diferentes necesidades."
        }
      }
    }
  },
  useCases: {
    title: {
      zh: "短網址應用場景",
      en: "Short URL Use Cases",
      jp: "短縮URLの使用ケース",
      es: "Casos de Uso de URL Corta"
    },
    scenarios: {
      social: {
        title: {
          zh: "社交媒體分享",
          en: "Social Media Sharing",
          jp: "ソーシャルメディア共有",
          es: "Compartir en Redes Sociales"
        },
        content: {
          zh: "在 Facebook、Instagram、Twitter、LINE 等社交平台分享時，短網址能節省字符空間，讓貼文看起來更簡潔美觀。",
          en: "When sharing on social platforms like Facebook, Instagram, Twitter, LINE, short URLs save character space and make posts look cleaner.",
          jp: "Facebook、Instagram、Twitter、LINEなどのソーシャルプラットフォームで共有する際、短縮URLは文字スペースを節約し、投稿をより簡潔に見せます。",
          es: "Al compartir en plataformas sociales como Facebook, Instagram, Twitter, LINE, las URLs cortas ahorran espacio de caracteres y hacen que las publicaciones se vean más limpias."
        }
      },
      marketing: {
        title: {
          zh: "行銷推廣",
          en: "Marketing Promotion",
          jp: "マーケティングプロモーション",
          es: "Promoción de Marketing"
        },
        content: {
          zh: "在廣告文案、DM、名片或海報上使用短網址，讓顧客更容易記憶和輸入，提高轉換率和品牌形象。",
          en: "Use short URLs in advertising copy, DMs, business cards, or posters to make them easier for customers to remember and type, improving conversion rates and brand image.",
          jp: "広告コピー、DM、名刺、ポスターで短縮URLを使用することで、顧客が覚えやすく入力しやすくなり、コンバージョン率とブランドイメージが向上します。",
          es: "Use URLs cortas en copias publicitarias, DMs, tarjetas de visita o carteles para que sean más fáciles de recordar y escribir para los clientes, mejorando las tasas de conversión y la imagen de marca."
        }
      },
      messaging: {
        title: {
          zh: "訊息傳送",
          en: "Messaging",
          jp: "メッセージング",
          es: "Mensajería"
        },
        content: {
          zh: "在 WhatsApp、Telegram、微信等即時通訊軟體中傳送連結時，短網址避免了訊息被過長的網址佔據，保持對話的整潔性。",
          en: "When sending links in instant messaging apps like WhatsApp, Telegram, WeChat, short URLs prevent messages from being dominated by overly long URLs, maintaining conversation clarity.",
          jp: "WhatsApp、Telegram、WeChatなどのインスタントメッセージングアプリでリンクを送信する際、短縮URLは過度に長いURLによってメッセージが支配されることを防ぎ、会話の明瞭性を保ちます。",
          es: "Al enviar enlaces en aplicaciones de mensajería instantánea como WhatsApp, Telegram, WeChat, las URLs cortas evitan que los mensajes sean dominados por URLs excesivamente largas, manteniendo la claridad de la conversación."
        }
      },
      print: {
        title: {
          zh: "印刷品應用",
          en: "Print Applications",
          jp: "印刷物への応用",
          es: "Aplicaciones Impresas"
        },
        content: {
          zh: "在雜誌、報紙、傳單、手冊等印刷媒體上，短網址易於閱讀和手動輸入，大大提升了線下到線上的轉換效果。",
          en: "In print media such as magazines, newspapers, flyers, brochures, short URLs are easy to read and manually input, greatly improving offline-to-online conversion effectiveness.",
          jp: "雑誌、新聞、チラシ、パンフレットなどの印刷メディアでは、短縮URLは読みやすく手動入力しやすく、オフラインからオンラインへの変換効果を大幅に向上させます。",
          es: "En medios impresos como revistas, periódicos, volantes, folletos, las URLs cortas son fáciles de leer e ingresar manualmente, mejorando enormemente la efectividad de conversión offline-a-online."
        }
      }
    }
  }
};

export default function ArticleContent({ locale }: ArticleContentProps) {
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

  return (
    <>
      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{shorturlContentTranslations.howToUse.title[lang]}</h2>
        <ol className="ml-6 list-decimal space-y-2 mt-4">
          {shorturlContentTranslations.howToUse.steps[lang].map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="bg-blue-50 p-3 rounded-lg mt-4">
          <p className="text-blue-700 font-medium flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {shorturlContentTranslations.howToUse.tip[lang]}<br />
            {shorturlContentTranslations.howToUse.tipContent[lang]}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{shorturlContentTranslations.whatIs.title[lang]}</h2>
        <div className="space-y-4">
          {shorturlContentTranslations.whatIs.content[lang].map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{shorturlContentTranslations.features.title[lang]}</h2>
        <ul className="list-disc ml-6 space-y-2">
          {shorturlContentTranslations.features.items[lang].map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{shorturlContentTranslations.useCases.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h3a1 1 0 011 1v2h4a1 1 0 011 1v3a1 1 0 01-1 1h-3v11a2 2 0 01-2 2H8a2 2 0 01-2-2V9H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
              </svg>
              <h3 className="font-medium text-blue-700">{shorturlContentTranslations.useCases.scenarios.social.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {shorturlContentTranslations.useCases.scenarios.social.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <h3 className="font-medium text-green-700">{shorturlContentTranslations.useCases.scenarios.marketing.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {shorturlContentTranslations.useCases.scenarios.marketing.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="font-medium text-purple-700">{shorturlContentTranslations.useCases.scenarios.messaging.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {shorturlContentTranslations.useCases.scenarios.messaging.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="font-medium text-amber-700">{shorturlContentTranslations.useCases.scenarios.print.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {shorturlContentTranslations.useCases.scenarios.print.content[lang]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{shorturlTranslations.faq.title[lang]}</h2>
        
        <div className="space-y-6">
          {shorturlTranslations.faq.questions[lang].map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700">{item.question}</h3>
              <p className="mt-2">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-3">{shorturlContentTranslations.whyChooseUs.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="font-medium text-blue-700">{shorturlContentTranslations.whyChooseUs.features.simple.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {shorturlContentTranslations.whyChooseUs.features.simple.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-medium text-green-700">{shorturlContentTranslations.whyChooseUs.features.reliable.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {shorturlContentTranslations.whyChooseUs.features.reliable.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-purple-700">{shorturlContentTranslations.whyChooseUs.features.free.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {shorturlContentTranslations.whyChooseUs.features.free.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="font-medium text-amber-700">{shorturlContentTranslations.whyChooseUs.features.custom.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {shorturlContentTranslations.whyChooseUs.features.custom.content[lang]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}