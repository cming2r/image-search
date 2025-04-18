/**
 * 此腳本用於從Git歷史中獲取文件的創建和最後修改日期
 * 並生成一個包含這些日期的TypeScript對象
 * 
 * 使用方法:
 * 1. 安裝依賴: npm install --save-dev shelljs glob prettier
 * 2. 運行: node scripts/update-git-dates.mjs
 */

// ESM模塊導入
import shell from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import prettier from 'prettier';

// 獲取__dirname (在ESM中需要特殊處理)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 動態發現所有page.tsx文件
async function findAllPageFiles() {
  console.log('正在掃描項目尋找頁面文件...');
  const files = await glob('src/app/**/page.tsx', { 
    ignore: 'src/app/**/node_modules/**',
    cwd: projectRoot 
  });
  console.log(`找到 ${files.length} 個頁面文件`);
  return files;
}

// 將文件路徑轉換為Next.js路由路徑
function filePathToRoutePath(filePath) {
  // 移除src/app前綴和/page.tsx後綴
  let routePath = filePath.replace(/^src\/app/, '').replace(/\/page\.tsx$/, '');
  
  // 處理 (info) 等分組資料夾
  routePath = routePath.replace(/\/\([^)]+\)/, '');
  
  // 確保路徑以/開頭
  if (!routePath.startsWith('/')) {
    routePath = '/' + routePath;
  }
  
  // 特殊情況：根路徑
  if (routePath === '/') {
    return '/';
  }
  
  return routePath;
}

// 獲取文件的首次提交日期
function getFirstCommitDate(filePath) {
  try {
    // 切換到項目根目錄
    const originalDir = process.cwd();
    process.chdir(projectRoot);
    
    // 使用相對路徑而不是絕對路徑，避免括號等特殊字符問題
    const cmd = `git log --reverse --pretty=format:"%ad" --date=iso -- "${filePath}" | head -1`;
    const result = shell.exec(cmd, { silent: true });
    
    // 恢復原始目錄
    process.chdir(originalDir);
    
    if (result.code !== 0) {
      console.warn(`無法獲取 ${filePath} 的首次提交日期: ${result.stderr}`);
      return null;
    }
    
    return result.stdout.trim();
  } catch (error) {
    console.warn(`嘗試獲取 ${filePath} 的首次提交日期時發生錯誤: ${error.message}`);
    return null;
  }
}

// 獲取文件的最後修改日期
function getLastModifiedDate(filePath) {
  try {
    // 切換到項目根目錄
    const originalDir = process.cwd();
    process.chdir(projectRoot);
    
    // 使用相對路徑而不是絕對路徑，避免括號等特殊字符問題
    const cmd = `git log -1 --pretty=format:"%ad" --date=iso -- "${filePath}"`;
    const result = shell.exec(cmd, { silent: true });
    
    // 恢復原始目錄
    process.chdir(originalDir);
    
    if (result.code !== 0) {
      console.warn(`無法獲取 ${filePath} 的最後修改日期: ${result.stderr}`);
      return null;
    }
    
    return result.stdout.trim();
  } catch (error) {
    console.warn(`嘗試獲取 ${filePath} 的最後修改日期時發生錯誤: ${error.message}`);
    return null;
  }
}

// 從文件系統獲取日期（作為備用方案）
function getFileSystemDates(filePath) {
  const absolutePath = path.join(projectRoot, filePath);
  if (!fs.existsSync(absolutePath)) {
    return { created: null, modified: null };
  }
  
  try {
    const stats = fs.statSync(absolutePath);
    return {
      created: stats.birthtime.toISOString(),
      modified: stats.mtime.toISOString()
    };
  } catch (err) {
    console.warn(`無法獲取 ${filePath} 的文件系統日期: ${err.message}`);
    return { created: null, modified: null };
  }
}

