import { NextRequest, NextResponse } from 'next/server';

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

    // 獲取請求數據
    const body = await request.json();
    const { shortCode, success } = body;

    if (!shortCode || typeof success !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: shortCode and success' },
        { status: 400 }
      );
    }

    // 步驟 3：確認上傳完成
    console.log('Step 3: Confirming file upload completion...');
    const completeResponse = await fetch('https://vvrl.cc/api/external/file/upload-complete', {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shortCode,
        success
      })
    });

    if (!completeResponse.ok) {
      const errorText = await completeResponse.text();
      console.error('File upload confirmation failed:', errorText);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to confirm upload',
          message: `Status: ${completeResponse.status}`
        },
        { status: completeResponse.status }
      );
    }

    const result = await completeResponse.json();
    
    if (result.success) {
      console.log('File upload confirmation completed successfully!');
      return NextResponse.json({
        success: true,
        data: result.data
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Upload confirmation failed',
          message: result.message || 'External API error occurred'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('File upload confirmation error:', error);
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