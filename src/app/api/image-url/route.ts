import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse FormData
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const password = formData.get('password') as string | null;
    const shortCode = formData.get('shortCode') as string | null;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: '沒有提供文件' },
        { status: 400 }
      );
    }
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: '只支持圖片文件' },
        { status: 400 }
      );
    }
    
    // Check file size (10MB limit as per vvrl.cc API)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: '文件大小不能超過10MB' },
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
    
    console.log('API Key found:', apiKey.substring(0, 8) + '...');
    
    // Prepare form data for vvrl.cc API
    const vvrlFormData = new FormData();
    vvrlFormData.append('file', file);
    
    if (password) {
      vvrlFormData.append('password', password);
    }
    
    if (shortCode) {
      vvrlFormData.append('shortCode', shortCode);
    }
    
    // Call vvrl.cc API
    console.log('Calling vvrl.cc API...');
    const response = await fetch('https://vvrl.cc/api/external/image/upload', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
      },
      body: vvrlFormData,
    });
    
    console.log('vvrl.cc API response status:', response.status);
    const result = await response.json();
    console.log('vvrl.cc API response:', result);
    
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
          // directUrl 已被移除，使用 shortUrl 作為圖片連結
          directUrl: result.data.shortUrl,
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
    console.error('圖片上傳錯誤:', error);
    
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