'use client';

import { FC, useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import SearchButtons from './SearchButtons';

const ImageForm: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url'); // 'url' 或 'upload'
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const url = e.target.value;
    setImageUrl(url);
    // 清除先前的錯誤
    setError('');
    
    // 如果URL看起來有效，顯示預覽（但不設定為最終的uploadedImageUrl）
    if (url && url.match(/^https?:\/\/[^\s$.?#].[^\s]*$/i)) {
      // 僅設置URL，但不標記為"已上傳"，需點擊搜索按鈕
    }
  };

  const handleSubmitUrl = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // 基本的URL驗證
    if (!imageUrl) {
      setError('請輸入圖片URL');
      return;
    }
    
    // 檢查是否為圖片URL (簡單檢查)
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;
    if (!urlPattern.test(imageUrl)) {
      setError('請輸入有效的URL');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 此處我們將用戶輸入的URL直接設為搜尋用URL
      setUploadedImageUrl(imageUrl);
      setError('');
      
      // 注意：我們不再在此處保存URL，而是在用戶點擊搜尋按鈕時才記錄
    } catch (error) {
      console.error('處理URL錯誤:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 檢查文件是否為圖片
    if (!file.type.startsWith('image/')) {
      setError('請上傳圖片文件');
      return;
    }
    
    // 檢查文件大小 (不超過5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('圖片大小不能超過5MB');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // 顯示本地預覽 (先讓使用者看到上傳的圖片)
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      
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
      
      // 釋放本地預覽URL
      URL.revokeObjectURL(objectUrl);
      
      // 設置上傳後的圖片URL
      setUploadedImageUrl(data.url);
    } catch (err) {
      console.error('上傳錯誤:', err);
      setError(err instanceof Error ? err.message : '圖片上傳失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (): void => {
    setImageUrl('');
    setUploadedImageUrl('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 選項卡切換 */}
      <div className="flex border-b mb-6 justify-center space-x-4">
        <button
          onClick={() => {
            setActiveTab('url');
            setImageUrl('');
            setUploadedImageUrl('');
            setError('');
          }}
          className={`py-3 px-6 font-medium rounded-t-lg flex items-center ${
            activeTab === 'url'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
              : 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
          輸入圖片網址
        </button>
        <button
          onClick={() => {
            setActiveTab('upload');
            setImageUrl('');
            setUploadedImageUrl('');
            setError('');
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
          className={`py-3 px-6 font-medium rounded-t-lg flex items-center ${
            activeTab === 'upload'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
              : 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          上傳圖片
        </button>
      </div>

      {/* URL輸入表單 */}
      {activeTab === 'url' && (
        <form onSubmit={handleSubmitUrl} className="mb-6">
          <div className="md:flex md:space-x-4">
            <div className="md:w-[60%]">
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-gray-700 mb-2">
                  圖片網址
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={handleUrlInput}
                  placeholder="https://fyimg.com/image.jpg"
                  className="block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      處理中...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      搜尋此圖片
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
                >
                  重置
                </button>
              </div>
            </div>
            
            {/* 右側圖片預覽區塊 */}
            {uploadedImageUrl && (
              <div className="md:w-[40%] mt-6 md:mt-0">
                <p className="text-gray-700 mb-2">圖片預覽</p>
                <div className="border rounded p-2 bg-gray-50 flex justify-center">
                  <div className="relative w-full h-32">
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
            )}
          </div>
        </form>
      )}

      {/* 圖片上傳表單 */}
      {activeTab === 'upload' && (
        <div className="mb-6">
          <div className="md:flex md:space-x-4">
            <div className="md:w-[60%]">
              <div className="mb-4">
                <label htmlFor="imageUpload" className="block text-gray-700 mb-2">
                  選擇圖片
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleUpload}
                  ref={fileInputRef}
                  className="block w-full text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-500 text-xs mt-1">支援 JPG, PNG, WEBP 等格式，最大5MB</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
                disabled={isLoading}
              >
                重置
              </button>
            </div>
            
            {/* 右側圖片預覽區塊 */}
            {(uploadedImageUrl || imageUrl) && (
              <div className="md:w-[40%] mt-6 md:mt-0">
                <p className="text-gray-700 mb-2">圖片預覽</p>
                <div className="border rounded p-2 bg-gray-50 flex justify-center">
                  <div className="relative w-full h-32">
                    <Image
                      src={uploadedImageUrl || imageUrl}
                      alt="搜尋圖片"
                      fill
                      style={{ objectFit: 'contain' }}
                      unoptimized={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 錯誤訊息 */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 圖片網址資訊 */}
      {uploadedImageUrl && (
        <div className="mt-6">
          <div className="bg-blue-50 p-3 rounded mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-700 text-sm break-all">圖片網址: {uploadedImageUrl}</span>
          </div>
          
          {/* 搜尋按鈕組 */}
          <SearchButtons imageUrl={uploadedImageUrl} />
        </div>
      )}

      {/* 未上傳狀態的搜尋按鈕組 */}
      {!uploadedImageUrl && <SearchButtons imageUrl="" />}
    </div>
  );
};

export default ImageForm;