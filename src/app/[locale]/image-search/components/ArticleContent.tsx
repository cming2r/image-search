'use client';

import { imageSearchTranslations } from './meta-translations';

interface ArticleContentProps {
  locale: string;
}

const imageSearchContentTranslations = {
  howToUse: {
    title: {
      zh: "如何使用此工具？",
      en: "How to Use This Tool?",
      jp: "このツールの使い方",
      es: "¿Cómo Usar Esta Herramienta?"
    },
    steps: {
      zh: [
        "輸入圖片的網址，或點擊「上傳圖片」選擇本地圖片",
        "系統將上傳的圖片轉換為可搜尋的網址",
        "點擊各大搜尋引擎按鈕，立即跳轉至對應搜尋服務",
        "搜尋引擎會基於您提供的圖片尋找網路上的相似內容"
      ],
      en: [
        "Enter an image URL or click \"Upload Image\" to select a local image",
        "The system will convert your uploaded image into a searchable URL",
        "Click any search engine button to instantly redirect to the corresponding service",
        "The search engine will find similar content online based on your provided image"
      ],
      jp: [
        "画像のURLを入力するか、「画像をアップロード」をクリックしてローカル画像を選択",
        "システムがアップロードされた画像を検索可能なURLに変換します",
        "各検索エンジンのボタンをクリックすると、対応するサービスに即座にジャンプします",
        "検索エンジンは提供された画像に基づいてウェブ上の類似コンテンツを検索します"
      ],
      es: [
        "Ingresa la URL de una imagen o haz clic en 'Subir Imagen' para seleccionar una imagen local",
        "El sistema convertirá tu imagen subida en una URL buscable",
        "Haz clic en cualquier botón de motor de búsqueda para redirigir instantáneamente al servicio correspondiente",
        "El motor de búsqueda encontrará contenido similar en línea basado en la imagen que proporciones"
      ]
    },
    tip: {
      zh: "小提示：",
      en: "Tip:",
      jp: "ヒント：",
      es: "Consejo:"
    },
    tipContent: {
      zh: "透過複製其他網站的圖片，可以直接用Ctrl + V 貼上在上傳圖片的頁面。",
      en: "You can directly paste images from other websites using Ctrl + V in the image upload section.",
      jp: "他のウェブサイトから画像をコピーして、アップロード画面でCtrl + Vで直接貼り付けることができます。",
      es: "Puedes pegar directamente imágenes de otros sitios web usando Ctrl + V en la sección de subida de imagen."
    }
  },
  whatIs: {
    title: {
      zh: "什麼是以圖搜圖？",
      en: "What is Reverse Image Search?",
      jp: "画像検索とは？",
      es: "¿Qué es la Búsqueda de Imagen Inversa?"
    },
    content: {
      zh: [
        "以圖搜圖（又稱反向圖片搜索，Reverse Image Search）是現代搜尋引擎的重要功能，允許使用者透過上傳圖片或提供圖片URL，搜尋相關圖片及其來源。本工具整合了Google、Bing、Yandex等主流搜尋引擎的以圖搜圖功能，支援在各種裝置（包括電腦、手機和平板）上使用。",
        "以圖搜圖的實用場景包括：尋找圖片的高解析度版本、透過局部圖片找到完整原圖、識別相同人物或物體的不同照片、查找相似場景或素材。對於設計師、研究人員、內容創作者和一般使用者而言，這是一項極具價值的工具。",
        "我們的整合平台簡化了以圖搜圖的流程，無需在多個搜尋引擎間切換。只需一次上傳圖片或輸入URL，即可便捷地使用各大搜尋服務，顯著提高搜尋效率。"
      ],
      en: [
        "Reverse Image Search is an important feature of modern search engines that allows users to search for related images and their sources by uploading an image or providing an image URL. This tool integrates the reverse image search functionality of Google, Bing, Yandex, and other mainstream search engines, supporting usage on various devices (including computers, phones, and tablets).",
        "Practical uses of reverse image search include: finding higher resolution versions of images, locating the complete original through a partial image, identifying different photos of the same person or object, and finding similar scenes or materials. For designers, researchers, content creators, and general users, this is an extremely valuable tool.",
        "Our integration platform simplifies the reverse image search process, eliminating the need to switch between multiple search engines. With just one image upload or URL input, you can conveniently use various search services, significantly improving search efficiency."
      ],
      jp: [
        "画像検索（リバースイメージサーチとも呼ばれる）は、ユーザーが画像をアップロードまたは画像URLを提供することで、関連画像やその出典を検索できる現代の検索エンジンの重要な機能です。このツールはGoogle、Bing、Yandexなどの主要検索エンジンの画像検索機能を統合し、パソコン、スマートフォン、タブレットなどさまざまなデバイスでの使用をサポートしています。",
        "画像検索の実用的なシナリオには、画像の高解像度バージョンの検索、部分画像から完全なオリジナルの検索、同じ人物や物体の異なる写真の識別、類似シーンや素材の検索などがあります。デザイナー、研究者、コンテンツクリエイター、一般ユーザーにとって、これは非常に価値のあるツールです。",
        "当プラットフォームは画像検索プロセスを簡素化し、複数の検索エンジン間の切り替えを不要にします。一度画像をアップロードするかURLを入力するだけで、様々な検索サービスを便利に利用でき、検索効率を大幅に向上させます。"
      ],
      es: [
        "La Búsqueda de Imagen Inversa es una función importante de los motores de búsqueda modernos que permite a los usuarios buscar imágenes relacionadas y sus fuentes subiendo una imagen o proporcionando una URL de imagen. Esta herramienta integra la funcionalidad de búsqueda de imagen inversa de Google, Bing, Yandex y otros motores de búsqueda principales, soportando el uso en varios dispositivos (incluyendo computadoras, teléfonos y tablets).",
        "Los usos prácticos de la búsqueda de imagen inversa incluyen: encontrar versiones de mayor resolución de imágenes, localizar la imagen completa original a través de una imagen parcial, identificar diferentes fotos de la misma persona u objeto, y encontrar escenas o materiales similares. Para diseñadores, investigadores, creadores de contenido y usuarios en general, esta es una herramienta extremadamente valiosa.",
        "Nuestra plataforma de integración simplifica el proceso de búsqueda de imagen inversa, eliminando la necesidad de cambiar entre múltiples motores de búsqueda. Con solo una subida de imagen o entrada de URL, puedes usar convenientemente varios servicios de búsqueda, mejorando significativamente la eficiencia de búsqueda."
      ]
    }
  },
  searchEngines: {
    title: {
      zh: "各大搜尋引擎特色",
      en: "Features of Major Search Engines",
      jp: "主要検索エンジンの特徴",
      es: "Características de los Principales Motores de Búsqueda"
    },
    google: {
      title: {
        zh: "Google Lens 圖片搜尋",
        en: "Google Lens Image Search",
        jp: "Google Lens 画像検索",
        es: "Búsqueda de Imágenes Google Lens"
      },
      content: {
        zh: [
          "Google Lens 是目前全球使用最廣泛的圖片搜尋服務，以其強大的AI視覺分析技術著稱。在全球搜尋引擎市場，Google佔有超過70%的份額，其行動裝置搜尋滲透率更高達85%，顯示其在全球範圍內的絕對領先地位。",
          "Google的圖片搜尋功能不僅可以找到視覺上相似的圖片，還能識別圖中的物體、文字、地標，甚至提供購物選項。其獨特優勢在於極其龐大的圖片資料庫和先進的機器學習演算法，能夠理解圖片的語義內容並返回高度相關的結果。",
          "對於創作者和設計師，Google還提供了強大的過濾功能，可以根據授權類型搜尋免費可商用圖片資源。其細緻的篩選器系統允許使用者按尺寸、顏色、類型和時間等多維度精確過濾搜尋結果。"
        ],
        en: [
          "Google Lens is currently the most widely used image search service globally, known for its powerful AI visual analysis technology. In the global search engine market, Google holds over 70% market share, with its mobile device search penetration rate reaching as high as 85%, demonstrating its absolute leadership position worldwide.",
          "Google's image search functionality not only finds visually similar images but also identifies objects, text, landmarks in images, and even provides shopping options. Its unique advantage lies in its extremely vast image database and advanced machine learning algorithms that can understand the semantic content of images and return highly relevant results.",
          "For creators and designers, Google also offers powerful filtering features that allow searching for freely usable commercial images based on license type. Its sophisticated filter system enables users to precisely filter search results by dimensions, color, type, and time among other multi-dimensional criteria."
        ],
        jp: [
          "Google Lensは現在、世界で最も広く使用されている画像検索サービスであり、強力なAI視覚分析技術で知られています。世界の検索エンジン市場では、Googleは70%以上のシェアを持ち、モバイルデバイスでの検索普及率は85%に達し、世界規模での絶対的なリーダーシップを示しています。",
          "Googleの画像検索機能は、視覚的に類似した画像を見つけるだけでなく、画像内のオブジェクト、テキスト、ランドマークを識別し、ショッピングオプションまで提供します。その独自の強みは、非常に膨大な画像データベースと先進的な機械学習アルゴリズムにあり、画像の意味的内容を理解して高度に関連性の高い結果を返すことができます。",
          "クリエイターやデザイナー向けに、Googleはライセンスタイプに基づいて商用利用可能な無料画像を検索できる強力なフィルタリング機能も提供しています。その洗練されたフィルターシステムにより、ユーザーはサイズ、色、タイプ、時間など多次元で検索結果を正確にフィルタリングできます。"
        ],
        es: [
          "Google Lens es actualmente el servicio de búsqueda de imágenes más ampliamente utilizado a nivel mundial, conocido por su poderosa tecnología de análisis visual con IA. En el mercado global de motores de búsqueda, Google tiene más del 70% de participación de mercado, con su tasa de penetración de búsqueda en dispositivos móviles alcanzando hasta el 85%, demostrando su posición de liderazgo absoluto a nivel mundial.",
          "La funcionalidad de búsqueda de imágenes de Google no solo encuentra imágenes visualmente similares, sino que también identifica objetos, texto, puntos de referencia en las imágenes, e incluso proporciona opciones de compra. Su ventaja única radica en su extremadamente vasta base de datos de imágenes y algoritmos avanzados de aprendizaje automático que pueden entender el contenido semántico de las imágenes y devolver resultados altamente relevantes.",
          "Para creadores y diseñadores, Google también ofrece potentes funciones de filtrado que permiten buscar imágenes comerciales gratuitas basadas en el tipo de licencia. Su sofisticado sistema de filtros permite a los usuarios filtrar con precisión los resultados de búsqueda por dimensiones, color, tipo y tiempo entre otros criterios multidimensionales."
        ]
      }
    },
    bing: {
      title: {
        zh: "Microsoft Bing 圖片搜尋",
        en: "Microsoft Bing Image Search",
        jp: "Microsoft Bing 画像検索",
        es: "Búsqueda de Imágenes de Microsoft Bing"
      },
      content: {
        zh: [
          "Microsoft Bing於2009年推出，經過多次升級迭代，現在已成為全球第二大搜尋引擎。2020年，微軟將其更名為Microsoft Bing（微軟必應），進一步強化了其品牌識別度。",
          "Bing的視覺搜尋功能擁有獨特的優勢，尤其在呈現高解析度圖片方面表現出色。對於需要尋找高品質視覺素材的專業人士，Bing提供了優質的搜尋體驗和結果展示。",
          "Bing Image Search以其簡潔直觀的使用者介面著稱，提供了豐富的過濾選項，包括尺寸、顏色、風格和佈局等。其「相關搜尋」功能推薦使用者可能感興趣的相關主題，而特色的「桌布圖片」類別則為使用者提供了大量高品質的桌面壁紙資源。"
        ],
        en: [
          "Microsoft Bing was launched in 2009 and after multiple upgrades and iterations, it has become the world's second-largest search engine. In 2020, Microsoft renamed it to Microsoft Bing, further strengthening its brand recognition.",
          "Bing's visual search feature has unique advantages, particularly excelling in presenting high-resolution images. For professionals seeking high-quality visual materials, Bing provides an excellent search experience and result presentation.",
          "Bing Image Search is known for its clean and intuitive user interface, offering rich filtering options including size, color, style, and layout. Its \"Related Searches\" function intelligently recommends relevant topics that users might be interested in, while the featured \"Wallpaper Images\" category provides users with a large collection of high-quality desktop wallpaper resources."
        ],
        jp: [
          "Microsoft Bingは2009年に立ち上げられ、複数回のアップグレードと改良を経て、現在は世界第二位の検索エンジンとなっています。2020年、マイクロソフトはこれをMicrosoft Bing（マイクロソフトビング）に改名し、そのブランド認知度をさらに強化しました。",
          "Bingのビジュアルサーチ機能は独自の利点を持ち、特に高解像度画像の表示に優れています。高品質の視覚素材を求めるプロフェッショナルにとって、Bingは優れた検索体験と結果表示を提供します。",
          "Bing Image Searchはクリーンで直感的なユーザーインターフェースで知られ、サイズ、色、スタイル、レイアウトなどの豊富なフィルタリングオプションを提供します。その「関連検索」機能はユーザーが興味を持つかもしれない関連トピックをインテリジェントに推奨し、特徴的な「壁紙画像」カテゴリーはユーザーに豊富な高品質デスクトップ壁紙リソースを提供します。"
        ],
        es: [
          "Microsoft Bing fue lanzado en 2009 y después de múltiples actualizaciones e iteraciones, se ha convertido en el segundo motor de búsqueda más grande del mundo. En 2020, Microsoft lo renombró como Microsoft Bing, fortaleciendo aún más el reconocimiento de su marca.",
          "La función de búsqueda visual de Bing tiene ventajas únicas, destacando particularmente en la presentación de imágenes de alta resolución. Para profesionales que buscan materiales visuales de alta calidad, Bing proporciona una excelente experiencia de búsqueda y presentación de resultados.",
          "Bing Image Search es conocido por su interfaz de usuario limpia e intuitiva, ofreciendo ricas opciones de filtrado incluyendo tamaño, color, estilo y diseño. Su función de \"Búsquedas Relacionadas\" recomienda inteligentemente temas relacionados que podrían interesar a los usuarios, mientras que la categoría destacada de \"Imágenes de Fondo de Pantalla\" proporciona a los usuarios una gran colección de recursos de fondos de escritorio de alta calidad."
        ]
      }
    },
    yandex: {
      title: {
        zh: "Yandex 圖片搜尋",
        en: "Yandex Image Search",
        jp: "Yandex 画像検索",
        es: "Búsqueda de Imágenes de Yandex"
      },
      content: {
        zh: [
          "Yandex是俄羅斯及東歐地區最大的搜尋引擎，其圖片搜尋功能在全球範圍內享有盛譽。Yandex的圖片識別技術特別擅長在不同場景、角度和光線條件下識別相同的物體或人物，使其成為尋找特定圖片變體的理想選擇。",
          "Yandex圖片搜尋的核心優勢在於其先進的圖片處理演算法，能夠精確識別照片中的商標、地標和人物。即使圖片經過裁剪、旋轉或顏色調整等修改，Yandex仍能有效追溯原圖片或找到視覺上相似的內容。",
          "除了基本的反向圖片搜尋功能，Yandex還提供豐富的圖片分析工具，包括視覺內容分類和元素識別。無論是追蹤圖片來源，還是發現視覺相關內容，Yandex都能提供獨特而全面的搜尋結果。"
        ],
        en: [
          "Yandex is the largest search engine in Russia and Eastern Europe, with its image search functionality enjoying a worldwide reputation. Yandex's image recognition technology is particularly skilled at identifying the same objects or people under different scenarios, angles, and lighting conditions, making it an ideal choice for finding specific image variants.",
          "The core advantage of Yandex image search lies in its advanced image processing algorithms, capable of precisely identifying trademarks, landmarks, and people in photos. Even if images have been modified through cropping, rotation, or color adjustment, Yandex can still effectively trace back to the original image or find visually similar content.",
          "Beyond basic reverse image search functionality, Yandex offers rich image analysis tools, including visual content classification and element identification. Whether tracking image sources or discovering visually related content, Yandex provides unique and comprehensive search results."
        ],
        jp: [
          "Yandexはロシアと東ヨーロッパ地域最大の検索エンジンであり、その画像検索機能は世界的に高い評価を得ています。Yandexの画像認識技術は、異なるシーン、角度、光条件下で同じ物体や人物を識別することに特に優れており、特定の画像バリエーションを探すための理想的な選択肢となっています。",
          "Yandex画像検索の核心的な強みは、写真内の商標、ランドマーク、人物を正確に識別できる先進的な画像処理アルゴリズムにあります。画像が切り取り、回転、色調整などの修正を施されていても、Yandexは元の画像を効果的に追跡したり、視覚的に類似したコンテンツを見つけることができます。",
          "基本的な画像検索機能に加えて、Yandexは視覚コンテンツの分類や要素識別など、豊富な画像分析ツールを提供しています。画像ソースの追跡や視覚的に関連するコンテンツの発見のいずれにおいても、Yandexはユニークで包括的な検索結果を提供します。"
        ],
        es: [
          "Yandex es el motor de búsqueda más grande de Rusia y Europa del Este, con su funcionalidad de búsqueda de imágenes gozando de una reputación mundial. La tecnología de reconocimiento de imágenes de Yandex es particularmente hábil para identificar los mismos objetos o personas bajo diferentes escenarios, ángulos y condiciones de iluminación, convirtiéndolo en una opción ideal para encontrar variantes específicas de imágenes.",
          "La ventaja central de la búsqueda de imágenes de Yandex radica en sus algoritmos avanzados de procesamiento de imágenes, capaces de identificar con precisión marcas comerciales, puntos de referencia y personas en las fotos. Incluso si las imágenes han sido modificadas a través de recortes, rotación o ajustes de color, Yandex aún puede rastrear efectivamente de vuelta a la imagen original o encontrar contenido visualmente similar.",
          "Más allá de la funcionalidad básica de búsqueda de imagen inversa, Yandex ofrece ricas herramientas de análisis de imágenes, incluyendo clasificación de contenido visual e identificación de elementos. Ya sea rastreando fuentes de imágenes o descubriendo contenido visualmente relacionado, Yandex proporciona resultados de búsqueda únicos y comprensivos."
        ]
      }
    },
    sauceNAO: {
      title: {
        zh: "SauceNAO 圖片搜尋",
        en: "SauceNAO Image Search",
        jp: "SauceNAO 画像検索",
        es: "Búsqueda de Imágenes SauceNAO"
      },
      content: {
        zh: [
          "SauceNAO是動漫、漫畫和插畫領域最專業的圖片搜尋引擎，為二次元內容愛好者提供了無與倫比的搜尋體驗。其專門的資料庫涵蓋了Twitter、Pixiv、niconico等主要動漫藝術平台，能夠快速精準地定位圖片來源。",
          "使用SauceNAO，使用者不僅能找到原始圖片及其作者資訊，還能獲取關聯的作品集、漫畫系列及遊戲出處。對於動漫藝術研究、同人創作參考或純粹的愛好者探索，SauceNAO提供了專業且全面的搜尋解決方案。"
        ],
        en: [
          "SauceNAO is the most professional image search engine in the anime, manga, and illustration fields, providing anime content enthusiasts with an unparalleled search experience. Its specialized database covers major anime art platforms like Twitter, Pixiv, and niconico, enabling fast and precise location of image sources.",
          "Using SauceNAO, users can not only find the original images and their creator information but also obtain related collections, manga series, and game origins. For anime art research, fan creation references, or pure enthusiast exploration, SauceNAO provides a professional and comprehensive search solution."
        ],
        jp: [
          "SauceNAOはアニメ、漫画、イラストの分野で最もプロフェッショナルな画像検索エンジンであり、二次元コンテンツ愛好家に比類ない検索体験を提供します。その専門的なデータベースはTwitter、Pixiv、niconicoなどの主要なアニメアートプラットフォームをカバーし、画像ソースの迅速かつ正確な特定を可能にします。",
          "SauceNAOを使用すると、ユーザーは元の画像とその作者情報を見つけるだけでなく、関連コレクション、漫画シリーズ、ゲーム出典も取得できます。アニメアート研究、同人創作の参考、または純粋な愛好家の探索のために、SauceNAOはプロフェッショナルで包括的な検索ソリューションを提供します。"
        ],
        es: [
          "SauceNAO es el motor de búsqueda de imágenes más profesional en los campos de anime, manga e ilustraciones, proporcionando a los entusiastas del contenido de anime una experiencia de búsqueda sin igual. Su base de datos especializada cubre las principales plataformas de arte anime como Twitter, Pixiv y niconico, permitiendo la localización rápida y precisa de fuentes de imágenes.",
          "Usando SauceNAO, los usuarios no solo pueden encontrar las imágenes originales y la información de sus creadores, sino que también pueden obtener colecciones relacionadas, series de manga y orígenes de juegos. Para investigación de arte anime, referencias de creación de fans o exploración pura de entusiastas, SauceNAO proporciona una solución de búsqueda profesional y completa."
        ]
      }
    },
    traceMoe: {
      title: {
        zh: "trace.moe 動畫場景搜尋",
        en: "trace.moe Anime Scene Search",
        jp: "trace.moe アニメシーン検索",
        es: "Búsqueda de Escenas de Anime trace.moe"
      },
      content: {
        zh: [
          "trace.moe 是專門針對動畫場景的反向搜尋引擎，能夠精確識別動畫截圖來源，包括作品名稱、具體集數和時間點。這項服務使用先進的圖像識別技術，通過分析動畫畫面的特徵，在龐大的動畫資料庫中進行比對。",
          "使用 trace.moe，使用者可以快速找到動畫截圖的確切來源，無論是想要重溫某個經典場景，還是尋找表情包或迷因圖的原始出處。系統不僅提供準確的作品資訊，還能精確到具體的集數和時間戳，讓使用者能夠直接定位到該場景。對於動畫愛好者、內容創作者和研究人員來說，這是一個極其實用的工具。"
        ],
        en: [
          "trace.moe is a reverse search engine specifically designed for anime scenes, capable of accurately identifying the source of anime screenshots, including the work name, specific episode, and timestamp. This service uses advanced image recognition technology to analyze anime frame characteristics and match them against a vast anime database.",
          "Using trace.moe, users can quickly find the exact source of anime screenshots, whether they want to relive a classic scene or find the original source of emotes or memes. The system not only provides accurate work information but also pinpoints the specific episode and timestamp, allowing users to directly locate the scene. For anime enthusiasts, content creators, and researchers, this is an extremely practical tool."
        ],
        jp: [
          "trace.moeはアニメシーンに特化した逆画像検索エンジンで、作品名、具体的なエピソード、タイムスタンプを含むアニメスクリーンショットのソースを正確に識別できます。このサービスは高度な画像認識技術を使用して、アニメフレームの特徴を分析し、膨大なアニメデータベースと照合します。",
          "trace.moeを使用することで、ユーザーはアニメスクリーンショットの正確なソースを素早く見つけることができます。クラシックなシーンを再体験したい場合や、エモートやミームの元のソースを見つけたい場合に便利です。システムは正確な作品情報を提供するだけでなく、特定のエピソードとタイムスタンプまで特定し、ユーザーがシーンを直接見つけられるようにします。アニメ愛好家、コンテンツクリエイター、研究者にとって、これは極めて実用的なツールです。"
        ],
        es: [
          "trace.moe es un motor de búsqueda inversa específicamente diseñado para escenas de anime, capaz de identificar con precisión la fuente de capturas de pantalla de anime, incluyendo el nombre de la obra, episodio específico y marca de tiempo. Este servicio utiliza tecnología avanzada de reconocimiento de imágenes para analizar las características de los fotogramas de anime y compararlos con una vasta base de datos de anime.",
          "Usando trace.moe, los usuarios pueden encontrar rápidamente la fuente exacta de capturas de pantalla de anime, ya sea que quieran revivir una escena clásica o encontrar la fuente original de emotes o memes. El sistema no solo proporciona información precisa de la obra, sino que también señala el episodio específico y marca de tiempo, permitiendo a los usuarios localizar directamente la escena. Para entusiastas del anime, creadores de contenido e investigadores, esta es una herramienta extremadamente práctica."
        ]
      }
    },
    tineye: {
      title: {
        zh: "TinEye（已移除）",
        en: "TinEye (Removed)",
        jp: "TinEye（削除済み）",
        es: "TinEye (Eliminado)"
      },
      content: {
        zh: [
          "TinEye是一個專注於精確圖像匹配的搜尋引擎，其獨特之處在於能夠找出圖片的完全匹配，而非僅提供視覺上相似的結果。這使其成為追蹤圖片網路使用情況、確定圖片首次出現時間、尋找高解析度版本及驗證圖片原創性的理想工具。"
        ],
        en: [
          "TinEye is a search engine focused on precise image matching, with its uniqueness being its ability to find exact matches for images rather than just providing visually similar results. This makes it an ideal tool for tracking image usage online, determining when an image first appeared, finding high-resolution versions, and verifying image originality."
        ],
        jp: [
          "TinEyeは正確な画像マッチングに焦点を当てた検索エンジンであり、視覚的に類似した結果を提供するだけでなく、画像の完全一致を見つける能力がその独自性です。これにより、オンラインでの画像使用状況の追跡、画像が最初に登場した時期の特定、高解像度バージョンの発見、画像の独創性の検証に理想的なツールとなっています。"
        ],
        es: [
          "TinEye es un motor de búsqueda enfocado en el emparejamiento preciso de imágenes, con su singularidad siendo su capacidad de encontrar coincidencias exactas para imágenes en lugar de solo proporcionar resultados visualmente similares. Esto lo convierte en una herramienta ideal para rastrear el uso de imágenes en línea, determinar cuándo apareció una imagen por primera vez, encontrar versiones de alta resolución y verificar la originalidad de la imagen."
        ]
      },
      note: {
        zh: "註：經測試後發現TinEye搜尋功能不穩定，且結果不如其他引擎，因此我們已將其從搜尋選項中移除。我們持續評估各搜尋引擎的表現，以提供最佳使用者體驗。",
        en: "Note: After testing, we found TinEye's search function to be unstable and its result quality inferior to other engines, so we have removed it from our search options. We continuously evaluate the performance of various search engines to provide the best user experience.",
        jp: "注：テスト後、TinEyeの検索機能が不安定であり、結果の品質が他のエンジンより劣ることが判明したため、検索オプションから削除しました。最高のユーザー体験を提供するため、様々な検索エンジンのパフォーマンスを継続的に評価しています。",
        es: "Nota: Después de las pruebas, encontramos que la función de búsqueda de TinEye es inestable y su calidad de resultados inferior a otros motores, por lo que lo hemos eliminado de nuestras opciones de búsqueda. Evaluamos continuamente el rendimiento de varios motores de búsqueda para proporcionar la mejor experiencia de usuario."
      }
    }
  },
  whyChooseUs: {
    title: {
      zh: "為什麼選擇我們的以圖搜圖工具？",
      en: "Why Choose Our Reverse Image Search Tool?",
      jp: "なぜ当画像検索ツールを選ぶのか？",
      es: "¿Por Qué Elegir Nuestra Herramienta de Búsqueda de Imagen Inversa?"
    },
    features: {
      multiEngine: {
        title: {
          zh: "多引擎整合",
          en: "Multi-Engine Integration",
          jp: "マルチエンジン統合",
          es: "Integración Multi-Motor"
        },
        content: {
          zh: "一站式訪問Google、Bing、Yandex和SauceNAO等主流搜尋引擎，無需切換網站，節省時間和精力。",
          en: "One-stop access to mainstream search engines like Google, Bing, Yandex, and SauceNAO without switching websites, saving time and effort.",
          jp: "Google、Bing、Yandex、SauceNAOなどの主流検索エンジンにウェブサイトを切り替えることなくワンストップでアクセスでき、時間と労力を節約できます。",
          es: "Acceso integral a motores de búsqueda principales como Google, Bing, Yandex y SauceNAO sin cambiar de sitios web, ahorrando tiempo y esfuerzo."
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
          zh: "所有功能均可免費使用，無隱藏費用，無需註冊帳號，也不顯示任何廣告，提供純淨的搜尋體驗。",
          en: "All features are free to use with no hidden costs, no account registration required, and no advertisements displayed, providing a pure search experience.",
          jp: "すべての機能は隠れたコストなしで無料で使用でき、アカウント登録は不要で、広告も表示されないため、純粋な検索体験を提供します。",
          es: "Todas las funciones son gratuitas sin costos ocultos, no requieren registro de cuenta, y no muestran anuncios, proporcionando una experiencia de búsqueda pura."
        }
      },
      crossPlatform: {
        title: {
          zh: "跨平台支援",
          en: "Cross-Platform Support",
          jp: "クロスプラットフォームサポート",
          es: "Soporte Multiplataforma"
        },
        content: {
          zh: "完美支援電腦、手機和平板，實現隨時隨地搜圖，且具有針對行動裝置優化的響應式介面設計。",
          en: "Perfect support for computers, phones, and tablets, enabling image searches anytime, anywhere, with a responsive interface optimized for mobile devices.",
          jp: "パソコン、スマートフォン、タブレットを完璧にサポートし、いつでもどこでも画像検索が可能で、モバイルデバイス向けに最適化されたレスポンシブインターフェースを備えています。",
          es: "Soporte perfecto para computadoras, teléfonos y tablets, permitiendo búsquedas de imágenes en cualquier momento y lugar, con una interfaz responsive optimizada para dispositivos móviles."
        }
      },
      easyToUse: {
        title: {
          zh: "便捷操作",
          en: "Convenient Operation",
          jp: "便利な操作",
          es: "Operación Conveniente"
        },
        content: {
          zh: "支持URL輸入、本地上傳和剪貼板直接貼圖，操作簡單直觀，幾秒鐘內即可完成搜尋過程。",
          en: "Supports URL input, local uploads, and direct clipboard pasting. Simple and intuitive operation completes the search process in seconds.",
          jp: "URL入力、ローカルアップロード、クリップボードからの直接貼り付けをサポート。シンプルで直感的な操作で数秒で検索プロセスを完了します。",
          es: "Soporta entrada de URL, subidas locales y pegado directo del portapapeles. Operación simple e intuitiva completa el proceso de búsqueda en segundos."
        }
      },
      privacy: {
        title: {
          zh: "隱私保護",
          en: "Privacy Protection",
          jp: "プライバシー保護",
          es: "Protección de Privacidad"
        },
        content: {
          zh: "圖片僅臨時儲存用於生成可搜尋URL，24小時內自動刪除，從不用於其他用途或分享給第三方。",
          en: "Images are only temporarily stored to generate searchable URLs and automatically deleted within 24 hours, never used for other purposes or shared with third parties.",
          jp: "画像は検索可能なURLを生成するためだけに一時的に保存され、24時間以内に自動的に削除されます。他の目的に使用されたり、第三者と共有されることはありません。",
          es: "Las imágenes solo se almacenan temporalmente para generar URLs buscables y se eliminan automáticamente dentro de 24 horas, nunca se usan para otros propósitos ni se comparten con terceros."
        }
      },
      clean: {
        title: {
          zh: "簡潔無干擾",
          en: "Clean and Distraction-Free",
          jp: "クリーンで邪魔のない",
          es: "Limpio y Sin Distracciones"
        },
        content: {
          zh: "清爽簡潔的介面設計，沒有干擾使用者的彈窗和提示，聚焦於搜尋功能本身，提供專業高效的使用者體驗。",
          en: "Clean, simple interface design without distracting pop-ups and prompts, focusing on search functionality and providing a professional, efficient user experience.",
          jp: "クリーンでシンプルなインターフェースデザインで、邪魔なポップアップやプロンプトがなく、検索機能に焦点を当て、プロフェッショナルで効率的なユーザー体験を提供します。",
          es: "Diseño de interfaz limpio y simple sin ventanas emergentes y avisos que distraigan, enfocándose en la funcionalidad de búsqueda y proporcionando una experiencia de usuario profesional y eficiente."
        }
      }
    },
    callToAction: {
      title: {
        zh: "立即體驗最全面的以圖搜圖工具",
        en: "Experience the most comprehensive reverse image search tool now",
        jp: "今すぐ最も包括的な画像検索ツールを体験",
        es: "Experimenta ahora la herramienta de búsqueda de imagen inversa más completa"
      },
      subtitle: {
        zh: "簡單上傳或輸入URL，開啟多引擎圖像搜尋",
        en: "Simply upload or enter a URL to start multi-engine intelligent image search",
        jp: "シンプルにアップロードするかURLを入力して、マルチエンジンインテリジェント画像検索を開始",
        es: "Simplemente sube o ingresa una URL para comenzar la búsqueda inteligente de imagen multi-motor"
      }
    }
  }
};

