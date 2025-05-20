import { supabase } from '.';

/**
 * 礼物交换结果类型
 */
export type GiftExchangeResult = string;

/**
 * 礼物交换参与者数据接口
 */
export interface GiftExchangeData {
  code: string;
  participantCount?: number;
  participantNames: string[];
  results: GiftExchangeResult[];
  showResultsDirectly?: boolean;
}

/**
 * 创建新的礼物交换活动
 * @param data 礼物交换数据
 * @returns 返回创建结果
 */
export async function createGiftExchange(data: GiftExchangeData) {
  try {
    console.log('创建礼物交换活动，数据:', JSON.stringify(data));
    
    // 格式化数据以符合数据库需求
    const insertData = {
      code: data.code,
      participant_count: data.participantCount || data.participantNames.length,
      participant_names: Array.isArray(data.participantNames) ? data.participantNames : [],
      results: data.results || []
    };
    
    console.log('准备插入数据:', JSON.stringify(insertData));

    // 用简化的表结构存储交换礼物活动
    const { data: insertedData, error: eventError } = await supabase
      .from('gift_exchange_wheel')
      .insert([insertData])
      .select();

    if (eventError) {
      console.error('建立活动错误:', eventError);
      return { 
        success: false, 
        error: eventError 
      };
    }

    console.log('活动建立成功!', insertedData);

    // 返回成功结果
    return {
      success: true,
      message: '交换礼物活动已建立',
      code: data.code,
      data: insertedData,
      showResultsDirectly: data.showResultsDirectly
    };
  } catch (error) {
    console.error('创建礼物交换活动失败:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * 更新礼物交换活动结果
 * @param code 活动代码
 * @param result 新结果
 * @returns 返回更新结果
 */
export async function updateGiftExchangeResult(code: string, result: GiftExchangeResult) {
  try {
    if (!code || !result) {
      return { 
        success: false, 
        error: '缺少必要字段 code 或 result' 
      };
    }
    
    // 先获取现有的活动数据
    const { data: existingData, error: fetchError } = await supabase
      .from('gift_exchange_wheel')
      .select('results')
      .eq('code', code)
      .single();
      
    if (fetchError) {
      console.error('获取活动数据错误:', fetchError);
      return { 
        success: false, 
        error: fetchError 
      };
    }
    
    // 将新结果添加到结果列表中
    const currentResults = existingData?.results || [];
    const updatedResults = [...currentResults, result];
    
    // 更新数据库
    const { data: updatedData, error: updateError } = await supabase
      .from('gift_exchange_wheel')
      .update({ results: updatedResults })
      .eq('code', code)
      .select();
      
    if (updateError) {
      console.error('更新活动结果错误:', updateError);
      return { 
        success: false, 
        error: updateError 
      };
    }
    
    return {
      success: true,
      message: '活动结果已更新',
      data: updatedData
    };
  } catch (error) {
    console.error('更新礼物交换活动结果失败:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * 获取礼物交换活动信息
 * @param code 活动代码
 * @returns 返回活动数据
 */
export async function getGiftExchange(code: string) {
  try {
    if (!code) {
      return { 
        success: false, 
        error: '缺少活动代码' 
      };
    }

    // 获取活动信息
    const { data: eventData, error: eventError } = await supabase
      .from('gift_exchange_wheel')
      .select('*')
      .eq('code', code)
      .single();

    if (eventError) {
      console.error('查询活动错误:', eventError);
      // 如果是找不到数据的错误
      if (eventError.code === 'PGRST116') {
        return { 
          success: false, 
          error: '找不到活动',
          notFound: true
        };
      }
      // 其他错误
      return { 
        success: false, 
        error: eventError 
      };
    }

    if (!eventData) {
      return { 
        success: false, 
        error: '找不到活动',
        notFound: true
      };
    }

    // 返回所有数据
    return {
      success: true,
      data: eventData
    };
  } catch (error) {
    console.error('获取礼物交换活动信息失败:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}