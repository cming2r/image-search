'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Upload, ImageIcon, Copy, Check, ExternalLink, QrCode, Download } from 'lucide-react';
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
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [includeUrl, setIncludeUrl] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';
  const t = imageUrlTranslations.ui;

  const handleUpload = useCallback(async (uploadFile?: File) => {
    const fileToUpload = uploadFile || file;
    if (!fileToUpload) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const response = await fetch('/api/image-url', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        setShortUrl(result.data.shortUrl);
        // Keep local image URL for preview in success section
      } else {
        setError(result.error || t.error[lang]);
      }
    } catch {
      setError(t.error[lang]);
    } finally {
      setUploading(false);
    }
  }, [file, t.error, lang]);

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setShortUrl('');
    setError('');
    
    // Create local URL for preview
    if (localImageUrl) {
      URL.revokeObjectURL(localImageUrl);
    }
    const url = URL.createObjectURL(selectedFile);
    setLocalImageUrl(url);
    
    // Auto upload
    await handleUpload(selectedFile);
  }, [localImageUrl, handleUpload]);

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

  // 處理 Ctrl+V 貼上圖片
  const handlePaste = useCallback(async (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleFileSelect(file);
          break;
        }
      }
    }
  }, [handleFileSelect]);

  // 監聽貼上事件
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

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

  // QR Code generation function
  const generateQRCode = async (url: string, shouldIncludeUrl?: boolean) => {
    try {
      setQrLoading(true);
      
      // Generate the base QR code
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      if (shouldIncludeUrl) {
        // Create canvas to combine QR code with URL text
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set high DPI scaling
        const scale = window.devicePixelRatio || 1;
        canvas.width = 200 * scale;
        canvas.height = 240 * scale; // Extra height for text
        canvas.style.width = '200px';
        canvas.style.height = '240px';
        ctx.scale(scale, scale);

        // Draw white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 200, 240);

        // Load and draw QR code
        const qrImage = new window.Image();
        qrImage.onload = () => {
          ctx.drawImage(qrImage, 0, 0, 200, 200);

          // Add URL text below QR code
          ctx.fillStyle = '#000000';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Truncate long URLs
          const displayUrl = url.length > 30 ? url.substring(0, 27) + '...' : url;
          ctx.fillText(displayUrl, 100, 220);

          setQrCodeUrl(canvas.toDataURL());
          setQrLoading(false);
        };
        qrImage.src = qrDataUrl;
      } else {
        setQrCodeUrl(qrDataUrl);
        setQrLoading(false);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      setQrLoading(false);
    }
  };

  // QR Code toggle handler
  const handleQrCodeToggle = () => {
    if (!showQrCode && !qrCodeUrl) {
      generateQRCode(shortUrl, includeUrl);
    }
    setShowQrCode(!showQrCode);
  };

  // Include URL change handler
  const handleIncludeUrlChange = (checked: boolean) => {
    setIncludeUrl(checked);
    if (shortUrl) {
      generateQRCode(shortUrl, checked);
    }
  };

  // Download QR Code function
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Upload Area - Hidden when upload is successful */}
      {!shortUrl && (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              {t.uploadTitle[lang]}
            </h2>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.heic,.heif"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="mb-4">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            
            {file ? (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <p className="text-gray-600 mb-4">
                {t.dragDrop[lang]} <span className="text-blue-600 font-medium">{t.clickUpload[lang]}</span>
              </p>
            )}
          </div>

          {/* Supported Formats */}
          <p className="text-sm text-gray-500 mt-3 text-center">{t.supportedFormats[lang]}</p>
        </>
      )}

      {/* Uploading Status */}
      {uploading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 text-sm flex items-center">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 mr-2 inline-block"></span>
            {t.uploading[lang]}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Image Preview Section - shown first when upload successful */}
      {shortUrl && file && localImageUrl && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-3">{t.preview[lang]}</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value="test"
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
        </div>
      )}

      {/* Result Section */}
      {shortUrl && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-3">{t.shortUrl[lang]}</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Visit Button */}
              <button
                onClick={() => window.open(shortUrl, '_blank')}
                onAuxClick={(e) => {
                  if (e.button === 1) { // Middle click support
                    window.open(shortUrl, '_blank');
                  }
                }}
                className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                title={lang === 'zh' ? '前往' : lang === 'en' ? 'Visit' : lang === 'jp' ? '移動' : 'Visitar'}
              >
                <ExternalLink size={24} />
              </button>
              
              {/* Copy Button */}
              <button
                onClick={() => handleCopy(shortUrl)}
                className={`px-2 py-2 rounded-md transition-colors flex items-center justify-center ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                title={copied ? (lang === 'zh' ? '已複製！' : lang === 'en' ? 'Copied!' : lang === 'jp' ? 'コピー済み！' : '¡Copiado!') : (lang === 'zh' ? '複製' : lang === 'en' ? 'Copy' : lang === 'jp' ? 'コピー' : 'Copiar')}
              >
                {copied ? (
                  <Check size={24} />
                ) : (
                  <Copy size={24} />
                )}
              </button>
              
              {/* QR Code Button */}
              <button
                onClick={handleQrCodeToggle}
                className={`px-2 py-2 rounded-md transition-colors flex items-center justify-center ${
                  showQrCode 
                    ? 'bg-black text-white' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                title={lang === 'zh' ? 'QR Code' : lang === 'en' ? 'QR Code' : lang === 'jp' ? 'QRコード' : 'Código QR'}
              >
                <QrCode size={24} />
              </button>
            </div>
          </div>

          {/* QR Code Display */}
          {showQrCode && qrCodeUrl && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-3 text-center">
                {lang === 'zh' ? 'QR Code' : lang === 'en' ? 'QR Code' : lang === 'jp' ? 'QRコード' : 'Código QR'}
              </h4>
              
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-sm border relative">
                  {/* Loading overlay */}
                  {qrLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                        <span className="ml-2 text-sm text-gray-700">
                          {lang === 'zh' ? '生成中...' : lang === 'en' ? 'Generating...' : lang === 'jp' ? '生成中...' : 'Generando...'}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* QR Code image */}
                  <Image
                    src={qrCodeUrl}
                    alt={includeUrl ? "QR Code with URL" : "QR Code"}
                    width={200}
                    height={includeUrl ? 240 : 200}
                    className={`max-w-full h-auto ${qrLoading ? 'opacity-50' : ''}`}
                  />
                </div>
              </div>
              
              {/* Checkbox for including URL */}
              <div className="flex justify-center mt-4 mb-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUrl}
                    onChange={(e) => handleIncludeUrlChange(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {lang === 'zh' ? '在 QR Code 下方顯示網址' : 
                     lang === 'en' ? 'Include URL below QR Code' : 
                     lang === 'jp' ? 'QRコードの下にURLを表示' : 
                     'Incluir URL debajo del código QR'}
                  </span>
                </label>
              </div>
              
              {/* Download button */}
              <div className="flex justify-center">
                <button
                  onClick={downloadQRCode}
                  className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                  title={lang === 'zh' ? '下載 QR Code' : 
                         lang === 'en' ? 'Download QR Code' : 
                         lang === 'jp' ? 'QRコードをダウンロード' : 
                         'Descargar código QR'}
                >
                  <Download size={24} />
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}