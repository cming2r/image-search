// Vercel Blob 工具函數
import { put } from "@vercel/blob";

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
