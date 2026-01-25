'use client';

import { Zap, DollarSign, Lock, Smartphone, Sparkles, CheckCircle } from 'lucide-react';
import { imageUrlTranslations } from './meta-translations';

interface ArticleContentProps {
  locale: string;
}

const imageUrlContentTranslations = {
  howToUse: {
    title: {
      tw: "如何使用此工具？",
      cn: "如何使用此工具？",
      en: "How to Use This Tool?",
      jp: "このツールの使い方",
      es: "¿Cómo Usar Esta Herramienta?"
    },
    steps: {
      tw: [
        "點擊「選擇檔案」按鈕或直接拖拽圖片到上傳區域",
        "選擇您要上傳的圖片檔案（支援 JPEG、PNG、GIF、WebP 格式）",
        "點擊「上傳」按鈕開始上傳圖片到雲端",
        "複製生成的圖片網址，即可在任何地方使用"
      ],
      cn: [
        "点击「选择文件」按钮或直接拖拽图片到上传区域",
        "选择您要上传的图片文件（支持 JPEG、PNG、GIF、WebP 格式）",
        "点击「上传」按钮开始上传图片到云端",
        "复制生成的图片网址，即可在任何地方使用"
      ],
      en: [
        "Click the \"Select File\" button or drag and drop images to the upload area",
        "Choose the image file you want to upload (supports JPEG, PNG, GIF, WebP formats)",
        "Click the \"Upload\" button to start uploading the image to the cloud",
        "Copy the generated image URL and use it anywhere you need"
      ],
      jp: [
        "「ファイルを選択」ボタンをクリックするか、アップロード領域に画像をドラッグ＆ドロップ",
        "アップロードしたい画像ファイルを選択（JPEG、PNG、GIF、WebP形式をサポート）",
        "「アップロード」ボタンをクリックして画像をクラウドにアップロード開始",
        "生成された画像URLをコピーして、必要な場所で使用"
      ],
      es: [
        "Haz clic en el botón \"Seleccionar Archivo\" o arrastra y suelta imágenes al área de carga",
        "Elige el archivo de imagen que quieres subir (soporta formatos JPEG, PNG, GIF, WebP)",
        "Haz clic en el botón \"Subir\" para comenzar a subir la imagen a la nube",
        "Copia la URL de imagen generada y úsala donde la necesites"
      ]
    },
    tip: {
      tw: "小提示：",
      cn: "小提示：",
      en: "Tip:",
      jp: "ヒント：",
      es: "Consejo:"
    },
    tipContent: {
      tw: "您可以透過複製其他網站的圖片，然後直接用 Ctrl + V 貼上在上傳區域。",
      cn: "您可以通过复制其他网站的图片，然后直接用 Ctrl + V 粘贴在上传区域。",
      en: "You can copy images from other websites and directly paste them using Ctrl + V in the upload area.",
      jp: "他のウェブサイトから画像をコピーして、アップロード領域で Ctrl + V で直接貼り付けることができます。",
      es: "Puedes copiar imágenes de otros sitios web y pegarlas directamente usando Ctrl + V en el área de carga."
    }
  },
  whatIs: {
    title: {
      tw: "什麼是圖片網址產生器？",
      cn: "什么是图片网址生成器？",
      en: "What is an Image URL Generator?",
      jp: "画像URLジェネレーターとは？",
      es: "¿Qué es un Generador de URL de Imagen?"
    },
    content: {
      tw: [
        "圖片網址產生器是一個現代化的雲端服務工具，讓使用者能夠快速上傳圖片並獲取永久的網址連結。這項服務特別適合網站開發者、內容創作者、部落客以及需要在網路上分享圖片的所有人。透過我們的平台，您可以輕鬆地將本地圖片轉換為可在任何地方存取的網路連結。",
        "現代網路應用對於圖片託管的需求日益增長，無論是社交媒體分享、網站內容管理、電子商務產品展示，還是線上教育平台的教材分享，都需要穩定可靠的圖片儲存解決方案。我們的圖片網址產生器正是為了解決這些需求而設計，提供快速、安全且永久的圖片託管服務。",
        "我們的服務使用先進的雲端儲存技術，確保您的圖片能夠快速載入並在全球範圍內穩定存取。同時，我們重視用戶隱私，採用嚴格的安全措施保護您上傳的圖片，並承諾不會將其用於任何商業用途或與第三方分享。"
      ],
      cn: [
        "图片网址生成器是一个现代化的云端服务工具，让用户能够快速上传图片并获取永久的网址链接。这项服务特别适合网站开发者、内容创作者、博客以及需要在网络上分享图片的所有人。通过我们的平台，您可以轻松地将本地图片转换为可在任何地方访问的网络链接。",
        "现代网络应用对于图片托管的需求日益增长，无论是社交媒体分享、网站内容管理、电子商务产品展示，还是线上教育平台的教材分享，都需要稳定可靠的图片存储解决方案。我们的图片网址生成器正是为了解决这些需求而设计，提供快速、安全且永久的图片托管服务。",
        "我们的服务使用先进的云端存储技术，确保您的图片能够快速载入并在全球范围内稳定访问。同时，我们重视用户隐私，采用严格的安全措施保护您上传的图片，并承诺不会将其用于任何商业用途或与第三方分享。"
      ],
      en: [
        "An Image URL Generator is a modern cloud service tool that allows users to quickly upload images and obtain permanent URL links. This service is particularly suitable for web developers, content creators, bloggers, and anyone who needs to share images online. Through our platform, you can easily convert local images into network links accessible from anywhere.",
        "Modern web applications have an increasing demand for image hosting, whether for social media sharing, website content management, e-commerce product displays, or educational material sharing on online learning platforms - all require stable and reliable image storage solutions. Our Image URL Generator is designed specifically to address these needs, providing fast, secure, and permanent image hosting services.",
        "Our service uses advanced cloud storage technology to ensure your images load quickly and remain stably accessible worldwide. At the same time, we value user privacy, employing strict security measures to protect your uploaded images and promising never to use them for any commercial purposes or share them with third parties."
      ],
      jp: [
        "画像URLジェネレーターは、ユーザーが画像を素早くアップロードして永続的なURLリンクを取得できる現代的なクラウドサービスツールです。このサービスは、ウェブ開発者、コンテンツクリエイター、ブロガー、そしてオンラインで画像を共有する必要があるすべての人に特に適しています。当プラットフォームを通じて、ローカル画像をどこからでもアクセス可能なネットワークリンクに簡単に変換できます。",
        "現代のウェブアプリケーションは画像ホスティングの需要が増加しており、ソーシャルメディア共有、ウェブサイトコンテンツ管理、eコマース製品表示、オンライン教育プラットフォームでの教材共有など、すべて安定したで信頼性のある画像ストレージソリューションが必要です。当画像URLジェネレーターは、これらのニーズに対応するために特別に設計され、高速で安全かつ永続的な画像ホスティングサービスを提供します。",
        "当サービスは先進的なクラウドストレージ技術を使用して、画像の高速読み込みと世界規模での安定したアクセスを保証します。同時に、ユーザーのプライバシーを重視し、アップロードされた画像を保護するために厳格なセキュリティ対策を採用し、商業目的での使用や第三者との共有は行わないことをお約束します。"
      ],
      es: [
        "Un Generador de URL de Imagen es una herramienta moderna de servicio en la nube que permite a los usuarios subir rápidamente imágenes y obtener enlaces URL permanentes. Este servicio es particularmente adecuado para desarrolladores web, creadores de contenido, bloggers y cualquier persona que necesite compartir imágenes en línea. A través de nuestra plataforma, puedes convertir fácilmente imágenes locales en enlaces de red accesibles desde cualquier lugar.",
        "Las aplicaciones web modernas tienen una demanda creciente de alojamiento de imágenes, ya sea para compartir en redes sociales, gestión de contenido de sitios web, exhibición de productos de comercio electrónico, o compartir material educativo en plataformas de aprendizaje en línea - todas requieren soluciones de almacenamiento de imágenes estables y confiables. Nuestro Generador de URL de Imagen está diseñado específicamente para abordar estas necesidades, proporcionando servicios de alojamiento de imágenes rápidos, seguros y permanentes.",
        "Nuestro servicio utiliza tecnología avanzada de almacenamiento en la nube para asegurar que tus imágenes se carguen rápidamente y permanezcan establemente accesibles a nivel mundial. Al mismo tiempo, valoramos la privacidad del usuario, empleando medidas de seguridad estrictas para proteger tus imágenes subidas y prometiendo nunca usarlas para ningún propósito comercial o compartirlas con terceros."
      ]
    }
  },
  features: {
    title: {
      tw: "功能特色與優勢",
      cn: "功能特色与优势",
      en: "Features and Advantages",
      jp: "機能の特徴と利点",
      es: "Características y Ventajas"
    },
    upload: {
      title: {
        tw: "快速上傳技術",
        cn: "快速上传技术",
        en: "Fast Upload Technology",
        jp: "高速アップロード技術",
        es: "Tecnología de Carga Rápida"
      },
      content: {
        tw: [
          "我們採用先進的並行上傳技術，支援最大 10MB 的圖片檔案，通常可在數秒內完成上傳。支援拖拽上傳、點擊選擇和剪貼簿貼上三種上傳方式，讓操作更加便捷。無論您使用的是高解析度的專業攝影作品，還是日常的手機拍攝照片，都能獲得優異的上傳體驗。",
          "系統會自動偵測圖片格式並進行最佳化處理，確保在保持圖片品質的同時實現最快的上傳速度。我們的全球CDN網絡確保無論您身在何處，都能享受到快速穩定的上傳服務。"
        ],
        cn: [
          "我们采用先进的并行上传技术，支持最大 10MB 的图片文件，通常可在数秒内完成上传。支持拖拽上传、点击选择和剪贴板粘贴三种上传方式，让操作更加便捷。无论您使用的是高分辨率的专业摄影作品，还是日常的手机拍摄照片，都能获得优异的上传体验。",
          "系统会自动检测图片格式并进行最佳化处理，确保在保持图片品质的同时实现最快的上传速度。我们的全球CDN网络确保无论您身在何处，都能享受到快速稳定的上传服务。"
        ],
        en: [
          "We employ advanced parallel upload technology, supporting image files up to 10MB, typically completing uploads within seconds. Three upload methods are supported: drag and drop, click to select, and clipboard paste, making operations more convenient. Whether you're using high-resolution professional photography or daily mobile photos, you'll get an excellent upload experience.",
          "The system automatically detects image formats and performs optimization processing, ensuring the fastest upload speed while maintaining image quality. Our global CDN network ensures fast and stable upload services regardless of your location."
        ],
        jp: [
          "先進的な並列アップロード技術を採用し、最大10MBまでの画像ファイルをサポートし、通常数秒でアップロードが完了します。ドラッグ＆ドロップ、クリック選択、クリップボード貼り付けの3つのアップロード方法をサポートし、操作をより便利にします。高解像度のプロ写真から日常のスマートフォン撮影まで、優れたアップロード体験を提供します。",
          "システムは画像形式を自動的に検出し、最適化処理を行い、画像品質を維持しながら最速のアップロード速度を実現します。グローバルCDNネットワークにより、どこにいても高速で安定したアップロードサービスをお楽しみいただけます。"
        ],
        es: [
          "Empleamos tecnología avanzada de carga paralela, soportando archivos de imagen de hasta 10MB, típicamente completando cargas en segundos. Se soportan tres métodos de carga: arrastrar y soltar, hacer clic para seleccionar, y pegar del portapapeles, haciendo las operaciones más convenientes. Ya sea que uses fotografía profesional de alta resolución o fotos diarias de móvil, obtendrás una excelente experiencia de carga.",
          "El sistema detecta automáticamente formatos de imagen y realiza procesamiento de optimización, asegurando la velocidad de carga más rápida mientras mantiene la calidad de imagen. Nuestra red CDN global asegura servicios de carga rápidos y estables sin importar tu ubicación."
        ]
      }
    },
    storage: {
      title: {
        tw: "安全雲端儲存",
        cn: "安全云端存储",
        en: "Secure Cloud Storage",
        jp: "安全なクラウドストレージ",
        es: "Almacenamiento Seguro en la Nube"
      },
      content: {
        tw: [
          "所有上傳的圖片都存儲在企業級的雲端伺服器上，採用多重備份機制確保資料安全。我們使用業界標準的 HTTPS 加密傳輸，保護您的圖片在傳輸過程中的安全性。每個圖片都會獲得一個獨特的隨機網址，只有擁有完整網址的人才能存取您的圖片。",
          "我們的儲存架構支援高可用性和災難恢復，確保您的圖片能夠 24/7 穩定存取。同時，我們提供全球 CDN 加速服務，讓您的圖片在世界任何地方都能快速載入，為您的網站或應用提供最佳的使用者體驗。"
        ],
        cn: [
          "所有上传的图片都存储在企业级的云端服务器上，采用多重备份机制确保数据安全。我们使用业界标准的 HTTPS 加密传输，保护您的图片在传输过程中的安全性。每个图片都会获得一个独特的随机网址，只有拥有完整网址的人才能访问您的图片。",
          "我们的存储架构支持高可用性和灾难恢复，确保您的图片能够 24/7 稳定访问。同时，我们提供全球 CDN 加速服务，让您的图片在世界任何地方都能快速载入，为您的网站或应用提供最佳的用户体验。"
        ],
        en: [
          "All uploaded images are stored on enterprise-grade cloud servers with multiple backup mechanisms to ensure data security. We use industry-standard HTTPS encrypted transmission to protect the security of your images during transmission. Each image receives a unique random URL, and only those with the complete URL can access your images.",
          "Our storage architecture supports high availability and disaster recovery, ensuring your images can be stably accessed 24/7. Additionally, we provide global CDN acceleration services, allowing your images to load quickly anywhere in the world, providing the best user experience for your website or application."
        ],
        jp: [
          "アップロードされたすべての画像は、データセキュリティを確保するために複数のバックアップメカニズムを備えたエンタープライズグレードのクラウドサーバーに保存されます。業界標準のHTTPS暗号化伝送を使用して、伝送中の画像のセキュリティを保護します。各画像は一意のランダムURLを受け取り、完全なURLを持つ人のみがあなたの画像にアクセスできます。",
          "当ストレージアーキテクチャは高可用性と災害復旧をサポートし、24時間365日安定してアクセスできることを保証します。さらに、グローバルCDN加速サービスを提供し、世界中どこでも画像を高速読み込みできるようにし、ウェブサイトやアプリケーションに最高のユーザー体験を提供します。"
        ],
        es: [
          "Todas las imágenes subidas se almacenan en servidores en la nube de grado empresarial con múltiples mecanismos de respaldo para asegurar la seguridad de los datos. Utilizamos transmisión encriptada HTTPS estándar de la industria para proteger la seguridad de tus imágenes durante la transmisión. Cada imagen recibe una URL aleatoria única, y solo aquellos con la URL completa pueden acceder a tus imágenes.",
          "Nuestra arquitectura de almacenamiento soporta alta disponibilidad y recuperación de desastres, asegurando que tus imágenes puedan ser accedidas establemente 24/7. Además, proporcionamos servicios de aceleración CDN global, permitiendo que tus imágenes se carguen rápidamente en cualquier parte del mundo, proporcionando la mejor experiencia de usuario para tu sitio web o aplicación."
        ]
      }
    },
    compatibility: {
      title: {
        tw: "廣泛格式支援",
        cn: "广泛格式支持",
        en: "Wide Format Support",
        jp: "幅広いフォーマットサポート",
        es: "Soporte Amplio de Formatos"
      },
      content: {
        tw: [
          "支援所有主流圖片格式包括 JPEG、JPG、PNG、GIF、WebP、BMP、TIFF 等，滿足不同使用場景的需求。對於動態 GIF 圖片，我們完整保留其動畫效果，確保在任何平台上都能正常播放。PNG 圖片的透明背景也會完美保持，適合設計師和開發者使用。",
          "我們的智能壓縮技術能夠在保持圖片品質的前提下適度減小檔案大小，提升網頁載入速度。同時支援各種色彩空間和 ICC 配置檔案，確保圖片色彩的準確還原，特別適合需要精確色彩表現的專業用途。"
        ],
        cn: [
          "支持所有主流图片格式包括 JPEG、JPG、PNG、GIF、WebP、BMP、TIFF 等，满足不同使用场景的需求。对于动态 GIF 图片，我们完整保留其动画效果，确保在任何平台上都能正常播放。PNG 图片的透明背景也会完美保持，适合设计师和开发者使用。",
          "我们的智能压缩技术能够在保持图片品质的前提下适度减小文件大小，提升网页载入速度。同时支持各种色彩空间和 ICC 配置文件，确保图片色彩的准确还原，特别适合需要精确色彩表现的专业用途。"
        ],
        en: [
          "Supports all mainstream image formats including JPEG, JPG, PNG, GIF, WebP, BMP, TIFF, etc., meeting the needs of different usage scenarios. For animated GIF images, we fully preserve their animation effects, ensuring they play normally on any platform. PNG images' transparent backgrounds are also perfectly maintained, suitable for designers and developers.",
          "Our intelligent compression technology can moderately reduce file size while maintaining image quality, improving webpage loading speed. We also support various color spaces and ICC profiles, ensuring accurate color reproduction, particularly suitable for professional use requiring precise color representation."
        ],
        jp: [
          "JPEG、JPG、PNG、GIF、WebP、BMP、TIFFなど、すべての主流画像形式をサポートし、さまざまな使用シナリオのニーズを満たします。アニメーションGIF画像については、アニメーション効果を完全に保持し、どのプラットフォームでも正常に再生されることを保証します。PNG画像の透明な背景も完璧に維持され、デザイナーや開発者に適しています。",
          "当スマート圧縮技術は、画像品質を維持しながら適度にファイルサイズを削減し、ウェブページの読み込み速度を向上させます。また、さまざまな色空間とICCプロファイルをサポートし、正確な色再現を確保し、精密な色表現が必要なプロフェッショナル用途に特に適しています。"
        ],
        es: [
          "Soporta todos los formatos de imagen principales incluyendo JPEG, JPG, PNG, GIF, WebP, BMP, TIFF, etc., satisfaciendo las necesidades de diferentes escenarios de uso. Para imágenes GIF animadas, preservamos completamente sus efectos de animación, asegurando que se reproduzcan normalmente en cualquier plataforma. Los fondos transparentes de imágenes PNG también se mantienen perfectamente, adecuados para diseñadores y desarrolladores.",
          "Nuestra tecnología de compresión inteligente puede reducir moderadamente el tamaño del archivo mientras mantiene la calidad de imagen, mejorando la velocidad de carga de páginas web. También soportamos varios espacios de color y perfiles ICC, asegurando reproducción precisa de color, particularmente adecuado para uso profesional que requiere representación precisa de color."
        ]
      }
    }
  },
  useCases: {
    title: {
      tw: "使用場景與應用",
      cn: "使用场景与应用",
      en: "Use Cases and Applications",
      jp: "使用シナリオとアプリケーション",
      es: "Casos de Uso y Aplicaciones"
    },
    scenarios: {
      webDev: {
        title: {
          tw: "網站開發",
          cn: "网站开发",
          en: "Web Development",
          jp: "ウェブ開発",
          es: "Desarrollo Web"
        },
        content: {
          tw: "為網站提供可靠的圖片託管服務，支援響應式設計和高解析度顯示，適合各種 CMS 和靜態網站生成器。",
          cn: "为网站提供可靠的图片托管服务，支持响应式设计和高分辨率显示，适合各种 CMS 和静态网站生成器。",
          en: "Provide reliable image hosting services for websites, supporting responsive design and high-resolution displays, suitable for various CMS and static site generators.",
          jp: "ウェブサイトに信頼性の高い画像ホスティングサービスを提供し、レスポンシブデザインと高解像度表示をサポートし、さまざまなCMSや静的サイトジェネレーターに適しています。",
          es: "Proporcionar servicios confiables de alojamiento de imágenes para sitios web, soportando diseño responsive y pantallas de alta resolución, adecuado para varios CMS y generadores de sitios estáticos."
        }
      },
      blog: {
        title: {
          tw: "部落格寫作",
          cn: "博客写作",
          en: "Blog Writing",
          jp: "ブログ執筆",
          es: "Escritura de Blog"
        },
        content: {
          tw: "輕鬆在 WordPress、Blogger、Medium 等平台插入圖片，支援 Markdown 格式，提升內容創作效率。",
          cn: "轻松在 WordPress、Blogger、Medium 等平台插入图片，支持 Markdown 格式，提升内容创作效率。",
          en: "Easily insert images into platforms like WordPress, Blogger, Medium, etc., supports Markdown format, improving content creation efficiency.",
          jp: "WordPress、Blogger、Mediumなどのプラットフォームに画像を簡単に挿入し、Markdown形式をサポートし、コンテンツ作成効率を向上させます。",
          es: "Insertar fácilmente imágenes en plataformas como WordPress, Blogger, Medium, etc., soporta formato Markdown, mejorando la eficiencia de creación de contenido."
        }
      },
      social: {
        title: {
          tw: "社交媒體",
          cn: "社交媒体",
          en: "Social Media",
          jp: "ソーシャルメディア",
          es: "Redes Sociales"
        },
        content: {
          tw: "在 Facebook、Twitter、Instagram 等社交平台分享圖片，自動產生預覽效果，提升互動體驗。",
          cn: "在 Facebook、Twitter、Instagram 等社交平台分享图片，自动生成预览效果，提升互动体验。",
          en: "Share images on social platforms like Facebook, Twitter, Instagram, automatically generating preview effects to enhance interactive experience.",
          jp: "Facebook、Twitter、Instagramなどのソーシャルプラットフォームで画像を共有し、自動的にプレビュー効果を生成してインタラクティブ体験を向上させます。",
          es: "Compartir imágenes en plataformas sociales como Facebook, Twitter, Instagram, generando automáticamente efectos de vista previa para mejorar la experiencia interactiva."
        }
      },
      ecommerce: {
        title: {
          tw: "電子商務",
          cn: "电子商务",
          en: "E-commerce",
          jp: "Eコマース",
          es: "Comercio Electrónico"
        },
        content: {
          tw: "商品圖片展示、產品目錄管理，支援高品質圖片載入，提升購物體驗和轉換率。",
          cn: "商品图片展示、产品目录管理，支持高品质图片载入，提升购物体验和转化率。",
          en: "Product image display, product catalog management, supporting high-quality image loading to enhance shopping experience and conversion rates.",
          jp: "商品画像表示、製品カタログ管理、高品質画像読み込みをサポートしてショッピング体験とコンバージョン率を向上させます。",
          es: "Exhibición de imágenes de productos, gestión de catálogo de productos, soportando carga de imágenes de alta calidad para mejorar la experiencia de compra y tasas de conversión."
        }
      },
      education: {
        title: {
          tw: "線上教育",
          cn: "线上教育",
          en: "Online Education",
          jp: "オンライン教育",
          es: "Educación En Línea"
        },
        content: {
          tw: "教材圖片分享、課程內容展示，支援各種教學平台，讓知識傳播更加便捷高效。",
          cn: "教材图片分享、课程内容展示，支持各种教学平台，让知识传播更加便捷高效。",
          en: "Educational material image sharing, course content display, supporting various teaching platforms for more convenient and efficient knowledge dissemination.",
          jp: "教材画像共有、コース内容表示、さまざまな教育プラットフォームをサポートして、より便利で効率的な知識普及を実現します。",
          es: "Compartir imágenes de material educativo, exhibición de contenido de cursos, soportando varias plataformas de enseñanza para diseminación de conocimiento más conveniente y eficiente."
        }
      },
      forum: {
        title: {
          tw: "論壇討論",
          cn: "论坛讨论",
          en: "Forum Discussion",
          jp: "フォーラム議論",
          es: "Discusión en Foro"
        },
        content: {
          tw: "在各種論壇和討論區分享圖片，支援 BBCode 和 HTML 格式，豐富討論內容。",
          cn: "在各种论坛和讨论区分享图片，支持 BBCode 和 HTML 格式，丰富讨论内容。",
          en: "Share images in various forums and discussion boards, supporting BBCode and HTML formats to enrich discussion content.",
          jp: "さまざまなフォーラムや掲示板で画像を共有し、BBCodeとHTML形式をサポートして議論内容を豊かにします。",
          es: "Compartir imágenes en varios foros y tableros de discusión, soportando formatos BBCode y HTML para enriquecer el contenido de discusión."
        }
      }
    }
  },
  whyChooseUs: {
    title: {
      tw: "為什麼選擇我們的圖片網址產生器？",
      cn: "为什么选择我们的图片网址生成器？",
      en: "Why Choose Our Image URL Generator?",
      jp: "なぜ当画像URLジェネレーターを選ぶのか？",
      es: "¿Por Qué Elegir Nuestro Generador de URL de Imagen?"
    },
    features: {
      reliable: {
        title: {
          tw: "穩定可靠",
          cn: "稳定可靠",
          en: "Stable and Reliable",
          jp: "安定信頼性",
          es: "Estable y Confiable"
        },
        content: {
          tw: "99.9% 的服務可用性，企業級基礎設施確保您的圖片始終可訪問，永不失效。",
          cn: "99.9% 的服务可用性，企业级基础设施确保您的图片始终可访问，永不失效。",
          en: "99.9% service availability, enterprise-grade infrastructure ensures your images are always accessible and never expire.",
          jp: "99.9%のサービス可用性、エンタープライズグレードのインフラストラクチャがあなたの画像が常にアクセス可能で決して期限切れにならないことを保証します。",
          es: "99.9% de disponibilidad del servicio, infraestructura de grado empresarial asegura que tus imágenes sean siempre accesibles y nunca expiren."
        }
      },
      fast: {
        title: {
          tw: "極速體驗",
          cn: "极速体验",
          en: "Lightning Fast",
          jp: "超高速体験",
          es: "Experiencia Ultrarrápida"
        },
        content: {
          tw: "全球 CDN 加速，平均載入時間少於 200ms，為您的用戶提供極致的瀏覽體驗。",
          cn: "全球 CDN 加速，平均载入时间少于 200ms，为您的用户提供极致的浏览体验。",
          en: "Global CDN acceleration with average loading time under 200ms, providing the ultimate browsing experience for your users.",
          jp: "グローバルCDN加速により、平均読み込み時間は200ms未満で、ユーザーに究極のブラウジング体験を提供します。",
          es: "Aceleración CDN global con tiempo de carga promedio bajo 200ms, proporcionando la experiencia de navegación definitiva para tus usuarios."
        }
      },
      free: {
        title: {
          tw: "完全免費",
          cn: "完全免费",
          en: "Completely Free",
          jp: "完全無料",
          es: "Completamente Gratis"
        },
        content: {
          tw: "無任何使用限制，無隱藏費用，無廣告干擾，提供純淨專業的服務體驗。",
          cn: "无任何使用限制，无隐藏费用，无广告干扰，提供纯净专业的服务体验。",
          en: "No usage restrictions, no hidden fees, no advertising interference, providing a clean and professional service experience.",
          jp: "使用制限なし、隠れた料金なし、広告干渉なし、クリーンでプロフェッショナルなサービス体験を提供します。",
          es: "Sin restricciones de uso, sin tarifas ocultas, sin interferencia publicitaria, proporcionando una experiencia de servicio limpia y profesional."
        }
      },
      secure: {
        title: {
          tw: "安全隱私",
          cn: "安全隐私",
          en: "Secure and Private",
          jp: "安全プライバシー",
          es: "Seguro y Privado"
        },
        content: {
          tw: "SSL 加密傳輸，嚴格的隱私政策，絕不將您的圖片用於任何商業用途。",
          cn: "SSL 加密传输，严格的隐私政策，绝不将您的图片用于任何商业用途。",
          en: "SSL encrypted transmission, strict privacy policy, never using your images for any commercial purposes.",
          jp: "SSL暗号化伝送、厳格なプライバシーポリシー、あなたの画像を商業目的に使用することは決してありません。",
          es: "Transmisión encriptada SSL, política de privacidad estricta, nunca usando tus imágenes para ningún propósito comercial."
        }
      },
      support: {
        title: {
          tw: "跨平台支援",
          cn: "跨平台支持",
          en: "Cross-Platform Support",
          jp: "クロスプラットフォームサポート",
          es: "Soporte Multiplataforma"
        },
        content: {
          tw: "完美支援桌面、手機、平板等各種設備，響應式設計適應任何螢幕尺寸。",
          cn: "完美支持桌面、手机、平板等各种设备，响应式设计适应任何屏幕尺寸。",
          en: "Perfect support for desktop, mobile, tablet and other devices, responsive design adapts to any screen size.",
          jp: "デスクトップ、モバイル、タブレットなどの様々なデバイスを完璧にサポート、レスポンシブデザインはあらゆる画面サイズに適応します。",
          es: "Soporte perfecto para escritorio, móvil, tablet y otros dispositivos, diseño responsive se adapta a cualquier tamaño de pantalla."
        }
      },
      simple: {
        title: {
          tw: "操作簡單",
          cn: "操作简单",
          en: "Simple Operation",
          jp: "シンプル操作",
          es: "Operación Simple"
        },
        content: {
          tw: "直觀的操作介面，三步完成上傳，即使是初學者也能輕鬆上手使用。",
          cn: "直观的操作界面，三步完成上传，即使是初学者也能轻松上手使用。",
          en: "Intuitive operation interface, complete upload in three steps, even beginners can easily get started.",
          jp: "直感的な操作インターフェース、3ステップでアップロード完了、初心者でも簡単に始められます。",
          es: "Interfaz de operación intuitiva, completa la carga en tres pasos, incluso los principiantes pueden comenzar fácilmente."
        }
      }
    },
    callToAction: {
      title: {
        tw: "立即體驗最專業的圖片網址產生器",
        cn: "立即体验最专业的图片网址生成器",
        en: "Experience the most professional image URL generator now",
        jp: "今すぐ最もプロフェッショナルな画像URLジェネレーターを体験",
        es: "Experimenta ahora el generador de URL de imagen más profesional"
      },
      subtitle: {
        tw: "簡單上傳，永久連結，讓圖片分享變得更簡單",
        cn: "简单上传，永久链接，让图片分享变得更简单",
        en: "Simple upload, permanent links, making image sharing easier",
        jp: "シンプルアップロード、永続リンク、画像共有をより簡単に",
        es: "Carga simple, enlaces permanentes, haciendo que compartir imágenes sea más fácil"
      }
    }
  }
};

