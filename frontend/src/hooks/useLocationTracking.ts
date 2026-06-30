import { useEffect, useRef } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081';

interface TrackingData {
  userId: string;
  ip: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  browser: string;
  os: string;
  device: string;
  screenResolution: string;
  language: string;
  timezone: string;
  userAgent: string;
  referrer: string;
  pageUrl: string;
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('MSIE') || ua.includes('Trident')) return 'Internet Explorer';
  return 'Unknown';
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
}

function getDevice(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Mobile')) return 'Mobile';
  if (ua.includes('Tablet')) return 'Tablet';
  return 'Desktop';
}

async function getIpAddress(): Promise<string> {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return data.ip;
  } catch {
    return '0.0.0.0';
  }
}

async function getGeolocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 0, lng: 0 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve({ lat: 0, lng: 0 }),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
}

async function getCityCountry(lat: number, lng: number): Promise<{ city: string; country: string }> {
  if (lat === 0 && lng === 0) return { city: 'Unknown', country: 'Unknown' };
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      { signal: AbortSignal.timeout(3000) }
    );
    const data = await res.json();
    const addr = data.address || {};
    return {
      city: addr.city || addr.town || addr.village || addr.county || 'Unknown',
      country: addr.country || 'Unknown',
    };
  } catch {
    return { city: 'Unknown', country: 'Unknown' };
  }
}

export function useLocationTracking() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const consent = localStorage.getItem('cookieConsent');
    if (!consent) return;

    const userId = localStorage.getItem('userId') || 'anonymous';

    (async () => {
      try {
        const ip = await getIpAddress();
        const geo = await getGeolocation();
        const loc = await getCityCountry(geo.lat, geo.lng);

        const data: TrackingData = {
          userId,
          ip,
          latitude: geo.lat,
          longitude: geo.lng,
          city: loc.city,
          country: loc.country,
          browser: getBrowser(),
          os: getOS(),
          device: getDevice(),
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          pageUrl: window.location.href,
        };

        await fetch(`${API_BASE}/api/tracking/location`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        await fetch(`${API_BASE}/api/tracking/activity`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            ip,
            action: 'page_view',
            page: window.location.pathname,
            details: document.title,
          }),
        });
      } catch {
        // Silent fail - tracking is best-effort
      }
    })();
  }, []);
}

export async function trackActivity(action: string, details: string = '') {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) return;

  try {
    await fetch(`${API_BASE}/api/tracking/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('userId') || 'anonymous',
        action,
        page: window.location.pathname,
        details,
      }),
    });
  } catch {
    // Silent fail
  }
}
