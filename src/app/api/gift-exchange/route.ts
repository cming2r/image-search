import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('收到資料:', JSON.stringify(data));
    
    // 必要的欄位驗證
    if (!data.eventId || !data.eventName || !data.participantNames) {
      console.log('缺少必要欄位:', { 
        hasEventId: !!data.eventId, 
        hasEventName: !!data.eventName, 
        hasParticipantNames: !!data.participantNames 
      });
      return NextResponse.json(
        { error: '缺少必要欄位' },
        { status: 400 }
      );
    }
    
    // 確保assignments存在，如果不存在則設為空陣列
    const assignments = data.assignments || [];
    
    // 格式化數據以符合資料庫需求
    const insertData = {
      event_id: data.eventId,
      event_name: data.eventName,
      total_participants: data.totalParticipants || data.participantNames.length,
      participant_names: Array.isArray(data.participantNames) ? data.participantNames : [],
      assignments_list: assignments
      // created_at 欄位由 Supabase 自動處理
    };
    
    console.log('準備插入數據:', JSON.stringify(insertData));

    // 用簡化的表結構存儲交換禮物活動
    const { data: insertedData, error: eventError } = await supabase
      .from('gift_exchange_wheel')
      .insert([insertData])
      .select();

    if (eventError) {
      console.error('建立活動錯誤:', eventError);
      return NextResponse.json(
        { error: `建立活動失敗: ${eventError.message || eventError.code || '未知錯誤'}` },
        { status: 500 }
      );
    }

    console.log('活動建立成功!', insertedData);

    // 回傳成功結果
    return NextResponse.json({
      success: true,
      message: '交換禮物活動已建立',
      eventId: data.eventId,
      data: insertedData
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
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { error: '缺少活動ID' },
        { status: 400 }
      );
    }

    // 獲取活動資訊
    const { data: eventData, error: eventError } = await supabase
      .from('gift_exchange_wheel')
      .select('*')
      .eq('event_id', eventId)
      .single();

    if (eventError) {
      console.error('查詢活動錯誤:', eventError);
      // 如果是找不到資料的錯誤，返回404
      if (eventError.code === 'PGRST116') {
        return NextResponse.json(
          { error: '找不到活動' },
          { status: 404 }
        );
      }
      // 其他錯誤
      return NextResponse.json(
        { error: `查詢活動失敗: ${eventError.message || eventError.code}` },
        { status: 500 }
      );
    }

    if (!eventData) {
      return NextResponse.json(
        { error: '找不到活動' },
        { status: 404 }
      );
    }

    // 回傳所有資料
    return NextResponse.json(eventData);

  } catch (error) {
    console.error('API錯誤:', error);
    return NextResponse.json(
      { error: '處理請求時發生錯誤: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

