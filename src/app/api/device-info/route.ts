import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

function getDeviceType(userAgent: string): string {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

function getBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg') && !userAgent.includes('OPR')) {
    return 'Chrome';
  }
  if (userAgent.includes('Firefox')) {
    return 'Firefox';
  }
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  }
  if (userAgent.includes('Edg')) {
    return 'Edge';
  }
  if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
    return 'Opera';
  }
  if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    return 'Internet Explorer';
  }
  return 'Unknown';
}

function getOS(userAgent: string): string {
  if (userAgent.includes('Windows')) {
    return 'Windows';
  }
  if (userAgent.includes('Mac')) {
    return 'MacOS';
  }
  if (userAgent.includes('Linux')) {
    return 'Linux';
  }
  if (userAgent.includes('Android')) {
    return 'Android';
  }
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    return 'iOS';
  }
  return 'Unknown';
}

async function getLocationInfo(request: NextRequest): Promise<{ country_code: string; ip_address: string }> {
  try {
    // 獲取 IP 地址
    const ip = (request as NextRequest & { ip?: string }).ip || 
              request.headers.get('x-forwarded-for')?.split(',')[0] ||
              request.headers.get('x-real-ip') ||
              '';
    
    // 方法 1: Vercel Edge Runtime 地理資訊
    const geo = (request as NextRequest & { geo?: { country?: string } }).geo;
    
    if (geo?.country && geo.country !== 'XX') {
      return {
        country_code: geo.country,
        ip_address: ip
      };
    }
    
    // 方法 2: Cloudflare 標頭 (如果有)
    const cfCountry = request.headers.get('cf-ipcountry');
    const cfIP = request.headers.get('cf-connecting-ip');
    
    if (cfCountry && cfCountry !== 'XX') {
      return {
        country_code: cfCountry,
        ip_address: cfIP || ip
      };
    }
    
    // 方法 3: 其他常見的地理標頭
    const headers = [
      'x-country-code',
      'x-geo-country-code',
      'x-client-country-code'
    ];
    
    for (const header of headers) {
      const countryCode = request.headers.get(header);
      if (countryCode && countryCode !== 'XX') {
        return {
          country_code: countryCode,
          ip_address: ip
        };
      }
    }
    
    // 方法 4: 使用外部 IP 地理位置服務 (如果有 IP)
    if (ip && ip !== '' && ip !== '127.0.0.1' && ip !== '::1') {
      try {
        // 使用 ipapi.co
        const controller1 = new AbortController();
        const timeoutId1 = setTimeout(() => controller1.abort(), 3000);
        
        const response1 = await fetch(`https://ipapi.co/${ip}/json/`, {
          signal: controller1.signal
        });
        
        clearTimeout(timeoutId1);
        
        if (response1.ok) {
          const data = await response1.json();
          if (data.country_code && data.country_code !== 'XX') {
            return {
              country_code: data.country_code,
              ip_address: data.ip || ip
            };
          }
        }
      } catch (error) {
        console.error('ipapi.co error:', error);
      }
      
      try {
        // 備用方案：使用 ipwho.is
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 3000);
        
        const response2 = await fetch(`https://ipwho.is/${ip}`, {
          signal: controller2.signal
        });
        
        clearTimeout(timeoutId2);
        
        if (response2.ok) {
          const data = await response2.json();
          if (data.country_code && data.country_code !== 'XX') {
            return {
              country_code: data.country_code,
              ip_address: data.ip || ip
            };
          }
        }
      } catch (error) {
        console.error('ipwho.is error:', error);
      }
    }
    
    // 如果都沒有，返回預設值
    return {
      country_code: 'XX',
      ip_address: ip
    };
    
  } catch (error) {
    console.error('Location detection error:', error);
    return {
      country_code: 'XX',
      ip_address: ''
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    
    // 獲取位置資訊
    const locationInfo = await getLocationInfo(request);
    
    const deviceInfo = {
      device_type: getDeviceType(userAgent),
      browser: getBrowser(userAgent),
      os: getOS(userAgent),
      country_code: locationInfo.country_code,
      ip_address: locationInfo.ip_address,
      timestamp: new Date().toISOString(),
      // 調試資訊 (生產環境可以移除)
      debug: {
        vercel_geo: (request as NextRequest & { geo?: unknown }).geo,
        headers: {
          'cf-ipcountry': request.headers.get('cf-ipcountry'),
          'x-forwarded-for': request.headers.get('x-forwarded-for'),
          'x-real-ip': request.headers.get('x-real-ip')
        }
      }
    };
    
    return NextResponse.json(deviceInfo);
  } catch (error) {
    console.error('Device info detection error:', error);
    return NextResponse.json({
      device_type: 'unknown',
      browser: 'unknown',
      os: 'unknown',
      country_code: 'XX',
      ip_address: '',
      timestamp: new Date().toISOString()
    });
  }
}