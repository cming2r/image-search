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
  const ua = userAgent.toLowerCase();
  
  // iOS 設備（需要在 Mac 之前檢查，因為 iOS 也包含 Mac 字串）
  if (ua.includes('iphone') || ua.includes('ipod') || ua.includes('ipad')) {
    return 'iOS';
  }
  
  // Android 系統
  if (ua.includes('android')) {
    return 'Android';
  }
  
  // Windows 系統（包含所有版本）
  if (ua.includes('windows')) {
    return 'Windows';
  }
  
  // macOS 系統
  if (ua.includes('mac os x') || ua.includes('macos') || ua.includes('macintosh')) {
    return 'macOS';
  }
  
  // Linux 系統（統一為 GNU/Linux）
  if (ua.includes('ubuntu') || ua.includes('debian') || ua.includes('fedora') || 
      ua.includes('centos') || ua.includes('red hat') || ua.includes('suse') || 
      ua.includes('mint') || ua.includes('arch') || ua.includes('linux')) {
    return 'GNU/Linux';
  }
  
  // Chrome OS
  if (ua.includes('cros')) {
    return 'Chrome OS';
  }
  
  // Symbian
  if (ua.includes('symbian') || ua.includes('symbos') || ua.includes('s60')) {
    return 'Symbian';
  }
  
  // BlackBerry
  if (ua.includes('blackberry') || ua.includes('bb10')) {
    return 'BlackBerry';
  }
  
  // 其他系統
  if (ua.includes('freebsd')) {
    return 'FreeBSD';
  }
  if (ua.includes('webos')) {
    return 'webOS';
  }
  if (ua.includes('tizen')) {
    return 'Tizen';
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
    
    // 方法 4: 使用外部 IP 地理位置服務
    // 本地環境：先嘗試獲取真實 IP，再進行地理位置查詢
    const shouldTryGeoLocation = ip && ip !== '' && ip !== '127.0.0.1' && ip !== '::1';
    const isLocalhost = ip === '127.0.0.1' || ip === '::1';
    
    if (shouldTryGeoLocation || isLocalhost) {
      let targetIP = ip;
      
      // 本地環境：先獲取真實 IP
      if (isLocalhost) {
        try {
          const ipifyResponse = await fetch('https://api.ipify.org?format=json');
          if (ipifyResponse.ok) {
            const ipData = await ipifyResponse.json();
            targetIP = ipData.ip;
          }
        } catch (error) {
          console.error('Failed to get real IP:', error);
        }
      }
      
      if (targetIP && targetIP !== '127.0.0.1' && targetIP !== '::1') {
        try {
          // 使用 ipapi.co
          const controller1 = new AbortController();
          const timeoutId1 = setTimeout(() => controller1.abort(), 3000);
          
          const response1 = await fetch(`https://ipapi.co/${targetIP}/json/`, {
            signal: controller1.signal
          });
          
          clearTimeout(timeoutId1);
          
          if (response1.ok) {
            const data = await response1.json();
            if (data.country_code && data.country_code !== 'XX') {
              return {
                country_code: data.country_code,
                ip_address: data.ip || targetIP
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
          
          const response2 = await fetch(`https://ipwho.is/${targetIP}`, {
            signal: controller2.signal
          });
          
          clearTimeout(timeoutId2);
          
          if (response2.ok) {
            const data = await response2.json();
            if (data.country_code && data.country_code !== 'XX') {
              return {
                country_code: data.country_code,
                ip_address: data.ip || targetIP
              };
            }
          }
        } catch (error) {
          console.error('ipwho.is error:', error);
        }
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