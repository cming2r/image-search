# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start development server (auto-updates Git dates)
npm run dev

# Build for production (includes Git date updates)
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint

# Update Git-based page dates for SEO
npm run update-dates
```

### Environment Setup
Create `.env.local` with:
```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Cloudflare R2 Configuration (for image-search)
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://pub-b6115e36a46b41fabf861504393ee5e8.r2.dev  # R2 public URL or custom domain

# Vercel Blob Configuration (for other services)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Base URL Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cron Job Security
CRON_SECRET=your-cron-secret

# External API Configuration
VVRL_API_KEY=your-vvrl-api-key

# Admin Authentication
NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

## Architecture Overview

### Multi-language Next.js App Router Structure
- Uses `[locale]` dynamic routing for internationalization (tw, cn, en, jp, es)
- Middleware handles locale detection and URL rewriting
- Default locale is 'en' (English), accessed via root path `/`
- Other locales use prefixed paths like `/tw/`, `/cn/`, `/jp/`, `/es/`

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **File Storage**: Vercel Blob for image uploads
- **Styling**: Tailwind CSS
- **Internationalization**: Custom middleware + next-intl
- **Authentication**: Supabase Auth (admin areas only)

### Git-based SEO System
- Automatic page date tracking using Git history
- `scripts/update-git-dates.mjs` extracts creation/modification dates
- `src/lib/utils.ts` contains `FILE_DATES` object and `getPageDates()` function
- Runs automatically during `npm run dev` and `npm run build`

### Core Features Architecture

#### Image Search Tool
- **Upload**: Files processed via `/api/upload` → Vercel Blob storage
- **Search**: Multiple engines (Google, Bing, Yandex, TinEye, SauceNAO)
- **Storage**: Search records saved to Supabase `image_searches` table
- **Components**: `ImageForm.tsx`, `SearchButtons.tsx`

#### Multi-tool Platform
- **Date Calculator**: Date difference and addition calculations
- **Due Date Calculator**: Pregnancy timeline calculator
- **Gift Exchange**: Random participant assignment with unique IDs
- **Short URL**: URL shortening service with click tracking
- **Image URL**: Image file upload with short URL generation (Cloudflare R2)
- **Video URL**: Video file upload with streaming and short URL generation (Bunny.net)
- **File URL**: General file upload with short URL generation (Cloudflare R2)
- **Color Picker**: Color selection and conversion tool
- **Contact Form**: User inquiry form with device info tracking

### Database Tables (Supabase)
- `image_searches` - 圖片搜索記錄（含設備資訊）
- `contact_messages` - 聯繫表單留言
- `gift_exchange_wheel` - 交換禮物轉盤
- `users` - 用戶認證（admin）

> 詳細結構請參考 `src/lib/supabase/` 目錄下的對應文件

### File Structure Patterns
- **Pages**: `src/app/[locale]/[feature]/page.tsx`
- **Components**: `src/app/[locale]/[feature]/components/`
- **API Routes**: `src/app/api/[endpoint]/route.ts`
- **Lib Functions**: `src/lib/[feature]/` (Supabase operations)
- **Shared Components**: `src/components/`

### Middleware / Proxy Logic
- **File**: `src/proxy.ts` (Vercel Edge Runtime)
- **Supported Locales**: `['tw', 'cn', 'en', 'jp', 'es']`, default: `en`
- **Features**:
  - Locale routing and URL rewriting (en uses root path `/`, others use `/{locale}/`)
  - Admin authentication for protected routes via Supabase
  - Static file and API route bypassing
  - Special handling for auth callbacks
  - 301 redirect from `/zh` to `/cn` (configured in `next.config.ts`)
- **Client-side locale handling**:
  - `LanguageSwitcher.tsx`: Saves preference to `localStorage.preferredLocale`
  - `LocaleRedirect.tsx`: Auto-redirects based on saved preference

### Device Information Tracking
- **Automatic Collection**: All upload forms and contact form collect device info via `/api/device-info`
- **Data Points**: Device type (desktop/mobile/tablet), browser, OS, country code, IP address
- **Privacy**: IP addresses are anonymized for privacy compliance
- **Fallback**: Forms work even if device info collection fails

### Important Notes
- All user-facing content is multilingual (tw/cn/en/jp/es)
- SEO dates are automatically maintained via Git integration
- Image uploads are limited to 15MB, video uploads to 100MB, general files to 20MB
- Admin areas require Supabase authentication
- All API routes include proper error handling and validation
- Device information is automatically tracked for analytics and debugging