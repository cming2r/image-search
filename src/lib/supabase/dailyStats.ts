import { supabase } from '.';

export interface DailyStats {
  date: string;
  total_searches: number;
  unique_images: number;
  unique_ips: number;
  device_breakdown: Record<string, number>;
  country_breakdown: Record<string, number>;
  search_engine_breakdown: Record<string, number>;
  browser_breakdown: Record<string, number>;
  os_breakdown: Record<string, number>;
}

/**
 * 計算指定日期的搜尋統計
 * @param targetDate 目標日期 (YYYY-MM-DD 格式)
 */
export async function calculateDailyStats(targetDate: string): Promise<DailyStats | null> {
  try {
    // 設定日期範圍 (當日 00:00 到 23:59:59.999)
    const startDate = `${targetDate}T00:00:00.000Z`;
    const endDate = `${targetDate}T23:59:59.999Z`;

    console.log(`計算 ${targetDate} 的統計數據...`);

    // 查詢當日所有搜尋記錄
    const { data: searches, error } = await supabase
      .from('image_searches')
      .select('*')
      .gte('searched_at', startDate)
      .lte('searched_at', endDate);

    if (error) {
      console.error('查詢搜尋記錄失敗:', error);
      return null;
    }

    if (!searches || searches.length === 0) {
      console.log(`${targetDate} 沒有搜尋記錄`);
      // 返回空統計
      return {
        date: targetDate,
        total_searches: 0,
        unique_images: 0,
        unique_ips: 0,
        device_breakdown: {},
        country_breakdown: {},
        search_engine_breakdown: {},
        browser_breakdown: {},
        os_breakdown: {}
      };
    }

    // 計算統計數據
    const stats: DailyStats = {
      date: targetDate,
      total_searches: searches.length,
      unique_images: new Set(searches.map(s => s.image_url)).size,
      unique_ips: new Set(searches.filter(s => s.ip_address).map(s => s.ip_address)).size,
      device_breakdown: {},
      country_breakdown: {},
      search_engine_breakdown: {},
      browser_breakdown: {},
      os_breakdown: {}
    };

    // 統計各項分佈
    searches.forEach(search => {
      // 設備類型分佈
      if (search.device_type) {
        stats.device_breakdown[search.device_type] = 
          (stats.device_breakdown[search.device_type] || 0) + 1;
      }

      // 國家分佈
      if (search.country_code && search.country_code !== 'XX') {
        stats.country_breakdown[search.country_code] = 
          (stats.country_breakdown[search.country_code] || 0) + 1;
      }

      // 瀏覽器分佈
      if (search.browser && search.browser !== 'unknown') {
        stats.browser_breakdown[search.browser] = 
          (stats.browser_breakdown[search.browser] || 0) + 1;
      }

      // 作業系統分佈
      if (search.os && search.os !== 'unknown') {
        stats.os_breakdown[search.os] = 
          (stats.os_breakdown[search.os] || 0) + 1;
      }

      // 搜尋引擎分佈
      if (search.search_engine && Array.isArray(search.search_engine)) {
        search.search_engine.forEach((engine: string) => {
          if (engine) {
            stats.search_engine_breakdown[engine] = 
              (stats.search_engine_breakdown[engine] || 0) + 1;
          }
        });
      }
    });

    console.log(`${targetDate} 統計完成:`, {
      總搜尋: stats.total_searches,
      不重複圖片: stats.unique_images,
      不重複IP: stats.unique_ips
    });

    return stats;

  } catch (error) {
    console.error('計算每日統計時發生錯誤:', error);
    return null;
  }
}

/**
 * 保存或更新每日統計到資料庫
 * @param stats 統計數據
 */
export async function saveDailyStats(stats: DailyStats): Promise<boolean> {
  try {
    console.log(`保存 ${stats.date} 的統計數據...`);

    // 使用 upsert 來保存或更新統計
    const { error } = await supabase
      .from('daily_search_stats')
      .upsert({
        date: stats.date,
        total_searches: stats.total_searches,
        unique_images: stats.unique_images,
        unique_ips: stats.unique_ips,
        device_breakdown: stats.device_breakdown,
        country_breakdown: stats.country_breakdown,
        search_engine_breakdown: stats.search_engine_breakdown,
        browser_breakdown: stats.browser_breakdown,
        os_breakdown: stats.os_breakdown,
        created_at: new Date().toISOString()
      }, {
        onConflict: 'date',
        ignoreDuplicates: false
      });

    if (error) {
      console.error('保存統計數據失敗:', error);
      return false;
    }

    console.log(`${stats.date} 統計數據保存成功`);
    return true;

  } catch (error) {
    console.error('保存統計數據時發生錯誤:', error);
    return false;
  }
}

/**
 * 產生並保存前一日的統計
 * @param daysAgo 幾天前 (預設為1，即昨天)
 */
export async function generatePreviousDayStats(daysAgo: number = 1): Promise<boolean> {
  try {
    // 計算目標日期
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);
    targetDate.setHours(0, 0, 0, 0); // 設定為當日開始時間
    
    const dateString = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD 格式

    console.log(`開始處理 ${dateString} 的統計數據...`);

    // 計算統計
    const stats = await calculateDailyStats(dateString);
    if (!stats) {
      console.error(`無法計算 ${dateString} 的統計數據`);
      return false;
    }

    // 保存統計
    const success = await saveDailyStats(stats);
    if (!success) {
      console.error(`無法保存 ${dateString} 的統計數據`);
      return false;
    }

    console.log(`${dateString} 統計處理完成`);
    return true;

  } catch (error) {
    console.error('產生前日統計時發生錯誤:', error);
    return false;
  }
}

/**
 * 獲取指定日期範圍的統計數據
 * @param startDate 開始日期 (YYYY-MM-DD)
 * @param endDate 結束日期 (YYYY-MM-DD)
 */
export async function getDailyStats(startDate: string, endDate: string) {
  try {
    const { data, error } = await supabase
      .from('daily_search_stats')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false });

    if (error) {
      console.error('獲取統計數據失敗:', error);
      return { success: false, error };
    }

    return { success: true, data };

  } catch (error) {
    console.error('獲取統計數據時發生錯誤:', error);
    return { success: false, error };
  }
}