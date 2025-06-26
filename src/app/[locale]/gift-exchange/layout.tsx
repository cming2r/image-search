import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema,
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { giftExchangeTranslations } from './components/meta-translations';

const keywordsList = {
  zh: ['交換禮物', '抽籤', '輪盤', '秘密聖誕老人', '團隊活動'],
  en: ['gift exchange', 'drawing', 'wheel', 'secret santa', 'team event'],
  jp: ['ギフト交換', '抽選', 'ホイール', 'シークレットサンタ', 'チームイベント'],
  es: ['intercambio de regalos', 'sorteo', 'ruleta', 'amigo secreto', 'evento de equipo']
};

// 多語言FAQ數據
const faqsData = {
  zh: [
    {
      '@type': 'Question',
      name: '如何確保轉盤結果的公平性？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '我們的轉盤使用Fisher-Yates洗牌算法，確保每次轉動結果都完全隨機且不可預測。轉盤動畫效果不僅增加趣味性，還能讓所有參與者親眼見證抽籤過程的透明度，避免任何疑慮。系統還支持「隨機分佈參與者順序」選項，進一步增強公平性。'
      }
    },
    {
      '@type': 'Question',
      name: '如何設置和管理禮物價格範圍？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '雖然系統本身不直接設置價格限制，但建議在創建活動時與參與者溝通並達成一致的預算範圍。常見的做法是在開始前商定一個適合所有人的價格區間（例如200或500元）。這能確保所有人的禮物價值相近，避免尷尬情況，讓交換體驗更加公平愉快。'
      }
    },
    {
      '@type': 'Question',
      name: '抽籤結果如何保存和分享？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '所有抽籤結果會自動與您的活動代碼關聯並暫時保存。活動完成後，您可以在結果頁面查看完整的配對清單。同時，系統提供方便的分享功能，您只需點擊分享按鈕，即可將活動連結發送給所有參與者。所有數據會在活動結束一段時間後自動清理，確保您的隱私安全。'
      }
    },
    {
      '@type': 'Question',
      name: '可以在不同裝置上使用同一個活動嗎？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是的，我們的系統完全跨平台兼容。您可以在桌面電腦創建活動，然後在手機或平板上繼續進行。所有參與者只需通過分享的連結，就能在任何具有網頁瀏覽器的設備上查看和參與活動。這種靈活性特別適合遠程或混合工作環境下的團隊活動，或是家人朋友間的遠距離交流。'
      }
    }
  ],
  en: [
    {
      '@type': 'Question',
      name: 'How is the fairness of wheel results ensured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our wheel uses the Fisher-Yates shuffling algorithm to ensure each spin result is completely random and unpredictable. The wheel animation effect not only adds fun but also allows all participants to witness the transparency of the drawing process, avoiding any doubts. The system also supports the \"Randomize participant order\" option to further enhance fairness.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I set and manage gift price ranges?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While the system itself doesn\'t directly set price limits, it\'s recommended to communicate with participants when creating an event and reach a consensus on budget range. A common practice is to agree on a price range suitable for everyone (e.g., $20 or $50) before starting. This ensures all gifts are of similar value, avoids awkward situations, and makes the exchange experience more fair and enjoyable.'
      }
    },
    {
      '@type': 'Question',
      name: 'How are drawing results saved and shared?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All drawing results are automatically associated with your event code and temporarily saved. After the event is completed, you can view the complete pairing list on the results page. The system also provides a convenient sharing function - you just need to click the share button to send the event link to all participants. All data will be automatically cleared after a period following the event\'s end, ensuring your privacy and security.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I use the same event on different devices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our system is fully cross-platform compatible. You can create an event on a desktop computer and then continue on a phone or tablet. All participants only need the shared link to view and participate in the event on any device with a web browser. This flexibility is particularly suitable for team activities in remote or hybrid work environments, or for long-distance communication between family and friends.'
      }
    }
  ],
  jp: [
    {
      '@type': 'Question',
      name: 'ホイール結果の公平性はどのように確保されていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '当社のホイールはフィッシャー-イェーツシャッフルアルゴリズムを使用して、各スピン結果が完全にランダムで予測不可能であることを確保しています。ホイールのアニメーション効果は楽しさを加えるだけでなく、すべての参加者が抽選プロセスの透明性を目撃できるようにし、疑問を避けます。システムはまた、「参加者の順序をランダム化」オプションをサポートして公平性をさらに強化します。'
      }
    },
    {
      '@type': 'Question',
      name: 'ギフトの価格帯はどのように設定・管理しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'システム自体は直接価格制限を設定しませんが、イベントを作成する際に参加者とコミュニケーションを取り、予算範囲に関するコンセンサスに達することをお勧めします。一般的な方法は、開始前に全員に適した価格帯（例：2000円または5000円）に同意することです。これにより、すべてのギフトが同様の価値を持ち、ぎこちない状況を避け、交換体験をより公平で楽しいものにします。'
      }
    },
    {
      '@type': 'Question',
      name: '抽選結果はどのように保存・共有されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'すべての抽選結果は自動的にイベントコードに関連付けられ、一時的に保存されます。イベント完了後、結果ページで完全なペアリングリストを表示できます。システムは便利な共有機能も提供しています。共有ボタンをクリックするだけで、イベントリンクをすべての参加者に送信できます。すべてのデータはイベント終了後一定期間経過すると自動的にクリアされ、プライバシーとセキュリティを確保します。'
      }
    },
    {
      '@type': 'Question',
      name: '異なるデバイスで同じイベントを使用できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、当社のシステムは完全にクロスプラットフォーム互換です。デスクトップコンピュータでイベントを作成し、その後スマートフォンやタブレットで続行できます。すべての参加者は共有リンクのみで、ウェブブラウザを備えた任意のデバイスでイベントを表示・参加できます。この柔軟性は、リモートまたはハイブリッドワーク環境でのチームアクティビティ、または家族や友人間の長距離コミュニケーションに特に適しています。'
      }
    }
  ],
  es: [
    {
      '@type': 'Question',
      name: '¿Cómo se asegura la equidad de los resultados de la ruleta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nuestra ruleta utiliza el algoritmo de barajado Fisher-Yates para asegurar que cada resultado de giro sea completamente aleatorio e impredecible. El efecto de animación de la ruleta no solo añade diversión sino que también permite a todos los participantes presenciar la transparencia del proceso de sorteo, evitando cualquier duda. El sistema también soporta la opción "Aleatorizar orden de participantes" para mejorar aún más la equidad.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo establecer y gestionar los rangos de precios de los regalos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aunque el sistema en sí no establece límites de precio directamente, se recomienda comunicarse con los participantes al crear un evento y llegar a un consenso sobre el rango de presupuesto. Una práctica común es acordar un rango de precios adecuado para todos (por ejemplo, $20 o $50) antes de comenzar. Esto asegura que todos los regalos tengan un valor similar, evita situaciones incómodas y hace que la experiencia de intercambio sea más justa y agradable.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo se guardan y comparten los resultados del sorteo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos los resultados del sorteo se asocian automáticamente con su código de evento y se guardan temporalmente. Después de completar el evento, puede ver la lista completa de emparejamientos en la página de resultados. El sistema también proporciona una función de compartir conveniente: solo necesita hacer clic en el botón de compartir para enviar el enlace del evento a todos los participantes. Todos los datos se limpiarán automáticamente después de un período tras el final del evento, asegurando su privacidad y seguridad.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar el mismo evento en diferentes dispositivos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, nuestro sistema es completamente compatible entre plataformas. Puede crear un evento en una computadora de escritorio y luego continuar en un teléfono o tableta. Todos los participantes solo necesitan el enlace compartido para ver y participar en el evento en cualquier dispositivo con un navegador web. Esta flexibilidad es particularmente adecuada para actividades de equipo en entornos de trabajo remoto o híbrido, o para comunicación a larga distancia entre familiares y amigos.'
      }
    }
  ]
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/gift-exchange/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼
const langMap = {
  'zh': 'zh-TW',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片
const imageUrl = getFullUrl('/images/og-gift-exchange.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'zh' } = await params;
  const title = giftExchangeTranslations.meta.title[locale as keyof typeof giftExchangeTranslations.meta.title] || giftExchangeTranslations.meta.title.zh;
  const description = giftExchangeTranslations.meta.description[locale as keyof typeof giftExchangeTranslations.meta.description] || giftExchangeTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'zh' ? `交換禮物抽籤` : 
                locale === 'en' ? `Gift Exchange Draw` : 
                locale === 'jp' ? `ギフト交換抽選` :
                locale === 'es' ? `Sorteo de Intercambio de Regalos` : `Gift Exchange Draw`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'zh' ? '/gift-exchange' : `/${locale}/gift-exchange`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? '交換禮物抽籤工具界面' : 
               locale === 'en' ? 'Gift Exchange Draw Tool Interface' :
               locale === 'jp' ? 'ギフト交換抽選ツールインターフェース' :
               locale === 'es' ? 'Interfaz de Herramienta de Sorteo de Intercambio de Regalos' : 'Gift Exchange Draw Tool Interface',
          type: 'image/png',
        },
      ],
    },
    
    // Twitter/X 平台卡片設定
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fyimg',
      site: '@fyimg',
      images: [imageUrl],
    },
    
    // 規範連結（確保SEO正確性）
    alternates: {
      canonical: getFullUrl(locale === 'zh' ? '/gift-exchange' : `/${locale}/gift-exchange`),
      languages: {
        'zh-TW': getFullUrl('/gift-exchange'),
        'en': getFullUrl('/en/gift-exchange'),
        'ja': getFullUrl('/jp/gift-exchange'),
        'es': getFullUrl('/es/gift-exchange'),
      },
    },
    
    // 關鍵字、作者及發布者信息
    keywords,
    authors: [{ name: 'fyimg開發團隊' }],
    creator: 'fyimg開發團隊',
    publisher: 'fyimg',
  };
}

