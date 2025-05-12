/**
 * 格式化JSON數據為縮進的字符串，優化結構化數據在搜索引擎中的顯示
 * 
 * @param data 要格式化的JSON數據對象
 * @returns 格式化後的JSON字符串
 */
export function formatJSON(data: unknown): string {
  // 使用2空格縮進來格式化JSON
  return JSON.stringify(data, null, 2);
}