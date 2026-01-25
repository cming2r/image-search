'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Upload, VideoIcon, Copy, Check, ExternalLink, QrCode, Download, Lock, Clock } from 'lucide-react';
import Toast from '@/components/Toast';

const uiTranslations = {
  uploadTitle: {
    tw: '上傳影片',
    cn: '上传视频',
    en: 'Upload Video',
    jp: '動画をアップロード',
    es: 'Subir Video'
  },
  processing: {
    tw: '上傳中...',
    cn: '上传中...',
    en: 'Uploading...',
    jp: 'アップロード中...',
    es: 'Subiendo...'
  },
  successUpload: {
    tw: '影片上傳成功',
    cn: '视频上传成功',
    en: 'Video uploaded successfully',
    jp: '動画が正常にアップロードされました',
    es: 'Video subido exitosamente'
  },
  errorUpload: {
    tw: '影片上傳失敗，請稍後再試',
    cn: '视频上传失败，请稍后再试',
    en: 'Failed to upload video, please try again later',
    jp: '動画のアップロードに失敗しました。後でもう一度お試しください',
    es: 'Error al subir el video, por favor inténtalo de nuevo más tarde'
  },
  supportedFormats: {
    tw: '支援影片格式 (最大 100MB)',
    cn: '支持视频格式 (最大 100MB)',
    en: 'Supported video formats (Max 100MB)',
    jp: '対応動画形式（最大100MB）',
    es: 'Formatos de video compatibles (Máx. 100MB)'
  },
  dragDrop: {
    tw: '拖曳影片到這裡或',
    cn: '拖拽视频到这里或',
    en: 'Drag and drop video here or',
    jp: 'ここに動画をドラッグ＆ドロップ、または',
    es: 'Arrastra y suelta el video aquí o'
  },
  clickUpload: {
    tw: '點擊上傳',
    cn: '点击上传',
    en: 'click to upload',
    jp: 'クリックしてアップロード',
    es: 'haz clic para subir'
  },
  uploadButton: {
    tw: '開始上傳',
    cn: '开始上传',
    en: 'Start Upload',
    jp: 'アップロード開始',
    es: 'Iniciar Subida'
  },
  selectFile: {
    tw: '選擇檔案',
    cn: '选择文件',
    en: 'Select File',
    jp: 'ファイル選択',
    es: 'Seleccionar Archivo'
  },
  error: {
    tw: '上傳失敗，請重試',
    cn: '上传失败，请重试',
    en: 'Upload failed, please try again',
    jp: 'アップロードに失敗しました。再試行してください',
    es: 'Error al subir, por favor inténtalo de nuevo'
  },
  shortUrl: {
    tw: '短網址',
    cn: '短网址',
    en: 'Short URL',
    jp: '短縮URL',
    es: 'URL Corta'
  },
  backButton: {
    tw: '返回',
    cn: '返回',
    en: 'Back',
    jp: '戻る',
    es: 'Volver'
  },
  options: {
    tw: '選項設置',
    cn: '选项设置',
    en: 'Options',
    jp: 'オプション',
    es: 'Opciones'
  },
  password: {
    tw: '密碼保護（可選）',
    cn: '密码保护（可选）',
    en: 'Password Protection (Optional)',
    jp: 'パスワード保護（任意）',
    es: 'Protección con Contraseña (Opcional)'
  },
  passwordPlaceholder: {
    tw: '最多4位數字',
    cn: '最多4位数字',
    en: 'Max 4 digits',
    jp: '最大4桁',
    es: 'Máx. 4 dígitos'
  },
  expiresIn: {
    tw: '有效期限（可選）',
    cn: '有效期限（可选）',
    en: 'Expires In (Optional)',
    jp: '有効期限（任意）',
    es: 'Expira En (Opcional)'
  },
  defaultOption: {
    tw: '預設',
    cn: '默认',
    en: 'Default',
    jp: 'デフォルト',
    es: 'Predeterminado'
  },
  passwordProtection: {
    tw: '密碼保護',
    cn: '密码保护',
    en: 'Password Protection',
    jp: 'パスワード保護',
    es: 'Protección con Contraseña'
  },
  expiration: {
    tw: '有效期限',
    cn: '有效期限',
    en: 'Expiration',
    jp: '有効期限',
    es: 'Expiración'
  },
  none: {
    tw: '無',
    cn: '无',
    en: 'None',
    jp: 'なし',
    es: 'Ninguno'
  }
};

