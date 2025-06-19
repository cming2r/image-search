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
 * 清理舊的圖片檔案
 * @param {number} hoursOld - 多少小時前的檔案視為過期 (預設24小時)
 * @returns {Promise<{success: boolean, message: string, total: number, deleted: number, detail: Array}>}
 */
export async function cleanupOldImages(
  hoursOld: number = 24
): Promise<{
  success: boolean;
  message: string;
  total: number;
  deleted: number;
  detail: Array<{
    url: string;
    status: string;
    createdAt?: string;
    error?: string;
  }>;
}> {
  try {
    // 取得當前時間，減去指定小時數
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - hoursOld);
    
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
    
    // 刪除所有符合條件的 blob
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
    
    return {
      success: true,
      message: `已清理 ${deletedCount} 個圖片檔案`,
      total: initialCount,
      deleted: deletedCount,
      detail: deletionResults
    };
  } catch (error) {
    console.error('清理檔案時發生錯誤:', error);
    throw new Error(`清理檔案時發生錯誤: ${error instanceof Error ? error.message : '未知錯誤'}`);
  }
}
