import { NextRequest, NextResponse } from 'next/server';
import { getDailyStats } from '@/lib/supabase/dailyStats';
import { supabase } from '@/lib/supabase';

// 驗證管理員權限
async function validateAdminAccess(request: NextRequest): Promise<string | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return 'Missing or invalid authorization header';
    }

    const token = authHeader.replace('Bearer ', '');
    
    // 驗證 JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return 'Invalid token or user not found';
    }

    // 檢查是否為管理員
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
    if (!user.email || !adminEmails.includes(user.email)) {
      return 'Access denied: not an admin user';
    }

    return null; // 驗證成功
  } catch (error) {
    console.error('Admin validation error:', error);
    return 'Authentication error';
  }
}

export async function GET(request: NextRequest) {
  try {
    // 驗證管理員權限
    const authError = await validateAdminAccess(request);
    if (authError) {
      return NextResponse.json(
        { success: false, error: authError },
        { status: 401 }
      );
    }

    // 獲取查詢參數
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    
    // 如果沒有提供日期範圍，預設查詢最近30天
    const defaultEndDate = new Date().toISOString().split('T')[0];
    const defaultStartDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    const finalStartDate = startDate || defaultStartDate;
    const finalEndDate = endDate || defaultEndDate;

    // 獲取統計數據
    const result = await getDailyStats(finalStartDate, finalEndDate);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      query: {
        start_date: finalStartDate,
        end_date: finalEndDate,
        total_days: result.data?.length || 0
      }
    });

  } catch (error) {
    console.error('獲取統計數據時發生錯誤:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '伺服器內部錯誤',
        message: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    );
  }
}