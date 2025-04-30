// 創建一個可以直接使用 translations.json 的翻譯函數
import { useParams } from 'next/navigation';

// 避免使用 any
export function useLocalTranslations<T extends Record<string, Record<string, unknown>>>(translations: T) {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  
  // 獲取對應語言的翻譯
  return translations[locale as keyof typeof translations] || translations.zh;
}