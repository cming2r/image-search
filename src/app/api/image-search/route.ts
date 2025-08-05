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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, fileSize, mimeType } = body;

    if (!filename || !fileSize || !mimeType) {
      return NextResponse.json(
        { error: '缺少必要參數' },
        { status: 400 }
      );
    }

    // 檢查是否為圖片
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json(
        { error: '只支持圖片文件' },
        { status: 400 }
      );
    }

    // 檢查文件大小 (10MB)
    if (fileSize > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: '文件大小不能超過10MB' },
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
    return NextResponse.json(
      { error: '生成上傳配置失敗', details: error instanceof Error ? error.message : '未知錯誤' },
      { status: 500 }
    );
  }
}