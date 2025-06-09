'use client';

import { FC, useState, useRef, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import SearchButtons from './SearchButtons';
import { saveImageUrl } from '@/lib/supabase/imageSearch';
import Toast from '@/components/Toast';

const formTranslations = {
  enterUrlTab: {
    zh: "輸入圖片網址",
    en: "Enter Image URL",
    jp: "画像URLを入力"
  },
  uploadImageTab: {
    zh: "上傳圖片",
    en: "Upload Image",
    jp: "画像をアップロード"
  },
  imageUrl: {
    zh: "圖片網址",
    en: "Image URL",
    jp: "画像URL"
  },
  imageUrlPlaceholder: {
    zh: "https://example.com/image.jpg",
    en: "https://example.com/image.jpg",
    jp: "https://example.com/image.jpg"
  },
  imageUrlHint: {
    zh: "URL必須以 .jpg、.png、.webp 等常見圖片格式結尾",
    en: "URL must end with common image formats like .jpg, .png, .webp",
    jp: "URLは.jpg、.png、.webpなどの一般的な画像形式で終わる必要があります"
  },
  searchButton: {
    zh: "搜尋此圖片",
    en: "Search this image",
    jp: "この画像を検索"
  },
  processing: {
    zh: "處理中...",
    en: "Processing...",
    jp: "処理中..."
  },
  resetButton: {
    zh: "重置",
    en: "Reset",
    jp: "リセット"
  },
  imagePreview: {
    zh: "圖片預覽",
    en: "Image Preview",
    jp: "画像プレビュー"
  },
  selectImage: {
    zh: "選擇圖片",
    en: "Select Image",
    jp: "画像を選択"
  },
  dragDropHint: {
    zh: "拖曳圖片到這裡 、 ctrl+V 貼上 或",
    en: "Drag and drop image here, paste with ctrl+V, or",
    jp: "ここに画像をドラッグ＆ドロップ、ctrl+Vで貼り付け、または"
  },
  clickUpload: {
    zh: "點擊上傳",
    en: "click to upload",
    jp: "クリックしてアップロード"
  },
  supportedFormats: {
    zh: "支援 JPG, PNG, WEBP 等格式，最大5MB",
    en: "Supports JPG, PNG, WEBP and other formats, max 5MB",
    jp: "JPG、PNG、WEBPなどの形式をサポート、最大5MB"
  },
  validUrlError: {
    zh: "請輸入有效的圖片URL",
    en: "Please enter a valid image URL",
    jp: "有効な画像URLを入力してください"
  },
  emptyUrlError: {
    zh: "請輸入圖片URL",
    en: "Please enter an image URL",
    jp: "画像URLを入力してください"
  },
  uploadErrorImage: {
    zh: "請上傳圖片文件",
    en: "Please upload an image file",
    jp: "画像ファイルをアップロードしてください"
  },
  uploadErrorSize: {
    zh: "圖片大小不能超過5MB",
    en: "Image size cannot exceed 5MB",
    jp: "画像サイズは5MBを超えることはできません"
  },
  imageUrlInfo: {
    zh: "圖片網址:",
    en: "Image URL:",
    jp: "画像URL："
  },
  successMessage: {
    zh: "圖片網址設置成功",
    en: "Image URL set successfully",
    jp: "画像URLが正常に設定されました"
  },
  errorMessage: {
    zh: "處理圖片URL時發生錯誤",
    en: "Error processing image URL",
    jp: "画像URLの処理中にエラーが発生しました"
  },
  successUpload: {
    zh: "圖片上傳成功",
    en: "Image uploaded successfully",
    jp: "画像が正常にアップロードされました"
  },
  errorUpload: {
    zh: "圖片上傳失敗，請稍後再試",
    en: "Failed to upload image, please try again later",
    jp: "画像のアップロードに失敗しました。後でもう一度お試しください"
  }
};

const ImageForm: FC = () => {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const lang = locale as 'zh' | 'en' | 'jp';

  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [toast, setToast] = useState<{message: string; isVisible: boolean; type: 'success' | 'error' | 'info'}>({message: '', isVisible: false, type: 'info'});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadContainerRef = useRef<HTMLDivElement>(null);

  // 檢查輸入的URL是否有效的圖片URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    
    // 檢查URL格式
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;
    if (!urlPattern.test(url)) return false;
    
    // 檢查URL是否以常見圖片格式結尾
    const imageExtensionPattern = /\.(jpe?g|png|gif|bmp|webp|svg|heic|heif|tiff?|avif)(\?.*)?$/i;
    return imageExtensionPattern.test(url);
  };

  const handleUrlInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const url = e.target.value;
    setImageUrl(url);
    
    // 清除先前的錯誤
    setError('');
    
    // 如果URL不是空的但格式無效，顯示錯誤提示
    if (url && !isValidImageUrl(url)) {
      setError(formTranslations.validUrlError[lang]);
    }
  };

  const handleSubmitUrl = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // 基本的URL驗證
    if (!imageUrl) {
      setError(formTranslations.emptyUrlError[lang]);
      return;
    }
    
    // 檢查是否為有效的圖片URL（包括格式和擴展名）
    if (!isValidImageUrl(imageUrl)) {
      setError(formTranslations.validUrlError[lang]);
      return;
    }
    
    try {
      // 顯示處理中的提示
      setToast({message: formTranslations.processing[lang], isVisible: true, type: 'info'});
      
      // 此處我們將使用者輸入的URL直接設為搜尋用URL
      setUploadedImageUrl(imageUrl);
      setError('');
      
      // 在URL輸入成功時記錄到Supabase
      saveImageUrl(imageUrl).catch(err => {
        console.error('保存圖片URL失敗:', err);
        // 但不影響使用者繼續使用
      });
      
      // 成功提示
      setToast({message: formTranslations.successUpload[lang], isVisible: true, type: 'success'});
    } catch (error) {
      console.error('處理URL錯誤:', error);
      setToast({message: formTranslations.errorMessage[lang], isVisible: true, type: 'error'});
    }
  };

  const processFile = useCallback(async (file: File): Promise<void> => {
    // 檢查文件是否為圖片
    if (!file.type.startsWith('image/')) {
      setError(formTranslations.uploadErrorImage[lang]);
      return;
    }
    
    // 檢查文件大小 (不超過5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError(formTranslations.uploadErrorSize[lang]);
      return;
    }
    
    setError('');
    
    try {
      // 顯示處理中的提示
      setToast({message: formTranslations.processing[lang], isVisible: true, type: 'info'});
      
      // 創建FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // 發送到上傳API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '上傳失敗');
      }
      
      const data = await response.json();
      
      // 直接設置上傳後的圖片URL，不影響輸入框
      setUploadedImageUrl(data.url);
      
      // 在上傳成功時記錄圖片URL到Supabase
      saveImageUrl(data.url).catch(err => {
        console.error('保存圖片URL失敗:', err);
        // 但不影響使用者繼續使用
      });
      
      // 顯示成功訊息
      setToast({message: formTranslations.successUpload[lang], isVisible: true, type: 'success'});
    } catch (err) {
      console.error('上傳錯誤:', err);
      const errorMessage = err instanceof Error ? err.message : formTranslations.errorUpload[lang];
      setError(errorMessage);
      setToast({message: errorMessage, isVisible: true, type: 'error'});
    }
  }, [lang]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    await processFile(file);
  };

  const handleReset = (): void => {
    setImageUrl('');
    setUploadedImageUrl('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 貼上圖片處理 - 簡化版
  const handlePaste = useCallback(async (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          await processFile(file);
          break;
        }
      }
    }
  }, [processFile]);

  // 在組件掛載時添加事件監聽器，卸載時移除
  useEffect(() => {
    // 監聽貼上事件
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {!uploadedImageUrl ? (
        // 未上傳圖片時顯示輸入區域
        <div className="space-y-8">
          {/* 圖片上傳區塊 */}
          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {formTranslations.uploadImageTab[lang]}
            </h2>
            
            <div className="md:flex md:space-x-4">
              <div className="md:w-full">
                <div className="mb-4">
                  <div 
                    ref={uploadContainerRef}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        const file = e.dataTransfer.files[0];
                        
                        // 觸發與 handleUpload 相同的邏輯
                        if (!file.type.startsWith('image/')) {
                          setError(formTranslations.uploadErrorImage[lang]);
                          return;
                        }
                        
                        if (file.size > 5 * 1024 * 1024) {
                          setError(formTranslations.uploadErrorSize[lang]);
                          return;
                        }
                        
                        // 設置 input 的 files
                        if (fileInputRef.current) {
                          const dataTransfer = new DataTransfer();
                          dataTransfer.items.add(file);
                          fileInputRef.current.files = dataTransfer.files;
                          
                          // 手動處理上傳
                          handleUpload({ target: { files: dataTransfer.files }} as ChangeEvent<HTMLInputElement>);
                        }
                      }
                    }}
                  >
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-600">
                        {formTranslations.dragDropHint[lang]} <span className="text-blue-600 font-medium">{formTranslations.clickUpload[lang]}</span>
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <p className="text-gray-500 text-base mt-1">{formTranslations.supportedFormats[lang]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* URL輸入區塊 */}
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              {formTranslations.enterUrlTab[lang]}
            </h2>
            
            <form onSubmit={handleSubmitUrl} className="mb-6">
              <div className="md:flex md:space-x-4">
                <div className="md:w-full">
                  <div className="mb-4">
                    <input
                      type="text"
                      id="imageUrl"
                      value={imageUrl}
                      onChange={handleUrlInput}
                      placeholder={formTranslations.imageUrlPlaceholder[lang]}
                      className={`block w-full text-gray-700 border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <p className="text-gray-500 text-base mt-1">
                      {formTranslations.imageUrlHint[lang]}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      {formTranslations.searchButton[lang]}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // 已上傳圖片時只顯示預覽區域
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            {formTranslations.imagePreview[lang]}
          </h2>
          <div className="w-full max-w-md mb-6">
            <div className="border rounded p-4 bg-gray-50 flex justify-center relative">
              {/* 右上角的叉叉按鈕 - 更明顯的版本但保持原位置 */}
              <button
                type="button"
                onClick={handleReset}
                className="absolute top-2 right-2 z-10 bg-red-500 rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative w-full h-48">
                <Image
                  src={uploadedImageUrl}
                  alt="搜尋圖片"
                  fill
                  style={{ objectFit: 'contain' }}
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 錯誤訊息 */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mt-4 mb-4">
          {error}
        </div>
      )}

      {/* 搜尋按鈕組 - 只在有上傳圖片時顯示 */}
      {uploadedImageUrl && (
        <div className="mt-6">
          {/* 搜尋按鈕組 - 傳遞重置函數 */}
          <SearchButtons imageUrl={uploadedImageUrl} onReset={handleReset} />
        </div>
      )}

      {/* 未上傳狀態的搜尋按鈕組 - 依然保留但不顯示按鈕 */}
      {!uploadedImageUrl && <SearchButtons imageUrl="" />}
      
      {/* Toast通知 */}
      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        type={toast.type}
        onClose={() => setToast(prev => ({...prev, isVisible: false}))}
        position="top-center"
        duration={3000}
      />
    </div>
  );
};

export default ImageForm;