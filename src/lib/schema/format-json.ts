/**
 * 格式化JSON數據為縮進的字符串，優化結構化數據在搜索引擎中的顯示
 * 
 * @param data 要格式化的JSON數據對象
 * @returns 格式化後的JSON字符串，添加了換行以確保在HTML中正確顯示
 */
export function formatJSON(data: unknown): string {
  // 添加前導換行符和一個空格，然後使用2空格縮進來格式化JSON
  // 這樣可以確保結構化數據在HTML中有更好的顯示格式
  const jsonString = JSON.stringify(data, null, 2);
  
  // 更進一步，為了在HTML中更好地顯示，在每行前添加適當的縮進
  const lines = jsonString.split('\n');
  const formattedLines = lines.map(line => `  ${line}`);
  return formattedLines.join('\n');
}