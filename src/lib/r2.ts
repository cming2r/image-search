// Cloudflare R2 Storage 工具函數
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// 確保環境變數存在
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_BUCKET_NAME = 'image-search';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-b6115e36a46b41fabf861504393ee5e8.r2.dev';

if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT) {
  throw new Error('Missing required R2 environment variables');
}

// 創建 R2 客戶端
const r2Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

/**
 * 上傳圖片到 R2 儲存
 * @param {File} file - 圖片文件
 * @param {string} fileName - 文件名稱 (可選，會自動生成唯一名稱)
 * @returns {Promise<{url: string, success: boolean, key: string}>} - 上傳後的URL和文件key
 */
export async function uploadImageToR2(
  file: File,
  fileName?: string,
): Promise<{ url: string; success: boolean; key: string }> {
  try {
    // 生成唯一檔名
    const uniqueId = uuidv4();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const key = fileName || `images/${uniqueId}.${fileExtension}`;

    // 轉換 File 為 Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 上傳到 R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ContentLength: file.size,
    });

    await r2Client.send(command);

    // 構建公開 URL
    const publicUrl = `${R2_PUBLIC_URL}/${key}`;

    return {
      url: publicUrl,
      success: true,
      key: key,
    };
  } catch (error) {
    console.error('R2 上傳錯誤:', error);
    throw new Error('圖片上傳失敗');
  }
}

/**
 * 從 R2 刪除文件
 * @param {string} key - 文件的 key
 * @returns {Promise<boolean>} - 刪除是否成功
 */
export async function deleteImageFromR2(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error('R2 刪除錯誤:', error);
    return false;
  }
}

/**
 * 列出 R2 中的文件
 * @param {string} prefix - 文件前綴 (可選)
 * @param {number} maxKeys - 最大返回數量 (可選，默認1000)
 * @returns {Promise<Array<{key: string, lastModified: Date, size: number}>>}
 */
export async function listImagesFromR2(
  prefix?: string,
  maxKeys: number = 1000
): Promise<Array<{ key: string; lastModified: Date; size: number }>> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      Prefix: prefix,
      MaxKeys: maxKeys,
    });

    const response = await r2Client.send(command);
    
    return (response.Contents || []).map(item => ({
      key: item.Key!,
      lastModified: item.LastModified!,
      size: item.Size!,
    }));
  } catch (error) {
    console.error('R2 列表錯誤:', error);
    return [];
  }
}

/**
 * 清理舊的圖片檔案
 * @param {number} hoursOld - 多少小時前的檔案視為過期 (預設24小時)
 * @param {number} maxBatch - 每批最多處理的檔案數量 (預設100)
 * @returns {Promise<{success: boolean, message: string, total: number, deleted: number, skipped: number}>}
 */
export async function cleanupOldImagesFromR2(
  hoursOld: number = 24,
  maxBatch: number = 100
): Promise<{
  success: boolean;
  message: string;
  total: number;
  deleted: number;
  skipped: number;
}> {
  try {
    console.log(`開始清理 ${hoursOld} 小時前的圖片檔案，最多處理 ${maxBatch} 個...`);

    // 取得當前時間，減去指定小時數
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - hoursOld);

    // 列出所有圖片文件
    const allImages = await listImagesFromR2('images/');
    console.log(`總共找到 ${allImages.length} 個圖片檔案`);

    // 過濾出需要刪除的檔案
    const filesToDelete = allImages
      .filter(image => image.lastModified < cutoffDate)
      .sort((a, b) => a.lastModified.getTime() - b.lastModified.getTime())
      .slice(0, maxBatch);

    console.log(`找到 ${filesToDelete.length} 個需要刪除的舊圖片檔案`);

    let deletedCount = 0;
    const skippedCount = Math.max(0, allImages.filter(image => image.lastModified < cutoffDate).length - maxBatch);

    // 批次刪除檔案
    for (const image of filesToDelete) {
      try {
        const success = await deleteImageFromR2(image.key);
        if (success) {
          deletedCount++;
          
          // 每10個檔案記錄一次進度
          if (deletedCount % 10 === 0) {
            console.log(`已刪除 ${deletedCount} 個檔案...`);
          }
        }
      } catch (error) {
        console.error(`刪除檔案失敗 ${image.key}:`, error);
      }
    }

    const message = skippedCount > 0 
      ? `已清理 ${deletedCount} 個圖片檔案，跳過 ${skippedCount} 個（批次限制）` 
      : `已清理 ${deletedCount} 個圖片檔案`;

    console.log(`清理完成: ${message}`);

    return {
      success: true,
      message,
      total: allImages.length,
      deleted: deletedCount,
      skipped: skippedCount,
    };
  } catch (error) {
    console.error('清理檔案時發生錯誤:', error);
    throw new Error(`清理檔案時發生錯誤: ${error instanceof Error ? error.message : '未知錯誤'}`);
  }
}

/**
 * 從 URL 提取 R2 文件 key
 * @param {string} url - R2 文件的完整 URL
 * @returns {string | null} - 提取的 key，如果無法提取則返回 null
 */
export function extractKeyFromR2Url(url: string): string | null {
  try {
    // 處理不同的 R2 URL 格式
    if (R2_PUBLIC_URL && url.startsWith(R2_PUBLIC_URL)) {
      return url.replace(`${R2_PUBLIC_URL}/`, '');
    }
    
    // 處理 R2 公開 URL 格式 (pub-xxx.r2.dev)
    const r2DevPattern = /https:\/\/pub-[a-z0-9]+\.r2\.dev\/(.+)/;
    const match = url.match(r2DevPattern);
    if (match) {
      return match[1];
    }
    
    // 處理其他可能的格式
    const urlObj = new URL(url);
    return urlObj.pathname.startsWith('/') ? urlObj.pathname.substring(1) : urlObj.pathname;
  } catch (error) {
    console.error('提取 R2 key 失敗:', error);
    return null;
  }
}