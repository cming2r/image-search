'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Download, ExternalLink, Copy, QrCode, Check, Lock, Clock } from 'lucide-react';

const translations = {
  urlLabel: {
    zh: '輸入您的長網址 *',
    en: 'Enter your long URL *',
    jp: '長いURLを入力 *',
    es: 'Ingresa tu URL larga *'
  },
  passwordProtection: {
    zh: '密碼保護',
    en: 'Password Protection',
    jp: 'パスワード保護',
    es: 'Protección con Contraseña'
  },
  passwordPlaceholder: {
    zh: '最多4位數字',
    en: 'Max 4 digits',
    jp: '最大4桁',
    es: 'Máx. 4 dígitos'
  },
  expiresIn: {
    zh: '有效期限',
    en: 'Expiration',
    jp: '有効期限',
    es: 'Expiración'
  },
  none: {
    zh: '無',
    en: 'None',
    jp: 'なし',
    es: 'Ninguno'
  },
  urlPlaceholder: {
    zh: 'https://example.com/very/long/url',
    en: 'https://example.com/very/long/url',
    jp: 'https://example.com/very/long/url',
    es: 'https://example.com/very/long/url'
  },
  shortenButton: {
    zh: '縮短網址',
    en: 'Shorten URL',
    jp: 'URL短縮',
    es: 'Acortar URL'
  },
  shorteningText: {
    zh: '縮短中...',
    en: 'Shortening...',
    jp: '短縮中...',
    es: 'Acortando...'
  },
  originalUrlTitle: {
    zh: '您的長網址',
    en: 'Your Long URL',
    jp: 'あなたの元のURL',
    es: 'Tu URL Larga'
  },
  resultTitle: {
    zh: '您的短網址',
    en: 'Your Short URL',
    jp: 'あなたの短縮URL',
    es: 'Tu URL Corta'
  },
  copyButton: {
    zh: '複製',
    en: 'Copy',
    jp: 'コピー',
    es: 'Copiar'
  },
  copiedText: {
    zh: '已複製！',
    en: 'Copied!',
    jp: 'コピー済み！',
    es: '¡Copiado!'
  },
  successMessage: {
    zh: '短網址已建立！您可以複製上方連結進行分享。',
    en: 'Short URL created! You can copy the link above to share.',
    jp: '短縮URLが作成されました！上のリンクをコピーして共有できます。',
    es: '¡URL corta creada! Puedes copiar el enlace de arriba para compartir.'
  },
  customShortUrl: {
    zh: '自訂縮網址',
    en: 'Custom Short URL',
    jp: 'カスタム短縮URL',
    es: 'URL Corta Personalizada'
  },
  backButton: {
    zh: '返回',
    en: 'Back',
    jp: '戻る',
    es: 'Volver'
  },
  errorMessages: {
    shortenFailed: {
      zh: '縮短網址失敗',
      en: 'Failed to shorten URL',
      jp: 'URL短縮に失敗しました',
      es: 'Error al acortar URL'
    },
    networkError: {
      zh: '網路錯誤，請重試',
      en: 'Network error, please try again',
      jp: 'ネットワークエラー、再試行してください',
      es: 'Error de red, por favor inténtalo de nuevo'
    }
  }
};

const expirationOptions = [
  { value: '', label: { zh: '預設', en: 'Default', jp: 'デフォルト', es: 'Predeterminado' } },
  { value: '1hr', label: { zh: '1小時', en: '1 hour', jp: '1時間', es: '1 hora' } },
  { value: '3hr', label: { zh: '3小時', en: '3 hours', jp: '3時間', es: '3 horas' } },
  { value: '6hr', label: { zh: '6小時', en: '6 hours', jp: '6時間', es: '6 horas' } },
  { value: '12hr', label: { zh: '12小時', en: '12 hours', jp: '12時間', es: '12 horas' } },
  { value: '1day', label: { zh: '1天', en: '1 day', jp: '1日', es: '1 día' } },
  { value: '3days', label: { zh: '3天', en: '3 days', jp: '3日', es: '3 días' } },
  { value: '7days', label: { zh: '7天', en: '7 days', jp: '7日', es: '7 días' } }
];

interface ShortUrlResult {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  title?: string;
  createdAt: string;
  hasPassword?: boolean;
  expiresAt?: string;
}

