'use client';

import { Zap, Lock, Sparkles, CheckCircle } from 'lucide-react';
import { videoUrlTranslations } from './meta-translations';

interface ArticleContentProps {
  locale: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const videoUrlContentTranslations = {
  howToUse: {
    title: {
      zh: "如何使用此工具？",
      en: "How to Use This Tool?",
      jp: "このツールの使い方",
      es: "¿Cómo Usar Esta Herramienta?"
    },
    steps: {
      zh: [
        "點擊上傳區域或拖拽影片文件到指定區域",
        "選擇您要上傳的影片文件（支援MP4、MOV、AVI、WebM等格式，最大100MB）",
        "可選設定密碼保護和過期時間",
        "系統自動上傳並處理您的影片文件",
        "獲得短網址連結，立即可以分享使用"
      ],
      en: [
        "Click the upload area or drag video files to the designated area",
        "Choose the video file you want to upload (supports MP4, MOV, AVI, WebM and other formats, max 100MB)",
        "Optionally set password protection and expiration time",
        "System automatically uploads and processes your video file",
        "Get short URL link, ready to share immediately"
      ],
      jp: [
        "アップロード領域をクリックするか、動画ファイルを指定領域にドラッグ",
        "アップロードしたい動画ファイルを選択（MP4、MOV、AVI、WebMなどの形式をサポート、最大100MB）",
        "オプションでパスワード保護と有効期限を設定",
        "システムが自動的に動画ファイルをアップロードし処理",
        "短縮URLリンクを取得、すぐに共有可能"
      ],
      es: [
        "Haz clic en el área de carga o arrastra archivos de video al área designada",
        "Elige el archivo de video que quieres subir (soporta MP4, MOV, AVI, WebM y otros formatos, máx. 100MB)",
        "Opcionalmente establece protección con contraseña y tiempo de expiración",
        "El sistema automáticamente sube y procesa tu archivo de video",
        "Obtén enlace de URL corto, listo para compartir inmediatamente"
      ]
    },
    tip: {
      zh: "小提示：",
      en: "Tip:",
      jp: "ヒント：",
      es: "Consejo:"
    },
    tipContent: {
      zh: "設定密碼保護和過期時間可以更好地控制影片的訪問權限，確保內容安全分享。",
      en: "Setting password protection and expiration time can better control video access permissions, ensuring secure content sharing.",
      jp: "パスワード保護と有効期限を設定することで、動画のアクセス権限をより良く制御し、安全なコンテンツ共有を確保できます。",
      es: "Establecer protección con contraseña y tiempo de expiración puede controlar mejor los permisos de acceso al video, asegurando compartir contenido de forma segura."
    }
  },
  whatIs: {
    title: {
      zh: "什麼是影片網址生成器？",
      en: "What is a Video URL Generator?",
      jp: "動画URL生成器とは？",
      es: "¿Qué es un Generador de URL de Video?"
    },
    content: {
      zh: [
        "影片網址生成器是一個現代化的雲端影片分享工具，讓使用者能夠快速上傳影片文件並獲取短網址連結。透過 Bunny.net Stream 技術，我們提供高品質的影片串流和全球 CDN 加速播放服務，適合內容創作者、教育工作者和企業用戶使用。",
        "在現代數位內容分享需求日益增長的環境下，無論是教學影片分享、企業展示、個人創作還是客戶服務，都需要穩定可靠的影片託管解決方案。我們的影片網址生成器正是為了解決這些需求而設計，提供快速、安全且高品質的影片分享服務。",
        "我們的服務支援多種主流影片格式，包括 MP4、MOV、AVI、WebM、MKV、3GP、M4V 等，文件大小最大支援 100MB。同時提供密碼保護和過期時間設定功能，讓您能夠更好地控制影片的訪問權限。"
      ],
      en: [
        "A Video URL Generator is a modern cloud video sharing tool that allows users to quickly upload video files and obtain short URL links. Through Bunny.net Stream technology, we provide high-quality video streaming and global CDN accelerated playback services, suitable for content creators, educators, and business users.",
        "In the modern digital content sharing environment with increasing demands, whether for educational video sharing, business presentations, personal creations, or customer service, stable and reliable video hosting solutions are needed. Our Video URL Generator is designed specifically to address these needs, providing fast, secure, and high-quality video sharing services.",
        "Our service supports various mainstream video formats including MP4, MOV, AVI, WebM, MKV, 3GP, M4V, with maximum file size support up to 100MB. We also provide password protection and expiration time settings, allowing you to better control video access permissions."
      ],
      jp: [
        "動画URL生成器は、ユーザーが素早く動画ファイルをアップロードして短縮URLリンクを取得できる現代的なクラウド動画共有ツールです。Bunny.net Stream技術を通じて、高品質な動画ストリーミングとグローバルCDN加速再生サービスを提供し、コンテンツクリエイター、教育者、ビジネスユーザーに適しています。",
        "需要が日増しに高まる現代のデジタルコンテンツ共有環境において、教育動画共有、ビジネスプレゼンテーション、個人創作、カスタマーサービスなど、すべて安定した信頼性のある動画ホスティングソリューションが必要です。当動画URL生成器は、これらのニーズに対応するために特別に設計され、高速で安全かつ高品質な動画共有サービスを提供します。",
        "当サービスは、MP4、MOV、AVI、WebM、MKV、3GP、M4Vなど様々な主流動画形式をサポートし、最大ファイルサイズは100MBまでサポートしています。また、パスワード保護と有効期限設定機能を提供し、動画のアクセス権限をより良く制御できます。"
      ],
      es: [
        "Un Generador de URL de Video es una herramienta moderna de compartir videos en la nube que permite a los usuarios subir rápidamente archivos de video y obtener enlaces de URL cortos. A través de la tecnología Bunny.net Stream, proporcionamos servicios de streaming de video de alta calidad y reproducción acelerada con CDN global, adecuada para creadores de contenido, educadores y usuarios empresariales.",
        "En el entorno moderno de compartir contenido digital con demandas crecientes, ya sea para compartir videos educativos, presentaciones empresariales, creaciones personales o servicio al cliente, se necesitan soluciones de alojamiento de video estables y confiables. Nuestro Generador de URL de Video está diseñado específicamente para abordar estas necesidades, proporcionando servicios de compartir video rápidos, seguros y de alta calidad.",
        "Nuestro servicio soporta varios formatos de video mainstream incluyendo MP4, MOV, AVI, WebM, MKV, 3GP, M4V, con soporte de tamaño de archivo máximo hasta 100MB. También proporcionamos protección con contraseña y configuraciones de tiempo de expiración, permitiéndote controlar mejor los permisos de acceso al video."
      ]
    }
  },
  features: {
    title: {
      zh: "功能特色與優勢",
      en: "Features and Advantages",
      jp: "機能の特徴と利点",
      es: "Características y Ventajas"
    },
    upload: {
      title: {
        zh: "多格式影片上傳",
        en: "Multi-Format Video Upload",
        jp: "マルチフォーマット動画アップロード",
        es: "Carga de Video Multi-Formato"
      },
      content: {
        zh: [
          "支援主流影片格式包括 MP4、MOV、AVI、WebM、MKV、3GP、M4V 等，最大文件大小達 100MB。系統採用先進的並行上傳技術，通常可在數十秒內完成上傳處理。",
          "支援拖拽上傳和點擊選擇兩種上傳方式，讓操作更加便捷。上傳完成後自動進行影片處理和優化，確保在各種設備上都能流暢播放。我們的全球 CDN 網絡確保無論您身在何處，都能享受到快速穩定的上傳和播放服務。"
        ],
        en: [
          "Supports mainstream video formats including MP4, MOV, AVI, WebM, MKV, 3GP, M4V, with maximum file size up to 100MB. The system employs advanced parallel upload technology, typically completing upload processing within tens of seconds.",
          "Two upload methods are supported: drag and drop and click to select, making operations more convenient. After upload completion, automatic video processing and optimization ensures smooth playback on various devices. Our global CDN network ensures fast and stable upload and playback services regardless of your location."
        ],
        jp: [
          "MP4、MOV、AVI、WebM、MKV、3GP、M4Vなどの主流動画形式をサポートし、最大ファイルサイズは100MBまでです。システムは先進的な並列アップロード技術を採用し、通常数十秒でアップロード処理が完了します。",
          "ドラッグ＆ドロップとクリック選択の2つのアップロード方法をサポートし、操作をより便利にします。アップロード完了後、自動的に動画処理と最適化を行い、様々なデバイスでスムーズな再生を確保します。グローバルCDNネットワークにより、どこにいても高速で安定したアップロードと再生サービスをお楽しみいただけます。"
        ],
        es: [
          "Soporta formatos de video mainstream incluyendo MP4, MOV, AVI, WebM, MKV, 3GP, M4V, con tamaño máximo de archivo hasta 100MB. El sistema emplea tecnología avanzada de carga paralela, típicamente completando el procesamiento de carga en decenas de segundos.",
          "Se soportan dos métodos de carga: arrastrar y soltar y hacer clic para seleccionar, haciendo las operaciones más convenientes. Después de completar la carga, el procesamiento automático de video y la optimización aseguran una reproducción fluida en varios dispositivos. Nuestra red CDN global asegura servicios de carga y reproducción rápidos y estables sin importar tu ubicación."
        ]
      }
    },
    streaming: {
      title: {
        zh: "高品質影片串流",
        en: "High-Quality Video Streaming",
        jp: "高品質動画ストリーミング",
        es: "Streaming de Video de Alta Calidad"
      },
      content: {
        zh: [
          "採用 Bunny.net Stream 企業級串流技術，提供高品質的影片播放體驗。支援自適應碼率串流，根據用戶的網絡條件自動調整影片品質，確保流暢播放不卡頓。",
          "全球 CDN 加速網絡覆蓋多個地區，大幅減少緩衝時間，提升播放速度。支援多種設備播放，包括桌面電腦、平板電腦、智慧手機等，確保跨平台兼容性。所有影片都採用 HTTPS 加密傳輸，保障播放安全。"
        ],
        en: [
          "Uses enterprise-grade Bunny.net Stream technology to provide high-quality video playback experience. Supports adaptive bitrate streaming, automatically adjusting video quality based on users' network conditions to ensure smooth playback without buffering.",
          "Global CDN acceleration network covers multiple regions, significantly reducing buffering time and improving playback speed. Supports playback on various devices including desktop computers, tablets, smartphones, ensuring cross-platform compatibility. All videos use HTTPS encrypted transmission for secure playback."
        ],
        jp: [
          "エンタープライズグレードのBunny.net Stream技術を使用して、高品質な動画再生体験を提供します。アダプティブビットレートストリーミングをサポートし、ユーザーのネットワーク条件に基づいて動画品質を自動調整し、バッファリングなしのスムーズな再生を確保します。",
          "グローバルCDN加速ネットワークは複数の地域をカバーし、バッファリング時間を大幅に短縮し、再生速度を向上させます。デスクトップコンピューター、タブレット、スマートフォンなど様々なデバイスでの再生をサポートし、クロスプラットフォーム互換性を確保します。すべての動画はHTTPS暗号化伝送を使用し、安全な再生を保障します。"
        ],
        es: [
          "Utiliza tecnología Bunny.net Stream de grado empresarial para proporcionar experiencia de reproducción de video de alta calidad. Soporta streaming de bitrate adaptativo, ajustando automáticamente la calidad del video basado en las condiciones de red de los usuarios para asegurar reproducción fluida sin buffering.",
          "La red de aceleración CDN global cubre múltiples regiones, reduciendo significativamente el tiempo de buffering y mejorando la velocidad de reproducción. Soporta reproducción en varios dispositivos incluyendo computadoras de escritorio, tabletas, smartphones, asegurando compatibilidad multiplataforma. Todos los videos usan transmisión encriptada HTTPS para reproducción segura."
        ]
      }
    },
    security: {
      title: {
        zh: "安全控制功能",
        en: "Security Control Features",
        jp: "セキュリティ制御機能",
        es: "Características de Control de Seguridad"
      },
      content: {
        zh: [
          "提供密碼保護功能，可設定最多4位數字密碼來保護您的影片內容。只有輸入正確密碼的人才能觀看影片，為敏感內容提供額外的安全保障。同時支援過期時間設定，可選擇從1小時到7天不等的自動過期時間。",
          "所有影片都存儲在安全的雲端服務器上，採用 HTTPS 加密傳輸保護數據安全。系統會記錄設備資訊，幫助您了解影片的訪問來源。過期的影片會自動刪除，節省存儲空間並保護隱私。"
        ],
        en: [
          "Provides password protection features, allowing you to set up to 4-digit passwords to protect your video content. Only those who enter the correct password can watch the video, providing additional security for sensitive content. Also supports expiration time settings, with options ranging from 1 hour to 7 days for automatic expiration.",
          "All videos are stored on secure cloud servers with HTTPS encrypted transmission to protect data security. The system records device information to help you understand video access sources. Expired videos are automatically deleted to save storage space and protect privacy."
        ],
        jp: [
          "パスワード保護機能を提供し、動画コンテンツを保護するために最大4桁のパスワードを設定できます。正しいパスワードを入力した人のみが動画を視聴でき、機密コンテンツに追加のセキュリティ保護を提供します。また、有効期限設定をサポートし、1時間から7日までの自動有効期限オプションを選択できます。",
          "すべての動画は安全なクラウドサーバーに保存され、データセキュリティを保護するためにHTTPS暗号化伝送を採用しています。システムはデバイス情報を記録し、動画のアクセス元を理解するのに役立ちます。期限切れの動画は自動的に削除され、ストレージ容量を節約しプライバシーを保護します。"
        ],
        es: [
          "Proporciona características de protección con contraseña, permitiéndote establecer contraseñas de hasta 4 dígitos para proteger tu contenido de video. Solo aquellos que ingresen la contraseña correcta pueden ver el video, proporcionando seguridad adicional para contenido sensible. También soporta configuraciones de tiempo de expiración, con opciones que van desde 1 hora hasta 7 días para expiración automática.",
          "Todos los videos se almacenan en servidores en la nube seguros con transmisión encriptada HTTPS para proteger la seguridad de los datos. El sistema registra información del dispositivo para ayudarte a entender las fuentes de acceso al video. Los videos expirados se eliminan automáticamente para ahorrar espacio de almacenamiento y proteger la privacidad."
        ]
      }
    }
  },
  useCases: {
    title: {
      zh: "使用場景與應用",
      en: "Use Cases and Applications",
      jp: "使用シナリオとアプリケーション",
      es: "Casos de Uso y Aplicaciones"
    },
    scenarios: {
      education: {
        title: {
          zh: "教育培訓",
          en: "Education and Training",
          jp: "教育研修",
          es: "Educación y Entrenamiento"
        },
        content: {
          zh: "分享教學影片給學生，支援密碼保護確保課程內容安全，過期設定避免長期佔用存儲空間。",
          en: "Share instructional videos with students, with password protection to ensure course content security and expiration settings to avoid long-term storage occupation.",
          jp: "学生との教育動画共有、パスワード保護でコース内容のセキュリティを確保し、有効期限設定で長期間のストレージ占有を回避。",
          es: "Compartir videos instructivos con estudiantes, con protección por contraseña para asegurar la seguridad del contenido del curso y configuraciones de expiración para evitar ocupación de almacenamiento a largo plazo."
        }
      },
      business: {
        title: {
          zh: "企業展示",
          en: "Business Presentations",
          jp: "ビジネスプレゼンテーション",
          es: "Presentaciones Empresariales"
        },
        content: {
          zh: "產品演示和公司介紹影片分享，高品質串流確保專業展示效果，密碼保護控制觀看權限。",
          en: "Product demonstrations and company introduction video sharing, high-quality streaming ensures professional presentation effects, password protection controls viewing permissions.",
          jp: "製品デモと会社紹介動画共有、高品質ストリーミングでプロフェッショナルなプレゼンテーション効果を確保し、パスワード保護で視聴権限を制御。",
          es: "Compartir videos de demostraciones de productos e introducción de la empresa, streaming de alta calidad asegura efectos de presentación profesional, protección por contraseña controla permisos de visualización."
        }
      },
      personal: {
        title: {
          zh: "個人創作",
          en: "Personal Creations",
          jp: "個人創作",
          es: "Creaciones Personales"
        },
        content: {
          zh: "分享創意作品和生活記錄，QR Code 功能方便移動設備分享，過期設定保護個人隱私。",
          en: "Share creative works and life recordings, QR Code feature facilitates mobile device sharing, expiration settings protect personal privacy.",
          jp: "クリエイティブ作品と生活記録の共有、QRコード機能でモバイルデバイス共有を促進し、有効期限設定で個人プライバシーを保護。",
          es: "Compartir trabajos creativos y grabaciones de vida, la función de código QR facilita compartir en dispositivos móviles, configuraciones de expiración protegen la privacidad personal."
        }
      },
      events: {
        title: {
          zh: "活動記錄",
          en: "Event Recording",
          jp: "イベント記録",
          es: "Grabación de Eventos"
        },
        content: {
          zh: "會議記錄和活動回顧影片保存分享，支援大文件上傳，全球 CDN 確保穩定播放。",
          en: "Meeting recordings and event review video storage and sharing, supports large file uploads, global CDN ensures stable playback.",
          jp: "会議記録とイベントレビュー動画保存共有、大容量ファイルアップロードをサポートし、グローバルCDNで安定した再生を確保。",
          es: "Almacenamiento y compartir videos de grabaciones de reuniones y revisión de eventos, soporta cargas de archivos grandes, CDN global asegura reproducción estable."
        }
      },
      support: {
        title: {
          zh: "客戶服務",
          en: "Customer Service",
          jp: "カスタマーサービス",
          es: "Servicio al Cliente"
        },
        content: {
          zh: "技術支援和問題解答影片，密碼保護確保客戶資料安全，短網址連結方便快速分享。",
          en: "Technical support and Q&A videos, password protection ensures customer data security, short URL links facilitate quick sharing.",
          jp: "技術サポートとQ&A動画、パスワード保護で顧客データのセキュリティを確保し、短縮URLリンクで迅速な共有を促進。",
          es: "Videos de soporte técnico y preguntas frecuentes, protección por contraseña asegura la seguridad de datos del cliente, enlaces de URL cortos facilitan compartir rápido."
        }
      },
      collaboration: {
        title: {
          zh: "團隊協作",
          en: "Team Collaboration",
          jp: "チームコラボレーション",
          es: "Colaboración en Equipo"
        },
        content: {
          zh: "專案影片共享、團隊溝通記錄，設備資訊記錄幫助了解團隊成員訪問情況。",
          en: "Project video sharing, team communication records, device information recording helps understand team member access situations.",
          jp: "プロジェクト動画共有、チームコミュニケーション記録、デバイス情報記録でチームメンバーのアクセス状況を理解。",
          es: "Compartir videos de proyecto, registros de comunicación del equipo, grabación de información del dispositivo ayuda a entender situaciones de acceso de miembros del equipo."
        }
      }
    }
  },
  whyChooseUs: {
    title: {
      zh: "為什麼選擇我們的影片網址生成器？",
      en: "Why Choose Our Video URL Generator?",
      jp: "なぜ当動画URL生成器を選ぶのか？",
      es: "¿Por Qué Elegir Nuestro Generador de URL de Video?"
    },
    features: {
      reliable: {
        title: {
          zh: "穩定可靠",
          en: "Stable and Reliable",
          jp: "安定信頼性",
          es: "Estable y Confiable"
        },
        content: {
          zh: "99.9% 的服務可用性，Bunny.net Stream 企業級基礎設施確保您的影片始終可播放。",
          en: "99.9% service availability, Bunny.net Stream enterprise-grade infrastructure ensures your videos are always playable.",
          jp: "99.9%のサービス可用性、Bunny.net Streamエンタープライズグレードインフラストラクチャがあなたの動画が常に再生可能であることを保証します。",
          es: "99.9% de disponibilidad del servicio, infraestructura Bunny.net Stream de grado empresarial asegura que tus videos sean siempre reproducibles."
        }
      },
      secure: {
        title: {
          zh: "安全保護",
          en: "Security Protection",
          jp: "セキュリティ保護",
          es: "Protección de Seguridad"
        },
        content: {
          zh: "HTTPS 加密傳輸、密碼保護功能、過期時間控制，全方位保護您的影片安全。",
          en: "HTTPS encrypted transmission, password protection features, expiration time control - comprehensive protection for your video security.",
          jp: "HTTPS暗号化伝送、パスワード保護機能、有効期限制御 - 動画セキュリティの包括的保護。",
          es: "Transmisión encriptada HTTPS, características de protección por contraseña, control de tiempo de expiración - protección integral para la seguridad de tu video."
        }
      },
      quality: {
        title: {
          zh: "高品質串流",
          en: "High-Quality Streaming",
          jp: "高品質ストリーミング",
          es: "Streaming de Alta Calidad"
        },
        content: {
          zh: "Bunny.net Stream 技術提供自適應碼率串流，確保各種網絡環境下的最佳播放體驗。",
          en: "Bunny.net Stream technology provides adaptive bitrate streaming, ensuring optimal playback experience in various network environments.",
          jp: "Bunny.net Stream技術がアダプティブビットレートストリーミングを提供し、様々なネットワーク環境で最適な再生体験を確保します。",
          es: "La tecnología Bunny.net Stream proporciona streaming de bitrate adaptativo, asegurando experiencia de reproducción óptima en varios entornos de red."
        }
      },
      fast: {
        title: {
          zh: "極速體驗",
          en: "Lightning Fast",
          jp: "超高速体験",
          es: "Experiencia Ultrarrápida"
        },
        content: {
          zh: "全球 CDN 加速，平均上傳時間少於 60 秒，快速穩定的影片播放。",
          en: "Global CDN acceleration with average upload time under 60 seconds, fast and stable video playback.",
          jp: "グローバルCDN加速により、平均アップロード時間は60秒未満で、高速で安定した動画再生。",
          es: "Aceleración CDN global con tiempo de carga promedio bajo 60 segundos, reproducción de video rápida y estable."
        }
      },
      convenient: {
        title: {
          zh: "便捷分享",
          en: "Convenient Sharing",
          jp: "便利な共有",
          es: "Compartir Conveniente"
        },
        content: {
          zh: "短網址連結、QR Code 生成、多平台支援，讓影片分享變得更簡單。",
          en: "Short URL links, QR Code generation, multi-platform support make video sharing easier.",
          jp: "短縮URLリンク、QRコード生成、マルチプラットフォームサポートで動画共有をより簡単に。",
          es: "Enlaces de URL cortos, generación de código QR, soporte multiplataforma hacen que compartir videos sea más fácil."
        }
      },
      flexible: {
        title: {
          zh: "靈活控制",
          en: "Flexible Control",
          jp: "柔軟な制御",
          es: "Control Flexible"
        },
        content: {
          zh: "密碼保護、過期時間設定、設備資訊記錄等個性化控制功能。",
          en: "Password protection, expiration time settings, device information recording and other personalized control features.",
          jp: "パスワード保護、有効期限設定、デバイス情報記録などのパーソナライズされた制御機能。",
          es: "Protección por contraseña, configuraciones de tiempo de expiración, grabación de información del dispositivo y otras características de control personalizadas."
        }
      }
    },
    callToAction: {
      title: {
        zh: "立即體驗最專業的影片網址生成器",
        en: "Experience the most professional video URL generator now",
        jp: "今すぐ最もプロフェッショナルな動画URL生成器を体験",
        es: "Experimenta ahora el generador de URL de video más profesional"
      },
      subtitle: {
        zh: "高品質串流，安全分享，讓影片傳播變得更簡單",
        en: "High-quality streaming, secure sharing, making video distribution easier",
        jp: "高品質ストリーミング、安全な共有、動画配信をより簡単に",
        es: "Streaming de alta calidad, compartir seguro, haciendo que la distribución de video sea más fácil"
      }
    }
  }
};

export default function ArticleContent({ locale }: ArticleContentProps) {
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

  return (
    <>
      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <h2>{videoUrlContentTranslations.howToUse.title[lang]}</h2>
        <ol className="ml-6 list-decimal space-y-2 mt-4">
          {videoUrlContentTranslations.howToUse.steps[lang].map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="bg-blue-50 p-3 rounded-lg mt-4">
          <p className="text-blue-700 font-medium flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {videoUrlContentTranslations.howToUse.tip[lang]}<br />
            {videoUrlContentTranslations.howToUse.tipContent[lang]}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2>{videoUrlContentTranslations.whatIs.title[lang]}</h2>
        <div className="space-y-4">
          {videoUrlContentTranslations.whatIs.content[lang].map((paragraph: string, index: number) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2>{videoUrlContentTranslations.features.title[lang]}</h2>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-blue-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {videoUrlContentTranslations.features.upload.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {videoUrlContentTranslations.features.upload.content[lang].map((paragraph: string, index: number) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-green-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {videoUrlContentTranslations.features.streaming.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {videoUrlContentTranslations.features.streaming.content[lang].map((paragraph: string, index: number) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-purple-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {videoUrlContentTranslations.features.security.title[lang]}
            </h3>
            <div className="mt-3 space-y-3">
              {videoUrlContentTranslations.features.security.content[lang].map((paragraph: string, index: number) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2>{videoUrlContentTranslations.useCases.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="font-medium text-blue-700">{videoUrlContentTranslations.useCases.scenarios.education.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {videoUrlContentTranslations.useCases.scenarios.education.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              <h3 className="font-medium text-green-700">{videoUrlContentTranslations.useCases.scenarios.business.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {videoUrlContentTranslations.useCases.scenarios.business.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <h3 className="font-medium text-purple-700">{videoUrlContentTranslations.useCases.scenarios.personal.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {videoUrlContentTranslations.useCases.scenarios.personal.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="font-medium text-amber-700">{videoUrlContentTranslations.useCases.scenarios.events.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {videoUrlContentTranslations.useCases.scenarios.events.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
              </svg>
              <h3 className="font-medium text-red-700">{videoUrlContentTranslations.useCases.scenarios.support.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {videoUrlContentTranslations.useCases.scenarios.support.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="font-medium text-cyan-700">{videoUrlContentTranslations.useCases.scenarios.collaboration.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {videoUrlContentTranslations.useCases.scenarios.collaboration.content[lang]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2>{lang === 'zh' ? '常見問題' : lang === 'en' ? 'FAQ' : lang === 'jp' ? 'よくある質問' : 'Preguntas Frecuentes'}</h2>
        
        <div className="space-y-6">
          {videoUrlTranslations.faq.questions[lang].map((item: FAQItem, index: number) => (
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
        <h2>{videoUrlContentTranslations.whyChooseUs.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-700">{videoUrlContentTranslations.whyChooseUs.features.reliable.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {videoUrlContentTranslations.whyChooseUs.features.reliable.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <Lock className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="font-medium text-green-700">{videoUrlContentTranslations.whyChooseUs.features.secure.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {videoUrlContentTranslations.whyChooseUs.features.secure.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 className="font-medium text-purple-700">{videoUrlContentTranslations.whyChooseUs.features.quality.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {videoUrlContentTranslations.whyChooseUs.features.quality.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <Zap className="h-6 w-6 text-amber-600 mr-2" />
              <h3 className="font-medium text-amber-700">{videoUrlContentTranslations.whyChooseUs.features.fast.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {videoUrlContentTranslations.whyChooseUs.features.fast.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <h3 className="font-medium text-red-700">{videoUrlContentTranslations.whyChooseUs.features.convenient.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {videoUrlContentTranslations.whyChooseUs.features.convenient.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <Sparkles className="h-6 w-6 text-cyan-600 mr-2" />
              <h3 className="font-medium text-cyan-700">{videoUrlContentTranslations.whyChooseUs.features.flexible.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {videoUrlContentTranslations.whyChooseUs.features.flexible.content[lang]}
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
          <p className="text-lg font-medium text-indigo-700">
            {videoUrlContentTranslations.whyChooseUs.callToAction.title[lang]}
          </p>
          <p className="text-sm text-indigo-600 mt-1">
            {videoUrlContentTranslations.whyChooseUs.callToAction.subtitle[lang]}
          </p>
        </div>
      </div>
    </>
  );
}