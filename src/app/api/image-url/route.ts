import { NextRequest, NextResponse } from 'next/server';

const UPLOAD_CONFIG_URL = 'https://vvrl.cc/api/external/image/upload';
const UPLOAD_COMPLETE_URL = 'https://vvrl.cc/api/external/image/upload-complete';
const API_KEY = process.env.VVRL_API_KEY || 'f8e7d6c5b4a39281706f5e4d3c2b1a0987654321fedcba0987654321fedcba09';

export async function POST(request: NextRequest) {
  let uploadConfig: {
    uploadUrl: string;
    shortCode: string;
    [key: string]: unknown;
  } | null = null;
  
  try {
    // 檢查 API Key 是否存在
    if (!API_KEY) {
      return NextResponse.json(
        { success: false, error: 'API configuration error' },
        { status: 500 }
      );
    }

    // 獲取 FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // 檢查檔案大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // 檢查檔案類型 - 支援圖片格式
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/webp'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported image format' },
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
      deviceInfo?: object;
    } = {
      filename: file.name,
      fileSize: file.size,
      mimeType: file.type
    };

    // 添加可選參數
    const password = formData.get('password');
    if (password) {
      configPayload.password = password as string;
    }

    const shortCode = formData.get('shortCode');
    if (shortCode) {
      configPayload.shortCode = shortCode as string;
    }

    const expiresIn = formData.get('expiresIn');
    if (expiresIn) {
      configPayload.expiresIn = expiresIn as string;
    }

    const deviceInfo = formData.get('userInfo');
    if (deviceInfo) {
      try {
        configPayload.deviceInfo = JSON.parse(deviceInfo as string);
      } catch (e) {
        console.warn('Failed to parse device info:', e);
      }
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
    uploadConfig = configData.uploadConfig;

    if (!uploadConfig || !uploadConfig.uploadUrl) {
      return NextResponse.json(
        { success: false, error: 'Invalid upload configuration received' },
        { status: 500 }
      );
    }

    let uploadSuccess = false;
    
    try {
      // 步驟 2：直接上傳到 R2
      console.log('Step 2: Uploading to R2...');
      const uploadResponse = await fetch(uploadConfig.uploadUrl, {
        method: 'PUT',
        body: file
      });

      if (!uploadResponse.ok) {
        throw new Error(`R2 upload failed with status: ${uploadResponse.status}`);
      }
      
      uploadSuccess = true;
    } catch (r2Error) {
      console.error('R2 upload failed:', r2Error);
      uploadSuccess = false;
    }

    // 步驟 3：確認上傳完成（無論成功或失敗都要調用）
    try {
      console.log('Step 3: Confirming upload...');
      const completeResponse = await fetch(UPLOAD_COMPLETE_URL, {
        method: 'POST',
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shortCode: uploadConfig.shortCode,
          success: uploadSuccess
        })
      });

      const result = await completeResponse.json();
      
      if (uploadSuccess && result.success) {
        console.log('Upload completed successfully!');
        return NextResponse.json({
          success: true,
          data: result.data
        });
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: uploadSuccess ? 
              (result.message || 'Upload completion failed') : 
              'Image upload to storage failed'
          },
          { status: 500 }
        );
      }
    } catch (completeError) {
      console.error('Upload completion failed:', completeError);
      return NextResponse.json(
        { 
          success: false, 
          error: `Upload completion failed: ${completeError instanceof Error ? completeError.message : 'Unknown error'}`
        },
        { status: 500 }
      );
    }

  } catch (error) {
    // 如果在步驟 1 成功後發生錯誤，嘗試清理記錄
    if (uploadConfig) {
      try {
        await fetch(UPLOAD_COMPLETE_URL, {
          method: 'POST',
          headers: {
            'X-API-Key': API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            shortCode: uploadConfig.shortCode,
            success: false
          })
        });
      } catch (cleanupError) {
        console.error('Failed to cleanup after error:', cleanupError);
      }
    }
    
    console.error('Image upload error:', error);
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