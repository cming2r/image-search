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
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CRON_SECRET=your-cron-secret
```

## Architecture Overview

### Multi-language Next.js App Router Structure
- Uses `[locale]` dynamic routing for internationalization (zh, en, jp, es)
- Middleware handles locale detection and URL rewriting
- Default locale is 'zh' (Chinese), accessed via root path `/`
- Other locales use prefixed paths like `/en/`, `/jp/`

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
- **Color Picker**: Color selection and conversion tool

### Database Schema (Supabase)
```sql
-- Main table for tracking image searches
CREATE TABLE image_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  search_engine TEXT NOT NULL,
  device_type TEXT NOT NULL,
  country_code TEXT,
  browser TEXT,
  os TEXT,
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### File Structure Patterns
- **Pages**: `src/app/[locale]/[feature]/page.tsx`
- **Components**: `src/app/[locale]/[feature]/components/`
- **API Routes**: `src/app/api/[endpoint]/route.ts`
- **Lib Functions**: `src/lib/[feature]/` (Supabase operations)
- **Shared Components**: `src/components/`

### Middleware Logic
- Handles locale routing and URL rewriting
- Admin authentication for protected routes
- Static file and API route bypassing
- Special handling for auth callbacks

### Important Notes
- All user-facing content is multilingual (zh/en/jp/es)
- SEO dates are automatically maintained via Git integration
- Image uploads are limited to 5MB
- Admin areas require Supabase authentication
- All API routes include proper error handling and validation