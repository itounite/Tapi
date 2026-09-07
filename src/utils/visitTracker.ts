/**
 * Resilient Visit Tracker for Tapi Life
 * Works on both:
 * 1. Full-stack servers (Express backend with /api/visits)
 * 2. Static site hosting (Render Static Sites, Vercel, Netlify, GitHub Pages) via cloud fallback
 */

const LOCAL_STORAGE_KEY = 'tapi_total_visits';
const SESSION_STORAGE_KEY = 'tapi_session_counted';
const CLOUD_COUNTER_KEY = 'tapilife_site_visits_official';

/**
 * Get initial cached count synchronously for instant footer rendering without flicker
 */
export function getCachedVisits(): number | null {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const num = parseInt(cached, 10);
      if (!isNaN(num) && num > 0) return num;
    }
  } catch {
    // Ignore storage issues
  }
  return null;
}

/**
 * Record a visit and return the updated total visits count.
 */
export async function recordVisit(): Promise<number> {
  const isSessionCounted = (() => {
    try {
      return sessionStorage.getItem(SESSION_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  })();

  // 1. First attempt: Local Express /api/visits endpoint (with a quick 2.5s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const method = isSessionCounted ? 'GET' : 'POST';
    const res = await fetch('/api/visits', {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      const count = typeof data.totalVisits === 'number'
        ? data.totalVisits
        : typeof data.visits === 'number'
          ? data.visits
          : data.visits24h;

      if (typeof count === 'number' && count > 0) {
        saveLocalCount(count);
        markSessionCounted();
        return count;
      }
    }
  } catch {
    // Local /api/visits is not available (e.g. deployed as a Render Static Site)
  }

  // 2. Second attempt: Cloud hit counter (works seamlessly on static sites)
  try {
    const action = isSessionCounted ? 'get' : 'hit';
    const res = await fetch(`https://countapi.mileshilliard.com/api/v1/${action}/${CLOUD_COUNTER_KEY}`, {
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number' && data.value > 0) {
        saveLocalCount(data.value);
        markSessionCounted();
        return data.value;
      }
    }
  } catch {
    // Primary cloud counter failed, try backup
  }

  // 3. Third attempt: Backup cloud counter
  try {
    const action = isSessionCounted ? 'get' : 'hit';
    const res = await fetch(`https://abacus.jasoncameron.dev/${action}/tapilife/visits`, {
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number' && data.value > 0) {
        saveLocalCount(data.value);
        markSessionCounted();
        return data.value;
      }
    }
  } catch {
    // Network completely offline or firewalled
  }

  // 4. Offline fallback: use local cache
  const cached = getCachedVisits() ?? 1;
  const nextCount = isSessionCounted ? cached : cached + 1;
  saveLocalCount(nextCount);
  markSessionCounted();
  return nextCount;
}

function saveLocalCount(count: number) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, count.toString());
  } catch {
    // Ignore
  }
}

function markSessionCounted() {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, '1');
  } catch {
    // Ignore
  }
}