/**
 * 交換禮物抽籤頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function GiftExchangeLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'zh' } = await params;
  const language = langMap[locale as keyof typeof langMap] || 'zh-TW';
  
  // 根據當前語言取得相應標題與描述
  const title = giftExchangeTranslations.meta.title[locale as keyof typeof giftExchangeTranslations.meta.title] || giftExchangeTranslations.meta.title.zh;
  const description = giftExchangeTranslations.meta.description[locale as keyof typeof giftExchangeTranslations.meta.description] || giftExchangeTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.zh;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/gift-exchange', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/gift-exchange',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    3500,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/gift-exchange',
    locale === 'zh' ? '交換禮物轉盤工具' :
    locale === 'en' ? 'Gift Exchange Wheel Tool' :
    locale === 'jp' ? 'ギフト交換ホイールツール' :
    locale === 'es' ? 'Herramienta de Ruleta de Intercambio de Regalos' : 'Gift Exchange Wheel Tool',
    description,
    'SocialApplication',
    '4.9',           // 評分值
    '240',           // 評分數量
    datePublished,   // 使用頁面發布日期作為有效日期起點
    language,        // 頁面語言
    locale           // 當前語言代碼
  );
  
  return (
    <>
      {/* 結構化數據標記 - 為每個數據類型使用獨立標記 */}
      <script
        type="application/ld+json"
      >{`
${formatJSON(breadcrumbSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(faqSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(articleSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(webApplicationSchema)}
`}</script>
      {children}
    </>
  );
}