export default function ArticleContent({ locale }: ArticleContentProps) {
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

  return (
    <>
      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{imageSearchContentTranslations.howToUse.title[lang]}</h2>
        <ol className="ml-6 list-decimal space-y-2 mt-4">
          {imageSearchContentTranslations.howToUse.steps[lang].map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="bg-blue-50 p-3 rounded-lg mt-4">
          <p className="text-blue-700 font-medium flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {imageSearchContentTranslations.howToUse.tip[lang]}<br />
            {imageSearchContentTranslations.howToUse.tipContent[lang]}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{imageSearchContentTranslations.whatIs.title[lang]}</h2>
        <div className="space-y-4">
          {imageSearchContentTranslations.whatIs.content[lang].map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{imageSearchContentTranslations.searchEngines.title[lang]}</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-blue-700 flex items-center">
              {imageSearchContentTranslations.searchEngines.google.title[lang]}
              <a 
                href="https://lens.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                aria-label="前往 Google Lens"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </h3>
            <div className="mt-3 space-y-3">
              {imageSearchContentTranslations.searchEngines.google.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-teal-700 flex items-center">
              {imageSearchContentTranslations.searchEngines.bing.title[lang]}
              <a 
                href="https://www.bing.com/images/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-teal-600 hover:text-teal-800 transition-colors"
                aria-label="前往 Bing 圖片搜尋"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </h3>
            <div className="mt-3 space-y-3">
              {imageSearchContentTranslations.searchEngines.bing.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-red-700 flex items-center">
              {imageSearchContentTranslations.searchEngines.yandex.title[lang]}
              <a 
                href="https://ya.ru/images/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-red-600 hover:text-red-800 transition-colors"
                aria-label="前往 Yandex 圖片搜尋"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </h3>
            <div className="mt-3 space-y-3">
              {imageSearchContentTranslations.searchEngines.yandex.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-purple-700 flex items-center">
              {imageSearchContentTranslations.searchEngines.sauceNAO.title[lang]}
              <a 
                href="https://saucenao.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-purple-600 hover:text-purple-800 transition-colors"
                aria-label="前往 SauceNAO 圖片搜尋"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </h3>
            <div className="mt-3 space-y-3">
              {imageSearchContentTranslations.searchEngines.sauceNAO.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-fuchsia-700 flex items-center">
              {imageSearchContentTranslations.searchEngines.traceMoe.title[lang]}
              <a 
                href="https://trace.moe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-fuchsia-600 hover:text-fuchsia-800 transition-colors"
                aria-label="前往 trace.moe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </h3>
            <div className="mt-3 space-y-3">
              {imageSearchContentTranslations.searchEngines.traceMoe.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-700 flex items-center">
              {imageSearchContentTranslations.searchEngines.tineye.title[lang]}
              <a 
                href="https://tineye.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="前往 TinEye 網站"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </h3>
            <div className="mt-3 space-y-3">
              {imageSearchContentTranslations.searchEngines.tineye.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
              <p className="text-red-600 font-medium mt-2 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{imageSearchContentTranslations.searchEngines.tineye.note[lang]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{imageSearchTranslations.faq.title[lang]}</h2>
        
        <div className="space-y-6">
          {imageSearchTranslations.faq.questions[lang].map((item, index) => (
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
        <h2 className="text-xl font-bold mb-3">{imageSearchContentTranslations.whyChooseUs.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-blue-700">{imageSearchContentTranslations.whyChooseUs.features.multiEngine.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {imageSearchContentTranslations.whyChooseUs.features.multiEngine.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-green-700">{imageSearchContentTranslations.whyChooseUs.features.free.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {imageSearchContentTranslations.whyChooseUs.features.free.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="font-medium text-purple-700">{imageSearchContentTranslations.whyChooseUs.features.crossPlatform.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {imageSearchContentTranslations.whyChooseUs.features.crossPlatform.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="font-medium text-amber-700">{imageSearchContentTranslations.whyChooseUs.features.easyToUse.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {imageSearchContentTranslations.whyChooseUs.features.easyToUse.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="font-medium text-red-700">{imageSearchContentTranslations.whyChooseUs.features.privacy.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {imageSearchContentTranslations.whyChooseUs.features.privacy.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <h3 className="font-medium text-cyan-700">{imageSearchContentTranslations.whyChooseUs.features.clean.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {imageSearchContentTranslations.whyChooseUs.features.clean.content[lang]}
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
          <p className="text-lg font-medium text-indigo-700">
            {imageSearchContentTranslations.whyChooseUs.callToAction.title[lang]}
          </p>
          <p className="text-sm text-indigo-600 mt-1">
            {imageSearchContentTranslations.whyChooseUs.callToAction.subtitle[lang]}
          </p>
        </div>
      </div>
    </>
  );
}