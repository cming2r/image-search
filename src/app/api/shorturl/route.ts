import { NextRequest, NextResponse } from 'next/server';
import { createShortUrl } from '@/lib/supabase';

function extractGoogleSearchQuery(url: string): string {
  try {
    const urlObj = new URL(url);
    const searchQuery = urlObj.searchParams.get('q');
    if (searchQuery) {
      return decodeURIComponent(searchQuery);
    }
    return '';
  } catch (error) {
    console.error('Error extracting Google search query:', error);
    return '';
  }
}

async function fetchWebpageTitle(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return '';
    }
    
    const html = await response.text();
    
    // Try multiple patterns to extract title
    let title = '';
    
    // Pattern 1: Standard title tag
    let titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }
    
    // Pattern 2: Title with CDATA
    if (!title) {
      titleMatch = html.match(/<title[^>]*><!\[CDATA\[([^\]]+)\]\]><\/title>/i);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].trim();
      }
    }
    
    // Pattern 3: Title with nested tags (remove inner HTML)
    if (!title) {
      titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
      }
    }
    
    if (title) {
      // Special handling for Google search results
      if (title === 'Google Search' && url.includes('google.com/search')) {
        const searchQuery = extractGoogleSearchQuery(url);
        if (searchQuery) {
          title = `${searchQuery} - Google Search`;
        }
      }
      
      // Decode HTML entities
      title = title
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
        .replace(/&#x([a-fA-F0-9]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
      
      // Clean up extra whitespace
      title = title.replace(/\s+/g, ' ').trim();
      
      return title;
    }
    
    return '';
  } catch (error) {
    console.error('Error fetching webpage title:', error);
    return '';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { original_url, title } = body;

    if (!original_url) {
      return NextResponse.json(
        { success: false, error: '網址不能為空' },
        { status: 400 }
      );
    }

    // Fetch webpage title if not provided
    let webpageTitle = title || '';
    
    if (!webpageTitle) {
      webpageTitle = await fetchWebpageTitle(original_url);
    }

    const result = await createShortUrl({ 
      original_url,
      title: webpageTitle,
      add_from: 'fyimg'
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        short_code: result.data?.short_code,
        short_url: `https://vvrl.cc/${result.data?.short_code}`,
        original_url: result.data?.original_url,
        title: result.data?.title || '',
        created_at: result.data?.created_at
      }
    });

  } catch (error) {
    console.error('API錯誤:', error);
    return NextResponse.json(
      { success: false, error: '伺服器錯誤，請重試' },
      { status: 500 }
    );
  }
}