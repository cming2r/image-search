import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { colorPickerTranslations } from './components/meta-translations';

const keywordsList = {
  tw: ['顏色選擇器', '色彩工具', 'HEX轉RGB', 'RGB轉HSL', '線上色彩挑選'],
  cn: ['颜色选择器', '色彩工具', 'HEX转RGB', 'RGB转HSL', '在线色彩挑选'],
  en: ['color picker', 'color tool', 'HEX to RGB', 'RGB to HSL', 'online color selection'],
  jp: ['カラーピッカー', '色彩ツール', 'HEXからRGB', 'RGBからHSL', 'オンライン色選択'],
  es: ['selector de color', 'herramienta de color', 'HEX a RGB', 'RGB a HSL', 'selección de color en línea']
};

// 多語言FAQ數據
const faqsData = {
  tw: [
    {
      '@type': 'Question',
      name: '什麼是顏色選擇器？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '顏色選擇器是一個線上工具，幫助用戶選擇和轉換不同格式的顏色代碼。支持HEX、RGB、HSL等常見顏色格式之間的相互轉換，廣泛應用於網頁設計、UI設計和數字創作領域。'
      }
    },
    {
      '@type': 'Question',
      name: 'HEX、RGB、HSL有什麼區別？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HEX是十六進制顏色代碼，常用於網頁設計；RGB表示紅綠藍三原色的數值組合；HSL表示色相、飽和度和亮度，更符合人類對顏色的感知方式。每種格式都有其特定的應用場景和優勢。'
      }
    },
    {
      '@type': 'Question',
      name: '如何使用這個顏色選擇器？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '您可以通過多種方式使用：1) 在任意格式的輸入框中輸入顏色值，其他格式會自動更新；2) 點擊顏色預覽區域複製HEX代碼；3) 使用各格式區域的複製按鈕獲取對應的顏色代碼。所有操作都是實時同步的。'
      }
    },
    {
      '@type': 'Question',
      name: '這個工具適合什麼人使用？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '適合所有需要處理顏色的人群：網頁設計師可以快速獲取CSS顏色代碼；UI設計師可以進行精確的顏色調配；開發者可以在不同顏色格式間轉換；普通用戶也可以用來選擇和匹配顏色。'
      }
    }
  ],
  en: [
    {
      '@type': 'Question',
      name: 'What is a color picker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A color picker is an online tool that helps users select and convert color codes in different formats. It supports mutual conversion between common color formats like HEX, RGB, HSL, and is widely used in web design, UI design, and digital creation.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between HEX, RGB, and HSL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HEX is hexadecimal color code commonly used in web design; RGB represents the numerical combination of red, green, and blue primary colors; HSL represents hue, saturation, and lightness, which is more aligned with human color perception. Each format has its specific application scenarios and advantages.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I use this color picker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can use it in multiple ways: 1) Enter color values in any format input box, and other formats will update automatically; 2) Click the color preview area to copy the HEX code; 3) Use the copy buttons in each format section to get the corresponding color code. All operations are synchronized in real-time.'
      }
    },
    {
      '@type': 'Question',
      name: 'Who is this tool suitable for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Suitable for anyone who needs to work with colors: web designers can quickly get CSS color codes; UI designers can perform precise color matching; developers can convert between different color formats; ordinary users can also use it to select and match colors.'
      }
    }
  ],
  jp: [
    {
      '@type': 'Question',
      name: 'カラーピッカーとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'カラーピッカーは、ユーザーが異なる形式の色コードを選択および変換するのに役立つオンラインツールです。HEX、RGB、HSLなどの一般的な色形式間の相互変換をサポートし、ウェブデザイン、UIデザイン、デジタル創作分野で広く使用されています。'
      }
    },
    {
      '@type': 'Question',
      name: 'HEX、RGB、HSLの違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HEXはウェブデザインでよく使用される16進数カラーコードです；RGBは赤、緑、青の三原色の数値の組み合わせを表します；HSLは色相、彩度、明度を表し、人間の色知覚により適合しています。各形式には固有の適用シナリオと利点があります。'
      }
    },
    {
      '@type': 'Question',
      name: 'このカラーピッカーの使い方は？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '複数の方法で使用できます：1) 任意の形式の入力ボックスに色の値を入力すると、他の形式が自動的に更新されます；2) カラープレビューエリアをクリックしてHEXコードをコピーします；3) 各形式セクションのコピーボタンを使用して対応する色コードを取得します。すべての操作はリアルタイムで同期されます。'
      }
    },
    {
      '@type': 'Question',
      name: 'このツールは誰に適していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '色を扱う必要があるすべての人に適しています：ウェブデザイナーはCSSカラーコードを迅速に取得できます；UIデザイナーは正確な色調整を行えます；開発者は異なる色形式間で変換できます；一般ユーザーも色の選択とマッチングに使用できます。'
      }
    }
  ],
  cn: [
    {
      '@type': 'Question',
      name: '什么是颜色选择器？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '颜色选择器是一个在线工具，帮助用户选择和转换不同格式的颜色代码。支持HEX、RGB、HSL等常见颜色格式之间的相互转换，广泛应用于网页设计、UI设计和数字创作领域。'
      }
    },
    {
      '@type': 'Question',
      name: 'HEX、RGB、HSL有什么区别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HEX是十六进制颜色代码，常用于网页设计；RGB表示红绿蓝三原色的数值组合；HSL表示色相、饱和度和亮度，更符合人类对颜色的感知方式。每种格式都有其特定的应用场景和优势。'
      }
    },
    {
      '@type': 'Question',
      name: '如何使用这个颜色选择器？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '您可以通过多种方式使用：1) 在任意格式的输入框中输入颜色值，其他格式会自动更新；2) 点击颜色预览区域复制HEX代码；3) 使用各格式区域的复制按钮获取对应的颜色代码。所有操作都是实时同步的。'
      }
    },
    {
      '@type': 'Question',
      name: '这个工具适合什么人使用？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '适合所有需要处理颜色的人群：网页设计师可以快速获取CSS颜色代码；UI设计师可以进行精确的颜色调配；开发者可以在不同颜色格式间转换；普通用户也可以用来选择和匹配颜色。'
      }
    }
  ],
  es: [
    {
      '@type': 'Question',
      name: '¿Qué es un selector de color?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un selector de color es una herramienta en línea que ayuda a los usuarios a seleccionar y convertir códigos de color en diferentes formatos. Soporta la conversión mutua entre formatos de color comunes como HEX, RGB, HSL, y se utiliza ampliamente en diseño web, diseño UI y creación digital.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre HEX, RGB y HSL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HEX es un código de color hexadecimal comúnmente usado en diseño web; RGB representa la combinación numérica de los colores primarios rojo, verde y azul; HSL representa tono, saturación y luminosidad, lo cual está más alineado con la percepción humana del color. Cada formato tiene sus escenarios de aplicación y ventajas específicas.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo uso este selector de color?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puede usarlo de múltiples formas: 1) Ingrese valores de color en cualquier cuadro de entrada de formato, y otros formatos se actualizarán automáticamente; 2) Haga clic en el área de vista previa del color para copiar el código HEX; 3) Use los botones de copiar en cada sección de formato para obtener el código de color correspondiente. Todas las operaciones se sincronizan en tiempo real.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Para quién es adecuada esta herramienta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adecuada para cualquier persona que necesite trabajar con colores: los diseñadores web pueden obtener rápidamente códigos de color CSS; los diseñadores UI pueden realizar coincidencias de color precisas; los desarrolladores pueden convertir entre diferentes formatos de color; los usuarios comunes también pueden usarla para seleccionar y combinar colores.'
      }
    }
  ]
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/color-picker/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼
const langMap = {
  'tw': 'zh-TW',
  'cn': 'zh-CN',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片
const imageUrl = getFullUrl('/images/og-color-picker.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params;
  const title = colorPickerTranslations.meta.title[locale as keyof typeof colorPickerTranslations.meta.title] || colorPickerTranslations.meta.title.tw;
  const description = colorPickerTranslations.meta.description[locale as keyof typeof colorPickerTranslations.meta.description] || colorPickerTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'en' ? `顏色選擇器` : 
                  locale === 'en' ? `Color Picker` : 
                  `カラーピッカー`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'en' ? '/color-picker' : `/${locale}/color-picker`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'tw' ? '顏色選擇器工具界面' :
               locale === 'cn' ? '颜色选择器工具界面' :
               locale === 'en' ? 'Color Picker Tool Interface' :
               locale === 'es' ? 'Interfaz de Herramienta Selector de Color' :
               'カラーピッカーツールインターフェース',
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
      canonical: getFullUrl(locale === 'en' ? '/color-picker' : `/${locale}/color-picker`),
      languages: {
        'zh-TW': getFullUrl('/tw/color-picker'),
        'zh-CN': getFullUrl('/cn/color-picker'),
        'en': getFullUrl('/en/color-picker'),
        'ja': getFullUrl('/jp/color-picker'),
        'es': getFullUrl('/es/color-picker'),
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
 * 顏色選擇器頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function ColorPickerLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'en' } = await params;
  const language = langMap[locale as keyof typeof langMap] || 'zh-TW';
  
  // 根據當前語言取得相應標題與描述
  const title = colorPickerTranslations.meta.title[locale as keyof typeof colorPickerTranslations.meta.title] || colorPickerTranslations.meta.title.tw;
  const description = colorPickerTranslations.meta.description[locale as keyof typeof colorPickerTranslations.meta.description] || colorPickerTranslations.meta.description.tw;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.tw;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.tw;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/color-picker', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/color-picker',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    2800,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/color-picker',
    locale === 'tw' ? '線上顏色選擇器工具' :
    locale === 'cn' ? '在线颜色选择器工具' :
    locale === 'en' ? 'Online Color Picker Tool' :
    locale === 'es' ? 'Herramienta Selector de Color en Línea' :
    'オンラインカラーピッカーツール',
    description,
    'UtilityApplication',
    '4.8',           // 評分值
    '156',           // 評分數量
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