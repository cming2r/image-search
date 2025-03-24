'use client';

import Script from 'next/script';
import { ReactNode } from 'react';

interface SchemaMarkupProps {
  schema: any | any[]; // 支援單個schema或schema陣列
  id?: string;
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
export function SchemaMarkupGroup({ schemas, id = 'schema-group' }: { schemas: any[], id?: string }): ReactNode {
  return <SchemaMarkup schema={schemas} id={id} />;
}