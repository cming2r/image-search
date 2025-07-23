// Vercel Blob 工具函數
import { put, del, list } from "@vercel/blob";

/**
 * 上傳圖片到 Vercel Blob 儲存
 * @param {File} file - 圖片文件
 * @param {string} fileName - 文件名稱
 * @returns {Promise<{url: string, success: boolean}>} - 上傳後的URL
 */
export async function uploadImage(
  file: File,
  fileName: string,
): Promise<{ url: string; success: boolean }> {
  try {
    const blob = await put(fileName, file, {
      access: "public",
      contentType: file.type,
    });

    return {
      url: blob.url,
      success: true,
    };
  } catch (error) {
    console.error("Blob 上傳錯誤:", error);
    throw new Error("圖片上傳失敗");
  }
}

interface BlobWithContentType {
  url: string;
  pathname: string;
  contentType?: string;
  uploadedAt: string;
}

/**
 * 清理舊的圖片檔案（分批處理版本）
 * @param {number} hoursOld - 多少小時前的檔案視為過期 (預設24小時)
 * @param {number} maxBatch - 每批最多處理的檔案數量 (預設100)
 * @returns {Promise<{success: boolean, message: string, total: number, deleted: number, skipped: number, detail: Array}>}
 */
export async function cleanupOldImages(
  hoursOld: number = 24,
  maxBatch: number = 100
): Promise<{
  success: boolean;
  message: string;
  total: number;
  deleted: number;
  skipped: number;
  detail: Array<{
    url: string;
    status: string;
    createdAt?: string;
    error?: string;
  }>;
}> {
  try {
    console.log(`開始清理 ${hoursOld} 小時前的圖片檔案，最多處理 ${maxBatch} 個...`);
    
    // 取得當前時間，減去指定小時數
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - hoursOld);
    
    // 列出所有 blob
    const { blobs } = await list();
    console.log(`找到 ${blobs.length} 個檔案`);
    
    // 刪除前的數量
    const initialCount = blobs.length;
    
    // 刪除操作計數和結果
    let deletedCount = 0;
    let skippedCount = 0;
    let processedCount = 0;
    const deletionResults: Array<{
      url: string;
      status: string;
      createdAt?: string;
      error?: string;
    }> = [];
    
    // 過濾出需要刪除的檔案
    const filesToDelete = (blobs as unknown as BlobWithContentType[])
      .filter(blob => {
        // 檢查是否是圖片（根據 pathname 或 contentType）
        const isImage = blob.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i) || 
                        (blob.contentType && blob.contentType.startsWith('image/'));
        
        // 檢查創建時間是否早於截止日期
        const createdAt = new Date(blob.uploadedAt);
        const isOld = createdAt < cutoffDate;
        
        return isImage && isOld;
      })
      .slice(0, maxBatch); // 限制批次大小
    
    console.log(`找到 ${filesToDelete.length} 個需要刪除的舊圖片檔案`);
    
    // 批次刪除檔案
    for (const blob of filesToDelete) {
      processedCount++;
      
      // 檢查是否超過批次限制
      if (processedCount > maxBatch) {
        skippedCount = filesToDelete.length - processedCount + 1;
        break;
      }
      
      try {
        await del(blob.url);
        deletedCount++;
        deletionResults.push({
          url: blob.url,
          status: 'deleted',
          createdAt: blob.uploadedAt
        });
        
        // 每10個檔案記錄一次進度
        if (deletedCount % 10 === 0) {
          console.log(`已刪除 ${deletedCount} 個檔案...`);
        }
        
      } catch (error) {
        console.error(`刪除檔案失敗 ${blob.url}:`, error);
        deletionResults.push({
          url: blob.url,
          status: 'error',
          error: error instanceof Error ? error.message : '未知錯誤'
        });
      }
    }
    
    const message = skippedCount > 0 
      ? `已清理 ${deletedCount} 個圖片檔案，跳過 ${skippedCount} 個（批次限制）` 
      : `已清理 ${deletedCount} 個圖片檔案`;
    
    console.log(`清理完成: ${message}`);
    
    return {
      success: true,
      message,
      total: initialCount,
      deleted: deletedCount,
      skipped: skippedCount,
      detail: deletionResults.slice(0, 50) // 只返回前50個詳細記錄以避免回應過大
    };
  } catch (error) {
    console.error('清理檔案時發生錯誤:', error);
    throw new Error(`清理檔案時發生錯誤: ${error instanceof Error ? error.message : '未知錯誤'}`);
  }
}
