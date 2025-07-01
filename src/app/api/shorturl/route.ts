import { NextRequest, NextResponse } from 'next/server';
import { createShortUrl } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { original_url, title } = body;

    if (!original_url) {
      return NextResponse.json(
        { success: false, error: '網址不能為空' },
        { status: 400 }
      );
    }

    const result = await createShortUrl({ 
      original_url,
      title: title || '',
      add_from: 'fyimg'
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        short_code: result.data?.short_code,
        short_url: `https://vvrl.cc/${result.data?.short_code}`,
        original_url: result.data?.original_url,
        title: result.data?.title || '',
        created_at: result.data?.created_at
      }
    });

  } catch (error) {
    console.error('API錯誤:', error);
    return NextResponse.json(
      { success: false, error: '伺服器錯誤，請重試' },
      { status: 500 }
    );
  }
}