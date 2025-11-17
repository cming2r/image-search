'use client';

import { FC, useState, useCallback, ChangeEvent, useRef } from 'react';
import { useParams } from 'next/navigation';

const colorPickerTranslations = {
  title: {
    zh: "顏色選擇器",
    en: "Color Picker",
    jp: "カラーピッカー"
  },
  uploadImage: {
    zh: "上傳圖片",
    en: "Upload Image",
    jp: "画像をアップロード"
  },
  clickToExtract: {
    zh: "點擊圖片提取顏色",
    en: "Click image to extract color",
    jp: "画像をクリックして色を抽出"
  },
  dragDropImage: {
    zh: "拖拽圖片到這裡或點擊上傳",
    en: "Drag & drop image here or click to upload",
    jp: "ここに画像をドラッグ＆ドロップまたはクリックしてアップロード"
  },
  hexInput: {
    zh: "十六進制顏色",
    en: "Hex Color",
    jp: "16進数カラー"
  },
  rgbInput: {
    zh: "RGB 顏色",
    en: "RGB Color",
    jp: "RGBカラー"
  },
  hslInput: {
    zh: "HSL 顏色",
    en: "HSL Color",
    jp: "HSLカラー"
  },
  colorPreview: {
    zh: "顏色預覽",
    en: "Color Preview",
    jp: "カラープレビュー"
  },
  copySuccess: {
    zh: "已複製到剪貼簿",
    en: "Copied to clipboard",
    jp: "クリップボードにコピーしました"
  },
  invalidColor: {
    zh: "無效的顏色格式",
    en: "Invalid color format",
    jp: "無効なカラーフォーマット"
  },
  red: {
    zh: "紅",
    en: "Red",
    jp: "赤"
  },
  green: {
    zh: "綠",
    en: "Green",
    jp: "緑"
  },
  blue: {
    zh: "藍",
    en: "Blue",
    jp: "青"
  },
  hue: {
    zh: "色相",
    en: "Hue",
    jp: "色相"
  },
  saturation: {
    zh: "飽和度",
    en: "Saturation",
    jp: "彩度"
  },
  lightness: {
    zh: "亮度",
    en: "Lightness",
    jp: "明度"
  }
};

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

