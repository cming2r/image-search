'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 定義表單資料的型別
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  // Determine the current locale
  const isTwLocale = locale === 'tw';
  const isCnLocale = locale === 'cn';
  const isEnLocale = locale === 'en';
  const isJpLocale = locale === 'jp';
  const isEsLocale = locale === 'es';

  // Get content based on locale
  const getContent = (twText: string, cnText: string, enText: string, jpText: string, esText: string) => {
    if (isTwLocale) return twText;
    if (isCnLocale) return cnText;
    if (isEnLocale) return enText;
    if (isJpLocale) return jpText;
    if (isEsLocale) return esText;
    return enText; // Default to English if no match
  };
  
  // Form translations
  const formLabels = {
    name: getContent('您的名字', '您的名字', 'Your Name', 'お名前', 'Su Nombre'),
    email: getContent('電子郵件', '电子邮件', 'Email Address', 'メールアドレス', 'Dirección de Email'),
    message: getContent('訊息內容', '讯息内容', 'Message', 'メッセージ', 'Mensaje'),
    submit: getContent('送出', '送出', 'Submit', '送信', 'Enviar'),
    submitting: getContent('送出中...', '送出中...', 'Submitting...', '送信中...', 'Enviando...')
  };

  const validationMessages = {
    requiredFields: getContent(
      '請填寫所有必填欄位',
      '请填写所有必填栏位',
      'Please fill in all required fields',
      'すべての必須フィールドにご記入ください',
      'Por favor complete todos los campos requeridos'
    ),
    invalidEmail: getContent(
      '請輸入有效的電子郵件地址',
      '请输入有效的电子邮件地址',
      'Please enter a valid email address',
      '有効なメールアドレスを入力してください',
      'Por favor ingrese una dirección de email válida'
    ),
    generalError: getContent(
      '提交表單時發生錯誤，請稍後再試',
      '提交表单时发生错误，请稍后再试',
      'An error occurred while submitting the form. Please try again later.',
      'フォームの送信中にエラーが発生しました。後でもう一度お試しください。',
      'Ocurrió un error al enviar el formulario. Por favor intente nuevamente más tarde.'
    )
  };

  const successMessage = getContent(
    '感謝您的訊息！我們會盡快回覆您。',
    '感谢您的讯息！我们会尽快回复您。',
    'Thank you for your message! We will get back to you soon.',
    'メッセージをお送りいただきありがとうございます！早急にご返信いたします。',
    '¡Gracias por su mensaje! Le responderemos pronto.'
  );

  const pageContent = {
    title: getContent('聯絡我們', '联络我们', 'Contact Us', 'お問い合わせ', 'Contáctanos'),
    description: getContent(
      '有任何問題、建議或回饋嗎？請填寫以下表單與我們聯絡，我們會盡快回覆您。',
      '有任何问题、建议或回馈吗？请填写以下表单与我们联络，我们会尽快回复您。',
      'Have questions, suggestions, or feedback? Please fill out the form below to get in touch with us, and we\'ll get back to you as soon as possible.',
      'ご質問、ご提案、またはフィードバックがありますか？以下のフォームにご記入いただき、お問い合わせください。できるだけ早くご返信いたします。',
      '¿Tiene preguntas, sugerencias o comentarios? Por favor complete el formulario a continuación para contactarnos, y le responderemos lo antes posible.'
    )
  };
  
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
      if (!formData.name || !formData.message) {
        throw new Error(validationMessages.requiredFields);
      }

      // 驗證電子郵件格式（如果有提供的話）
      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          throw new Error(validationMessages.invalidEmail);
        }
      }

      // 獲取設備資訊
      let deviceInfo = null;
      try {
        const deviceResponse = await fetch('/api/device-info');
        if (deviceResponse.ok) {
          deviceInfo = await deviceResponse.json();
        }
      } catch (error) {
        console.warn('Failed to get device info:', error);
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
          message: formData.message,
          deviceInfo: deviceInfo
        }),
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || validationMessages.generalError);
      }

      // 成功提交
      setSubmitResult({
        success: true,
        message: successMessage
      });

      // 重置表單
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // 2秒後重導向到首頁
      setTimeout(() => {
        router.push(locale === 'en' ? '/' : `/${locale}`);
      }, 2000);
    } catch (error) {
      console.error('提交表單時出錯:', error);
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : validationMessages.generalError
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow w-full">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{pageContent.title}</h1>

          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="mb-6 text-gray-700">
              {pageContent.description}
            </p>

            {submitResult.message && (
              <div className={`p-4 mb-6 rounded-md ${submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitResult.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  {formLabels.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  {formLabels.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  {formLabels.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? formLabels.submitting : formLabels.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}