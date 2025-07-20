import { NextRequest, NextResponse } from 'next/server';

// 獲取設備資訊的函數 - 重用 device-info API
async function getDeviceInfo(request: NextRequest) {
  try {
    // 構造內部請求到 device-info API
    const deviceInfoRequest = new NextRequest(
      new URL('/api/device-info', request.url),
      {
        method: 'GET',
        headers: request.headers
      }
    );
    
    // 動態導入 device-info API 的處理函數
    const { GET: deviceInfoHandler } = await import('../device-info/route');
    const deviceInfoResponse = await deviceInfoHandler(deviceInfoRequest);
    
    if (deviceInfoResponse.ok) {
      const deviceInfo = await deviceInfoResponse.json();
      return {
        device_type: deviceInfo.device_type,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        country_code: deviceInfo.country_code,
        ip_address: deviceInfo.ip_address
      };
    } else {
      throw new Error('Device info API failed');
    }
  } catch (error) {
    console.error('Device info detection error:', error);
    return {
      device_type: 'Unknown',
      browser: 'Unknown',
      os: 'Unknown',
      country_code: 'XX',
      ip_address: ''
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse FormData
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const password = formData.get('password') as string | null;
    const shortCode = formData.get('shortCode') as string | null;
    const userInfoString = formData.get('userInfo') as string | null;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: '沒有提供文件' },
        { status: 400 }
      );
    }
    
    // 支援的檔案格式檢查（更寬鬆的檢查）
    const supportedTypes = [
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
      // 圖片
      'image/',
      // 音訊
      'audio/',
      // 影片
      'video/',
      // 壓縮檔
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/x-tar',
      'application/gzip'
    ];
    
    const isSupported = supportedTypes.some(type => 
      file.type.startsWith(type) || file.type === type
    );
    
    if (!isSupported) {
      return NextResponse.json(
        { success: false, error: '不支援的檔案格式' },
        { status: 400 }
      );
    }
    
    // Check file size (15MB limit)
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: '文件大小不能超過15MB' },
        { status: 400 }
      );
    }
    
    // Check API key
    const apiKey = process.env.VVRL_API_KEY;
    if (!apiKey) {
      console.error('VVRL_API_KEY 環境變數未設置');
      return NextResponse.json(
        { success: false, error: 'API配置錯誤：缺少 API Key' },
        { status: 500 }
      );
    }
    
    
    // Prepare form data for vvrl.cc API
    const vvrlFormData = new FormData();
    vvrlFormData.append('file', file);
    
    if (password) {
      vvrlFormData.append('password', password);
    }
    
    if (shortCode) {
      vvrlFormData.append('shortCode', shortCode);
    }
    
    // 處理用戶設備資訊
    let userInfo: {
      device_type: string;
      browser: string;
      os: string;
      country_code: string;
      ip_address: string;
    } | null = null;
    if (userInfoString) {
      try {
        userInfo = JSON.parse(userInfoString);
      } catch (error) {
        console.error('Invalid userInfo JSON:', error);
        // 如果 JSON 解析失敗，使用自動檢測
        userInfo = await getDeviceInfo(req);
      }
    } else {
      // 如果沒有提供 userInfo，自動檢測
      userInfo = await getDeviceInfo(req);
    }
    
    // 將設備資訊添加到 FormData
    if (userInfo) {
      vvrlFormData.append('userInfo', JSON.stringify(userInfo));
    }
    
    // Call vvrl.cc API for file upload
    const response = await fetch('https://vvrl.cc/api/external/file/upload', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
      },
      body: vvrlFormData,
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      // Handle different error status codes
      if (response.status === 401) {
        return NextResponse.json(
          { success: false, error: 'API認證失敗' },
          { status: 500 }
        );
      } else if (response.status === 409) {
        return NextResponse.json(
          { success: false, error: '短代碼已存在，請嘗試其他代碼' },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { success: false, error: result.message || '上傳失敗，請重試' },
          { status: response.status }
        );
      }
    }
    
    if (result.success && result.data) {
      return NextResponse.json({
        success: true,
        data: {
          shortUrl: result.data.shortUrl,
          shortCode: result.data.shortCode,
          filename: result.data.filename,
          fileSize: result.data.fileSize,
          mimeType: result.data.mimeType,
          createdAt: result.data.createdAt,
          hasPassword: result.data.hasPassword
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: '上傳失敗，請重試' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('檔案上傳錯誤:', error);
    
    // Handle specific fetch errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { success: false, error: '無法連接到上傳服務，請檢查網路連接' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: '伺服器錯誤，請重試',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : '未知錯誤') : undefined
      },
      { status: 500 }
    );
  }
}