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
const METRICS_BACKUP_FILE = path.join(DATA_DIR, "metrics_backup.json");
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
 * Clean and deduplicate raw parsed visits (merging rapid StrictMode duplicate mounts)
 */
function cleanAndDeduplicateVisits(rawList: any[]): MetricVisitRecord[] {
  if (!Array.isArray(rawList)) return [];
  const now = Date.now();
  const valid = rawList.filter(
    (v) =>
      v &&
      typeof v.timestamp === "number" &&
      now - v.timestamp <= MAX_RETENTION_MS &&
      !v.id?.startsWith("v_seed_")
  ) as MetricVisitRecord[];

  // Sort ascending by timestamp to merge rapid duplicate mounts safely
  valid.sort((a, b) => a.timestamp - b.timestamp);

  const deduped: MetricVisitRecord[] = [];
  const sessionPathMap = new Map<string, MetricVisitRecord>();

  for (const v of valid) {
    const key = `${v.sessionId || v.ip}_${v.path}`;
    const prev = sessionPathMap.get(key);
    if (prev && Math.abs(v.timestamp - prev.timestamp) < 15000) {
      // Merge: keep maximum duration, latest active, and best IP
      prev.durationSeconds = Math.max(prev.durationSeconds || 0, v.durationSeconds || 0);
      prev.lastActive = Math.max(prev.lastActive || prev.timestamp, v.lastActive || v.timestamp);
      if (prev.ip === "127.0.0.1" && v.ip !== "127.0.0.1") {
        prev.ip = v.ip;
        prev.country = v.country;
        prev.countryCode = v.countryCode;
        prev.city = v.city;
      }
    } else {
      sessionPathMap.set(key, v);
      deduped.push(v);
    }
  }

  // Return sorted descending by timestamp
  return deduped.sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Initialize metrics tracker from disk and backup
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

    let loaded = false;

    // Try primary log file
    if (fs.existsSync(METRICS_FILE)) {
      try {
        const raw = fs.readFileSync(METRICS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          visits = cleanAndDeduplicateVisits(parsed);
          loaded = true;
        }
      } catch (err) {
        console.error("Failed to parse metrics_log.json:", err);
      }
    }

    // Try backup if primary was empty or missing
    if (!loaded && fs.existsSync(METRICS_BACKUP_FILE)) {
      try {
        const rawBackup = fs.readFileSync(METRICS_BACKUP_FILE, "utf-8");
        const parsedBackup = JSON.parse(rawBackup);
        if (Array.isArray(parsedBackup) && parsedBackup.length > 0) {
          visits = cleanAndDeduplicateVisits(parsedBackup);
          loaded = true;
          // Restore primary immediately
          saveMetricsNow();
        }
      } catch (err) {
        console.error("Failed to parse metrics_backup.json:", err);
      }
    }

    if (!loaded && visits.length === 0) {
      visits = [];
    } else {
      // Sync backup copy immediately
      saveMetricsNow();
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

/**
 * Write metrics synchronously and immediately to both primary and backup storage
 */
export function saveMetricsNow() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const now = Date.now();
    const pruned = visits.filter(
      (v) => now - v.timestamp <= MAX_RETENTION_MS && !v.id?.startsWith("v_seed_")
    );
    const content = JSON.stringify(pruned, null, 2);
    fs.writeFileSync(METRICS_FILE, content, "utf-8");
    fs.writeFileSync(METRICS_BACKUP_FILE, content, "utf-8");
  } catch (err) {
    console.error("Failed to write metrics files:", err);
  }
}

let saveTimeout: NodeJS.Timeout | null = null;
function debouncedSaveMetrics() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveMetricsNow();
  }, 300);
}

