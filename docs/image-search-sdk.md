# Image Search SDK 使用文档

> 内部使用文档 - 跨网站以图搜图功能集成指南

## 配置说明

### 实际地址
- **SDK 地址**: `https://fyimg.com/js/image-search-sdk.js`
- **API 端点**: `https://fyimg.com/api/image-search`（SDK 内部调用，无需手动使用）
- **搜图页面**: `https://fyimg.com/image-search`

---

## 概述

本 SDK 提供跨网站的以图搜图功能，支持两种场景：
- **有 URL 的图片**：直接通过 URL 参数跳转
- **无 URL 的图片**（如 Canvas 截图、PDF 截图）：通过 API 上传后跳转

---

## 快速开始

### 1. 引入 SDK

```html
<script src="https://fyimg.com/js/image-search-sdk.js"></script>
```

### 2. 初始化

```javascript
ImageSearchSDK.init({
  locale: 'zh',           // 语言：zh, en, jp, es
  source: 'your-website', // 来源网站名称（追踪用）
  baseUrl: 'https://fyimg.com' // API 基础 URL（可选，默认自动检测）
});
```

### 3. 使用

```javascript
// 情况1：有 URL 的图片 - 直接搜索
ImageSearchSDK.search('https://example.com/image.jpg');

// 情况2：Canvas 截图（PDF 场景）
const canvas = document.getElementById('pdfCanvas');
ImageSearchSDK.searchFromCanvas(canvas);

// 情况3：Blob/File 对象
const file = document.getElementById('fileInput').files[0];
ImageSearchSDK.search(file);

// 情况4：从用户粘贴的图片
canvas.toBlob((blob) => {
  ImageSearchSDK.search(blob);
});
```

---

## SDK API 参考

### ImageSearchSDK.init(options)

初始化 SDK 配置。

**参数：**
- `locale` (string): 语言设置，可选值：`zh`, `en`, `jp`, `es`，默认 `zh`
- `source` (string): 来源网站名称，用于追踪，默认为当前域名
- `baseUrl` (string): API 基础 URL，可选，默认自动检测

**示例：**
```javascript
ImageSearchSDK.init({
  locale: 'zh',
  source: 'my-website'
});
```

---

### ImageSearchSDK.search(imageSource)

搜索图片（自动判断是 URL 还是需要上传）。

**参数：**
- `imageSource` (string | Blob | File): 图片来源
  - string: 图片 URL，直接跳转
  - Blob/File: 自动上传到 R2 后跳转

**返回：**
- Promise\<void>

**示例：**
```javascript
// URL
await ImageSearchSDK.search('https://example.com/image.jpg');

// File
const file = document.getElementById('input').files[0];
await ImageSearchSDK.search(file);

// Blob
const blob = await fetch('https://example.com/image.jpg').then(r => r.blob());
await ImageSearchSDK.search(blob);
```

---

### ImageSearchSDK.searchFromCanvas(canvas)

从 Canvas 元素搜图（专门用于 Canvas 场景）。

**参数：**
- `canvas` (HTMLCanvasElement): Canvas 元素

**返回：**
- Promise\<void>

**示例：**
```javascript
const canvas = document.getElementById('pdfCanvas');
await ImageSearchSDK.searchFromCanvas(canvas);
```

---

### ImageSearchSDK.addButtonToImages(selector, options)

自动为图片添加搜索按钮（可选功能）。

**参数：**
- `selector` (string): CSS 选择器，默认 `'img'`
- `options` (object): 配置选项
  - `position` (string): 按钮位置，可选值：`top-right`, `top-left`, `bottom-right`, `bottom-left`
  - `style` (string): 自定义 CSS 样式

**示例：**
```javascript
// 为所有图片添加按钮
ImageSearchSDK.addButtonToImages('img', {
  position: 'top-right'
});

// 为特定图片添加按钮
ImageSearchSDK.addButtonToImages('.gallery-image', {
  position: 'bottom-right'
});
```

---

## 使用场景示例

### 场景 1：PDF 查看器中的截图搜索