// 生成日期數據
async function generateDatesData() {
  const pageFiles = await findAllPageFiles();
  const dates = {};
  let skippedFiles = 0;
  
  for (const file of pageFiles) {
    const absolutePath = path.join(projectRoot, file);
    if (!fs.existsSync(absolutePath)) {
      console.warn(`文件不存在: ${file}`);
      skippedFiles++;
      continue;
    }

    // 嘗試從Git獲取日期
    let firstCommit = getFirstCommitDate(file);
    let lastCommit = getLastModifiedDate(file);
    
    // 如果無法獲取Git日期，使用文件系統日期作為備用
    if (!firstCommit || !lastCommit) {
      console.warn(`無法從Git獲取 ${file} 的完整日期信息，嘗試使用文件系統日期...`);
      const fsDates = getFileSystemDates(file);
      
      if (!firstCommit && fsDates.created) {
        firstCommit = fsDates.created;
        console.log(`使用文件系統創建日期: ${firstCommit}`);
      }
      
      if (!lastCommit && fsDates.modified) {
        lastCommit = fsDates.modified;
        console.log(`使用文件系統修改日期: ${lastCommit}`);
      }
    }
    
    // 如果仍然無法獲取日期，使用當前日期
    if (!firstCommit) {
      firstCommit = new Date().toISOString();
      console.warn(`無法獲取 ${file} 的創建日期，使用當前日期: ${firstCommit}`);
    }
    
    if (!lastCommit) {
      lastCommit = new Date().toISOString();
      console.warn(`無法獲取 ${file} 的修改日期，使用當前日期: ${lastCommit}`);
    }
    
    // 將文件路徑轉換為路由路徑，用作鍵名
    const routePath = filePathToRoutePath(file);
    
    // 存儲原始文件路徑和路由路徑的映射
    dates[`/${file}`] = {
      created: firstCommit,
      modified: lastCommit,
      routePath // 添加路由路徑方便查詢
    };
  }
  
  console.log(`處理了 ${pageFiles.length} 個文件，跳過了 ${skippedFiles} 個文件`);
  return dates;
}

// 更新utils.ts文件
async function updateUtilsFile(datesData) {
  const utilsPath = path.join(projectRoot, 'src/lib/utils.ts');
  
  if (!fs.existsSync(utilsPath)) {
    console.error('utils.ts文件不存在:', utilsPath);
    return false;
  }
  
  let content = fs.readFileSync(utilsPath, 'utf8');
  
  // 準備新的FILE_DATES對象內容
  const newDatesObject = `export const FILE_DATES: Record<string, GitDates> = ${JSON.stringify(datesData, null, 2)};`;
  
  // 尋找並替換現有的FILE_DATES對象
  const regex = /export const FILE_DATES: Record<string, GitDates> = \{[\s\S]*?\};/;
  
  if (!regex.test(content)) {
    console.error('在utils.ts中找不到FILE_DATES對象');
    return false;
  }
  
  // 替換FILE_DATES對象
  content = content.replace(regex, newDatesObject);
  
  try {
    // 使用prettier格式化內容
    const prettierConfig = await prettier.resolveConfig(projectRoot);
    const formattedContent = await prettier.format(content, {
      ...prettierConfig,
      parser: 'typescript',
      filepath: utilsPath
    });
    
    // 寫入文件
    fs.writeFileSync(utilsPath, formattedContent, 'utf8');
    return true;
  } catch (error) {
    console.warn(`格式化程式碼失敗: ${error.message}`);
    console.log('將使用未格式化的內容...');
    
    // 如果格式化失敗，使用未格式化的內容
    fs.writeFileSync(utilsPath, content, 'utf8');
    return true;
  }
}

// 主函數
async function main() {
  console.log('正在獲取Git日期信息...');
  
  if (!shell.which('git')) {
    console.error('此腳本需要git命令');
    process.exit(1);
    return;
  }
  
  try {
    const datesData = await generateDatesData();
    console.log('收集了以下文件的日期信息:', Object.keys(datesData).length);
    
    if (await updateUtilsFile(datesData)) {
      console.log('已成功更新utils.ts中的FILE_DATES對象');
    } else {
      console.error('更新utils.ts失敗');
      process.exit(1);
    }
  } catch (error) {
    console.error('發生錯誤:', error);
    process.exit(1);
  }
}

// 運行主函數
main().catch(err => {
  console.error('腳本執行失敗:', err);
  process.exit(1);
});