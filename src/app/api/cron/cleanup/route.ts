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
  // 在生產環境中，需要驗證 authorization header
  // Vercel Cron Jobs 會發送一個包含認證 token 的頭部
  const authHeader = request.headers.get('authorization');
  
  if (process.env.NODE_ENV === 'production') {
    // 檢查 authorization header 格式
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    
    // 驗證 token 是否正確
    // 使用環境變數中的 CRON_SECRET 來驗證
    const token = authHeader.split(' ')[1];
    return token === process.env.CRON_SECRET;
  }
  
  // 開發環境中放寬限制
  return true;
}

// 設定路由處理函數
export async function GET(request: Request) {
  try {
    // 驗證請求
    if (!validateCronRequest(request)) {
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