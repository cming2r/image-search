import { NextResponse } from 'next/server';
import { cleanupOldImages } from '@/lib/blob';
import { generatePreviousDayStats } from '@/lib/supabase/dailyStats';


// 驗證請求是否來自 Vercel Cron
function validateCronRequest(request: Request): boolean {
  // 檢查請求頭部
  const authHeader = request.headers.get('authorization');
  
  // 驗證方法 1: 檢查 Authorization header
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === process.env.CRON_SECRET) {
      return true;
    }
  }
  
  // 驗證方法 2: 檢查 Vercel 內部 header
  const cronHeader = request.headers.get('x-vercel-cron');
  if (cronHeader === '1') {
    return true;
  }
  
  // 驗證方法 3: 檢查 User-Agent
  const userAgent = request.headers.get('user-agent');
  if (userAgent && userAgent.includes('vercel-cron')) {
    return true;
  }
  
  // 開發環境中放寬限制
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  
  return false;
}

// 設定路由處理函數
export async function GET(request: Request) {
  try {
    // 驗證請求
    if (!validateCronRequest(request)) {
      // 記錄更多信息以幫助調試
      const headerObj: Record<string, string> = {};
      request.headers.forEach((value, key) => {
        headerObj[key] = value;
      });
      
      console.warn('未授權的 cron 請求:', {
        headers: headerObj,
        url: request.url,
        method: request.method
      });
      
      return NextResponse.json(
        { error: '未授權的請求' },
        { status: 401 }
      );
    }
    
    // 使用 blob.ts 中的 cleanupOldImages 函數（批次處理，每次最多100個檔案）
    const cleanupResult = await cleanupOldImages(24, 100);
    
    // 產生前一日的搜尋統計
    console.log('開始產生前一日統計...');
    const statsResult = await generatePreviousDayStats();
    
    // 準備回應結果
    const result = {
      cleanup: cleanupResult,
      dailyStats: {
        success: statsResult,
        message: statsResult ? '前一日統計產生成功' : '前一日統計產生失敗'
      },
      timestamp: new Date().toISOString()
    };
    
    // 返回結合的結果
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('清理檔案時發生錯誤:', error);
    return NextResponse.json(
      { 
        success: false,
        error: '清理檔案時發生錯誤', 
        message: error instanceof Error ? error.message : '未知錯誤' 
      },
      { status: 500 }
    );
  }
}