const ColorPicker: FC = () => {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const lang = locale as 'zh' | 'en' | 'jp';

  const [color, setColor] = useState<ColorValues>({
    hex: '#ff0000',
    rgb: { r: 255, g: 0, b: 0 },
    hsl: { h: 0, s: 100, l: 50 }
  });

  const [notification, setNotification] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hex to RGB conversion
  const hexToRgb = useCallback((hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }, []);

  // RGB to Hex conversion
  const rgbToHex = useCallback((r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }, []);

  // RGB to HSL conversion
  const rgbToHsl = useCallback((r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }, []);

  // HSL to RGB conversion
  const hslToRgb = useCallback((h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h * 12) % 12;
      return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255)
    };
  }, []);

  // Update all color formats
  const updateColorFromHex = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColor({ hex, rgb, hsl });
    }
  }, [hexToRgb, rgbToHsl]);

  const updateColorFromRgb = useCallback((rgb: { r: number; g: number; b: number }) => {
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setColor({ hex, rgb, hsl });
  }, [rgbToHex, rgbToHsl]);

  const updateColorFromHsl = useCallback((hsl: { h: number; s: number; l: number }) => {
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setColor({ hex, rgb, hsl });
  }, [hslToRgb, rgbToHex]);

  // Handle input changes
  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      updateColorFromHex(value);
    }
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...color.rgb, [component]: Math.max(0, Math.min(255, value)) };
    updateColorFromRgb(newRgb);
  };

  const handleHslChange = (component: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...color.hsl };
    if (component === 'h') {
      newHsl.h = Math.max(0, Math.min(360, value));
    } else {
      newHsl[component] = Math.max(0, Math.min(100, value));
    }
    updateColorFromHsl(newHsl);
  };

  // Image upload and color extraction
  const drawImageOnCanvas = useCallback((imageSrc: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Calculate canvas size to maintain aspect ratio
      const maxWidth = 600;
      const maxHeight = 400;
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      
      // Clear canvas and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = imageSrc;
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      
      // Draw image on canvas after a short delay to ensure DOM update
      setTimeout(() => {
        drawImageOnCanvas(result);
      }, 100);
    };
    reader.readAsDataURL(file);
  }, [drawImageOnCanvas]);

  const extractColorFromCanvas = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((event.clientY - rect.top) * (canvas.height / rect.height));

    const imageData = ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = imageData.data;

    // Update color with extracted values
    const rgb = { r, g, b };
    updateColorFromRgb(rgb);
    
    // Show notification
    setNotification(`${colorPickerTranslations.copySuccess[lang]} RGB(${r}, ${g}, ${b})`);
    setTimeout(() => setNotification(''), 2000);
  }, [lang, updateColorFromRgb]);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  }, [handleImageUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification(`${format} ${colorPickerTranslations.copySuccess[lang]}`);
      setTimeout(() => setNotification(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Image Upload Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{colorPickerTranslations.uploadImage[lang]}</h2>
        
        {!uploadedImage ? (
          <div
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600 text-center">
              {colorPickerTranslations.dragDropImage[lang]}
            </p>
          </div>
        ) : (
          <div className="relative">
            <p className="text-sm text-gray-600 mb-2">{colorPickerTranslations.clickToExtract[lang]}</p>
            <canvas
              ref={canvasRef}
              className="border-2 border-gray-300 rounded-lg cursor-crosshair max-w-full"
              onClick={extractColorFromCanvas}
            />
            <button
              onClick={() => {
                setUploadedImage(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="absolute top-8 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Color Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{colorPickerTranslations.colorPreview[lang]}</h2>
        <div 
          className="w-full h-32 rounded-lg border-2 border-gray-300 shadow-lg cursor-pointer"
          style={{ backgroundColor: color.hex }}
          onClick={() => copyToClipboard(color.hex, 'HEX')}
        />
      </div>

      {/* Color Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Hex Input */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {colorPickerTranslations.hexInput[lang]}
          </label>
          <input
            type="text"
            value={color.hex}
            onChange={handleHexChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="#FF0000"
          />
          <button
            onClick={() => copyToClipboard(color.hex, 'HEX')}
            className="mt-2 w-full bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
          >
            複製 HEX
          </button>
        </div>

        {/* RGB Input */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {colorPickerTranslations.rgbInput[lang]}
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm w-8">{colorPickerTranslations.red[lang]}</span>
              <input
                type="number"
                value={color.rgb.r}
                onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
                className="flex-1 p-1 border border-gray-300 rounded text-sm"
                min="0"
                max="255"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm w-8">{colorPickerTranslations.green[lang]}</span>
              <input
                type="number"
                value={color.rgb.g}
                onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
                className="flex-1 p-1 border border-gray-300 rounded text-sm"
                min="0"
                max="255"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm w-8">{colorPickerTranslations.blue[lang]}</span>
              <input
                type="number"
                value={color.rgb.b}
                onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
                className="flex-1 p-1 border border-gray-300 rounded text-sm"
                min="0"
                max="255"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, 'RGB')}
            className="mt-2 w-full bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600 transition-colors"
          >
            複製 RGB
          </button>
        </div>

        {/* HSL Input */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {colorPickerTranslations.hslInput[lang]}
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm w-8">{colorPickerTranslations.hue[lang]}</span>
              <input
                type="number"
                value={color.hsl.h}
                onChange={(e) => handleHslChange('h', parseInt(e.target.value) || 0)}
                className="flex-1 p-1 border border-gray-300 rounded text-sm"
                min="0"
                max="360"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm w-8">{colorPickerTranslations.saturation[lang]}</span>
              <input
                type="number"
                value={color.hsl.s}
                onChange={(e) => handleHslChange('s', parseInt(e.target.value) || 0)}
                className="flex-1 p-1 border border-gray-300 rounded text-sm"
                min="0"
                max="100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm w-8">{colorPickerTranslations.lightness[lang]}</span>
              <input
                type="number"
                value={color.hsl.l}
                onChange={(e) => handleHslChange('l', parseInt(e.target.value) || 0)}
                className="flex-1 p-1 border border-gray-300 rounded text-sm"
                min="0"
                max="100"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`, 'HSL')}
            className="mt-2 w-full bg-purple-500 text-white py-1 px-3 rounded text-sm hover:bg-purple-600 transition-colors"
          >
            複製 HSL
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;