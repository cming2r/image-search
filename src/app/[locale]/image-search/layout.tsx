import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { imageSearchTranslations } from './components/meta-translations';

const keywordsList = {
  zh: ['以圖搜圖', '反向圖片搜尋', 'iphone手機以圖搜圖'],
  en: ['reverse image search', 'image search tool', 'search by image'],
  jp: ['画像検索', '逆画像検索', '画像で検索'],
  es: ['búsqueda inversa de imágenes', 'herramienta de búsqueda de imágenes', 'buscar por imagen']
};

// 多語言FAQ數據
const faqsData = {
  zh: [
    {
      '@type': 'Question',
      name: '什麼是以圖搜圖（反向圖片搜尋）？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '以圖搜圖（又稱反向圖片搜尋）是一種使用圖片作為搜尋輸入（而不是文字）的搜尋方式。通過上傳圖片或提供圖片的URL，搜尋引擎會找到與該圖片相似或相關的其他圖片和網頁。'
      }
    },
    {
      '@type': 'Question',
      name: '如何使用這個工具搜尋圖片？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '您可以通過三種方式使用本工具：1) 直接輸入圖片的網址，然後點擊"搜尋此圖片"；2) 上傳您本地電腦上的圖片文件；3) 直接複製圖片後使用Ctrl+V貼上。之後選擇您想使用的搜尋引擎（如Google、Bing、Yandex等）進行搜尋。'
      }
    },
    {
      '@type': 'Question',
      name: '這個工具支持哪些搜尋引擎？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本工具支持多種流行的圖片搜尋引擎，包括Google圖片搜尋、Bing圖片搜尋、Yandex以及SauceNAO等。每個搜尋引擎有其特點，Google功能全面，Bing擅長高清圖像，Yandex善於找出修改過的圖片，SauceNAO專注於動漫內容。'
      }
    },
    {
      '@type': 'Question',
      name: '上傳的圖片會如何處理？是否會保存？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '我們非常重視使用者隱私。當您上傳圖片時，系統會暫時儲存該圖片以生成可搜尋的URL，但所有圖片資料會在24小時內自動刪除。我們不會永久保存您的圖片，也不會將其用於任何其他目的。上傳的圖片僅用於提供搜尋服務，且只有您可以透過生成的URL存取它。'
      }
    },
    {
      '@type': 'Question',
      name: '為什麼有時搜尋結果不準確？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '以圖搜圖的準確性取決於多種因素，包括圖片品質、搜尋引擎的資料庫覆蓋範圍、圖片的獨特性等。如果您的圖片解析度較低、經過裁剪或修改，或是非常常見的圖片類型（如藍天、草地等），搜尋準確率可能會降低。為獲得最佳結果，建議使用清晰、完整的原始圖片，並嘗試多個搜尋引擎進行對比，因為不同引擎的演算法和資料庫有所不同。'
      }
    },
    {
      '@type': 'Question',
      name: '這個工具是否支援手機搜尋？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是的，本工具完全支援行動裝置使用，包括iPhone和Android設備。在手機上，您可以點擊「上傳圖片」後從相冊選擇照片，或直接拍攝新照片上傳。您也可以從其他應用分享圖片到我們的網站，或將圖片複製到剪貼板後貼上。'
      }
    },
    {
      '@type': 'Question',
      name: '如何在手機上直接拍照搜尋？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '在手機上使用我們的工具拍照搜尋非常簡單：1) 用手機瀏覽我們的網站；2) 點擊「上傳圖片」按鈕；3) 選擇「拍攝照片」選項（或選擇手機相冊中已有的照片）；4) 拍攝您想搜尋的物體或場景；5) 圖片上傳後，選擇喜好的搜尋引擎進行搜尋。這個功能在購物時查詢商品、旅行中識別地標、或遇到不認識的植物動物時特別有用。'
      }
    },
    {
      '@type': 'Question',
      name: '可以直接複製網頁上的圖片進行搜尋嗎？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是的，我們支持剪貼板直接貼圖功能。當您在瀏覽網頁時看到感興趣的圖片，可以右鍵點擊該圖片並選擇「複製圖片」，然後切換到我們的網站，點擊上傳區域並使用Ctrl+V (Windows/Linux)或Command+V (Mac)直接貼上圖片。系統會自動處理上傳並準備搜尋，大大簡化了搜尋流程。'
      }
    },
    {
      '@type': 'Question',
      name: '以圖搜圖有哪些常見使用場景？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '以圖搜圖的應用非常廣泛：1) 查找圖片來源或高解析度版本；2) 識別不認識的植物、動物、商品或地標；3) 查找類似的設計靈感或素材；4) 驗證圖片真實性，識別合成或修改過的圖片；5) 查找特定服裝或商品的購買渠道；6) 追蹤藝術作品、動漫或遊戲截圖的出處；7) 檢查自己創作的內容是否被盜用。這些場景對設計師、研究人員、內容創作者和日常使用者都非常實用。'
      }
    }
  ],
  en: [
    {
      '@type': 'Question',
      name: 'What is reverse image search?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reverse image search is a search method that uses an image as the search input (instead of text). By uploading an image or providing an image URL, search engines can find other similar or related images and web pages.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I use this tool to search for images?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can use this tool in three ways: 1) Enter the image URL directly, then click "Search this image"; 2) Upload an image file from your local computer; 3) Copy an image and paste it using Ctrl+V. Then select the search engine you want to use (such as Google, Bing, Yandex, etc.).'
      }
    },
    {
      '@type': 'Question',
      name: 'What search engines does this tool support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool supports multiple popular image search engines, including Google Image Search, Bing Image Search, Yandex, and SauceNAO. Each search engine has its strengths: Google is comprehensive, Bing excels at high-resolution images, Yandex is good at finding modified images, and SauceNAO specializes in anime content.'
      }
    },
    {
      '@type': 'Question',
      name: 'How are uploaded images processed? Are they saved?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We take user privacy very seriously. When you upload an image, the system temporarily stores it to generate a searchable URL, but all image data is automatically deleted within 24 hours. We do not permanently store your images or use them for any other purpose. Uploaded images are only used for providing search services, and only you can access them through the generated URL.'
      }
    },
    {
      '@type': 'Question',
      name: 'Why are search results sometimes inaccurate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The accuracy of reverse image search depends on multiple factors, including image quality, search engine database coverage, and image uniqueness. If your image has low resolution, has been cropped or modified, or is a very common image type (like blue sky, grass, etc.), search accuracy may decrease. For best results, we recommend using clear, complete original images and trying multiple search engines for comparison, as different engines have different algorithms and databases.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does this tool support mobile searches?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our tool fully supports mobile device usage, including iPhone and Android devices. On your mobile, you can tap "Upload Image" to select a photo from your gallery or take a new photo. You can also share images from other apps to our website or copy an image to your clipboard and paste it.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I search directly with my phone camera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Using our tool to search with your phone camera is simple: 1) Visit our website with your mobile browser; 2) Tap the "Upload Image" button; 3) Choose "Take Photo" (or select an existing photo from your gallery); 4) Capture the object or scene you want to search; 5) After the image uploads, select your preferred search engine. This feature is especially useful when shopping for products, identifying landmarks while traveling, or when you encounter unfamiliar plants or animals.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I directly copy images from web pages for search?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we support direct image pasting from the clipboard. When you see an interesting image while browsing, right-click on the image and choose "Copy Image," then switch to our website, click the upload area, and use Ctrl+V (Windows/Linux) or Command+V (Mac) to paste the image directly. The system will automatically process the upload and prepare for search, greatly simplifying the search process.'
      }
    }
  ],
  jp: [
    {
      '@type': 'Question',
      name: '画像検索（逆画像検索）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '画像検索（逆画像検索とも呼ばれる）は、テキストではなく画像を検索入力として使用する検索方法です。画像をアップロードするか画像URLを提供することで、検索エンジンはその画像に類似または関連する他の画像やウェブページを見つけることができます。'
      }
    },
    {
      '@type': 'Question',
      name: 'このツールでどのように画像を検索しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'このツールは3つの方法で使用できます：1) 画像のURLを直接入力し、「この画像を検索」をクリックします；2) ローカルコンピュータから画像ファイルをアップロードします；3) 画像を直接コピーしてCtrl+Vで貼り付けます。その後、使用したい検索エンジン（Google、Bing、Yandexなど）を選択して検索します。'
      }
    },
    {
      '@type': 'Question',
      name: 'このツールはどの検索エンジンをサポートしていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'このツールは、Google画像検索、Bing画像検索、Yandex、SauceNAOなど、複数の人気画像検索エンジンをサポートしています。各検索エンジンには特徴があり、Googleは機能が豊富で、Bingは高解像度画像に優れ、Yandexは修正された画像を見つけるのが得意で、SauceNAOはアニメコンテンツに特化しています。'
      }
    },
    {
      '@type': 'Question',
      name: 'アップロードされた画像はどのように処理されますか？保存されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ユーザーのプライバシーを非常に重視しています。画像をアップロードすると、システムは検索可能なURLを生成するために一時的に保存しますが、すべての画像データは24時間以内に自動的に削除されます。お客様の画像を永続的に保存したり、他の目的に使用したりすることはありません。アップロードされた画像は検索サービスの提供にのみ使用され、生成されたURLを通じてのみアクセスできます。'
      }
    },
    {
      '@type': 'Question',
      name: '検索結果が時々不正確なのはなぜですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '画像検索の精度は、画像の品質、検索エンジンデータベースのカバレッジ、画像の独自性など、さまざまな要因に依存します。画像の解像度が低い、切り取られているか修正されている、または非常に一般的な画像タイプ（青空、草原など）の場合、検索精度が低下する可能性があります。最良の結果を得るには、鮮明で完全なオリジナル画像を使用し、異なるエンジンには異なるアルゴリズムとデータベースがあるため、複数の検索エンジンで比較することをお勧めします。'
      }
    },
    {
      '@type': 'Question',
      name: 'このツールはモバイル検索をサポートしていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、当ツールはiPhoneやAndroidデバイスを含むモバイルデバイスの使用を完全にサポートしています。モバイルでは、「画像をアップロード」をタップしてギャラリーから写真を選択するか、新しい写真を撮ることができます。また、他のアプリから当サイトに画像を共有したり、クリップボードに画像をコピーして貼り付けることもできます。'
      }
    },
    {
      '@type': 'Question',
      name: 'スマートフォンで直接写真を撮って検索するにはどうすればよいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'スマートフォンで当ツールを使って写真検索するのは簡単です：1) モバイルブラウザで当サイトにアクセスします；2) 「画像をアップロード」ボタンをタップします；3) 「写真を撮る」オプションを選択します（またはギャラリーから既存の写真を選択します）；4) 検索したいオブジェクトやシーンを撮影します；5) 画像がアップロードされたら、お好みの検索エンジンを選択して検索します。この機能は、商品の買い物中、旅行中のランドマークの識別、または見慣れない植物や動物に出会ったときに特に役立ちます。'
      }
    }
  ],
  es: [
    {
      '@type': 'Question',
      name: '¿Qué es la búsqueda inversa de imágenes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La búsqueda inversa de imágenes es un método de búsqueda que utiliza una imagen como entrada de búsqueda (en lugar de texto). Al subir una imagen o proporcionar una URL de imagen, los motores de búsqueda pueden encontrar otras imágenes similares o relacionadas y páginas web.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo uso esta herramienta para buscar imágenes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puede usar esta herramienta de tres maneras: 1) Ingrese directamente la URL de la imagen, luego haga clic en "Buscar esta imagen"; 2) Suba un archivo de imagen desde su computadora local; 3) Copie directamente una imagen y péguela usando Ctrl+V. Después seleccione el motor de búsqueda que desea usar (como Google, Bing, Yandex, etc.).'
      }
    },
    {
      '@type': 'Question',
      name: '¿Qué motores de búsqueda admite esta herramienta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esta herramienta admite múltiples motores de búsqueda de imágenes populares, incluyendo Búsqueda de Imágenes de Google, Búsqueda de Imágenes de Bing, Yandex y SauceNAO. Cada motor de búsqueda tiene sus fortalezas: Google es integral, Bing sobresale en imágenes de alta resolución, Yandex es bueno encontrando imágenes modificadas, y SauceNAO se especializa en contenido de anime.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo se procesan las imágenes subidas? ¿Se guardan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tomamos muy en serio la privacidad del usuario. Cuando sube una imagen, el sistema la almacena temporalmente para generar una URL de búsqueda, pero todos los datos de imagen se eliminan automáticamente dentro de 24 horas. No almacenamos permanentemente sus imágenes ni las usamos para ningún otro propósito. Las imágenes subidas solo se usan para proporcionar servicios de búsqueda, y solo usted puede acceder a ellas a través de la URL generada.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Por qué a veces los resultados de búsqueda son inexactos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La precisión de la búsqueda inversa de imágenes depende de múltiples factores, incluyendo la calidad de la imagen, la cobertura de la base de datos del motor de búsqueda y la singularidad de la imagen. Si su imagen tiene baja resolución, ha sido recortada o modificada, o es un tipo de imagen muy común (como cielo azul, césped, etc.), la precisión de búsqueda puede disminuir. Para mejores resultados, recomendamos usar imágenes originales claras y completas, y probar múltiples motores de búsqueda para comparación, ya que diferentes motores tienen diferentes algoritmos y bases de datos.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Esta herramienta admite búsquedas desde móviles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, nuestra herramienta admite completamente el uso en dispositivos móviles, incluyendo dispositivos iPhone y Android. En su móvil, puede tocar "Subir Imagen" para seleccionar una foto de su galería o tomar una nueva foto. También puede compartir imágenes desde otras aplicaciones a nuestro sitio web o copiar una imagen al portapapeles y pegarla.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo puedo buscar directamente con la cámara de mi teléfono?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usar nuestra herramienta para buscar con la cámara de su teléfono es simple: 1) Visite nuestro sitio web con su navegador móvil; 2) Toque el botón "Subir Imagen"; 3) Elija la opción "Tomar Foto" (o seleccione una foto existente de su galería); 4) Capture el objeto o escena que desea buscar; 5) Después de que la imagen se suba, seleccione su motor de búsqueda preferido. Esta función es especialmente útil al comprar productos, identificar monumentos mientras viaja, o cuando encuentre plantas o animales desconocidos.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Puedo copiar directamente imágenes de páginas web para buscar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, admitimos la función de pegado directo de imágenes desde el portapapeles. Cuando vea una imagen interesante mientras navega, haga clic derecho en la imagen y elija "Copiar Imagen", luego cambie a nuestro sitio web, haga clic en el área de subida y use Ctrl+V (Windows/Linux) o Command+V (Mac) para pegar la imagen directamente. El sistema procesará automáticamente la subida y preparará la búsqueda, simplificando enormemente el proceso de búsqueda.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cuáles son los escenarios de uso comunes para la búsqueda inversa de imágenes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las aplicaciones de la búsqueda inversa de imágenes son muy amplias: 1) Encontrar el origen de la imagen o versiones de alta resolución; 2) Identificar plantas, animales, productos o monumentos desconocidos; 3) Buscar inspiración de diseño similar o materiales; 4) Verificar la autenticidad de imágenes, identificar imágenes sintéticas o modificadas; 5) Encontrar canales de compra para ropa o productos específicos; 6) Rastrear el origen de obras de arte, anime o capturas de pantalla de juegos; 7) Verificar si su contenido creado ha sido usado sin autorización. Estos escenarios son muy útiles para diseñadores, investigadores, creadores de contenido y usuarios cotidianos.'
      }
    }
  ]
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/image-search/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼
const langMap = {
  'zh': 'zh-TW',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片
const imageUrl = getFullUrl('/images/og-image-search.png');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'zh' } = await params;
  const title = imageSearchTranslations.meta.title[locale as keyof typeof imageSearchTranslations.meta.title] || imageSearchTranslations.meta.title.zh;
  const description = imageSearchTranslations.meta.description[locale as keyof typeof imageSearchTranslations.meta.description] || imageSearchTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'zh' ? `以圖搜圖` : 
                  locale === 'en' ? `Image Search` : 
                  locale === 'jp' ? `画像検索` :
                  locale === 'es' ? `Búsqueda de Imágenes` : `Image Search`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'zh' ? '/image-search' : `/${locale}/image-search`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? '以圖搜圖工具界面' : 
               locale === 'en' ? 'Image Search Tool Interface' :
               locale === 'jp' ? '画像検索ツールインターフェース' :
               locale === 'es' ? 'Interfaz de Herramienta de Búsqueda de Imágenes' : 'Image Search Tool Interface',
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
      canonical: getFullUrl(locale === 'zh' ? '/image-search' : `/${locale}/image-search`),
      languages: {
        'zh-TW': getFullUrl('/image-search'),
        'en': getFullUrl('/en/image-search'),
        'ja': getFullUrl('/jp/image-search'),
        'es': getFullUrl('/es/image-search'),
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
 * 以圖搜圖頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function ImageSearchLayout({
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
  const title = imageSearchTranslations.meta.title[locale as keyof typeof imageSearchTranslations.meta.title] || imageSearchTranslations.meta.title.zh;
  const description = imageSearchTranslations.meta.description[locale as keyof typeof imageSearchTranslations.meta.description] || imageSearchTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.zh;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/image-search', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/image-search',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    3200,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/image-search',
    locale === 'zh' ? '以圖搜圖多引擎搜尋工具' :
    locale === 'en' ? 'Multi-Engine Reverse Image Search Tool' :
    locale === 'jp' ? '複数エンジン画像検索ツール' :
    locale === 'es' ? 'Herramienta de Búsqueda Inversa de Imágenes Multi-Motor' : 'Multi-Engine Reverse Image Search Tool',
    description,
    'SearchApplication',
    '4.9',           // 更新的評分值
    '212',           // 更新的評分數量
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