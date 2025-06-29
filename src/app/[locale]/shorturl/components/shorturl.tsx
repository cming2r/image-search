'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const translations = {
  urlLabel: {
    zh: '輸入您的長網址 *',
    en: 'Enter your long URL *',
    jp: '長いURLを入力 *',
    es: 'Ingresa tu URL larga *'
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

export default function ShortUrl() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';
  
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setShortUrl('');
    
    try {
      const response = await fetch('/api/shorturl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          original_url: url,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShortUrl(result.data.short_url);
      } else {
        setError(result.error || translations.errorMessages.shortenFailed[lang]);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError(translations.errorMessages.networkError[lang]);
    } finally {
      setLoading(false);
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
          {/* 顯示原始長網址 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{translations.originalUrlTitle[lang]}</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
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
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                title={locale === 'zh' ? '前往' : locale === 'en' ? 'Visit' : locale === 'jp' ? '移動' : 'Visitar'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              <button
                onClick={copyToClipboard}
                className={`px-3 py-2 rounded-md transition-colors flex items-center justify-center ${
                  showSuccess 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                title={showSuccess ? (locale === 'zh' ? '已複製！' : locale === 'en' ? 'Copied!' : locale === 'jp' ? 'コピー済み！' : '¡Copiado!') : (locale === 'zh' ? '複製' : locale === 'en' ? 'Copy' : locale === 'jp' ? 'コピー' : 'Copiar')}
              >
                {showSuccess ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {translations.successMessage[lang]}
            </p>
            
            {/* 返回按鈕 */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShortUrl('');
                  setUrl('');
                  setError('');
                  setShowSuccess(false);
                }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                {translations.backButton[lang]}
              </button>
            </div>
            
            {/* 自訂縮網址按鈕 */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => window.open('https://vvrl.cc/custom', '_blank')}
                onAuxClick={(e) => {
                  if (e.button === 1) { // 中鍵點擊
                    window.open('https://vvrl.cc/custom', '_blank');
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