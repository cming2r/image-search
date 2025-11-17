import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { checkRateLimit } from '@/lib/rate-limit';

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
function getErrorMessage(key: keyof typeof errorMessages, locale: string = 'en'): string {
  const validLocale = ['zh', 'en', 'jp', 'es'].includes(locale) ? locale as 'zh' | 'en' | 'jp' | 'es' : 'en';
  return errorMessages[key][validLocale];
}

// CORS 頭設置
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // 允許所有來源，生產環境可以改為特定域名
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400', // 24小時
};

// 處理 OPTIONS 預檢請求
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    // 速率限制檢查
    const rateLimitResult = checkRateLimit(req);

    // 在響應頭中添加速率限制信息
    const rateLimitHeaders = {
      ...corsHeaders,
      'X-RateLimit-Limit': '10',
      'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
    };

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          error_zh: '請求過於頻繁，請稍後再試',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            ...rateLimitHeaders,
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    const body = await req.json();
    const { filename, fileSize, mimeType, locale } = body;

    // 獲取語言設置（從請求體或默認為中文）
    const lang = locale || 'en';

    if (!filename || !fileSize || !mimeType) {
      return NextResponse.json(
        { error: getErrorMessage('missingParams', lang) },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // 檢查是否為圖片
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json(
        { error: getErrorMessage('onlyImages', lang) },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // 檢查文件大小 (15MB)
    if (fileSize > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: getErrorMessage('fileSizeExceeded', lang) },
        { status: 400, headers: rateLimitHeaders }
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
    }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('生成預簽名 URL 錯誤:', error);

    // 嘗試從請求體獲取 locale（如果解析失敗則使用默認值）
    let lang = 'en';
    try {
      const body = await req.clone().json();
      lang = body.locale || 'en';
    } catch {
      // 忽略解析錯誤，使用默認語言
    }

    return NextResponse.json(
      {
        error: getErrorMessage('uploadConfigFailed', lang),
        details: error instanceof Error ? error.message : getErrorMessage('unknownError', lang)
      },
      { status: 500, headers: corsHeaders }
    );
  }
}