export default function ShortUrl() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';
  
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [includeUrl, setIncludeUrl] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  const [result, setResult] = useState<ShortUrlResult | null>(null);
  const [countdown, setCountdown] = useState<string>('');

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
            countdownText = lang === 'zh' ? `${days}天 ${hours}小時 ${minutes}分鐘` :
                           lang === 'en' ? `${days}d ${hours}h ${minutes}m` :
                           lang === 'jp' ? `${days}日 ${hours}時間 ${minutes}分` :
                           `${days}d ${hours}h ${minutes}m`;
          } else if (hours > 0) {
            countdownText = lang === 'zh' ? `${hours}小時 ${minutes}分鐘` :
                           lang === 'en' ? `${hours}h ${minutes}m` :
                           lang === 'jp' ? `${hours}時間 ${minutes}分` :
                           `${hours}h ${minutes}m`;
          } else if (minutes > 0) {
            countdownText = lang === 'zh' ? `${minutes}分鐘` :
                           lang === 'en' ? `${minutes}m` :
                           lang === 'jp' ? `${minutes}分` :
                           `${minutes}m`;
          } else {
            countdownText = lang === 'zh' ? '不到1分鐘' :
                           lang === 'en' ? 'Less than 1m' :
                           lang === 'jp' ? '1分未満' :
                           'Menos de 1m';
          }

          setCountdown(countdownText);
        } else {
          setCountdown(lang === 'zh' ? '已過期' :
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setShortUrl('');
    setResult(null);
    
    try {
      const response = await fetch('/api/shorturl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: url,
          ...(password && { password }),
          ...(expiresIn && { expiresIn })
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShortUrl(data.data.shortUrl);
        setResult(data.data);
      } else {
        setError(data.error || translations.errorMessages.shortenFailed[lang]);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError(translations.errorMessages.networkError[lang]);
    } finally {
      setLoading(false);
    }
  };

  // 生成 QR Code（可選擇是否包含網址文字）
  const generateQRCode = async (url: string, shouldIncludeUrl?: boolean) => {
    const includeUrlOption = shouldIncludeUrl !== undefined ? shouldIncludeUrl : includeUrl;
    setQrLoading(true);
    try {
      if (!includeUrlOption) {
        // 只生成純 QR Code
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(qrCodeDataUrl);
        setQrLoading(false);
        return;
      }

      // 生成帶有網址文字的版本
      const qrCodeDataUrl = await QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // 創建 Canvas 來合成圖片
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();

      img.onload = () => {
        // 使用高 DPI 比例來改善畫質
        const pixelRatio = window.devicePixelRatio || 1;
        const scaledWidth = 200 * pixelRatio;
        const scaledHeight = 240 * pixelRatio;

        // 設定 Canvas 實際尺寸
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        
        // 設定 Canvas 顯示尺寸
        canvas.style.width = '200px';
        canvas.style.height = '240px';

        // 縮放 context 以匹配像素比例
        ctx!.scale(pixelRatio, pixelRatio);

        // 啟用文字抗鋸齒
        ctx!.imageSmoothingEnabled = true;
        ctx!.imageSmoothingQuality = 'high';

        // 填充白色背景
        ctx!.fillStyle = '#FFFFFF';
        ctx!.fillRect(0, 0, 200, 240);

        // 繪製 QR Code
        ctx!.drawImage(img, 0, 0, 200, 200);

        // 繪製網址文字 - 使用更大的字體和更好的設定
        ctx!.fillStyle = '#000000';
        ctx!.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", monospace';
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';
        
        const displayUrl = url.replace('https://', '');
        ctx!.fillText(displayUrl, 100, 220);

        // 轉換為高品質 PNG
        const combinedDataUrl = canvas.toDataURL('image/png', 1.0);
        setQrCodeUrl(combinedDataUrl);
      };

      img.src = qrCodeDataUrl;
    } catch (error) {
      console.error('QR Code generation failed:', error);
    } finally {
      setQrLoading(false);
    }
  };

  // 處理 QR Code 按鈕點擊
  const handleQrCodeToggle = async () => {
    if (!showQrCode && !qrCodeUrl) {
      // 第一次點擊時生成 QR Code
      await generateQRCode(shortUrl);
    }
    setShowQrCode(!showQrCode);
  };

  // 處理包含 URL 選項變更
  const handleIncludeUrlChange = async (checked: boolean) => {
    setIncludeUrl(checked);
    // 如果 QR Code 已經生成且正在顯示，重新生成
    if (qrCodeUrl && showQrCode) {
      // 用新的設定重新生成（不清除，避免閃爍）
      await generateQRCode(shortUrl, checked);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  // 下載 QR Code 圖片
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${shortUrl.replace('https://', '').replace('/', '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!shortUrl && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.urlLabel[lang]}
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={translations.urlPlaceholder[lang]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              {/* 選項設置區域 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* 密碼保護選項 */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-orange-600 mr-2" />
                    <label className="text-sm font-medium text-gray-700">{translations.passwordProtection[lang]}</label>
                  </div>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.slice(0, 4))}
                    maxLength={4}
                    placeholder={translations.passwordPlaceholder[lang]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white"
                  />
                </div>
                
                {/* 過期時間選項 */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-green-600 mr-2" />
                    <label className="text-sm font-medium text-gray-700">{translations.expiresIn[lang]}</label>
                  </div>
                  <select
                    value={expiresIn}
                    onChange={(e) => setExpiresIn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white appearance-none cursor-pointer"
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
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || !url}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? translations.shorteningText[lang] : translations.shortenButton[lang]}
            </button>
          </div>
        </form>
      )}

      {shortUrl && (
        <div className="space-y-6">
          {/* 顯示原始長網址及資訊 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{translations.originalUrlTitle[lang]}</h3>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            
            {/* 顯示密碼和有效期限資訊 */}
            {(result?.hasPassword || result?.expiresAt) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm pt-3 border-t border-gray-200">
                {result?.hasPassword && (
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="font-medium text-gray-700">{translations.passwordProtection[lang]}：</span>
                    <span className="text-gray-600 ml-1">{password || '****'}</span>
                  </div>
                )}
                {result?.expiresAt && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-green-600 mr-2" />
                    <span className="font-medium text-gray-700">{translations.expiresIn[lang]}：</span>
                    <span className={`text-gray-600 ml-1 ${countdown && !countdown.includes('已過期') && !countdown.includes('Expired') && !countdown.includes('期限切れ') && !countdown.includes('Expirado') ? 'font-mono' : ''}`}>
                      {countdown || new Date(result.expiresAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* 顯示短網址 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{translations.resultTitle[lang]}</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <button
                onClick={() => window.open(shortUrl, '_blank')}
                onAuxClick={(e) => {
                  if (e.button === 1) { // 中鍵點擊
                    window.open(shortUrl, '_blank');
                  }
                }}
                className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                title={locale === 'zh' ? '前往' : locale === 'en' ? 'Visit' : locale === 'jp' ? '移動' : 'Visitar'}
              >
                <ExternalLink size={24} />
              </button>
              <button
                onClick={copyToClipboard}
                className={`px-2 py-2 rounded-md transition-colors flex items-center justify-center ${
                  showSuccess 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                title={showSuccess ? (locale === 'zh' ? '已複製！' : locale === 'en' ? 'Copied!' : locale === 'jp' ? 'コピー済み！' : '¡Copiado!') : (locale === 'zh' ? '複製' : locale === 'en' ? 'Copy' : locale === 'jp' ? 'コピー' : 'Copiar')}
              >
                {showSuccess ? (
                  <Check size={24} />
                ) : (
                  <Copy size={24} />
                )}
              </button>
              <button
                onClick={handleQrCodeToggle}
                className={`px-2 py-2 rounded-md transition-colors flex items-center justify-center ${
                  showQrCode 
                    ? 'bg-black text-white' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                title={locale === 'zh' ? 'QR Code' : locale === 'en' ? 'QR Code' : locale === 'jp' ? 'QRコード' : 'Código QR'}
              >
                <QrCode size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {translations.successMessage[lang]}
            </p>
            
            {/* QR Code 顯示區域 */}
            {showQrCode && qrCodeUrl && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-3 text-center">
                  {locale === 'zh' ? 'QR Code' : locale === 'en' ? 'QR Code' : locale === 'jp' ? 'QRコード' : 'Código QR'}
                </h4>
                
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm border relative">
                    {qrLoading && (
                      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="ml-2 text-sm text-gray-600">
                            {locale === 'zh' ? '生成中...' : 
                             locale === 'en' ? 'Generating...' : 
                             locale === 'jp' ? '生成中...' : 
                             'Generando...'}
                          </span>
                        </div>
                      </div>
                    )}
                    <Image 
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
                      {shortUrl.replace('https://', '')}
                    </p>
                  </div>
                )}
                
                {/* 包含 URL 選項 */}
                <div className="flex justify-center mt-4 mb-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeUrl}
                      onChange={(e) => handleIncludeUrlChange(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {locale === 'zh' ? '包含 URL' : 
                       locale === 'en' ? 'Include URL' : 
                       locale === 'jp' ? 'URLを含める' : 
                       'Incluir URL'}
                    </span>
                  </label>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={downloadQRCode}
                    className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                    title={locale === 'zh' ? '下載圖片' : 
                           locale === 'en' ? 'Download Image' : 
                           locale === 'jp' ? '画像をダウンロード' : 
                           'Descargar Imagen'}
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
                  setShortUrl('');
                  setUrl('');
                  setError('');
                  setShowSuccess(false);
                  setQrCodeUrl('');
                  setShowQrCode(false);
                  setIncludeUrl(false);
                  setQrLoading(false);
                  setPassword('');
                  setExpiresIn('');
                  setResult(null);
                  setCountdown('');
                }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                {translations.backButton[lang]}
              </button>
            </div>
            
            {/* 自訂縮網址按鈕 */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  const baseUrl = 'https://vvrl.cc';
                  const customUrl = locale === 'zh' ? `${baseUrl}/zh/custom` : 
                                   locale === 'en' ? `${baseUrl}/custom` :
                                   locale === 'jp' ? `${baseUrl}/jp/custom` :
                                   locale === 'es' ? `${baseUrl}/es/custom` :
                                   `${baseUrl}/custom`;
                  window.open(customUrl, '_blank');
                }}
                onAuxClick={(e) => {
                  if (e.button === 1) { // 中鍵點擊
                    const baseUrl = 'https://vvrl.cc';
                    const customUrl = locale === 'zh' ? `${baseUrl}/zh/custom` : 
                                     locale === 'en' ? `${baseUrl}/custom` :
                                     locale === 'jp' ? `${baseUrl}/jp/custom` :
                                     locale === 'es' ? `${baseUrl}/es/custom` :
                                     `${baseUrl}/custom`;
                    window.open(customUrl, '_blank');
                  }
                }}
                className="py-2 px-4 rounded-md transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                {translations.customShortUrl[lang]}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}