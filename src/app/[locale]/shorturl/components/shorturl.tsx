'use client';

import React, { useState } from 'react';

export default function ShortUrl() {
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
        setError(result.error || '縮短網址失敗');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('網路錯誤，請重試');
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
      console.error('複製失敗:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                輸入您的長網址 *
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very/long/url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                短網址標題（選填）
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="為您的短網址取個名稱"
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
            {loading ? '縮短中...' : '縮短網址'}
          </button>
        </div>
      </form>

      {shortUrl && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-3">您的短網址</h3>
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
              {showSuccess ? '已複製！' : '複製'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            短網址已建立！您可以複製上方連結進行分享。
          </p>
        </div>
      )}

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">短網址功能特色</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• 快速將長網址縮短為易於分享的短連結</li>
          <li>• 支援自訂標題，方便管理您的連結</li>
          <li>• 6位字符代碼，安全可靠</li>
          <li>• 永久有效，無使用次數限制</li>
        </ul>
      </div>
    </div>
  );
}