// Ensure flush on process exit
process.on("exit", () => saveMetricsNow());
process.on("SIGINT", () => {
  saveMetricsNow();
  process.exit(0);
});
process.on("SIGTERM", () => {
  saveMetricsNow();
  process.exit(0);
});

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
  const pathVisited = params.path || "/";

  // Check for recent matching visit within 15 seconds to eliminate duplicate mounts
  const existingRecent = visits.find(
    (v) =>
      v.path === pathVisited &&
      (v.sessionId === sessionId || (v.ip === params.ip && timestamp - v.timestamp < 15000)) &&
      timestamp - v.timestamp < 15000
  );

  if (existingRecent) {
    existingRecent.lastActive = timestamp;
    if (params.pageId) {
      existingRecent.pageId = params.pageId;
    }
    debouncedSaveMetrics();
    return existingRecent;
  }

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
    path: pathVisited,
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

  saveMetricsNow();
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
export function getMetricsData(range: TimeRange = "all") {
  const now = Date.now();
  let cutoff = 0;

  if (range === "12h") cutoff = now - 12 * 60 * 60 * 1000;
  else if (range === "24h") cutoff = now - 24 * 60 * 60 * 1000;
  else if (range === "7d") cutoff = now - 7 * 24 * 60 * 60 * 1000;
  else if (range === "30d") cutoff = now - 30 * 24 * 60 * 60 * 1000;
  else if (range === "90d") cutoff = now - 90 * 24 * 60 * 60 * 1000;
  else cutoff = 0;

  const filtered = cutoff === 0 ? visits : visits.filter((v) => v.timestamp >= cutoff);

  // Compute breakdown counts across each time window
  const count12h = visits.filter((v) => v.timestamp >= now - 12 * 60 * 60 * 1000).length;
  const count24h = visits.filter((v) => v.timestamp >= now - 24 * 60 * 60 * 1000).length;
  const count7d = visits.filter((v) => v.timestamp >= now - 7 * 24 * 60 * 60 * 1000).length;
  const count30d = visits.filter((v) => v.timestamp >= now - 30 * 24 * 60 * 60 * 1000).length;
  const count90d = visits.filter((v) => v.timestamp >= now - 90 * 24 * 60 * 60 * 1000).length;
  const countAll = visits.length;

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

  const allTimeUniqueVisitors = new Set(visits.map((v) => v.ip)).size;

  return {
    summary: {
      range,
      totalVisits,
      uniqueVisitors,
      allTimeTotal: countAll,
      allTimeUniqueVisitors,
      activeNow,
      avgDurationSeconds,
      currentHelsinkiTime: formatHelsinkiTime(now),
      topCountry: topCountries[0]?.country || (totalVisits > 0 ? "Unknown" : "None"),
      topCountryCode: topCountries[0]?.countryCode || "--",
      topPage: topPages[0]?.path || (totalVisits > 0 ? "/" : "None"),
    },
    countsByRange: {
      "12h": count12h,
      "24h": count24h,
      "7d": count7d,
      "30d": count30d,
      "90d": count90d,
      all: countAll,
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
  saveMetricsNow();
}

/**
 * Merge archived visits (e.g. synced from client cache after server redeploy)
 */
export function mergeExternalVisits(incoming: MetricVisitRecord[]): { added: number; total: number } {
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return { added: 0, total: visits.length };
  }
  let added = 0;
  const existingIds = new Set(visits.map((v) => v.id));
  const existingSignatures = new Set(visits.map((v) => `${v.timestamp}_${v.ip}_${v.path}`));

  for (const r of incoming) {
    if (!r || typeof r.timestamp !== "number" || !r.ip) continue;
    const sig = `${r.timestamp}_${r.ip}_${r.path}`;
    if (!existingIds.has(r.id) && !existingSignatures.has(sig)) {
      existingIds.add(r.id);
      existingSignatures.add(sig);
      visits.push({
        id: r.id || `v_${r.timestamp}_${Math.random().toString(36).slice(2, 7)}`,
        pageId: r.pageId || `p_${r.timestamp}`,
        sessionId: r.sessionId || `s_${r.timestamp}`,
        ip: r.ip,
        country: r.country || "International",
        countryCode: r.countryCode || "--",
        city: r.city || "",
        path: r.path || "/",
        referrer: r.referrer || "Direct",
        device: r.device || "Desktop",
        browser: r.browser || "Browser",
        os: r.os || "OS",
        timestamp: r.timestamp,
        helsinkiTime: r.helsinkiTime || formatHelsinkiTime(r.timestamp),
        durationSeconds: Number(r.durationSeconds) || 0,
        lastActive: r.lastActive || r.timestamp,
      });
      added++;
    }
  }

  if (added > 0) {
    visits = cleanAndDeduplicateVisits(visits);
    saveMetricsNow();
  }

  return { added, total: visits.length };
}

