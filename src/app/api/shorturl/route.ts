import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, customCode } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: '網址不能為空' },
        { status: 400 }
      );
    }

    // Prepare request body for external API
    const requestBody: { url: string; customCode?: string } = { url };
    if (customCode) {
      requestBody.customCode = customCode;
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
          createdAt: result.data.createdAt
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