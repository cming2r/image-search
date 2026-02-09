'use client';

import { Zap, Lock, Sparkles, CheckCircle } from 'lucide-react';
import { fileUrlTranslations } from './meta-translations';

interface ArticleContentProps {
  locale: string;
}

const fileUrlContentTranslations = {
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
        "點擊「選擇檔案」按鈕或直接拖拽檔案到上傳區域",
        "選擇您要上傳的檔案（支援多種格式：PDF、DOC、圖片、音訊、影片等）",
        "可選設定密碼保護和自訂短代碼",
        "點擊「上傳」按鈕開始上傳檔案到雲端",
        "複製生成的檔案網址，即可在任何地方分享使用"
      ],
      cn: [
        "点击「选择文件」按钮或直接拖拽文件到上传区域",
        "选择您要上传的文件（支持多种格式：PDF、DOC、图片、音频、视频等）",
        "可选设定密码保护和自定义短代码",
        "点击「上传」按钮开始上传文件到云端",
        "复制生成的文件网址，即可在任何地方分享使用"
      ],
      en: [
        "Click the \"Select File\" button or drag and drop files to the upload area",
        "Choose the file you want to upload (supports multiple formats: PDF, DOC, images, audio, video, etc.)",
        "Optionally set password protection and custom short code",
        "Click the \"Upload\" button to start uploading the file to the cloud",
        "Copy the generated file URL and share it anywhere you need"
      ],
      jp: [
        "「ファイルを選択」ボタンをクリックするか、アップロード領域にファイルをドラッグ＆ドロップ",
        "アップロードしたいファイルを選択（PDF、DOC、画像、音声、動画など複数の形式をサポート）",
        "オプションでパスワード保護とカスタムショートコードを設定",
        "「アップロード」ボタンをクリックしてファイルをクラウドにアップロード開始",
        "生成されたファイルURLをコピーして、必要な場所で共有使用"
      ],
      es: [
        "Haz clic en el botón \"Seleccionar Archivo\" o arrastra y suelta archivos al área de carga",
        "Elige el archivo que quieres subir (soporta múltiples formatos: PDF, DOC, imágenes, audio, video, etc.)",
        "Opcionalmente establece protección con contraseña y código corto personalizado",
        "Haz clic en el botón \"Subir\" para comenzar a subir el archivo a la nube",
        "Copia la URL del archivo generada y compártela donde la necesites"
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
      tw: "設定密碼保護可以確保只有知道密碼的人才能下載您的檔案，增強安全性。",
      cn: "设定密码保护可以确保只有知道密码的人才能下载您的文件，增强安全性。",
      en: "Setting password protection ensures only those who know the password can download your files, enhancing security.",
      jp: "パスワード保護を設定すると、パスワードを知っている人だけがファイルをダウンロードできるようになり、セキュリティが向上します。",
      es: "Establecer protección con contraseña asegura que solo aquellos que conocen la contraseña puedan descargar tus archivos, mejorando la seguridad."
    }
  },
  whatIs: {
    title: {
      tw: "什麼是檔案網址產生器？",
      cn: "什么是文件网址生成器？",
      en: "What is a File URL Generator?",
      jp: "ファイルURLジェネレーターとは？",
      es: "¿Qué es un Generador de URL de Archivo?"
    },
    content: {
      tw: [
        "檔案網址產生器是一個現代化的雲端服務工具，讓使用者能夠快速上傳各種類型的檔案並獲取永久的網址連結。這項服務特別適合需要分享文件、圖片、音訊、影片等檔案的個人和企業用戶。透過我們的平台，您可以輕鬆地將本地檔案轉換為可在任何地方存取的網路連結。",
        "現代數位工作環境對於檔案分享的需求日益增長，無論是商業文件交換、教育資源分享、創意作品展示，還是技術文檔傳遞，都需要穩定可靠的檔案託管解決方案。我們的檔案網址產生器正是為了解決這些需求而設計，提供快速、安全且永久的檔案託管服務。",
        "我們的服務使用先進的雲端儲存技術，支援多種檔案格式，包括文件、電子表格、簡報、圖片、音訊、影片以及壓縮檔等。同時，我們重視用戶隱私和安全，提供密碼保護功能，並採用嚴格的安全措施保護您上傳的檔案。"
      ],
      cn: [
        "文件网址生成器是一个现代化的云端服务工具，让用户能够快速上传各种类型的文件并获取永久的网址链接。这项服务特别适合需要分享文档、图片、音频、视频等文件的个人和企业用户。通过我们的平台，您可以轻松地将本地文件转换为可在任何地方访问的网络链接。",
        "现代数字工作环境对于文件分享的需求日益增长，无论是商业文件交换、教育资源分享、创意作品展示，还是技术文档传递，都需要稳定可靠的文件托管解决方案。我们的文件网址生成器正是为了解决这些需求而设计，提供快速、安全且永久的文件托管服务。",
        "我们的服务使用先进的云端存储技术，支持多种文件格式，包括文档、电子表格、演示文稿、图片、音频、视频以及压缩文件等。同时，我们重视用户隐私和安全，提供密码保护功能，并采用严格的安全措施保护您上传的文件。"
      ],
      en: [
        "A File URL Generator is a modern cloud service tool that allows users to quickly upload various types of files and obtain permanent URL links. This service is particularly suitable for individuals and business users who need to share documents, images, audio, video and other files. Through our platform, you can easily convert local files into network links accessible from anywhere.",
        "Modern digital work environments have an increasing demand for file sharing, whether for business document exchange, educational resource sharing, creative work display, or technical documentation delivery - all require stable and reliable file hosting solutions. Our File URL Generator is designed specifically to address these needs, providing fast, secure, and permanent file hosting services.",
        "Our service uses advanced cloud storage technology, supporting multiple file formats including documents, spreadsheets, presentations, images, audio, video, and archives. At the same time, we value user privacy and security, providing password protection features and employing strict security measures to protect your uploaded files."
      ],
      jp: [
        "ファイルURLジェネレーターは、ユーザーが様々なタイプのファイルを素早くアップロードして永続的なURLリンクを取得できる現代的なクラウドサービスツールです。このサービスは、文書、画像、音声、動画などのファイルを共有する必要がある個人およびビジネスユーザーに特に適しています。当プラットフォームを通じて、ローカルファイルをどこからでもアクセス可能なネットワークリンクに簡単に変換できます。",
        "現代のデジタル作業環境では、ビジネス文書交換、教育リソース共有、クリエイティブ作品展示、技術文書配信など、ファイル共有の需要が日増しに高まっており、すべて安定したで信頼性のあるファイルホスティングソリューションが必要です。当ファイルURLジェネレーターは、これらのニーズに対応するために特別に設計され、高速で安全かつ永続的なファイルホスティングサービスを提供します。",
        "当サービスは先進的なクラウドストレージ技術を使用し、文書、スプレッドシート、プレゼンテーション、画像、音声、動画、アーカイブなど複数のファイル形式をサポートしています。同時に、ユーザーのプライバシーとセキュリティを重視し、パスワード保護機能を提供し、アップロードされたファイルを保護するために厳格なセキュリティ対策を採用しています。"
      ],
      es: [
        "Un Generador de URL de Archivo es una herramienta moderna de servicio en la nube que permite a los usuarios subir rápidamente varios tipos de archivos y obtener enlaces URL permanentes. Este servicio es particularmente adecuado para usuarios individuales y empresariales que necesitan compartir documentos, imágenes, audio, video y otros archivos. A través de nuestra plataforma, puedes convertir fácilmente archivos locales en enlaces de red accesibles desde cualquier lugar.",
        "Los entornos de trabajo digital modernos tienen una demanda creciente de compartir archivos, ya sea para intercambio de documentos comerciales, compartir recursos educativos, exhibición de trabajos creativos, o entrega de documentación técnica - todos requieren soluciones de alojamiento de archivos estables y confiables. Nuestro Generador de URL de Archivo está diseñado específicamente para abordar estas necesidades, proporcionando servicios de alojamiento de archivos rápidos, seguros y permanentes.",
        "Nuestro servicio utiliza tecnología avanzada de almacenamiento en la nube, soportando múltiples formatos de archivo incluyendo documentos, hojas de cálculo, presentaciones, imágenes, audio, video y archivos comprimidos. Al mismo tiempo, valoramos la privacidad y seguridad del usuario, proporcionando características de protección con contraseña y empleando medidas de seguridad estrictas para proteger tus archivos subidos."
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
        tw: "多格式支援上傳",
        cn: "多格式支持上传",
        en: "Multi-Format Upload Support",
        jp: "マルチフォーマットアップロードサポート",
        es: "Soporte de Carga Multi-Formato"
      },
      content: {
        tw: [
          "支援文件（PDF、DOC、DOCX、TXT、RTF、ODT）、電子表格（XLS、XLSX、CSV、ODS）、簡報（PPT、PPTX、ODP）、圖片（JPEG、PNG、GIF、BMP、WEBP、SVG、TIFF）、音訊（MP3、WAV、AAC、FLAC、OGG、M4A）、影片（MP4、AVI、MOV、WMV、FLV、MKV、WEBM）以及壓縮檔（ZIP、RAR、7Z、TAR、GZ）等多種格式。",
          "系統採用先進的並行上傳技術，支援最大 15MB 的檔案，通常可在數秒內完成上傳。支援拖拽上傳和點擊選擇兩種上傳方式，讓操作更加便捷。我們的全球CDN網絡確保無論您身在何處，都能享受到快速穩定的上傳服務。"
        ],
        cn: [
          "支持文档（PDF、DOC、DOCX、TXT、RTF、ODT）、电子表格（XLS、XLSX、CSV、ODS）、演示文稿（PPT、PPTX、ODP）、图片（JPEG、PNG、GIF、BMP、WEBP、SVG、TIFF）、音频（MP3、WAV、AAC、FLAC、OGG、M4A）、视频（MP4、AVI、MOV、WMV、FLV、MKV、WEBM）以及压缩文件（ZIP、RAR、7Z、TAR、GZ）等多种格式。",
          "系统采用先进的并行上传技术，支持最大 15MB 的文件，通常可在数秒内完成上传。支持拖拽上传和点击选择两种上传方式，让操作更加便捷。我们的全球CDN网络确保无论您身在何处，都能享受到快速稳定的上传服务。"
        ],
        en: [
          "Supports documents (PDF, DOC, DOCX, TXT, RTF, ODT), spreadsheets (XLS, XLSX, CSV, ODS), presentations (PPT, PPTX, ODP), images (JPEG, PNG, GIF, BMP, WEBP, SVG, TIFF), audio (MP3, WAV, AAC, FLAC, OGG, M4A), video (MP4, AVI, MOV, WMV, FLV, MKV, WEBM), and archives (ZIP, RAR, 7Z, TAR, GZ) and many other formats.",
          "The system employs advanced parallel upload technology, supporting files up to 15MB, typically completing uploads within seconds. Two upload methods are supported: drag and drop and click to select, making operations more convenient. Our global CDN network ensures fast and stable upload services regardless of your location."
        ],
        jp: [
          "文書（PDF、DOC、DOCX、TXT、RTF、ODT）、スプレッドシート（XLS、XLSX、CSV、ODS）、プレゼンテーション（PPT、PPTX、ODP）、画像（JPEG、PNG、GIF、BMP、WEBP、SVG、TIFF）、音声（MP3、WAV、AAC、FLAC、OGG、M4A）、動画（MP4、AVI、MOV、WMV、FLV、MKV、WEBM）、アーカイブ（ZIP、RAR、7Z、TAR、GZ）など、複数の形式をサポートしています。",
          "システムは先進的な並列アップロード技術を採用し、最大15MBまでのファイルをサポートし、通常数秒でアップロードが完了します。ドラッグ＆ドロップとクリック選択の2つのアップロード方法をサポートし、操作をより便利にします。グローバルCDNネットワークにより、どこにいても高速で安定したアップロードサービスをお楽しみいただけます。"
        ],
        es: [
          "Soporta documentos (PDF, DOC, DOCX, TXT, RTF, ODT), hojas de cálculo (XLS, XLSX, CSV, ODS), presentaciones (PPT, PPTX, ODP), imágenes (JPEG, PNG, GIF, BMP, WEBP, SVG, TIFF), audio (MP3, WAV, AAC, FLAC, OGG, M4A), video (MP4, AVI, MOV, WMV, FLV, MKV, WEBM), y archivos comprimidos (ZIP, RAR, 7Z, TAR, GZ) y muchos otros formatos.",
          "El sistema emplea tecnología avanzada de carga paralela, soportando archivos de hasta 15MB, típicamente completando cargas en segundos. Se soportan dos métodos de carga: arrastrar y soltar y hacer clic para seleccionar, haciendo las operaciones más convenientes. Nuestra red CDN global asegura servicios de carga rápidos y estables sin importar tu ubicación."
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
          "所有上傳的檔案都存儲在企業級的 Cloudflare R2 雲端伺服器上，採用多重備份機制確保資料安全。我們使用業界標準的 HTTPS 加密傳輸，保護您的檔案在傳輸過程中的安全性。每個檔案都會獲得一個獨特的隨機網址，確保隱私安全。",
          "我們的儲存架構支援高可用性和災難恢復，確保您的檔案能夠 24/7 穩定存取。提供密碼保護功能，您可以設定最多4位數字密碼來保護檔案。檔案會在雲端安全保存，如果14天內未被訪問，系統會自動清理以釋放儲存空間。"
        ],
        cn: [
          "所有上传的文件都存储在企业级的 Cloudflare R2 云端服务器上，采用多重备份机制确保数据安全。我们使用业界标准的 HTTPS 加密传输，保护您的文件在传输过程中的安全性。每个文件都会获得一个独特的随机网址，确保隐私安全。",
          "我们的存储架构支持高可用性和灾难恢复，确保您的文件能够 24/7 稳定访问。提供密码保护功能，您可以设定最多4位数字密码来保护文件。文件会在云端安全保存，如果14天内未被访问，系统会自动清理以释放存储空间。"
        ],
        en: [
          "All uploaded files are stored on enterprise-grade Cloudflare R2 cloud servers with multiple backup mechanisms to ensure data security. We use industry-standard HTTPS encrypted transmission to protect the security of your files during transmission. Each file receives a unique random URL, ensuring privacy and security.",
          "Our storage architecture supports high availability and disaster recovery, ensuring your files can be stably accessed 24/7. We provide password protection features, allowing you to set up to 4-digit passwords to protect files. Files are securely stored in the cloud and will be automatically cleaned up if not accessed for 14 days to free up storage space."
        ],
        jp: [
          "アップロードされたすべてのファイルは、データセキュリティを確保するために複数のバックアップメカニズムを備えたエンタープライズグレードのCloudflare R2クラウドサーバーに保存されます。業界標準のHTTPS暗号化伝送を使用して、伝送中のファイルのセキュリティを保護します。各ファイルは一意のランダムURLを受け取り、プライバシーとセキュリティを確保します。",
          "当ストレージアーキテクチャは高可用性と災害復旧をサポートし、24時間365日安定してアクセスできることを保証します。パスワード保護機能を提供し、ファイルを保護するために最大4桁のパスワードを設定できます。ファイルはクラウドで安全に保存され、14日間アクセスされない場合、ストレージ容量を解放するために自動的にクリーンアップされます。"
        ],
        es: [
          "Todos los archivos subidos se almacenan en servidores en la nube Cloudflare R2 de grado empresarial con múltiples mecanismos de respaldo para asegurar la seguridad de los datos. Utilizamos transmisión encriptada HTTPS estándar de la industria para proteger la seguridad de tus archivos durante la transmisión. Cada archivo recibe una URL aleatoria única, asegurando privacidad y seguridad.",
          "Nuestra arquitectura de almacenamiento soporta alta disponibilidad y recuperación de desastres, asegurando que tus archivos puedan ser accedidos establemente 24/7. Proporcionamos características de protección con contraseña, permitiéndote establecer contraseñas de hasta 4 dígitos para proteger archivos. Los archivos se almacenan de forma segura en la nube y serán limpiados automáticamente si no se accede a ellos durante 14 días para liberar espacio de almacenamiento."
        ]
      }
    },
    customization: {
      title: {
        tw: "自訂功能",
        cn: "自定义功能",
        en: "Customization Features",
        jp: "カスタマイズ機能",
        es: "Características de Personalización"
      },
      content: {
        tw: [
          "支援自訂短代碼功能，您可以設定 4-10 字符的個性化短代碼，使用小寫英文字母和數字組合。系統會自動檢查短代碼是否重複，確保唯一性。這讓您的檔案連結更容易記憶和分享。",
          "提供密碼保護功能，可設定最多4位數字密碼來保護您的檔案。只有輸入正確密碼的人才能下載檔案，為敏感檔案提供額外的安全保障。同時支援設備資訊記錄，幫助您了解檔案的存取來源。"
        ],
        cn: [
          "支持自定义短代码功能，您可以设定 4-10 字符的个性化短代码，使用小写英文字母和数字组合。系统会自动检查短代码是否重复，确保唯一性。这让您的文件链接更容易记忆和分享。",
          "提供密码保护功能，可设定最多4位数字密码来保护您的文件。只有输入正确密码的人才能下载文件，为敏感文件提供额外的安全保障。同时支持设备信息记录，帮助您了解文件的访问来源。"
        ],
        en: [
          "Supports custom short code functionality, allowing you to set personalized short codes of 4-10 characters using combinations of lowercase letters and numbers. The system automatically checks for duplicate short codes to ensure uniqueness. This makes your file links easier to remember and share.",
          "Provides password protection features, allowing you to set up to 4-digit passwords to protect your files. Only those who enter the correct password can download files, providing additional security for sensitive files. Also supports device information recording to help you understand file access sources."
        ],
        jp: [
          "カスタムショートコード機能をサポートし、小文字と数字の組み合わせを使用して4-10文字のパーソナライズされたショートコードを設定できます。システムは自動的に重複するショートコードをチェックして一意性を確保します。これにより、ファイルリンクがより覚えやすく共有しやすくなります。",
          "パスワード保護機能を提供し、ファイルを保護するために最大4桁のパスワードを設定できます。正しいパスワードを入力した人のみがファイルをダウンロードでき、機密ファイルに追加のセキュリティ保護を提供します。また、デバイス情報記録をサポートし、ファイルアクセス元を理解するのに役立ちます。"
        ],
        es: [
          "Soporta funcionalidad de código corto personalizado, permitiéndote establecer códigos cortos personalizados de 4-10 caracteres usando combinaciones de letras minúsculas y números. El sistema verifica automáticamente códigos cortos duplicados para asegurar unicidad. Esto hace que tus enlaces de archivo sean más fáciles de recordar y compartir.",
          "Proporciona características de protección con contraseña, permitiéndote establecer contraseñas de hasta 4 dígitos para proteger tus archivos. Solo aquellos que ingresen la contraseña correcta pueden descargar archivos, proporcionando seguridad adicional para archivos sensibles. También soporta grabación de información de dispositivo para ayudarte a entender las fuentes de acceso a archivos."
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
      business: {
        title: {
          tw: "商業文件交換",
          cn: "商业文件交换",
          en: "Business Document Exchange",
          jp: "ビジネス文書交換",
          es: "Intercambio de Documentos Comerciales"
        },
        content: {
          tw: "企業間文件傳遞、合約分享、報告發送，支援密碼保護確保敏感資料安全。",
          cn: "企业间文件传递、合同分享、报告发送，支持密码保护确保敏感数据安全。",
          en: "Inter-enterprise document transfer, contract sharing, report sending, with password protection to ensure sensitive data security.",
          jp: "企業間文書転送、契約共有、レポート送信、機密データのセキュリティを確保するパスワード保護付き。",
          es: "Transferencia de documentos entre empresas, compartir contratos, envío de informes, con protección por contraseña para asegurar la seguridad de datos sensibles."
        }
      },
      education: {
        title: {
          tw: "教育資源分享",
          cn: "教育资源分享",
          en: "Educational Resource Sharing",
          jp: "教育リソース共有",
          es: "Compartir Recursos Educativos"
        },
        content: {
          tw: "教材發送、作業提交、課程資料分享，支援多種格式滿足教學需求。",
          cn: "教材发送、作业提交、课程资料分享，支持多种格式满足教学需求。",
          en: "Teaching material distribution, assignment submission, course material sharing, supporting multiple formats to meet teaching needs.",
          jp: "教材配布、課題提出、コース資料共有、教育ニーズを満たす複数フォーマットをサポート。",
          es: "Distribución de material didáctico, envío de tareas, compartir material del curso, soportando múltiples formatos para satisfacer necesidades educativas."
        }
      },
      creative: {
        title: {
          tw: "創意作品展示",
          cn: "创意作品展示",
          en: "Creative Work Display",
          jp: "クリエイティブ作品展示",
          es: "Exhibición de Trabajo Creativo"
        },
        content: {
          tw: "設計作品分享、音樂作品發佈、影片內容傳播，高品質保存創意成果。",
          cn: "设计作品分享、音乐作品发布、视频内容传播，高品质保存创意成果。",
          en: "Design work sharing, music release, video content distribution, high-quality preservation of creative results.",
          jp: "デザイン作品共有、音楽リリース、動画コンテンツ配信、クリエイティブ成果の高品質保存。",
          es: "Compartir trabajo de diseño, lanzamiento de música, distribución de contenido de video, preservación de alta calidad de resultados creativos."
        }
      },
      technical: {
        title: {
          tw: "技術文檔傳遞",
          cn: "技术文档传递",
          en: "Technical Documentation Delivery",
          jp: "技術文書配信",
          es: "Entrega de Documentación Técnica"
        },
        content: {
          tw: "API文檔分享、技術規格傳遞、軟體安裝包發佈，支援大檔案上傳。",
          cn: "API文档分享、技术规格传递、软件安装包发布，支持大文件上传。",
          en: "API documentation sharing, technical specification delivery, software package release, supporting large file uploads.",
          jp: "API文書共有、技術仕様配信、ソフトウェアパッケージリリース、大容量ファイルアップロードをサポート。",
          es: "Compartir documentación de API, entrega de especificaciones técnicas, lanzamiento de paquetes de software, soportando cargas de archivos grandes."
        }
      },
      personal: {
        title: {
          tw: "個人檔案備份",
          cn: "个人文件备份",
          en: "Personal File Backup",
          jp: "個人ファイルバックアップ",
          es: "Respaldo de Archivos Personales"
        },
        content: {
          tw: "重要文件備份、照片影片儲存、個人資料歸檔，雲端安全保存。",
          cn: "重要文件备份、照片视频存储、个人资料归档，云端安全保存。",
          en: "Important document backup, photo and video storage, personal data archiving, secure cloud storage.",
          jp: "重要文書バックアップ、写真動画保存、個人データアーカイブ、安全なクラウドストレージ。",
          es: "Respaldo de documentos importantes, almacenamiento de fotos y videos, archivo de datos personales, almacenamiento seguro en la nube."
        }
      },
      collaboration: {
        title: {
          tw: "團隊協作",
          cn: "团队协作",
          en: "Team Collaboration",
          jp: "チームコラボレーション",
          es: "Colaboración en Equipo"
        },
        content: {
          tw: "專案檔案共享、團隊資源交換、協作文檔管理，提升工作效率。",
          cn: "项目文件共享、团队资源交换、协作文档管理，提升工作效率。",
          en: "Project file sharing, team resource exchange, collaborative document management, improving work efficiency.",
          jp: "プロジェクトファイル共有、チームリソース交換、協調文書管理、作業効率向上。",
          es: "Compartir archivos de proyecto, intercambio de recursos del equipo, gestión de documentos colaborativos, mejorando la eficiencia del trabajo."
        }
      }
    }
  },
  whyChooseUs: {
    title: {
      tw: "為什麼選擇我們的檔案網址產生器？",
      cn: "为什么选择我们的文件网址生成器？",
      en: "Why Choose Our File URL Generator?",
      jp: "なぜ当ファイルURLジェネレーターを選ぶのか？",
      es: "¿Por Qué Elegir Nuestro Generador de URL de Archivo?"
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
          tw: "99.9% 的服務可用性，企業級 Cloudflare R2 基礎設施確保您的檔案始終可訪問。",
          cn: "99.9% 的服务可用性，企业级 Cloudflare R2 基础设施确保您的文件始终可访问。",
          en: "99.9% service availability, enterprise-grade Cloudflare R2 infrastructure ensures your files are always accessible.",
          jp: "99.9%のサービス可用性、エンタープライズグレードのCloudflare R2インフラストラクチャがあなたのファイルが常にアクセス可能であることを保証します。",
          es: "99.9% de disponibilidad del servicio, infraestructura Cloudflare R2 de grado empresarial asegura que tus archivos sean siempre accesibles."
        }
      },
      secure: {
        title: {
          tw: "安全保護",
          cn: "安全保护",
          en: "Security Protection",
          jp: "セキュリティ保護",
          es: "Protección de Seguridad"
        },
        content: {
          tw: "SSL 加密傳輸、密碼保護功能、嚴格的隱私政策保護您的檔案安全。",
          cn: "SSL 加密传输、密码保护功能、严格的隐私政策保护您的文件安全。",
          en: "SSL encrypted transmission, password protection features, strict privacy policy to protect your file security.",
          jp: "SSL暗号化伝送、パスワード保護機能、厳格なプライバシーポリシーがあなたのファイルセキュリティを保護します。",
          es: "Transmisión encriptada SSL, características de protección por contraseña, política de privacidad estricta para proteger la seguridad de tus archivos."
        }
      },
      versatile: {
        title: {
          tw: "多格式支援",
          cn: "多格式支持",
          en: "Multi-Format Support",
          jp: "マルチフォーマットサポート",
          es: "Soporte Multi-Formato"
        },
        content: {
          tw: "支援文件、圖片、音訊、影片、壓縮檔等各種格式，滿足不同需求。",
          cn: "支持文档、图片、音频、视频、压缩文件等各种格式，满足不同需求。",
          en: "Supports documents, images, audio, video, archives and other formats to meet different needs.",
          jp: "文書、画像、音声、動画、アーカイブなどの様々な形式をサポートし、異なるニーズを満たします。",
          es: "Soporta documentos, imágenes, audio, video, archivos y otros formatos para satisfacer diferentes necesidades."
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
          tw: "全球 CDN 加速，平均上傳時間少於 10 秒，快速穩定的檔案存取。",
          cn: "全球 CDN 加速，平均上传时间少于 10 秒，快速稳定的文件访问。",
          en: "Global CDN acceleration with average upload time under 10 seconds, fast and stable file access.",
          jp: "グローバルCDN加速により、平均アップロード時間は10秒未満で、高速で安定したファイルアクセス。",
          es: "Aceleración CDN global con tiempo de carga promedio bajo 10 segundos, acceso a archivos rápido y estable."
        }
      },
      customizable: {
        title: {
          tw: "個性化設定",
          cn: "个性化设定",
          en: "Customizable Settings",
          jp: "カスタマイズ設定",
          es: "Configuraciones Personalizables"
        },
        content: {
          tw: "自訂短代碼、密碼保護、設備資訊記錄等個性化功能。",
          cn: "自定义短代码、密码保护、设备信息记录等个性化功能。",
          en: "Custom short codes, password protection, device information recording and other personalization features.",
          jp: "カスタムショートコード、パスワード保護、デバイス情報記録などのパーソナライゼーション機能。",
          es: "Códigos cortos personalizados, protección por contraseña, grabación de información de dispositivo y otras características de personalización."
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
          tw: "直觀的操作介面，拖拽上傳，三步完成檔案分享。",
          cn: "直观的操作界面，拖拽上传，三步完成文件分享。",
          en: "Intuitive operation interface, drag and drop upload, complete file sharing in three steps.",
          jp: "直感的な操作インターフェース、ドラッグ＆ドロップアップロード、3ステップでファイル共有完了。",
          es: "Interfaz de operación intuitiva, carga de arrastrar y soltar, completa el compartir archivos en tres pasos."
        }
      }
    },
    callToAction: {
      title: {
        tw: "立即體驗最專業的檔案網址產生器",
        cn: "立即体验最专业的文件网址生成器",
        en: "Experience the most professional file URL generator now",
        jp: "今すぐ最もプロフェッショナルなファイルURLジェネレーターを体験",
        es: "Experimenta ahora el generador de URL de archivo más profesional"
      },
      subtitle: {
        tw: "安全上傳，永久連結，讓檔案分享變得更簡單",
        cn: "安全上传，永久链接，让文件分享变得更简单",
        en: "Secure upload, permanent links, making file sharing easier",
        jp: "安全なアップロード、永続リンク、ファイル共有をより簡単に",
        es: "Carga segura, enlaces permanentes, haciendo que compartir archivos sea más fácil"
      }
    }
  }
};

