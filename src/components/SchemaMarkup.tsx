'use client';

import Script from 'next/script';
import { ReactNode } from 'react';

interface SchemaMarkupProps {
  schema: unknown | unknown[]; // 支援單個schema或schema陣列
  id?: string;
}

/**
 * 驗證 Schema 基本結構
 * 檢查是否符合 schema.org 的基本要求
 */
function validateSchema(schema: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // 檢查單個 schema 對象
  const validateSingleSchema = (schemaObj: unknown) => {
    // 必須是對象
    if (typeof schemaObj !== 'object' || schemaObj === null) {
      errors.push('Schema 必須是一個對象');
      return;
    }
    
    // 轉換為具有基本屬性的類型
    const typedSchema = schemaObj as { '@context'?: string; '@type'?: string };
    
    // 必須有 @context
    if (!typedSchema['@context']) {
      errors.push('Schema 缺少 @context 屬性');
    } else if (
      typeof typedSchema['@context'] === 'string' && 
      !typedSchema['@context'].includes('schema.org')
    ) {
      errors.push('Schema @context 應該包含 schema.org');
    }
    
    // 必須有 @type
    if (!typedSchema['@type']) {
      errors.push('Schema 缺少 @type 屬性');
    }
  };
  
  // 處理 schema 數組或單個 schema
  if (Array.isArray(schema)) {
    schema.forEach((item, index) => {
      try {
        validateSingleSchema(item);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        errors.push(`Schema 陣列索引 ${index} 驗證失敗: ${errorMessage}`);
      }
    });
  } else {
    validateSingleSchema(schema);
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * SchemaMarkup組件 - 用於在頁面中添加JSON-LD結構化數據
 * 
 * @param schema - 結構化數據對象或對象數組
 * @param id - script標籤的id屬性（可選）
 */
export default function SchemaMarkup({ schema, id = 'schema-markup' }: SchemaMarkupProps): ReactNode {
  // 確保schema是字符串形式
  const jsonLdString = JSON.stringify(schema);
  
  // 僅在開發環境進行驗證
  if (process.env.NODE_ENV === 'development') {
    const { valid, errors } = validateSchema(schema);
    if (!valid) {
      console.warn('Schema 驗證警告:', errors);
    }
  }
  
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
      strategy="afterInteractive"
    />
  );
}

/**
 * 生成包含多個Schema的合併標記
 * 
 * @example
 * // 使用示例
 * <SchemaMarkupGroup
 *   schemas={[
 *     generateBreadcrumbSchema('/about', '關於我們'),
 *     generateWebPageSchema('/about', '關於我們', '關於我們的描述')
 *   ]}
 * />
 */
export function SchemaMarkupGroup({ schemas, id = 'schema-group' }: { schemas: unknown[], id?: string }): ReactNode {
  return <SchemaMarkup schema={schemas} id={id} />;
}