/**
 * 简单的内存速率限制器
 * 基于 IP 地址限制请求频率
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests; // 每个时间窗口的最大请求数
    this.windowMs = windowMs; // 时间窗口（毫秒）

    // 启动定期清理过期条目
    this.startCleanup();
  }

  /**
   * 检查是否允许请求
   * @param identifier - 识别符（通常是 IP 地址）
   * @returns {allowed: boolean, remaining: number, resetTime: number}
   */
  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // 如果没有记录或已过期，创建新记录
    if (!entry || now > entry.resetTime) {
      const resetTime = now + this.windowMs;
      this.requests.set(identifier, { count: 1, resetTime });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime
      };
    }

    // 检查是否超过限制
    if (entry.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime
      };
    }

    // 增加计数
    entry.count++;
    this.requests.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }

  /**
   * 重置某个识别符的限制
   */
  reset(identifier: string): void {
    this.requests.delete(identifier);
  }

  /**
   * 清除所有限制
   */
  clear(): void {
    this.requests.clear();
  }

  /**
   * 启动定期清理过期条目
   */
  private startCleanup(): void {
    // 每分钟清理一次过期条目
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.requests.entries()) {
        if (now > entry.resetTime) {
          this.requests.delete(key);
        }
      }
    }, 60000);
  }

  /**
   * 停止清理任务
   */
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

// 创建全局实例
// 限制：每个 IP 每分钟最多 10 次请求
export const uploadRateLimiter = new RateLimiter(10, 60000);

/**
 * 从请求中获取 IP 地址
 */
export function getClientIP(request: Request): string {
  // 尝试从各种头部获取真实 IP
  const headers = new Headers(request.headers);

  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const cfIP = headers.get('cf-connecting-ip');
  if (cfIP) {
    return cfIP;
  }

  // 如果都没有，返回默认值
  return 'unknown';
}

/**
 * 检查速率限制的辅助函数
 */
export function checkRateLimit(
  request: Request,
  limiter: RateLimiter = uploadRateLimiter
): { allowed: boolean; remaining: number; resetTime: number; ip: string } {
  const ip = getClientIP(request);
  const result = limiter.check(ip);

  return {
    ...result,
    ip
  };
}