export default function ArticleContent({ locale }: ArticleContentProps) {
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  const faqLang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';

  return (
    <>
      <div className="mt-12 bg-white p-6 rounded-lg shadow-xs">
        <h2>{fileUrlContentTranslations.howToUse.title[lang]}</h2>
        <ol className="ml-6 list-decimal space-y-2 mt-4">
          {fileUrlContentTranslations.howToUse.steps[lang].map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="bg-blue-50 p-3 rounded-lg mt-4">
          <p className="text-blue-700 font-medium flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {fileUrlContentTranslations.howToUse.tip[lang]}<br />
            {fileUrlContentTranslations.howToUse.tipContent[lang]}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-xs">
        <h2>{fileUrlContentTranslations.whatIs.title[lang]}</h2>
        <div className="space-y-4">
          {fileUrlContentTranslations.whatIs.content[lang].map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-xs">
        <h2>{fileUrlContentTranslations.features.title[lang]}</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-xs hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-blue-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {fileUrlContentTranslations.features.upload.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {fileUrlContentTranslations.features.upload.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-xs hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-green-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {fileUrlContentTranslations.features.storage.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {fileUrlContentTranslations.features.storage.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-xs hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-purple-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {fileUrlContentTranslations.features.customization.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {fileUrlContentTranslations.features.customization.content[lang].map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-xs">
        <h2>{fileUrlContentTranslations.useCases.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              <h3 className="font-medium text-blue-700">{fileUrlContentTranslations.useCases.scenarios.business.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {fileUrlContentTranslations.useCases.scenarios.business.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="font-medium text-green-700">{fileUrlContentTranslations.useCases.scenarios.education.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {fileUrlContentTranslations.useCases.scenarios.education.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <h3 className="font-medium text-purple-700">{fileUrlContentTranslations.useCases.scenarios.creative.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {fileUrlContentTranslations.useCases.scenarios.creative.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h3 className="font-medium text-amber-700">{fileUrlContentTranslations.useCases.scenarios.technical.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {fileUrlContentTranslations.useCases.scenarios.technical.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="font-medium text-red-700">{fileUrlContentTranslations.useCases.scenarios.personal.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {fileUrlContentTranslations.useCases.scenarios.personal.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="font-medium text-cyan-700">{fileUrlContentTranslations.useCases.scenarios.collaboration.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {fileUrlContentTranslations.useCases.scenarios.collaboration.content[lang]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-xs">
        <h2>{fileUrlTranslations.faq.questions.tw ? '常見問題' : 'FAQ'}</h2>
        
        <div className="space-y-6">
          {fileUrlTranslations.faq.questions[faqLang].map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700">{item.question}</h3>
              <p className="mt-2">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-xs mb-8">
        <h2>{fileUrlContentTranslations.whyChooseUs.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-700">{fileUrlContentTranslations.whyChooseUs.features.reliable.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {fileUrlContentTranslations.whyChooseUs.features.reliable.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <Lock className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="font-medium text-green-700">{fileUrlContentTranslations.whyChooseUs.features.secure.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {fileUrlContentTranslations.whyChooseUs.features.secure.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-medium text-purple-700">{fileUrlContentTranslations.whyChooseUs.features.versatile.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {fileUrlContentTranslations.whyChooseUs.features.versatile.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <Zap className="h-6 w-6 text-amber-600 mr-2" />
              <h3 className="font-medium text-amber-700">{fileUrlContentTranslations.whyChooseUs.features.fast.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {fileUrlContentTranslations.whyChooseUs.features.fast.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="font-medium text-red-700">{fileUrlContentTranslations.whyChooseUs.features.customizable.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {fileUrlContentTranslations.whyChooseUs.features.customizable.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <Sparkles className="h-6 w-6 text-cyan-600 mr-2" />
              <h3 className="font-medium text-cyan-700">{fileUrlContentTranslations.whyChooseUs.features.simple.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {fileUrlContentTranslations.whyChooseUs.features.simple.content[lang]}
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg text-center">
          <p className="text-lg font-medium text-indigo-700">
            {fileUrlContentTranslations.whyChooseUs.callToAction.title[lang]}
          </p>
          <p className="text-sm text-indigo-600 mt-1">
            {fileUrlContentTranslations.whyChooseUs.callToAction.subtitle[lang]}
          </p>
        </div>
      </div>
    </>
  );
}