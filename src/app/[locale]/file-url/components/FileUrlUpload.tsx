'use client';

import { useState, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import { Upload, FileIcon, Copy, Check, ExternalLink, QrCode, Download, Lock } from 'lucide-react';
import Toast from '@/components/Toast';

const uiTranslations = {
  uploadTitle: {
    zh: '上傳檔案',
    en: 'Upload File',
    jp: 'ファイルをアップロード',
    es: 'Subir Archivo'
  },
  processing: {
    zh: '上傳中...',
    en: 'Uploading...',
    jp: 'アップロード中...',
    es: 'Subiendo...'
  },
  successUpload: {
    zh: '檔案上傳成功',
    en: 'File uploaded successfully',
    jp: 'ファイルが正常にアップロードされました',
    es: 'Archivo subido exitosamente'
  },
  errorUpload: {
    zh: '檔案上傳失敗，請稍後再試',
    en: 'Failed to upload file, please try again later',
    jp: 'ファイルのアップロードに失敗しました。後でもう一度お試しください',
    es: 'Error al subir el archivo, por favor inténtalo de nuevo más tarde'
  },
  uploading: {
    zh: '上傳中...',
    en: 'Uploading...',
    jp: 'アップロード中...',
    es: 'Subiendo...'
  },
  supportedFormats: {
    zh: '支援多種檔案格式 (最大 15MB)',
    en: 'Supports multiple file formats (Max 15MB)',
    jp: '複数のファイル形式をサポート（最大15MB）',
    es: 'Admite múltiples formatos de archivo (Máx. 15MB)'
  },
  dragDrop: {
    zh: '拖曳檔案到這裡或',
    en: 'Drag and drop file here or',
    jp: 'ここにファイルをドラッグ＆ドロップ、または',
    es: 'Arrastra y suelta el archivo aquí, o'
  },
  clickUpload: {
    zh: '點擊上傳',
    en: 'click to upload',
    jp: 'クリックしてアップロード',
    es: 'haz clic para subir'
  },
  error: {
    zh: '上傳失敗，請重試',
    en: 'Upload failed, please try again',
    jp: 'アップロードに失敗しました。再試行してください',
    es: 'Error al subir, por favor inténtalo de nuevo'
  },
  shortUrl: {
    zh: '短網址',
    en: 'Short URL',
    jp: '短縮URL',
    es: 'URL Corta'
  },
  fileInfo: {
    zh: '檔案資訊',
    en: 'File Info',
    jp: 'ファイル情報',
    es: 'Información del Archivo'
  },
  backButton: {
    zh: '返回',
    en: 'Back',
    jp: '戻る',
    es: 'Volver'
  },
  hasPassword: {
    zh: '已設定密碼保護',
    en: 'Password protected',
    jp: 'パスワード保護済み',
    es: 'Protegido con contraseña'
  },
  filename: {
    zh: '檔案名稱',
    en: 'Filename',
    jp: 'ファイル名',
    es: 'Nombre del archivo'
  },
  fileSize: {
    zh: '檔案大小',
    en: 'File Size',
    jp: 'ファイルサイズ',
    es: 'Tamaño del archivo'
  },
};

interface FileUrlUploadProps {
  locale: string;
}

interface UploadResult {
  shortCode: string;
  shortUrl: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  hasPassword: boolean;
}

export default function FileUrlUpload({ locale }: FileUrlUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [includeUrl, setIncludeUrl] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [toast, setToast] = useState<{message: string; isVisible: boolean; type: 'success' | 'error' | 'info'}>({
    message: '', 
    isVisible: false, 
    type: 'info'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';
  const t = uiTranslations;

  const handleUpload = useCallback(async (uploadFile?: File) => {
    const fileToUpload = uploadFile || file;
    if (!fileToUpload) return;

    setError('');
    
    // 顯示處理中的 toast
    setToast({message: t.processing[lang], isVisible: true, type: 'info'});

    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      // Add user device info
      const userInfo = {
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        browser: getBrowserName(),
        os: getOSName(),
        country_code: 'TW' // Could be enhanced with geolocation API
      };
      formData.append('userInfo', JSON.stringify(userInfo));

      const response = await fetch('/api/file-url', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.success && responseData.data) {
        setResult(responseData.data);
        // 顯示成功 toast
        setToast({message: t.successUpload[lang], isVisible: true, type: 'success'});
      } else {
        const errorMessage = responseData.error || t.error[lang];
        setError(errorMessage);
        setToast({message: errorMessage, isVisible: true, type: 'error'});
      }
    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = t.error[lang];
      setError(errorMessage);
      setToast({message: errorMessage, isVisible: true, type: 'error'});
    }
  }, [file, t.error, t.processing, t.successUpload, lang]);

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setError('');
    setQrCodeUrl('');
    setShowQrCode(false);
    
    // Auto upload
    await handleUpload(selectedFile);
  }, [handleUpload]);

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
          ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Remove https:// and format URL
          const displayUrl = url.replace('https://', '');
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
    if (!showQrCode && !qrCodeUrl && result) {
      generateQRCode(result.shortUrl, includeUrl);
    }
    setShowQrCode(!showQrCode);
  };

  // Include URL change handler
  const handleIncludeUrlChange = (checked: boolean) => {
    setIncludeUrl(checked);
    if (result) {
      generateQRCode(result.shortUrl, checked);
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

  // Helper functions for device detection
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  const getOSName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      {!result ? (
        // 未上傳成功時顯示上傳區域
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              {t.uploadTitle[lang]}
            </h2>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer min-h-[200px] flex flex-col justify-center ${
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
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="mb-4">
              <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            
            {file ? (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
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

          {/* Error Messages - only show if not using toast */}
          {error && !toast.isVisible && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>
      ) : (
        // 上傳成功後顯示結果區域
        <div className="space-y-6">
          {/* File Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <FileIcon className="h-5 w-5 mr-2" />
              {t.fileInfo[lang]}
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.filename[lang]}:</span>
                <span className="font-medium">{result.filename}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.fileSize[lang]}:</span>
                <span className="font-medium">{formatFileSize(result.fileSize)}</span>
              </div>
              {result.hasPassword && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.hasPassword[lang]}:</span>
                  <span className="font-medium text-green-600 flex items-center">
                    <Lock className="h-4 w-4 mr-1" />
                    {t.hasPassword[lang]}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Short URL Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{t.shortUrl[lang]}</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={result.shortUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Visit Button */}
                <button
                  onClick={() => window.open(result.shortUrl, '_blank')}
                  onAuxClick={(e) => {
                    if (e.button === 1) { // Middle click support
                      window.open(result.shortUrl, '_blank');
                    }
                  }}
                  className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  title={lang === 'zh' ? '前往' : lang === 'en' ? 'Visit' : lang === 'jp' ? '移動' : 'Visitar'}
                >
                  <ExternalLink size={24} />
                </button>
                
                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(result.shortUrl)}
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCodeUrl}
                      alt={includeUrl ? "QR Code with URL" : "QR Code"}
                      width={200}
                      height={includeUrl ? 240 : 200}
                      className={`max-w-full h-auto ${qrLoading ? 'opacity-50' : ''}`}
                    />
                  </div>
                </div>
                
                {/* URL display below QR Code when not included in image */}
                {!includeUrl && (
                  <div className="text-center mt-3">
                    <p className="text-sm text-gray-600">
                      {result.shortUrl.replace('https://', '')}
                    </p>
                  </div>
                )}
                
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
                      {lang === 'zh' ? '包含 URL' : 
                       lang === 'en' ? 'Include URL' : 
                       lang === 'jp' ? 'URLを含める' : 
                       'Incluir URL'}
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
            
            {/* 返回按鈕 */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setResult(null);
                  setFile(null);
                  setError('');
                  setQrCodeUrl('');
                  setShowQrCode(false);
                  setIncludeUrl(false);
                  setQrLoading(false);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                {t.backButton[lang]}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast 通知 */}
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
}