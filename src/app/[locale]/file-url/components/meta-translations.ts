export const fileUrlTranslations = {
  meta: {
    title: {
      zh: '檔案網址產生器',
      en: 'File URL Generator',
      jp: 'ファイルURLジェネレーター',
      es: 'Generador de URL de Archivo'
    },
    description: {
      zh: '免費檔案網址產生器，快速分享文件、圖片、音訊、影片等檔案。',
      en: 'Free file URL generator, quickly share documents, images, audio, videos and other files.',
      jp: '無料ファイルURLジェネレーター、文書、画像、音声、動画などのファイルを素早く共有。',
      es: 'Generador gratuito de URL de archivos, comparte rápidamente documentos, imágenes, audio, videos y otros archivos.'
    }
  },
  faq: {
    questions: {
      zh: [
        {
          question: '檔案網址產生器支援哪些檔案格式？',
          answer: '我們支援多種檔案格式，包括：文件（PDF, DOC, DOCX, TXT, RTF, ODT）、電子表格（XLS, XLSX, CSV, ODS）、簡報（PPT, PPTX, ODP）、圖片（JPEG, PNG, GIF, BMP, WEBP, SVG, TIFF）、音訊（MP3, WAV, AAC, FLAC, OGG, M4A）、影片（MP4, AVI, MOV, WMV, FLV, MKV, WEBM）以及壓縮檔（ZIP, RAR, 7Z, TAR, GZ）。'
        },
        {
          question: '檔案大小有什麼限制？',
          answer: '單個檔案最大支援 15MB，建議檔案大小在 10MB 以下以確保最佳上傳體驗。'
        },
        {
          question: '可以設定密碼保護嗎？',
          answer: '是的，您可以設定最多4位數的密碼來保護您的檔案。其他人需要輸入正確密碼才能存取檔案。'
        },
        {
          question: '檔案會保存多久？',
          answer: '檔案會在雲端安全保存，如果14天內未被訪問，系統會自動清理以釋放儲存空間。'
        },
        {
          question: '是否可以自定義短代碼？',
          answer: '是的，您可以設定自定義短代碼，長度為4-10字符，只能使用小寫英文字母和數字。系統會檢查是否重複。'
        },
        {
          question: '檔案上傳安全嗎？',
          answer: '我們使用 Cloudflare R2 雲端存儲服務，提供企業級安全保護。所有檔案傳輸都經過加密，並支援密碼保護功能。'
        }
      ],
      en: [
        {
          question: 'What file formats does the file URL generator support?',
          answer: 'We support multiple file formats including: Documents (PDF, DOC, DOCX, TXT, RTF, ODT), Spreadsheets (XLS, XLSX, CSV, ODS), Presentations (PPT, PPTX, ODP), Images (JPEG, PNG, GIF, BMP, WEBP, SVG, TIFF), Audio (MP3, WAV, AAC, FLAC, OGG, M4A), Video (MP4, AVI, MOV, WMV, FLV, MKV, WEBM), and Archives (ZIP, RAR, 7Z, TAR, GZ).'
        },
        {
          question: 'What are the file size limitations?',
          answer: 'Maximum file size is 15MB per file. We recommend keeping files under 10MB for optimal upload experience.'
        },
        {
          question: 'Can I set password protection?',
          answer: 'Yes, you can set up to a 4-digit password to protect your files. Others will need to enter the correct password to access the file.'
        },
        {
          question: 'How long are files stored?',
          answer: 'Files are securely stored in the cloud. If not accessed for 14 days, the system will automatically clean them up to free storage space.'
        },
        {
          question: 'Can I customize the short code?',
          answer: 'Yes, you can set a custom short code with 4-10 characters, using only lowercase letters and numbers. The system will check for duplicates.'
        },
        {
          question: 'Is file upload secure?',
          answer: 'We use Cloudflare R2 cloud storage service, providing enterprise-level security protection. All file transfers are encrypted and support password protection features.'
        }
      ],
      jp: [
        {
          question: 'ファイルURLジェネレーターはどのファイル形式をサポートしていますか？',
          answer: '文書（PDF、DOC、DOCX、TXT、RTF、ODT）、スプレッドシート（XLS、XLSX、CSV、ODS）、プレゼンテーション（PPT、PPTX、ODP）、画像（JPEG、PNG、GIF、BMP、WEBP、SVG、TIFF）、音声（MP3、WAV、AAC、FLAC、OGG、M4A）、動画（MP4、AVI、MOV、WMV、FLV、MKV、WEBM）、アーカイブ（ZIP、RAR、7Z、TAR、GZ）など、複数のファイル形式をサポートしています。'
        },
        {
          question: 'ファイルサイズの制限はありますか？',
          answer: 'ファイル1つあたりの最大サイズは15MBです。最適なアップロード体験のため、10MB以下のファイルを推奨します。'
        },
        {
          question: 'パスワード保護を設定できますか？',
          answer: 'はい、ファイルを保護するために最大4桁のパスワードを設定できます。他の人がファイルにアクセスするには正しいパスワードを入力する必要があります。'
        },
        {
          question: 'ファイルはどのくらい保存されますか？',
          answer: 'ファイルはクラウドで安全に保存されます。14日間アクセスされない場合、システムは自動的にクリーンアップしてストレージ容量を解放します。'
        },
        {
          question: 'ショートコードをカスタマイズできますか？',
          answer: 'はい、4-10文字のカスタムショートコードを設定でき、小文字と数字のみ使用できます。システムが重複をチェックします。'
        },
        {
          question: 'ファイルアップロードは安全ですか？',
          answer: 'Cloudflare R2クラウドストレージサービスを使用しており、企業レベルのセキュリティ保護を提供しています。すべてのファイル転送は暗号化され、パスワード保護機能をサポートしています。'
        }
      ],
      es: [
        {
          question: '¿Qué formatos de archivo admite el generador de URL de archivos?',
          answer: 'Admitimos múltiples formatos de archivo incluyendo: Documentos (PDF, DOC, DOCX, TXT, RTF, ODT), Hojas de cálculo (XLS, XLSX, CSV, ODS), Presentaciones (PPT, PPTX, ODP), Imágenes (JPEG, PNG, GIF, BMP, WEBP, SVG, TIFF), Audio (MP3, WAV, AAC, FLAC, OGG, M4A), Video (MP4, AVI, MOV, WMV, FLV, MKV, WEBM), y Archivos comprimidos (ZIP, RAR, 7Z, TAR, GZ).'
        },
        {
          question: '¿Cuáles son las limitaciones de tamaño de archivo?',
          answer: 'El tamaño máximo de archivo es de 15MB por archivo. Recomendamos mantener los archivos bajo 10MB para una experiencia óptima de carga.'
        },
        {
          question: '¿Puedo establecer protección con contraseña?',
          answer: 'Sí, puedes establecer una contraseña de hasta 4 dígitos para proteger tus archivos. Otros necesitarán ingresar la contraseña correcta para acceder al archivo.'
        },
        {
          question: '¿Cuánto tiempo se almacenan los archivos?',
          answer: 'Los archivos se almacenan de forma segura en la nube. Si no se accede a ellos durante 14 días, el sistema los limpiará automáticamente para liberar espacio de almacenamiento.'
        },
        {
          question: '¿Puedo personalizar el código corto?',
          answer: 'Sí, puedes establecer un código corto personalizado de 4-10 caracteres, usando solo letras minúsculas y números. El sistema verificará duplicados.'
        },
        {
          question: '¿Es segura la carga de archivos?',
          answer: 'Utilizamos el servicio de almacenamiento en la nube Cloudflare R2, proporcionando protección de seguridad de nivel empresarial. Todas las transferencias de archivos están encriptadas y admiten funciones de protección con contraseña.'
        }
      ]
    }
  }
};