```javascript
// 用户在 PDF 中选择区域后生成 Canvas
function onUserSelectArea(canvas) {
  // 直接从 Canvas 搜索
  ImageSearchSDK.searchFromCanvas(canvas);
}

// 或者转为 Blob
function onUserSelectAreaBlob(canvas) {
  canvas.toBlob(async (blob) => {
    await ImageSearchSDK.search(blob);
  });
}
```

### 场景 2：图片库网站

```html
<div class="image-gallery">
  <div class="image-item">
    <img src="image1.jpg" alt="Image 1">
    <button onclick="searchImage('image1.jpg')">
      🔍 搜索相似图片
    </button>
  </div>
</div>

<script>
function searchImage(url) {
  ImageSearchSDK.search(url);
}
</script>
```

### 场景 3：用户上传文件

```html
<input type="file" id="fileInput" accept="image/*" onchange="handleUpload(event)">

<script>
async function handleUpload(event) {
  const file = event.target.files[0];
  if (file) {
    await ImageSearchSDK.search(file);
  }
}
</script>
```

### 场景 4：网页截图工具

```javascript
// 使用 html2canvas 或其他截图库
async function captureAndSearch(element) {
  const canvas = await html2canvas(element);
  await ImageSearchSDK.searchFromCanvas(canvas);
}
```

---

## 使用限制

| 项目 | 限制 |
|------|------|
| **图片大小** | 最大 15MB |
| **支持格式** | JPG, PNG, WEBP, GIF, BMP, SVG, HEIC, HEIF, TIFF, AVIF |
| **速率限制** | 每个 IP 每分钟 10 次请求 |
| **CORS** | 已启用，所有域名可访问 |
| **预签名 URL 有效期** | 5 分钟 |

---

## 错误处理

### API 错误响应

```javascript
// 捕获错误
try {
  await ImageSearchSDK.search(file);
} catch (error) {
  console.error('搜索失败:', error);
  // 处理错误
}
```

### 常见错误

| 状态码 | 错误 | 解决方法 |
|--------|------|----------|
| 400 | 参数错误 | 检查文件类型和大小 |
| 429 | 速率限制 | 等待后重试，响应头包含 `Retry-After` |
| 500 | 服务器错误 | 联系技术支持 |

### 速率限制响应头

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 5
X-RateLimit-Reset: 2024-01-01T00:00:00.000Z
Retry-After: 60
```

---

## 技术细节

### URL 参数说明

| 参数 | 必需 | 说明 | 示例 |
|------|------|------|------|
| `img` | 是 | 图片 URL | `https://example.com/image.jpg` |
| `source` | 否 | 来源网站 | `my-website` |

完整示例：
```
https://fyimg.com/image-search?img=https://example.com/image.jpg&source=my-website
```

### SDK 工作流程

```
用户操作
  ↓
判断图片类型
  ↓
有 URL? ──是──→ 直接跳转到搜图页面
  ↓ 否
  ↓
调用 /api/image-search 获取预签名 URL
  ↓
上传图片到 R2
  ↓
获得公开 URL
  ↓
跳转到搜图页面
```

---

## 自动初始化（可选）

SDK 支持通过 script 标签的 data 属性自动初始化：

```html
<script
  src="https://fyimg.com/js/image-search-sdk.js"
  data-locale="zh"
  data-source="my-website"
  data-base-url="https://fyimg.com"
  data-auto-init="true"
></script>
```

---

## 安全建议

1. **HTTPS 必需**：确保图片 URL 使用 HTTPS
2. **文件验证**：上传前在客户端验证文件类型和大小
3. **错误处理**：实现完善的错误处理和用户提示
4. **速率限制**：避免短时间内频繁请求

---

## 技术支持

如遇到问题，请提供：
1. 错误信息和状态码
2. 浏览器控制台日志
3. 使用的图片 URL 或文件信息
4. 来源网站信息

---

## 更新日志

### v1.0.0 (2024-11-13)
- ✅ 初始版本
- ✅ 支持 URL 参数跳转
- ✅ 支持 API 上传
- ✅ JavaScript SDK
- ✅ 速率限制
- ✅ CORS 支持
