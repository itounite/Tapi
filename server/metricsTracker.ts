import fs from "fs";
import path from "path";

export interface MetricVisitRecord {
  id: string;
  pageId: string;
  sessionId: string;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  path: string;
  referrer: string;
  device: "Mobile" | "Tablet" | "Desktop" | "Other";
  browser: string;
  os: string;
  timestamp: number; // UTC ms
  helsinkiTime: string; // YYYY-MM-DD HH:mm:ss
  durationSeconds: number;
  lastActive: number; // UTC ms
}

const DATA_DIR = path.join(process.cwd(), "data");
const METRICS_FILE = path.join(DATA_DIR, "metrics_log.json");
const GEO_CACHE_FILE = path.join(DATA_DIR, "geo_cache.json");

// 90 days retention window in milliseconds
const MAX_RETENTION_MS = 90 * 24 * 60 * 60 * 1000;

export const METRICS_PASSWORD = process.env.METRICS_PASSWORD || "itowillunite";

let visits: MetricVisitRecord[] = [];
let geoCache: Record<string, { country: string; countryCode: string; city: string }> = {};

/**
 * Format a timestamp into Helsinki timezone string (Europe/Helsinki)
 */
export function formatHelsinkiTime(timestamp: number | Date = Date.now()): string {
  const d = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Helsinki",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(d);

    const map: Record<string, string> = {};
    for (const p of parts) {
      map[p.type] = p.value;
    }
    return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`;
  } catch {
    return d.toISOString().replace("T", " ").slice(0, 19);
  }
}

/**
 * Initialize metrics tracker from disk
 */
export function initMetricsTracker() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(GEO_CACHE_FILE)) {
      try {
        geoCache = JSON.parse(fs.readFileSync(GEO_CACHE_FILE, "utf-8"));
      } catch {
        geoCache = {};
      }
    }

    if (fs.existsSync(METRICS_FILE)) {
      try {
        const raw = fs.readFileSync(METRICS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const now = Date.now();
          // Filter to maximum 90 days and ensure only real, non-seeded records are loaded
          visits = parsed.filter(
            (v) =>
              typeof v.timestamp === "number" &&
              now - v.timestamp <= MAX_RETENTION_MS &&
              !v.id?.startsWith("v_seed_")
          );
        }
      } catch (err) {
        console.error("Failed to parse metrics_log.json:", err);
        visits = [];
      }
    }
  } catch (err) {
    console.error("Error initializing metrics tracker:", err);
  }
}

function saveGeoCache() {
  try {
    fs.writeFileSync(GEO_CACHE_FILE, JSON.stringify(geoCache), "utf-8");
  } catch (err) {
    console.error("Failed to write geo_cache.json:", err);
  }
}

let saveTimeout: NodeJS.Timeout | null = null;
function debouncedSaveMetrics() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const now = Date.now();
      // Keep strictly authentic real visits within 90 days
      const pruned = visits.filter(
        (v) => now - v.timestamp <= MAX_RETENTION_MS && !v.id?.startsWith("v_seed_")
      );
      fs.writeFileSync(METRICS_FILE, JSON.stringify(pruned), "utf-8");
    } catch (err) {
      console.error("Failed to write metrics_log.json:", err);
    }
  }, 1000);
}

/**
 * Detect device type from user agent
 */
function parseDevice(userAgent: string): "Mobile" | "Tablet" | "Desktop" | "Other" {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "Tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "Mobile";
  if (/bot|crawl|spider|slurp|facebookexternalhit|whatsapp|googlebot/i.test(ua)) return "Other";
  return "Desktop";
}

/**
 * Detect browser from user agent
 */
function parseBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("chrome") && !ua.includes("edg/")) return "Chrome";
  if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("opera") || ua.includes("opr/")) return "Opera";
  if (ua.includes("samsungbrowser")) return "Samsung Browser";
  return "Other";
}

/**
 * Detect OS from user agent
 */
function parseOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("windows")) return "Windows";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macOS";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios")) return "iOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("linux")) return "Linux";
  return "Other";
}

/**
 * Resolve IP Geo location
 */
async function resolveIpGeo(ip: string, clientHint?: { country?: string; countryCode?: string; city?: string }) {
  // Check private or local IPs
  if (
    !ip ||
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "localhost" ||
    ip.startsWith("::ffff:127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)
  ) {
    return {
      country: clientHint?.country || "Local / Preview",
      countryCode: clientHint?.countryCode || "DEV",
      city: clientHint?.city || "Localhost",
    };
  }

  // Check in-memory cache
  if (geoCache[ip]) {
    return geoCache[ip];
  }

  // Perform lookup
  try {
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,city`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.status === "success") {
        const result = {
          country: data.country || "Unknown",
          countryCode: data.countryCode || "--",
          city: data.city || "",
        };
        geoCache[ip] = result;
        saveGeoCache();
        return result;
      }
    }
  } catch {
    // Geo fetch timeout or error
  }

  // Fallback to client hint if provided
  const fallback = {
    country: clientHint?.country || "International",
    countryCode: clientHint?.countryCode || "--",
    city: clientHint?.city || "",
  };
  geoCache[ip] = fallback;
  return fallback;
}

