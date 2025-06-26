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
  titleLabel: {
    zh: '短網址標題（選填）',
    en: 'Short URL Title (Optional)',
    jp: '短縮URLタイトル（任意）',
    es: 'Título de URL Corta (Opcional)'
  },
  titlePlaceholder: {
    zh: '為您的短網址取個名稱',
    en: 'Give your short URL a name',
    jp: '短縮URLに名前を付ける',
    es: 'Dale un nombre a tu URL corta'
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
  featuresTitle: {
    zh: '短網址功能特色',
    en: 'Short URL Features',
    jp: '短縮URL機能特徴',
    es: 'Características de URL Corta'
  },
  features: {
    zh: [
      '• 快速將長網址縮短為易於分享的短連結',
      '• 支援自訂標題，方便管理您的連結',
      '• 6位字符代碼，安全可靠',
      '• 永久有效，無使用次數限制'
    ],
    en: [
      '• Quickly shorten long URLs into easy-to-share short links',
      '• Support custom titles for easy link management',
      '• 6-character code, secure and reliable',
      '• Permanently valid, no usage limit'
    ],
    jp: [
      '• 長いURLを簡単に共有できる短いリンクに素早く短縮',
      '• カスタムタイトルに対応し、リンク管理が簡単',
      '• 6文字コードで安全かつ信頼性が高い',
      '• 永久有効、使用回数制限なし'
    ],
    es: [
      '• Acorta rápidamente URLs largas en enlaces cortos fáciles de compartir',
      '• Soporta títulos personalizados para fácil gestión de enlaces',
      '• Código de 6 caracteres, seguro y confiable',
      '• Válido permanentemente, sin límite de uso'
    ]
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
  const [title, setTitle] = useState('');
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
          title: title || ''
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
    <div className="max-w-2xl mx-auto">
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
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.titleLabel[lang]}
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={translations.titlePlaceholder[lang]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={100}
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

      {shortUrl && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-3">{translations.resultTitle[lang]}</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-md transition-colors ${
                showSuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {showSuccess ? translations.copiedText[lang] : translations.copyButton[lang]}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {translations.successMessage[lang]}
          </p>
        </div>
      )}

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{translations.featuresTitle[lang]}</h2>
        <ul className="space-y-2 text-gray-700">
          {translations.features[lang].map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}