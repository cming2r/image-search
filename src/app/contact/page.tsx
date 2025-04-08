'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/schema';
import { SchemaMarkupGroup } from '@/components/SchemaMarkup';

// 定義表單資料的型別
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({});

    try {
      // 檢查必填欄位
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('請填寫所有必填欄位');
      }

      // 驗證電子郵件格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('請輸入有效的電子郵件地址');
      }

      // 提交到 API 端點
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || '提交表單時發生錯誤');
      }

      // 成功提交
      setSubmitResult({
        success: true,
        message: '訊息已成功送出，我們會盡快回覆您。'
      });

      // 重置表單
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // 2秒後重導向到首頁
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('提交表單時出錯:', error);
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : '提交表單時發生錯誤，請稍後再試。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 生成JSON-LD結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/contact', '聯絡我們');
  const webPageSchema = generateWebPageSchema(
    '/contact',
    '聯絡我們 - fyimg',
    '如有任何問題或建議，請通過聯絡表單與我們聯繫。我們會盡快回覆您的訊息。'
  );

  // 合併schema為一個數組
  const schemas = [breadcrumbSchema, webPageSchema];

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaMarkupGroup schemas={schemas} id="contact-schema" />
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">聯絡我們</h1>

          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="mb-6 text-gray-700">
              如有任何問題、建議或合作機會，請填寫以下表單與我們聯絡，我們將盡快回覆您。
            </p>

            {submitResult.message && (
              <div className={`p-4 mb-6 rounded-md ${submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitResult.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  電子郵件 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  訊息內容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? '提交中...' : '送出訊息'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">其他聯絡方式</h2>

            <p>
              我們將在收到您的訊息後1-2個工作日內回覆。感謝您的耐心等待。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}