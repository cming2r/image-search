import { del, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

interface BlobWithContentType {
  url: string;
  pathname: string;
  contentType?: string;
  uploadedAt: string;
}

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
      console.warn('未授權的 cron 請求:', {
        headers: Object.fromEntries([...request.headers.entries()]),
        url: request.url,
        method: request.method
      });
      
      return NextResponse.json(
        { error: '未授權的請求' },
        { status: 401 }
      );
    }
    
    // 取得當前時間，減去 24 小時（保留最近一天的檔案）
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - 24);
    
    // 列出所有 blob
    const { blobs } = await list();
    
    // 刪除前的數量
    const initialCount = blobs.length;
    
    // 刪除操作計數和結果
    let deletedCount = 0;
    const deletionResults: Array<{
      url: string;
      status: string;
      createdAt?: string;
      error?: string;
    }> = [];
    
    // 刪除所有符合條件的 blob（可根據需求修改條件）
    for (const blob of blobs as unknown as BlobWithContentType[]) {
      // 檢查是否是圖片（根據 pathname 或 contentType）
      const isImage = blob.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i) || 
                      (blob.contentType && blob.contentType.startsWith('image/'));
      
      // 檢查創建時間是否早於截止日期
      const createdAt = new Date(blob.uploadedAt);
      const isOld = createdAt < cutoffDate;
      
      // 如果是圖片且已過期，則刪除
      if (isImage && isOld) {
        try {
          await del(blob.url);
          deletedCount++;
          deletionResults.push({
            url: blob.url,
            status: 'deleted',
            createdAt: blob.uploadedAt
          });
        } catch (error) {
          deletionResults.push({
            url: blob.url,
            status: 'error',
            error: error instanceof Error ? error.message : '未知錯誤'
          });
        }
      }
    }
    
    // 返回刪除結果
    return NextResponse.json({
      success: true,
      message: `已清理 ${deletedCount} 個圖片檔案`,
      total: initialCount,
      deleted: deletedCount,
      detail: deletionResults
    });
    
  } catch (error) {
    console.error('清理檔案時發生錯誤:', error);
    return NextResponse.json(
      { error: '清理檔案時發生錯誤', message: error instanceof Error ? error.message : '未知錯誤' },
      { status: 500 }
    );
  }
}