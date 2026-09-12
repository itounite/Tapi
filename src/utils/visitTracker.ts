/**
 * Resilient Visit & Analytics Tracker for Tapi Life
 * Tracks pageviews, session IDs, and active duration on pages
 * Works seamlessly across development, Render, and static previews
 */

const LOCAL_STORAGE_KEY = 'tapi_total_visits';
const SESSION_STORAGE_KEY = 'tapi_session_id';
export const CLIENT_ARCHIVE_KEY = 'tapi_metrics_archive';

export interface ClientArchivedVisit {
  id: string;
  pageId: string;
  sessionId: string;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  path: string;
  referrer: string;
  device: 'Mobile' | 'Tablet' | 'Desktop' | 'Other';
  browser: string;
  os: string;
  timestamp: number;
  helsinkiTime: string;
  durationSeconds: number;
  lastActive: number;
}

/**
 * Get all visits archived in browser localStorage
 */
export function getArchivedVisits(): ClientArchivedVisit[] {
  try {
    const raw = localStorage.getItem(CLIENT_ARCHIVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignore
  }
  return [];
}

/**
 * Save / update visits in browser localStorage
 */
export function saveArchivedVisits(records: ClientArchivedVisit[]) {
  try {
    // Keep max 1000 records in client storage
    const trimmed = records.slice(0, 1000);
    localStorage.setItem(CLIENT_ARCHIVE_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore
  }
}

/**
 * Merge new visit records into browser localStorage
 */
export function mergeClientArchive(records: ClientArchivedVisit[]) {
  if (!Array.isArray(records) || records.length === 0) return;
  const current = getArchivedVisits();
  const idMap = new Map<string, ClientArchivedVisit>();
  for (const r of current) idMap.set(r.id, r);
  for (const r of records) {
    if (!r || !r.id) continue;
    const existing = idMap.get(r.id);
    if (existing) {
      existing.durationSeconds = Math.max(existing.durationSeconds || 0, r.durationSeconds || 0);
      existing.lastActive = Math.max(existing.lastActive || 0, r.lastActive || 0);
    } else {
      idMap.set(r.id, r);
    }
  }
  const merged = Array.from(idMap.values()).sort((a, b) => b.timestamp - a.timestamp);
  saveArchivedVisits(merged);
}

// In-memory guard to prevent duplicate rapid tracking calls (e.g. React StrictMode)
let lastTrackedPath = '';
let lastTrackedTime = 0;
let lastPageId = '';

/**
 * Get or create a unique session ID for the current browser session
 */
function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sid) {
      sid = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
    }
    return sid;
  } catch {
    return `s_${Date.now()}`;
  }
}

/**
 * Get initial cached count synchronously
 */
export function getCachedVisits(): number | null {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const num = parseInt(cached, 10);
      if (!isNaN(num) && num > 0) return num;
    }
  } catch {
    // Ignore
  }
  return null;
}

/**
 * Send heartbeat duration update
 */
function sendHeartbeat(pageId: string, durationSeconds: number) {
  if (!pageId) return;
  const payload = JSON.stringify({ pageId, durationSeconds: Math.round(durationSeconds) });

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    const success = navigator.sendBeacon('/api/metrics/heartbeat', blob);
    if (success) return;
  }

  // Fallback to fetch keepalive
  fetch('/api/metrics/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

/**
 * Track an active pageview with real-time duration and heartbeat
 * Returns a cleanup function to call when navigating away or unmounting
 */
export function trackPageView(path: string): () => void {
  const nowMs = Date.now();
  // Prevent duplicate execution on rapid StrictMode double-mounting
  if (lastTrackedPath === path && nowMs - lastTrackedTime < 1500 && lastPageId) {
    return () => {};
  }

  const pageId = `p_${nowMs}_${Math.random().toString(36).slice(2, 8)}`;
  lastTrackedPath = path;
  lastTrackedTime = nowMs;
  lastPageId = pageId;

  const sessionId = getSessionId();
  let durationSeconds = 0;
  let lastActiveTimestamp = Date.now();
  let isTracking = true;

  // Extract browser timezone / language client hint for fallback geo
  const clientHint = {
    timeZone: (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch {
        return '';
      }
    })(),
    language: typeof navigator !== 'undefined' ? navigator.language : '',
  };

  // 1. Send initial pageview track request
  fetch('/api/metrics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path,
      pageId,
      sessionId,
      referrer: typeof document !== 'undefined' ? document.referrer : 'Direct',
      clientHint,
    }),
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      // Also sync legacy visits count in localStorage
      if (data && typeof data.totalVisits === 'number') {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, data.totalVisits.toString());
        } catch {
          // Ignore
        }
      }
    })
    .catch(() => {
      // Backend may be static-only; ignore gracefully
    });

  // 2. Active duration ticker (runs every 1 second)
  const intervalId = setInterval(() => {
    if (!isTracking) return;
    // Only accumulate time if tab is visible and active
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      const now = Date.now();
      const delta = (now - lastActiveTimestamp) / 1000;
      // Cap gap at 5s in case computer went to sleep
      if (delta < 5) {
        durationSeconds += delta;
      }
      lastActiveTimestamp = now;

      // Send heartbeat every 15 seconds
      if (Math.round(durationSeconds) % 15 === 0 && durationSeconds > 0) {
        sendHeartbeat(pageId, durationSeconds);
      }
    } else {
      lastActiveTimestamp = Date.now();
    }
  }, 1000);

  // 3. Flush on visibility changes (tab hidden or window closing)
  const handleVisibilityChange = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      sendHeartbeat(pageId, durationSeconds);
    } else {
      lastActiveTimestamp = Date.now();
    }
  };

  const handleBeforeUnload = () => {
    sendHeartbeat(pageId, durationSeconds);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
  }

  // Cleanup function when unmounting or navigating
  return () => {
    isTracking = false;
    clearInterval(intervalId);
    if (typeof window !== 'undefined') {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
    }
    // Flush final duration
    sendHeartbeat(pageId, durationSeconds);
  };
}

/**
 * Legacy visit recorder for fallback
 */
export async function recordVisit(): Promise<number> {
  try {
    const res = await fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      const count = typeof data.totalVisits === 'number' ? data.totalVisits : data.visits;
      if (typeof count === 'number') {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, count.toString());
        } catch {
          // Ignore
        }
        return count;
      }
    }
  } catch {
    // Ignore
  }
  return getCachedVisits() ?? 1;
}