/**
 * Clean up IP address from header
 */
export function extractClientIp(rawHeader?: string | string[], remoteAddr?: string): string {
  if (rawHeader) {
    const headerStr = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;
    const first = headerStr.split(",")[0].trim();
    if (first) return first;
  }
  return remoteAddr || "127.0.0.1";
}

/**
 * Record a pageview visit
 */
export async function trackVisit(params: {
  ip: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  sessionId?: string;
  pageId?: string;
  clientHint?: { country?: string; countryCode?: string; city?: string };
}): Promise<MetricVisitRecord> {
  const timestamp = Date.now();
  const helsinkiTime = formatHelsinkiTime(timestamp);
  const userAgent = params.userAgent || "";
  const pageId = params.pageId || `p_${timestamp}_${Math.random().toString(36).slice(2, 7)}`;
  const sessionId = params.sessionId || `s_${timestamp}_${Math.random().toString(36).slice(2, 7)}`;

  // Determine geo
  const geo = await resolveIpGeo(params.ip, params.clientHint);

  const newRecord: MetricVisitRecord = {
    id: `v_${timestamp}_${Math.random().toString(36).slice(2, 7)}`,
    pageId,
    sessionId,
    ip: params.ip,
    country: geo.country,
    countryCode: geo.countryCode,
    city: geo.city,
    path: params.path || "/",
    referrer: params.referrer || "Direct",
    device: parseDevice(userAgent),
    browser: parseBrowser(userAgent),
    os: parseOS(userAgent),
    timestamp,
    helsinkiTime,
    durationSeconds: 0,
    lastActive: timestamp,
  };

  visits.unshift(newRecord);

  // Prune memory if larger than 20000 records
  if (visits.length > 20000) {
    visits = visits.slice(0, 20000);
  }

  debouncedSaveMetrics();
  return newRecord;
}

/**
 * Record heartbeat or duration update for an active pageview
 */
export function updateHeartbeat(params: { pageId: string; durationSeconds: number }): boolean {
  if (!params.pageId) return false;
  const visit = visits.find((v) => v.pageId === params.pageId);
  if (visit) {
    visit.durationSeconds = Math.max(visit.durationSeconds, Math.round(params.durationSeconds));
    visit.lastActive = Date.now();
    debouncedSaveMetrics();
    return true;
  }
  return false;
}

export type TimeRange = "12h" | "24h" | "7d" | "30d" | "90d" | "all";

/**
 * Get aggregated metrics and raw logs for a specified time window
 */
