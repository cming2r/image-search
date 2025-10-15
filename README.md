# 圖片搜尋工具

這個專案是一個多功能工具集，包含圖片搜尋、日期計算器、預產期計算等多種實用工具。

## 功能

- **圖片搜尋**：支援輸入圖片URL和上傳本地圖片（最大15MB）
- **多引擎搜尋**：支援Google、Bing、Yandex和SauceNAO等圖片搜尋引擎
- **日期計算器**：計算兩個日期之間的差距，或從特定日期加減天數
- **預產期計算器**：根據最後一次月經日期計算預產期
- **交換禮物抽籤**：隨機分配交換禮物的參與者
- **自動SEO優化**：基於Git提交歷史自動生成頁面結構化數據
- **使用Vercel Blob儲存**：安全高效儲存上傳的圖片
- **Supabase記錄**：追蹤搜尋歷史和使用情況

## 開始使用

### 環境配置

1. 克隆此專案
2. 創建Supabase專案
   - 在Supabase中創建一個新的表格：`image_searches`
   - 添加欄位：`id` (uuid, primary key), `image_url` (text), `searched_at` (timestamp)
3. 設置環境變數
   - 創建或修改`.env.local`文件，設置以下環境變數：

```
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Vercel Blob 配置
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# 其他配置
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cron job 驗證密鑰
CRON_SECRET=your-secure-cron-secret
```

4. 安裝依賴並啟動開發服務器

```bash
# 安裝依賴
npm install

# 更新Git歷史日期（用於SEO）
npm run update-dates

# 啟動開發服務器
npm run dev
```

5. 在瀏覽器中訪問 [http://localhost:3000](http://localhost:3000)

## Supabase 設置

1. 註冊並創建Supabase專案
2. 在SQL編輯器中運行以下SQL創建表格：

```sql
CREATE TABLE image_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  search_engine TEXT NOT NULL,
  device_type TEXT NOT NULL,
  country_code TEXT, -- ISO 3166-1 Alpha-2 國家代碼 (如 TW, US, JP 等)
  browser TEXT,
  os TEXT,
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引以加快查詢
CREATE INDEX idx_image_searches_searched_at ON image_searches(searched_at);
CREATE INDEX idx_image_searches_search_engine ON image_searches(search_engine);
CREATE INDEX idx_image_searches_device_type ON image_searches(device_type);
CREATE INDEX idx_image_searches_country_code ON image_searches(country_code);

-- 設置行級安全策略
ALTER TABLE image_searches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "允許匿名插入" ON image_searches FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "允許插入" ON image_searches FOR INSERT TO authenticated WITH CHECK (true);
```

3. 從Supabase專案設置中獲取URL和匿名密鑰，填入`.env.local`文件中

## 結構化數據自動化

應用使用Git提交歷史自動生成每個頁面的創建和修改日期，用於SEO優化。

### 工作原理

1. `src/lib/utils.ts` 中的 `getPageDates` 函數可以獲取任何頁面的首次提交和最後修改日期
2. 頁面的 Layout 組件使用這些日期來生成準確的結構化數據
3. 構建前，`scripts/update-git-dates.js` 會自動更新 `FILE_DATES` 對象

### 添加新頁面

要將新頁面加入自動日期系統：

1. 將頁面路徑添加到 `scripts/update-git-dates.js` 的 `FILES_TO_TRACK` 數組
2. 執行 `npm run update-dates` 更新日期數據
3. 在頁面的 layout.tsx 中使用 `getPageDates` 函數獲取日期

```typescript
// 從Git歷史獲取頁面日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/your-page-path/page.tsx');
```

## 技術棧

- [Next.js](https://nextjs.org/) 
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Blob](https://vercel.com/docs/blob)
- [Supabase](https://supabase.com/)
- [UUID](https://www.npmjs.com/package/uuid)
- [ShellJS](https://www.npmjs.com/package/shelljs) - 用於Git歷史日期自動化

## 部署

此專案可以輕鬆部署到Vercel：

```bash
# 構建（包含自動更新頁面日期）
npm run build

# 部署到Vercel
vercel
```

確保在Vercel專案設置中添加所有必要的環境變數。
