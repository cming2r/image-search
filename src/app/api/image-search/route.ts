import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// R2 配置
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_BUCKET_NAME = 'image-search';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-b6115e36a46b41fabf861504393ee5e8.r2.dev';

if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT) {
  throw new Error('Missing required R2 environment variables');
}

// 創建 R2 客戶端
const r2Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// 錯誤訊息多語言
const errorMessages = {
  missingParams: {
    zh: '缺少必要參數',
    en: 'Missing required parameters',
    jp: '必要なパラメータが不足しています',
    es: 'Faltan parámetros requeridos'
  },
  onlyImages: {
    zh: '只支持圖片文件',
    en: 'Only image files are supported',
    jp: '画像ファイルのみサポートされています',
    es: 'Solo se admiten archivos de imagen'
  },
  fileSizeExceeded: {
    zh: '文件大小不能超過15MB',
    en: 'File size cannot exceed 15MB',
    jp: 'ファイルサイズは15MBを超えることはできません',
    es: 'El tamaño del archivo no puede exceder 15MB'
  },
  uploadConfigFailed: {
    zh: '生成上傳配置失敗',
    en: 'Failed to generate upload configuration',
    jp: 'アップロード設定の生成に失敗しました',
    es: 'Error al generar la configuración de carga'
  },
  unknownError: {
    zh: '未知錯誤',
    en: 'Unknown error',
    jp: '不明なエラー',
    es: 'Error desconocido'
  }
};

// 獲取本地化的錯誤訊息
function getErrorMessage(key: keyof typeof errorMessages, locale: string = 'zh'): string {
  const validLocale = ['zh', 'en', 'jp', 'es'].includes(locale) ? locale as 'zh' | 'en' | 'jp' | 'es' : 'zh';
  return errorMessages[key][validLocale];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, fileSize, mimeType, locale } = body;

    // 獲取語言設置（從請求體或默認為中文）
    const lang = locale || 'zh';

    if (!filename || !fileSize || !mimeType) {
      return NextResponse.json(
        { error: getErrorMessage('missingParams', lang) },
        { status: 400 }
      );
    }

    // 檢查是否為圖片
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json(
        { error: getErrorMessage('onlyImages', lang) },
        { status: 400 }
      );
    }

    // 檢查文件大小 (15MB)
    if (fileSize > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: getErrorMessage('fileSizeExceeded', lang) },
        { status: 400 }
      );
    }

    // 生成唯一的文件名
    const uniqueId = uuidv4();
    const fileExtension = filename.split('.').pop() || 'jpg';
    const key = `images/image-${uniqueId}.${fileExtension}`;

    // 創建預簽名 URL
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      ContentType: mimeType,
      ContentLength: fileSize,
    });

    // 生成預簽名 URL (有效期 5 分鐘)
    const presignedUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });

    // 返回配置信息
    return NextResponse.json({
      success: true,
      uploadConfig: {
        presignedUrl,
        key,
        publicUrl: `${R2_PUBLIC_URL}/${key}`,
      }
    });
  } catch (error) {
    console.error('生成預簽名 URL 錯誤:', error);

    // 嘗試從請求體獲取 locale（如果解析失敗則使用默認值）
    let lang = 'zh';
    try {
      const body = await req.clone().json();
      lang = body.locale || 'zh';
    } catch {
      // 忽略解析錯誤，使用默認語言
    }

    return NextResponse.json(
      {
        error: getErrorMessage('uploadConfigFailed', lang),
        details: error instanceof Error ? error.message : getErrorMessage('unknownError', lang)
      },
      { status: 500 }
    );
  }
}