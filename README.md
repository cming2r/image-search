# 圖片搜尋工具

這個專案是一個圖片搜尋工具，允許用戶通過URL或上傳圖片，使用各種圖片搜尋引擎搜尋相似圖片。

## 功能

- 支援輸入圖片URL
- 支援上傳本地圖片（最大5MB）
- 支援Google、Bing、TinEye和SauceNAO等圖片搜尋引擎
- 使用Vercel Blob儲存上傳的圖片
- 使用Supabase記錄搜尋歷史

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
npm install
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

## 技術棧

- [Next.js](https://nextjs.org/) 
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Blob](https://vercel.com/docs/blob)
- [Supabase](https://supabase.com/)
- [UUID](https://www.npmjs.com/package/uuid)

## 部署

此專案可以輕鬆部署到Vercel：

```bash
vercel
```

確保在Vercel專案設置中添加所有必要的環境變數。
