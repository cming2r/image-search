// 重新導出schema.ts中的所有函數，提供統一的訪問點
export {
  AUTHOR,
  PUBLISHER,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateArticleSchema,
  generateFAQSchema
} from './schema';

// 導出JSON格式化函數
export { formatJSON } from './format-json';