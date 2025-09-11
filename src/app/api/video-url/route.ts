import { NextRequest, NextResponse } from 'next/server';

const UPLOAD_CONFIG_URL = 'https://vvrl.cc/api/external/video/upload';
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
    const { filename, fileSize, mimeType, password, shortCode, expiresIn, deviceInfo } = body;

    if (!filename || !fileSize || !mimeType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: filename, fileSize, mimeType' },
        { status: 400 }
      );
    }

    // 檢查檔案大小 (100MB)
    if (fileSize > 100 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 100MB limit' },
        { status: 400 }
      );
    }

    // 檢查檔案類型
    const allowedTypes = [
      'video/mp4', 'video/mov', 'video/quicktime', 'video/avi', 'video/x-msvideo',
      'video/webm', 'video/x-matroska', 'video/mkv', 'video/3gpp', 'video/3gpp2',
      'video/x-m4v', 'video/m4v'
    ];
    
    if (!allowedTypes.includes(mimeType)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported video format' },
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
      shortCode?: string;
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

    if (shortCode) {
      configPayload.shortCode = shortCode;
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

    if (!uploadConfig || !uploadConfig.bunnyUploadUrl || !uploadConfig.bunnyApiKey) {
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
        bunnyUploadUrl: uploadConfig.bunnyUploadUrl,
        bunnyApiKey: uploadConfig.bunnyApiKey,
        shortCode: uploadConfig.shortCode
      }
    });

  } catch (error) {
    console.error('Video upload configuration error:', error);
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