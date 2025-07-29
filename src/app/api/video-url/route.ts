import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://vvrl.cc/api/external/video/upload';
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

    // 獲取 FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // 檢查檔案大小 (100MB)
    if (file.size > 100 * 1024 * 1024) {
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
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported video format' },
        { status: 400 }
      );
    }

    // 創建新的 FormData 轉發到外部 API
    const externalFormData = new FormData();
    externalFormData.append('file', file);

    // 轉發其他可選參數
    const password = formData.get('password');
    if (password) {
      externalFormData.append('password', password as string);
    }


    const expiresIn = formData.get('expiresIn');
    if (expiresIn) {
      externalFormData.append('expiresIn', expiresIn as string);
    }

    const deviceInfo = formData.get('device-info');
    if (deviceInfo) {
      externalFormData.append('device-info', deviceInfo as string);
    }

    // 調用外部 API
    const response = await fetch(EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
      },
      body: externalFormData,
    });

    // 檢查回應的 Content-Type
    const contentType = response.headers.get('content-type');
    let result;
    
    try {
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // 如果不是 JSON，讀取為文本
        const textResponse = await response.text();
        console.error('Non-JSON response from external API:', textResponse);
        result = {
          success: false,
          error: 'Invalid response format',
          message: `External API returned non-JSON response. Status: ${response.status}`
        };
      }
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      result = {
        success: false,
        error: 'Response parse error',
        message: 'Failed to parse external API response'
      };
    }

    if (response.ok && result.success) {
      return NextResponse.json({
        success: true,
        data: result.data
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Upload failed',
          message: result.message || 'External API error occurred'
        },
        { status: response.status || 500 }
      );
    }

  } catch (error) {
    console.error('Video upload error:', error);
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