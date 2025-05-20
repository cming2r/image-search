import { supabase } from '.';

/**
 * 检查用户是否为管理员
 * @param userId 用户ID
 * @returns 返回是否为管理员
 */
export async function isAdmin(userId: string | undefined) {
  if (!userId) return false;
  
  // 通过检查特定的管理员表或标记来确定用户是否为管理员
  // 这里我们使用简单的白名单方式，将来可以改为数据库查询
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  
  // 获取用户数据
  const { data: userData, error } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId)
    .single();
    
  if (error || !userData) return false;
  
  return adminEmails.includes(userData.email);
}


/**
 * 检查管理员权限
 * 用于客户端检查是否有管理员权限
 * @returns 返回是否有管理员权限
 */
export async function checkAdminPermission() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    return await isAdmin(user.id);
  } catch (error) {
    console.error('检查管理员权限错误:', error);
    return false;
  }
}


