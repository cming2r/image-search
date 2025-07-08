import { supabase } from './index';

export interface ShortUrlData {
  id: string;
  short_code: string;
  original_url: string;
  created_at: string;
  title: string;
  click_count: number;
  add_from: string;
  country_code?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  ip_address?: string;
}

export interface CreateShortUrlParams {
  original_url: string;
  title?: string;
  add_from?: string;
  country_code?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  ip_address?: string;
}

function generateShortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createShortUrl(params: CreateShortUrlParams): Promise<{ success: boolean; data?: ShortUrlData; error?: string }> {
  try {
    const { original_url, title, add_from, country_code, device_type, browser, os, ip_address } = params;
    
    if (!original_url) {
      return { success: false, error: '網址不能為空' };
    }

    try {
      new URL(original_url);
    } catch {
      return { success: false, error: '請輸入有效的網址' };
    }

    let short_code = '';
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      short_code = generateShortCode();
      
      const { data: existing } = await supabase
        .from('shorturl')
        .select('short_code')
        .eq('short_code', short_code)
        .single();
      
      if (!existing) {
        break;
      }
      attempts++;
    }

    if (attempts >= maxAttempts) {
      return { success: false, error: '無法生成唯一的短網址，請重試' };
    }

    const { data, error } = await supabase
      .from('shorturl')
      .insert({
        short_code,
        original_url,
        title: title || '',
        created_at: new Date().toISOString(),
        click_count: 0,
        add_from: add_from || '',
        country_code: country_code || '',
        device_type: device_type || '',
        browser: browser || '',
        os: os || '',
        ip_address: ip_address || ''
      })
      .select()
      .single();

    if (error) {
      console.error('創建短網址失敗:', error);
      return { success: false, error: '創建短網址失敗' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('創建短網址錯誤:', error);
    return { success: false, error: '系統錯誤，請重試' };
  }
}

export async function getShortUrl(short_code: string): Promise<{ success: boolean; data?: ShortUrlData; error?: string }> {
  try {
    if (!short_code) {
      return { success: false, error: '短網址代碼不能為空' };
    }

    const { data, error } = await supabase
      .from('shorturl')
      .select('*')
      .eq('short_code', short_code)
      .single();

    if (error) {
      console.error('查詢短網址失敗:', error);
      return { success: false, error: '短網址不存在' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('查詢短網址錯誤:', error);
    return { success: false, error: '系統錯誤，請重試' };
  }
}

export async function updateClickCount(short_code: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!short_code) {
      return { success: false, error: '短網址代碼不能為空' };
    }

    const { data: current } = await supabase
      .from('shorturl')
      .select('click_count')
      .eq('short_code', short_code)
      .single();

    const { error } = await supabase
      .from('shorturl')
      .update({
        click_count: (current?.click_count || 0) + 1,
        last_clicked_at: new Date().toISOString()
      })
      .eq('short_code', short_code);

    if (error) {
      console.error('更新點擊次數失敗:', error);
      return { success: false, error: '更新失敗' };
    }

    return { success: true };
  } catch (error) {
    console.error('更新點擊次數錯誤:', error);
    return { success: false, error: '系統錯誤' };
  }
}