export function getMetricsData(range: TimeRange = "24h") {
  const now = Date.now();
  let cutoff = 0;

  if (range === "12h") cutoff = now - 12 * 60 * 60 * 1000;
  else if (range === "24h") cutoff = now - 24 * 60 * 60 * 1000;
  else if (range === "7d") cutoff = now - 7 * 24 * 60 * 60 * 1000;
  else if (range === "30d") cutoff = now - 30 * 24 * 60 * 60 * 1000;
  else if (range === "90d") cutoff = now - 90 * 24 * 60 * 60 * 1000;
  else cutoff = 0;

  const filtered = cutoff === 0 ? visits : visits.filter((v) => v.timestamp >= cutoff);

  // Calculate Unique Visitors by IP
  const uniqueIpSet = new Set<string>();
  let totalDuration = 0;
  const activeCutoff = now - 5 * 60 * 1000; // active in last 5 min
  let activeNow = 0;

  const pageCounts: Record<string, { count: number; ips: Set<string>; totalDuration: number }> = {};
  const countryCounts: Record<string, { count: number; countryCode: string; cities: Record<string, number> }> = {};
  const deviceCounts: Record<string, number> = { Mobile: 0, Desktop: 0, Tablet: 0, Other: 0 };
  const browserCounts: Record<string, number> = {};
  const osCounts: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};

  for (const v of filtered) {
    uniqueIpSet.add(v.ip);
    totalDuration += v.durationSeconds || 0;

    if (v.lastActive >= activeCutoff) {
      activeNow++;
    }

    // Page stats
    const p = v.path || "/";
    if (!pageCounts[p]) {
      pageCounts[p] = { count: 0, ips: new Set(), totalDuration: 0 };
    }
    pageCounts[p].count++;
    pageCounts[p].ips.add(v.ip);
    pageCounts[p].totalDuration += v.durationSeconds || 0;

    // Country stats
    const countryKey = v.country || "Unknown";
    if (!countryCounts[countryKey]) {
      countryCounts[countryKey] = { count: 0, countryCode: v.countryCode || "--", cities: {} };
    }
    countryCounts[countryKey].count++;
    if (v.city) {
      countryCounts[countryKey].cities[v.city] = (countryCounts[countryKey].cities[v.city] || 0) + 1;
    }

    // Devices & Browsers & OS
    deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;
    browserCounts[v.browser] = (browserCounts[v.browser] || 0) + 1;
    osCounts[v.os] = (osCounts[v.os] || 0) + 1;

    // Referrers
    const ref = v.referrer || "Direct";
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  }

  const totalVisits = filtered.length;
  const uniqueVisitors = uniqueIpSet.size;
  const avgDurationSeconds = totalVisits > 0 ? Math.round(totalDuration / totalVisits) : 0;

  // Format top pages
  const topPages = Object.entries(pageCounts)
    .map(([page, data]) => ({
      path: page,
      count: data.count,
      uniqueVisitors: data.ips.size,
      avgDuration: data.count > 0 ? Math.round(data.totalDuration / data.count) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Format top countries
  const topCountries = Object.entries(countryCounts)
    .map(([country, data]) => {
      const topCity = Object.entries(data.cities).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
      return {
        country,
        countryCode: data.countryCode,
        topCity,
        count: data.count,
        percentage: totalVisits > 0 ? Math.round((data.count / totalVisits) * 100) : 0,
      };
    })
    .sort((a, b) => b.count - a.count);

  // Format devices
  const topDevices = Object.entries(deviceCounts).map(([device, count]) => ({
    device,
    count,
    percentage: totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0,
  }));

  // Format browsers
  const topBrowsers = Object.entries(browserCounts)
    .map(([browser, count]) => ({
      browser,
      count,
      percentage: totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Format top referrers
  const topReferrers = Object.entries(referrerCounts)
    .map(([referrer, count]) => ({
      referrer,
      count,
      percentage: totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Build timeline in Helsinki Time
  const timeline = generateHelsinkiTimeline(filtered, range, now);

  return {
    summary: {
      range,
      totalVisits,
      uniqueVisitors,
      activeNow,
      avgDurationSeconds,
      currentHelsinkiTime: formatHelsinkiTime(now),
      topCountry: topCountries[0]?.country || (totalVisits > 0 ? "Unknown" : "None"),
      topCountryCode: topCountries[0]?.countryCode || "--",
      topPage: topPages[0]?.path || (totalVisits > 0 ? "/" : "None"),
    },
    topPages,
    topCountries,
    topDevices,
    topBrowsers,
    topReferrers,
    timeline,
    recentVisits: filtered.slice(0, 300), // return up to 300 latest records
  };
}

/**
 * Generate hourly or daily buckets aligned with Helsinki Timezone
 */
function generateHelsinkiTimeline(records: MetricVisitRecord[], range: TimeRange, now: number) {
  const isHourly = range === "12h" || range === "24h";

  if (isHourly) {
    const hoursCount = range === "12h" ? 12 : 24;
    const buckets: Record<string, { label: string; count: number; uniqueIps: Set<string>; time: number }> = {};

    for (let i = hoursCount - 1; i >= 0; i--) {
      const targetTime = now - i * 60 * 60 * 1000;
      const d = new Date(targetTime);
      // Format hour in Helsinki
      const hourStr = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Helsinki",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(d);
      const key = hourStr.slice(0, 2) + ":00";
      buckets[key] = { label: key, count: 0, uniqueIps: new Set(), time: targetTime };
    }

    for (const r of records) {
      const rHour = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Helsinki",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(r.timestamp));
      const key = rHour.slice(0, 2) + ":00";
      if (buckets[key]) {
        buckets[key].count++;
        buckets[key].uniqueIps.add(r.ip);
      }
    }

    return Object.values(buckets).map((b) => ({
      label: b.label,
      count: b.count,
      uniqueVisitors: b.uniqueIps.size,
      time: b.time,
    }));
  }

  // Daily buckets for 7d, 30d, 90d, all
  const daysCount = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const buckets: Record<string, { label: string; count: number; uniqueIps: Set<string>; time: number }> = {};

  for (let i = daysCount - 1; i >= 0; i--) {
    const targetTime = now - i * 24 * 60 * 60 * 1000;
    const d = new Date(targetTime);
    const dayLabel = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Helsinki",
      day: "numeric",
      month: "short",
    }).format(d);
    buckets[dayLabel] = { label: dayLabel, count: 0, uniqueIps: new Set(), time: targetTime };
  }

  for (const r of records) {
    const rDay = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Helsinki",
      day: "numeric",
      month: "short",
    }).format(new Date(r.timestamp));
    if (buckets[rDay]) {
      buckets[rDay].count++;
      buckets[rDay].uniqueIps.add(r.ip);
    }
  }

  return Object.values(buckets).map((b) => ({
    label: b.label,
    count: b.count,
    uniqueVisitors: b.uniqueIps.size,
    time: b.time,
  }));
}

/**
 * Clear or reset metrics (admin only)
 */
export function clearMetrics() {
  visits = [];
  debouncedSaveMetrics();
}
