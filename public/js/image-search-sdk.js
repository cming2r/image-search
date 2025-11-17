/**
 * Image Search SDK
 * 讓其他網站輕鬆集成以圖搜圖功能
 *
 * 使用方式：
 * <script src="https://your-domain.com/js/image-search-sdk.js"></script>
 * <script>
 *   ImageSearchSDK.init({
 *     locale: 'en',  // 可選：zh, en, jp, es (默认: en)
 *     source: 'your-website-name'  // 可選：追蹤來源
 *   });
 * </script>
 */

(function(window) {
  'use strict';

  const ImageSearchSDK = {
    config: {
      apiEndpoint: '',  // 將在 init 時自動設置
      pageEndpoint: '',  // 將在 init 時自動設置
      locale: 'en',
      source: '',
      buttonText: {
        zh: '以圖搜圖',
        en: 'Search by Image',
        jp: '画像で検索',
        es: 'Buscar por Imagen'
      },
      uploading: {
        zh: '上傳中...',
        en: 'Uploading...',
        jp: 'アップロード中...',
        es: 'Subiendo...'
      }
    },

    /**
     * 初始化 SDK
     * @param {Object} options - 配置選項
     * @param {string} options.locale - 語言 (zh, en, jp, es)
     * @param {string} options.source - 來源網站名稱
     * @param {string} options.baseUrl - 自定義 API 基礎 URL（可選，默認自動檢測）
     */
    init: function(options = {}) {
      // 設置配置
      this.config.locale = options.locale || 'en';
      this.config.source = options.source || window.location.hostname;

      // 自動檢測或使用自定義的基礎 URL
      const baseUrl = options.baseUrl || this.detectBaseUrl();
      this.config.apiEndpoint = `${baseUrl}/api/image-search`;
      this.config.pageEndpoint = `${baseUrl}/image-search`;

      console.log('ImageSearchSDK initialized:', this.config);
    },

    /**
     * 自動檢測基礎 URL
     */
    detectBaseUrl: function() {
      // 從當前腳本的 src 推斷
      const scripts = document.getElementsByTagName('script');
      for (let script of scripts) {
        if (script.src && script.src.includes('image-search-sdk.js')) {
          const url = new URL(script.src);
          return `${url.protocol}//${url.host}`;
        }
      }
      // 默認值（本地開發）
      return 'http://localhost:3000';
    },

    /**
     * 搜尋圖片（主要方法）
     * @param {string|Blob|File} imageSource - 圖片來源（URL、Blob 或 File）
     */
    search: async function(imageSource) {
      try {
        let imageUrl;

        // 判斷圖片來源類型
        if (typeof imageSource === 'string') {
          // 情況1：已有圖片 URL
          imageUrl = imageSource;
        } else if (imageSource instanceof Blob || imageSource instanceof File) {
          // 情況2：需要上傳的圖片（Blob/File）
          imageUrl = await this._uploadImage(imageSource);
        } else {
          throw new Error('Invalid image source. Must be URL string, Blob, or File.');
        }

        // 跳轉到搜圖頁面
        this._openSearchPage(imageUrl);
      } catch (error) {
        console.error('ImageSearchSDK Error:', error);
        alert('圖片搜尋失敗，請稍後再試');
      }
    },

    /**
     * 上傳圖片到 API（內部方法）
     * @private
     * @param {Blob|File} file - 圖片文件
     * @returns {Promise<string>} - 圖片 URL
     */
    _uploadImage: async function(file) {
      // 步驟1：獲取預簽名 URL
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name || 'image.png',
          fileSize: file.size,
          mimeType: file.type,
          locale: this.config.locale
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload configuration failed');
      }

      const { uploadConfig } = await response.json();

      // 步驟2：上傳到 R2
      const uploadResponse = await fetch(uploadConfig.presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      return uploadConfig.publicUrl;
    },

    /**
     * 打開搜圖頁面（內部方法）
     * @private
     * @param {string} imageUrl - 圖片 URL
     */
    _openSearchPage: function(imageUrl) {
      const params = new URLSearchParams({
        img: imageUrl,
        source: this.config.source
      });

      const url = `${this.config.pageEndpoint}?${params.toString()}`;
      window.open(url, '_blank');
    },

    /**
     * 為圖片元素添加搜圖按鈕
     * @param {string} selector - CSS 選擇器
     * @param {Object} options - 按鈕配置
     */
    addButtonToImages: function(selector = 'img', options = {}) {
      const images = document.querySelectorAll(selector);
      const buttonStyle = options.style || this._getDefaultButtonStyle();
      const buttonPosition = options.position || 'top-right'; // top-right, top-left, bottom-right, bottom-left

      images.forEach(img => {
        // 跳過已處理的圖片
        if (img.dataset.imageSearchAdded) return;

        // 創建包裝容器
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';

        // 將圖片包裹起來
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        // 創建搜圖按鈕
        const button = document.createElement('button');
        button.innerHTML = '🔍';
        button.title = this.config.buttonText[this.config.locale];
        button.style.cssText = buttonStyle;
        this._setButtonPosition(button, buttonPosition);

        // 綁定點擊事件
        button.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const originalText = button.innerHTML;
          button.innerHTML = '⏳';
          button.disabled = true;

          try {
            // 獲取圖片 src
            const imgSrc = img.src || img.dataset.src;
            if (imgSrc) {
              await this.search(imgSrc);
            }
          } finally {
            button.innerHTML = originalText;
            button.disabled = false;
          }
        });

        wrapper.appendChild(button);
        img.dataset.imageSearchAdded = 'true';
      });
    },

    /**
     * 獲取默認按鈕樣式（內部方法）
     * @private
     */
    _getDefaultButtonStyle: function() {
      return `
        position: absolute;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 10px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s;
      `.replace(/\s+/g, ' ').trim();
    },

    /**
     * 設置按鈕位置（內部方法）
     * @private
     */
    _setButtonPosition: function(button, position) {
      const positions = {
        'top-right': { top: '8px', right: '8px' },
        'top-left': { top: '8px', left: '8px' },
        'bottom-right': { bottom: '8px', right: '8px' },
        'bottom-left': { bottom: '8px', left: '8px' }
      };

      const pos = positions[position] || positions['top-right'];
      Object.assign(button.style, pos);
    },

    /**
     * 從 Canvas 搜圖
     * @param {HTMLCanvasElement} canvas - Canvas 元素
     */
    searchFromCanvas: async function(canvas) {
      return new Promise((resolve, reject) => {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert canvas to blob'));
            return;
          }
          try {
            await this.search(blob);
            resolve();
          } catch (error) {
            reject(error);
          }
        }, 'image/png');
      });
    }
  };

  // 暴露到全局
  window.ImageSearchSDK = ImageSearchSDK;

  // 自動初始化（如果 script 標籤有 data 屬性）
  document.addEventListener('DOMContentLoaded', function() {
    const script = document.querySelector('script[src*="image-search-sdk.js"]');
    if (script) {
      const autoInit = script.dataset.autoInit !== 'false';
      const locale = script.dataset.locale || 'en';
      const source = script.dataset.source || '';
      const baseUrl = script.dataset.baseUrl || '';

      if (autoInit) {
        ImageSearchSDK.init({ locale, source, baseUrl });
      }
    }
  });

})(window);