export default function ArticleContent({ locale }: ArticleContentProps) {
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  const faqLang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';

  return (
    <>
      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <h2>{imageUrlContentTranslations.howToUse.title[lang]}</h2>
        <ol className="ml-6 list-decimal space-y-2 mt-4">
          {imageUrlContentTranslations.howToUse.steps[lang].map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="bg-blue-50 p-3 rounded-lg mt-4">
          <p className="text-blue-700 font-medium flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {imageUrlContentTranslations.howToUse.tip[lang]}<br />
            {imageUrlContentTranslations.howToUse.tipContent[lang]}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2>{imageUrlContentTranslations.whatIs.title[lang]}</h2>
        <div className="space-y-4">
          {imageUrlContentTranslations.whatIs.content[lang].map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2>{imageUrlContentTranslations.features.title[lang]}</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-blue-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {imageUrlContentTranslations.features.upload.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {imageUrlContentTranslations.features.upload.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-green-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {imageUrlContentTranslations.features.storage.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {imageUrlContentTranslations.features.storage.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-purple-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {imageUrlContentTranslations.features.compatibility.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {imageUrlContentTranslations.features.compatibility.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2>{imageUrlContentTranslations.useCases.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h3 className="font-medium text-blue-700">{imageUrlContentTranslations.useCases.scenarios.webDev.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {imageUrlContentTranslations.useCases.scenarios.webDev.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <h3 className="font-medium text-green-700">{imageUrlContentTranslations.useCases.scenarios.blog.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {imageUrlContentTranslations.useCases.scenarios.blog.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <h3 className="font-medium text-purple-700">{imageUrlContentTranslations.useCases.scenarios.social.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {imageUrlContentTranslations.useCases.scenarios.social.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="font-medium text-amber-700">{imageUrlContentTranslations.useCases.scenarios.ecommerce.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {imageUrlContentTranslations.useCases.scenarios.ecommerce.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="font-medium text-red-700">{imageUrlContentTranslations.useCases.scenarios.education.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {imageUrlContentTranslations.useCases.scenarios.education.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="font-medium text-cyan-700">{imageUrlContentTranslations.useCases.scenarios.forum.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {imageUrlContentTranslations.useCases.scenarios.forum.content[lang]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2>{imageUrlTranslations.faq.title[faqLang]}</h2>

        <div className="space-y-6">
          {imageUrlTranslations.faq.questions[faqLang].map((item, index) => (
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
        <h2>{imageUrlContentTranslations.whyChooseUs.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-700">{imageUrlContentTranslations.whyChooseUs.features.reliable.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {imageUrlContentTranslations.whyChooseUs.features.reliable.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <Zap className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="font-medium text-green-700">{imageUrlContentTranslations.whyChooseUs.features.fast.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {imageUrlContentTranslations.whyChooseUs.features.fast.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="font-medium text-purple-700">{imageUrlContentTranslations.whyChooseUs.features.free.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {imageUrlContentTranslations.whyChooseUs.features.free.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <Lock className="h-6 w-6 text-amber-600 mr-2" />
              <h3 className="font-medium text-amber-700">{imageUrlContentTranslations.whyChooseUs.features.secure.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {imageUrlContentTranslations.whyChooseUs.features.secure.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <Smartphone className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="font-medium text-red-700">{imageUrlContentTranslations.whyChooseUs.features.support.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {imageUrlContentTranslations.whyChooseUs.features.support.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <Sparkles className="h-6 w-6 text-cyan-600 mr-2" />
              <h3 className="font-medium text-cyan-700">{imageUrlContentTranslations.whyChooseUs.features.simple.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {imageUrlContentTranslations.whyChooseUs.features.simple.content[lang]}
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
          <p className="text-lg font-medium text-indigo-700">
            {imageUrlContentTranslations.whyChooseUs.callToAction.title[lang]}
          </p>
          <p className="text-sm text-indigo-600 mt-1">
            {imageUrlContentTranslations.whyChooseUs.callToAction.subtitle[lang]}
          </p>
        </div>
      </div>
    </>
  );
}