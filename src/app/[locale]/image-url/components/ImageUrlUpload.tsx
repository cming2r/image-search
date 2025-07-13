'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { imageUrlTranslations } from './meta-translations';

interface ImageUrlUploadProps {
  locale: string;
}

export default function ImageUrlUpload({ locale }: ImageUrlUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [localImageUrl, setLocalImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';
  const t = imageUrlTranslations.ui;

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setShortUrl('');
    setError('');
    
    // Create local URL for preview
    if (localImageUrl) {
      URL.revokeObjectURL(localImageUrl);
    }
    const url = URL.createObjectURL(selectedFile);
    setLocalImageUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/image-url', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        setShortUrl(result.data.shortUrl);
        // Clean up local image URL after successful upload
        if (localImageUrl) {
          URL.revokeObjectURL(localImageUrl);
          setLocalImageUrl('');
        }
      } else {
        setError(result.error || t.error[lang]);
      }
    } catch {
      setError(t.error[lang]);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = async (text: string) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.uploadTitle[lang]}</h2>
        <p className="text-gray-600">{t.uploadDescription[lang]}</p>
        <p className="text-sm text-gray-500 mt-2">{t.supportedFormats[lang]}</p>
      </div>

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {file ? (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <p className="text-gray-600 mb-4">{t.dragDrop[lang]}</p>
        )}
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t.selectFile[lang]}
        </button>
      </div>

      {/* Local Image Preview (before upload) */}
      {file && localImageUrl && !shortUrl && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">{t.uploadTitle[lang]}</h3>
          <div className="flex justify-center">
            <div className="relative max-w-full max-h-64">
              <Image
                src={localImageUrl}
                alt="Selected image preview"
                width={400}
                height={300}
                className="max-w-full h-auto max-h-64 rounded-md shadow-sm"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {file && (
        <div className="mt-6 text-center">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? t.uploading[lang] : t.upload[lang]}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-lg font-medium text-green-800 mb-4">{t.success[lang]}</h3>
          
          {/* Short URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.shortUrl[lang]}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleCopy(shortUrl)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {copied ? t.copied[lang] : t.copy[lang]}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}