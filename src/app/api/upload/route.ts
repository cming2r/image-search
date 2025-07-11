import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from '@/lib/blob';

export async function POST(req: Request) {
  try {
    // FormData 解析
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json(
        { error: '沒有提供文件' },
        { status: 400 }
      );
    }
    
    // 檢查是否為圖片
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '只支持圖片文件' },
        { status: 400 }
      );
    }
    
    // 檢查文件大小
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: '文件大小不能超過5MB' },
        { status: 400 }
      );
    }
    
    // 生成唯一檔名
    const uniqueId = uuidv4();
    const fileType = file.type.split('/').pop(); // 從MIME類型獲取擴展名 (如 image/jpeg -> jpeg)
    const uniqueFileName = `image-${uniqueId}.${fileType}`;
    
    // 使用 blob.ts 中的 uploadImage 函數
    const result = await uploadImage(file, uniqueFileName);
    
    // 注意：我們不再在上傳時保存URL，而是在用戶點擊搜尋按鈕時記錄
    
    return NextResponse.json({
      url: result.url,
      success: result.success
    });
  } catch (error) {
    console.error('上傳錯誤:', error);
    return NextResponse.json(
      { error: '文件上傳失敗', details: error instanceof Error ? error.message : '未知錯誤' },
      { status: 500 }
    );
  }
}