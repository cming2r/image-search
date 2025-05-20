import { NextResponse } from 'next/server';
import { createGiftExchange, updateGiftExchangeResult, getGiftExchange } from '@/lib/supabase/giftExchange';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('收到資料:', JSON.stringify(data));
    
    // 必要的欄位驗證
    if (!data.code || !data.participantNames) {
      console.log('缺少必要欄位:', { 
        hasCode: !!data.code, 
        hasParticipantNames: !!data.participantNames 
      });
      return NextResponse.json(
        { error: '缺少必要欄位' },
        { status: 400 }
      );
    }
    
    // 使用模块化函数创建礼物交换活动
    const result = await createGiftExchange(data);
    
    if (!result.success) {
      console.error('建立活動錯誤:', result.error);
      return NextResponse.json(
        { error: `建立活動失敗: ${result.error}` },
        { status: 500 }
      );
    }

    // 返回成功结果
    return NextResponse.json({
      success: true,
      message: '交換禮物活動已建立',
      code: data.code,
      data: result.data,
      showResultsDirectly: data.showResultsDirectly
    });

  } catch (error) {
    console.error('API錯誤:', error);
    return NextResponse.json(
      { error: '處理請求時發生錯誤: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { code, result } = data;
    
    if (!code || !result) {
      return NextResponse.json(
        { error: '缺少必要欄位 code 或 result' },
        { status: 400 }
      );
    }
    
    // 使用模块化函数更新礼物交换活动结果
    const updateResult = await updateGiftExchangeResult(code, result);
    
    if (!updateResult.success) {
      console.error('更新活動結果錯誤:', updateResult.error);
      return NextResponse.json(
        { error: `更新活動結果失敗: ${updateResult.error}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: '活動結果已更新',
      data: updateResult.data
    });
    
  } catch (error) {
    console.error('API錯誤:', error);
    return NextResponse.json(
      { error: '處理請求時發生錯誤: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: '缺少活動代碼' },
        { status: 400 }
      );
    }

    // 使用模块化函数获取礼物交换活动信息
    const result = await getGiftExchange(code);

    if (!result.success) {
      console.error('查詢活動錯誤:', result.error);
      
      // 如果是找不到数据的错误
      if (result.notFound) {
        return NextResponse.json(
          { error: '找不到活動' },
          { status: 404 }
        );
      }
      
      // 其他错误
      return NextResponse.json(
        { error: `查詢活動失敗: ${result.error}` },
        { status: 500 }
      );
    }

    // 返回所有数据
    return NextResponse.json(result.data);

  } catch (error) {
    console.error('API錯誤:', error);
    return NextResponse.json(
      { error: '處理請求時發生錯誤: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