const expirationOptions = [
  { value: '', label: { tw: '預設', cn: '默认', en: 'Default', jp: 'デフォルト', es: 'Predeterminado' } },
  { value: '1hr', label: { tw: '1小時', cn: '1小时', en: '1 hour', jp: '1時間', es: '1 hora' } },
  { value: '3hr', label: { tw: '3小時', cn: '3小时', en: '3 hours', jp: '3時間', es: '3 horas' } },
  { value: '6hr', label: { tw: '6小時', cn: '6小时', en: '6 hours', jp: '6時間', es: '6 horas' } },
  { value: '12hr', label: { tw: '12小時', cn: '12小时', en: '12 hours', jp: '12時間', es: '12 horas' } },
  { value: '1day', label: { tw: '1天', cn: '1天', en: '1 day', jp: '1日', es: '1 día' } },
  { value: '3days', label: { tw: '3天', cn: '3天', en: '3 days', jp: '3日', es: '3 días' } },
  { value: '7days', label: { tw: '7天', cn: '7天', en: '7 days', jp: '7日', es: '7 días' } }
];

interface VideoUrlUploadProps {
  locale: string;
}

interface UploadResult {
  shortCode: string;
  shortUrl: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  bunnyVideoId: string;
  playUrl: string;
  createdAt: string;
  expiresAt?: string;
  hasPassword: boolean;
}

