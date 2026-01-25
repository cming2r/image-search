import { NextRequest, NextResponse } from 'next/server';

const UPLOAD_CONFIG_URL = 'https://vvrl.cc/api/external/file/upload';
const API_KEY = process.env.VVRL_API_KEY || 'f8e7d6c5b4a39281706f5e4d3c2b1a0987654321fedcba0987654321fedcba09';

export async function POST(request: NextRequest) {
  try {
    // 檢查 API Key 是否存在
    if (!API_KEY) {
      return NextResponse.json(
        { success: false, error: 'API configuration error' },
        { status: 500 }
      );
    }

    // 獲取 JSON 數據（不再處理 FormData 和檔案）
    const body = await request.json();
    const { filename, fileSize, mimeType, password, expiresIn, deviceInfo } = body;

    if (!filename || !fileSize || !mimeType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: filename, fileSize, mimeType' },
        { status: 400 }
      );
    }

    // 檢查檔案大小 (20MB)
    if (fileSize > 20 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 20MB limit' },
        { status: 400 }
      );
    }

    // 檢查檔案類型 - 支援文件、音訊、影片、壓縮檔（圖片請使用 image-url）
    const allowedTypes = [
      // 文件格式
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf',
      'application/vnd.oasis.opendocument.text',
      // 電子表格
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/vnd.oasis.opendocument.spreadsheet',
      // 簡報
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.oasis.opendocument.presentation',
      // 音訊
      'audio/mpeg', 'audio/wav', 'audio/aac', 'audio/flac', 'audio/ogg', 'audio/m4a', 'audio/mp4',
      // 影片
      'video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv',
      'video/x-flv', 'video/x-matroska', 'video/webm',
      // 壓縮檔
      'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed',
      'application/x-tar', 'application/gzip'
    ];

    // 檢查是否為圖片類型，提示使用 image-url
    if (mimeType.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'For images, please use the Image URL feature instead' },
        { status: 400 }
      );
    }
    
    if (!allowedTypes.includes(mimeType)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported file format' },
        { status: 400 }
      );
    }

    // 步驟 1：獲取上傳配置
    console.log('Step 1: Getting upload configuration...');
    const configPayload: {
      filename: string;
      fileSize: number;
      mimeType: string;
      password?: string;
      expiresIn?: string;
      add_from?: string;
      deviceInfo?: object;
    } = {
      filename,
      fileSize,
      mimeType,
      add_from: 'fyimg'
    };

    // 添加可選參數
    if (password) {
      configPayload.password = password;
    }

    if (expiresIn) {
      configPayload.expiresIn = expiresIn;
    }

    if (deviceInfo) {
      configPayload.deviceInfo = deviceInfo;
    }

    const configResponse = await fetch(UPLOAD_CONFIG_URL, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(configPayload)
    });

    if (!configResponse.ok) {
      const errorText = await configResponse.text();
      console.error('Config request failed:', errorText);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to get upload configuration',
          message: `Status: ${configResponse.status}`
        },
        { status: configResponse.status }
      );
    }

    const configData = await configResponse.json();
    const { uploadConfig } = configData;

    if (!uploadConfig || !uploadConfig.uploadUrl) {
      return NextResponse.json(
        { success: false, error: 'Invalid upload configuration received' },
        { status: 500 }
      );
    }

    // 返回上傳配置給前端（步驟 1 完成）
    console.log('Step 1 completed: Upload configuration ready');
    return NextResponse.json({
      success: true,
      uploadConfig: {
        uploadUrl: uploadConfig.uploadUrl,
        shortCode: uploadConfig.shortCode
      }
    });

  } catch (error) {
    console.error('File upload configuration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}