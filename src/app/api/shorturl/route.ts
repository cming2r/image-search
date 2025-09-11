import { NextRequest, NextResponse } from 'next/server';

// 獲取設備資訊的函數 - 內部調用 device-info API
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, customCode, userInfo, password, expirationTime } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: '網址不能為空' },
        { status: 400 }
      );
    }

    // Prepare request body for external API
    const requestBody: { 
      url: string; 
      customCode?: string;
      password?: string;
      expirationTime?: string;
      add_from?: string;
      userInfo?: {
        device_type: string;
        browser: string;
        os: string;
        country_code: string;
        ip_address: string;
      }
    } = { url, add_from: 'fyimg' };
    
    if (customCode) {
      requestBody.customCode = customCode;
    }
    
    // 添加密碼保護
    if (password) {
      requestBody.password = password;
    }
    
    // 添加過期時間
    if (expirationTime) {
      requestBody.expirationTime = expirationTime;
    }
    
    // 如果客戶端提供了 userInfo，使用它；否則自動檢測
    if (userInfo) {
      requestBody.userInfo = userInfo;
    } else {
      // 自動檢測設備資訊
      const detectedUserInfo = await getDeviceInfo(request);
      requestBody.userInfo = detectedUserInfo;
    }

    // Call external API
    const response = await fetch('https://vvrl.cc/api/external/url/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.VVRL_API_KEY || 'default-api-key'
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return NextResponse.json({
        success: true,
        data: {
          shortCode: result.data.shortCode,
          shortUrl: result.data.shortUrl,
          originalUrl: result.data.originalUrl,
          title: result.data.title,
          createdAt: result.data.createdAt,
          hasPassword: result.data.hasPassword || false,
          expiresAt: result.data.expiresAt || null
        }
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.message || result.error || '縮短網址失敗' 
        },
        { status: response.status || 400 }
      );
    }

  } catch (error) {
    console.error('External API錯誤:', error);
    return NextResponse.json(
      { success: false, error: '伺服器錯誤，請重試' },
      { status: 500 }
    );
  }
}