export default function VideoUrlUpload({ locale }: VideoUrlUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<'shortUrl' | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [includeUrl, setIncludeUrl] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [countdown, setCountdown] = useState<string>('');
  const [toast, setToast] = useState<{message: string; isVisible: boolean; type: 'success' | 'error' | 'info'}>({
    message: '', 
    isVisible: false, 
    type: 'info'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  const t = uiTranslations;

  // 倒數計時邏輯
  useEffect(() => {
    if (result?.expiresAt) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const expireTime = new Date(result.expiresAt!).getTime();
        const distance = expireTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

          let countdownText = '';
          if (days > 0) {
            countdownText = lang === 'tw' ? `${days}天 ${hours}小時 ${minutes}分鐘` :
                           lang === 'cn' ? `${days}天 ${hours}小时 ${minutes}分钟` :
                           lang === 'en' ? `${days}d ${hours}h ${minutes}m` :
                           lang === 'jp' ? `${days}日 ${hours}時間 ${minutes}分` :
                           `${days}d ${hours}h ${minutes}m`;
          } else if (hours > 0) {
            countdownText = lang === 'tw' ? `${hours}小時 ${minutes}分鐘` :
                           lang === 'cn' ? `${hours}小时 ${minutes}分钟` :
                           lang === 'en' ? `${hours}h ${minutes}m` :
                           lang === 'jp' ? `${hours}時間 ${minutes}分` :
                           `${hours}h ${minutes}m`;
          } else if (minutes > 0) {
            countdownText = lang === 'tw' ? `${minutes}分鐘` :
                           lang === 'cn' ? `${minutes}分钟` :
                           lang === 'en' ? `${minutes}m` :
                           lang === 'jp' ? `${minutes}分` :
                           `${minutes}m`;
          } else {
            countdownText = lang === 'tw' ? '不到1分鐘' :
                           lang === 'cn' ? '不到1分钟' :
                           lang === 'en' ? 'Less than 1m' :
                           lang === 'jp' ? '1分未満' :
                           'Menos de 1m';
          }

          setCountdown(countdownText);
        } else {
          setCountdown(lang === 'tw' ? '已過期' :
                      lang === 'cn' ? '已过期' :
                      lang === 'en' ? 'Expired' :
                      lang === 'jp' ? '期限切れ' :
                      'Expirado');
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 60000); // 每分鐘更新一次

      return () => clearInterval(interval);
    } else {
      setCountdown('');
    }
  }, [result?.expiresAt, lang]);

  const handleUpload = useCallback(async (uploadFile?: File) => {
    const fileToUpload = uploadFile || file;
    if (!fileToUpload) return;

    setError('');
    setIsUploading(true);
    
    // 顯示處理中的 toast，設置為 0 表示不自動關閉
    setToast({message: t.processing[lang], isVisible: true, type: 'info'});

    try {
      // 獲取設備資訊
      let deviceInfo = {};
      try {
        const deviceResponse = await fetch('/api/device-info');
        if (deviceResponse.ok) {
          deviceInfo = await deviceResponse.json();
        }
      } catch (error) {
        console.warn('Failed to get device info:', error);
        // 使用本地備用方法
        deviceInfo = {
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: getBrowserName(),
          os: getOSName(),
          country_code: 'XX'
        };
      }

      // 步驟 1：獲取上傳配置（只發送 JSON，不發送檔案）
      console.log('Step 1: Getting upload configuration...');
      const configPayload = {
        filename: fileToUpload.name,
        fileSize: fileToUpload.size,
        mimeType: fileToUpload.type,
        ...(password && { password }),
        ...(expiresIn && { expiresIn }),
        deviceInfo
      };

      const configResponse = await fetch('/api/video-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(configPayload)
      });

      if (!configResponse.ok) {
        const errorData = await configResponse.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || 
                            (lang === 'tw' ? `配置獲取失敗 (${configResponse.status})` :
                             lang === 'en' ? `Configuration failed (${configResponse.status})` :
                             lang === 'jp' ? `設定取得失敗 (${configResponse.status})` :
                             `Error de configuración (${configResponse.status})`);
        setError(errorMessage);
        setToast({message: errorMessage, isVisible: true, type: 'error'});
        return;
      }

      const configData = await configResponse.json();
      if (!configData.success || !configData.uploadConfig) {
        const errorMessage = lang === 'tw' ? '無效的上傳配置' :
                             lang === 'en' ? 'Invalid upload configuration' :
                             lang === 'jp' ? '無効なアップロード設定' :
                             'Configuración de subida inválida';
        setError(errorMessage);
        setToast({message: errorMessage, isVisible: true, type: 'error'});
        return;
      }

      const { uploadConfig } = configData;

      // 步驟 2：直接上傳到 Bunny.net（繞過 Vercel Function）
      console.log('Step 2: Uploading directly to Bunny.net...');
      const bunnyResponse = await fetch(uploadConfig.bunnyUploadUrl, {
        method: 'PUT',
        headers: {
          'AccessKey': uploadConfig.bunnyApiKey,
          'Content-Type': 'application/octet-stream'
        },
        body: fileToUpload  // 直接上傳檔案到 Bunny.net
      });

      if (!bunnyResponse.ok) {
        console.error('Bunny.net upload failed:', bunnyResponse.status, bunnyResponse.statusText);
        const errorMessage = lang === 'tw' ? '檔案上傳到影片服務失敗' :
                             lang === 'en' ? 'Failed to upload file to video service' :
                             lang === 'jp' ? 'ビデオサービスへのファイルアップロードに失敗しました' :
                             'Error al subir archivo al servicio de video';
        setError(errorMessage);
        setToast({message: errorMessage, isVisible: true, type: 'error'});
        return;
      }

      // 步驟 3：確認上傳完成
      console.log('Step 3: Confirming upload completion...');
      const completeResponse = await fetch('/api/video-url/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shortCode: uploadConfig.shortCode,
          success: true
        })
      });

      if (!completeResponse.ok) {
        const errorMessage = lang === 'tw' ? '上傳確認失敗' :
                             lang === 'en' ? 'Upload confirmation failed' :
                             lang === 'jp' ? 'アップロード確認に失敗しました' :
                             'Error en confirmación de subida';
        setError(errorMessage);
        setToast({message: errorMessage, isVisible: true, type: 'error'});
        return;
      }

      const completeData = await completeResponse.json();
      if (completeData.success) {
        setResult(completeData.data);
        // 先關閉進度中的 toast，然後顯示成功 toast
        setToast({message: '', isVisible: false, type: 'info'});
        setTimeout(() => {
          setToast({message: t.successUpload[lang], isVisible: true, type: 'success'});
        }, 100);
      } else {
        const errorMessage = completeData.message || completeData.error || t.error[lang];
        setError(errorMessage);
        setToast({message: errorMessage, isVisible: true, type: 'error'});
      }

    } catch (networkError) {
      console.error('Network error:', networkError);
      const errorMessage = lang === 'tw' ? '網路連線錯誤，請稍後再試' :
                           lang === 'en' ? 'Network error, please try again later' :
                           lang === 'jp' ? 'ネットワークエラー、後でもう一度お試しください' :
                           'Error de red, por favor inténtalo de nuevo más tarde';
      setError(errorMessage);
      // 先關閉進度中的 toast，然後顯示錯誤 toast
      setToast({message: '', isVisible: false, type: 'info'});
      setTimeout(() => {
        setToast({message: errorMessage, isVisible: true, type: 'error'});
      }, 100);
    } finally {
      setIsUploading(false);
    }
  }, [file, password, expiresIn, t.error, t.processing, t.successUpload, lang]);

  const handleFileSelect = useCallback((selectedFile: File) => {
    // 檢查檔案大小 (100MB)
    if (selectedFile.size > 100 * 1024 * 1024) {
      const errorMessage = lang === 'tw' ? '檔案大小超過100MB限制' :
                           lang === 'en' ? 'File size exceeds 100MB limit' :
                           lang === 'jp' ? 'ファイルサイズが100MBの上限を超えています' :
                           'El tamaño del archivo excede el límite de 100MB';
      setError(errorMessage);
      setToast({message: errorMessage, isVisible: true, type: 'error'});
      return;
    }

    // 檢查檔案類型
    const allowedTypes = [
      'video/mp4', 'video/mov', 'video/quicktime', 'video/avi', 'video/x-msvideo',
      'video/webm', 'video/x-matroska', 'video/mkv', 'video/3gpp', 'video/3gpp2',
      'video/x-m4v', 'video/m4v'
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      const errorMessage = lang === 'tw' ? '不支援的影片格式' :
                           lang === 'en' ? 'Unsupported video format' :
                           lang === 'jp' ? 'サポートされていない動画形式' :
                           'Formato de video no compatible';
      setError(errorMessage);
      setToast({message: errorMessage, isVisible: true, type: 'error'});
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setError('');
  }, [lang]);

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

  const handleCopy = async (text: string, type: 'shortUrl') => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (execError) {
        console.error('Fallback copy failed:', execError);
      }
      document.body.removeChild(textArea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
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

          // Remove https:// and format URL like shorturl
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
    if (!result) return;
    
    if (!showQrCode && !qrCodeUrl) {
      generateQRCode(result.shortUrl, includeUrl);
    }
    setShowQrCode(!showQrCode);
  };

  // Include URL change handler
  const handleIncludeUrlChange = (checked: boolean) => {
    setIncludeUrl(checked);
    if (result?.shortUrl) {
      generateQRCode(result.shortUrl, checked);
    }
  };

  // Download QR Code function
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `video-qrcode-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper functions
  function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  function getOSName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  return (
    <div>
      {!result ? (
        // 未上傳成功時顯示上傳區域
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-800 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              {t.uploadTitle[lang]}
            </h2>
          </div>


          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer min-h-[200px] flex flex-col justify-center ${
              isDragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
            
            <VideoIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            
            {file ? (
              <div className="mb-4">
                <p className="text-sm font-medium text-red-600">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-3">
                  {t.dragDrop[lang]} <span className="text-blue-600 font-medium">{t.clickUpload[lang]}</span>
                </p>
                <p className="text-sm text-gray-500">{t.supportedFormats[lang]}</p>
              </>
            )}

            {isUploading && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-blue-600">{t.processing[lang]}</span>
              </div>
            )}
          </div>

          {/* 選項設置區域 - 現代化設計 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4 shadow-sm">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 密碼保護選項 */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-orange-600 mr-2" />
                  <label className="text-sm font-medium text-gray-700">{t.passwordProtection[lang]}</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.slice(0, 4))}
                    maxLength={4}
                    placeholder={t.passwordPlaceholder[lang]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* 有效期限選項 */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-green-600 mr-2" />
                  <label className="text-sm font-medium text-gray-700">{t.expiration[lang]}</label>
                </div>
                <div className="relative">
                  <select
                    value={expiresIn}
                    onChange={(e) => setExpiresIn(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  >
                    {expirationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label[lang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            {file && !isUploading && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-center">
                  <button
                    onClick={() => handleUpload(file)}
                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    {t.uploadButton[lang]}
                  </button>
                </div>
              </div>
            )}
          </div>

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
          {/* Video Info Section */}
          {result && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-3">影片資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">檔案名稱：</span>
                  <span className="text-gray-600">{result.filename}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">檔案大小：</span>
                  <span className="text-gray-600">{(result.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">格式：</span>
                  <span className="text-gray-600">{result.mimeType}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">{t.passwordProtection[lang]}：</span>
                  <span className="text-gray-600">{result.hasPassword ? (password || '****') : t.none[lang]}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">{t.expiration[lang]}：</span>
                  <span className={`text-gray-600 ${countdown && result.expiresAt && !countdown.includes('已過期') && !countdown.includes('Expired') && !countdown.includes('期限切れ') && !countdown.includes('Expirado') ? 'font-mono' : ''}`}>
                    {result.expiresAt 
                      ? countdown || new Date(result.expiresAt).toLocaleString()
                      : expiresIn 
                        ? (expirationOptions.find(option => option.value === expiresIn)?.label[lang] || expiresIn)
                        : t.none[lang]
                    }
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Short URL Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{t.shortUrl[lang]}</h3>
            <div className="flex items-center space-x-2 mb-4">
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
                  className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  title={lang === 'tw' ? '前往' : lang === 'en' ? 'Visit' : lang === 'jp' ? '移動' : 'Visitar'}
                >
                  <ExternalLink size={24} />
                </button>
                
                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(result.shortUrl, 'shortUrl')}
                  className={`px-2 py-2 rounded-md transition-colors flex items-center justify-center ${
                    copied === 'shortUrl'
                      ? 'bg-green-600 text-white' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {copied === 'shortUrl' ? (
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
                  title={lang === 'tw' ? 'QR Code' : 'QR Code'}
                >
                  <QrCode size={24} />
                </button>
              </div>
            </div>

            {/* QR Code Display */}
            {showQrCode && qrCodeUrl && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3 text-center">
                  {lang === 'tw' ? 'QR Code' : 'QR Code'}
                </h4>
                
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm border relative">
                    {/* Loading overlay */}
                    {qrLoading && (
                      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                          <span className="ml-2 text-sm text-gray-700">
                            {lang === 'tw' ? '生成中...' : lang === 'en' ? 'Generating...' : lang === 'jp' ? '生成中...' : 'Generando...'}
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
                      unoptimized
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
                      {lang === 'tw' ? '包含 URL' : 
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
                    title={lang === 'tw' ? '下載 QR Code' : 
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
                  setPassword('');
                  setExpiresIn('');
                  setCountdown('');
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
        duration={toast.type === 'info' ? 0 : 3000}
      />
    </div>
  );
}