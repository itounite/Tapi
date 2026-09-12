/**
 * Lightweight Page Tracker for Tapi Life
 */

export function trackPageView(_path: string = '/') {
  // Simple pageview ping to maintain total visit counter
  try {
    fetch('/api/visits', { method: 'POST' }).catch(() => {});
  } catch {
    // Ignore
  }
  return () => {};
}
