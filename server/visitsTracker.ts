import fs from "fs";
import path from "path";
import geoip from "geoip-lite";

const DATA_DIR = path.join(process.cwd(), "data");
const COUNTER_FILE = path.join(DATA_DIR, "counter.json");

let totalVisits = 1;
let countryVisits: Record<string, number> = {};
let recentFlags: string[] = [];

const enDisplay = new Intl.DisplayNames(["en"], { type: "region" });
const jaDisplay = new Intl.DisplayNames(["ja"], { type: "region" });

// Timezone to 2-letter ISO Country Code map for reliable fallback
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  "Asia/Tokyo": "JP",
  "Asia/Osaka": "JP",
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "America/New_York": "US",
  "America/Detroit": "US",
  "America/Chicago": "US",
  "America/Los_Angeles": "US",
  "America/Denver": "US",
  "America/Phoenix": "US",
  "America/Indianapolis": "US",
  "America/Boise": "US",
  "America/Anchorage": "US",
  "America/Juneau": "US",
  "Pacific/Honolulu": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Montreal": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",
  "Europe/London": "GB",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Vienna": "AT",
  "Europe/Zurich": "CH",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Helsinki": "FI",
  "Europe/Copenhagen": "DK",
  "Europe/Dublin": "IE",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Budapest": "HU",
  "Europe/Bucharest": "RO",
  "Europe/Athens": "GR",
  "Europe/Lisbon": "PT",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Australia/Adelaide": "AU",
  "Pacific/Auckland": "NZ",
  "Asia/Singapore": "SG",
  "Asia/Taipei": "TW",
  "Asia/Seoul": "KR",
  "Asia/Hong_Kong": "HK",
  "Asia/Shanghai": "CN",
  "Asia/Chongqing": "CN",
  "Asia/Bangkok": "TH",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Jakarta": "ID",
  "Asia/Manila": "PH",
  "Asia/Kuala_Lumpur": "MY",
  "America/Sao_Paulo": "BR",
  "America/Mexico_City": "MX",
  "America/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
  "America/Lima": "PE",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Africa/Johannesburg": "ZA",
  "Africa/Cairo": "EG",
  "Africa/Nairobi": "KE",
  "Africa/Lagos": "NG",
};

export interface CountryStat {
  code: string;
  name: string;
  nameJa: string;
  flag: string;
  count: number;
  percentage: number;
}

export interface VisitorCountry {
  code: string;
  name: string;
  nameJa: string;
  flag: string;
  city?: string;
}

export function getCountryMetadata(code: string): { code: string; name: string; nameJa: string; flag: string } {
  const upper = (code || "UNKNOWN").toUpperCase();
  if (upper === "UNKNOWN" || upper.length !== 2) {
    return {
      code: "UNKNOWN",
      name: "International",
      nameJa: "海外・その他",
      flag: "🌐",
    };
  }

  let name = upper;
  let nameJa = upper;

  try {
    name = enDisplay.of(upper) || upper;
  } catch {
    name = upper;
  }

  try {
    nameJa = jaDisplay.of(upper) || name;
  } catch {
    nameJa = name;
  }

  const flag = upper
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");

  return { code: upper, name, nameJa, flag };
}

/**
 * Detect country from IP, cloud headers, timezone, and client locale.
 */
export function detectVisitorCountry(options: {
  ip?: string;
  headers?: Record<string, string | string[] | undefined>;
  timeZone?: string;
  locale?: string;
}): VisitorCountry {
  const { ip, headers = {}, timeZone, locale } = options;

  // 1. Check cloud edge reverse proxy headers
  const cfCountry = headers["cf-ipcountry"];
  if (typeof cfCountry === "string" && cfCountry.length === 2 && cfCountry !== "XX") {
    const meta = getCountryMetadata(cfCountry);
    return { ...meta };
  }

  const appEngineCountry = headers["x-appengine-country"];
  if (typeof appEngineCountry === "string" && appEngineCountry.length === 2 && appEngineCountry !== "ZZ") {
    const meta = getCountryMetadata(appEngineCountry);
    return { ...meta };
  }

  // 2. Check GeoIP from public IP
  if (ip && !isPrivateOrLocalIp(ip)) {
    try {
      const geo = geoip.lookup(ip);
      if (geo && geo.country && geo.country.length === 2) {
        const meta = getCountryMetadata(geo.country);
        return {
          ...meta,
          city: geo.city || undefined,
        };
      }
    } catch {
      // ignore lookup error
    }
  }

  // 3. Check timezone fallback
  if (timeZone) {
    const mapped = TIMEZONE_TO_COUNTRY[timeZone];
    if (mapped) {
      const meta = getCountryMetadata(mapped);
      return { ...meta };
    }

    // Heuristic prefix check (e.g. Japan/Tokyo)
    if (timeZone.startsWith("Asia/Tokyo") || timeZone.startsWith("Japan")) {
      return getCountryMetadata("JP");
    }
    if (timeZone.startsWith("America/")) {
      return getCountryMetadata("US");
    }
    if (timeZone.startsWith("Europe/London")) {
      return getCountryMetadata("GB");
    }
    if (timeZone.startsWith("Europe/")) {
      return getCountryMetadata("EU");
    }
    if (timeZone.startsWith("Asia/Kolkata") || timeZone.startsWith("Asia/Calcutta")) {
      return getCountryMetadata("IN");
    }
  }

  // 4. Check client locale fallback (e.g. ja-JP -> JP, en-US -> US)
  if (locale && typeof locale === "string") {
    const parts = locale.split(/[-_]/);
    if (parts.length >= 2) {
      const candidate = parts[1].toUpperCase();
      if (candidate.length === 2) {
        return getCountryMetadata(candidate);
      }
    }
    if (locale.toLowerCase().startsWith("ja")) {
      return getCountryMetadata("JP");
    }
  }

  return getCountryMetadata("UNKNOWN");
}

function isPrivateOrLocalIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "::ffff:127.0.0.1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.16.") ||
    ip.startsWith("172.17.") ||
    ip.startsWith("172.18.") ||
    ip.startsWith("172.19.") ||
    ip.startsWith("172.2") ||
    ip.startsWith("172.3") ||
    ip === "unknown" ||
    ip === "localhost"
  );
}

/**
 * Initialize total visit counter & country records from disk.
 */
export function initVisitsTracker() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(COUNTER_FILE)) {
      const raw = fs.readFileSync(COUNTER_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (typeof parsed.totalVisits === "number" && !isNaN(parsed.totalVisits)) {
        totalVisits = Math.max(1, parsed.totalVisits);
      }
      if (parsed.countries && typeof parsed.countries === "object") {
        countryVisits = { ...parsed.countries };
      }
      if (Array.isArray(parsed.recentFlags)) {
        recentFlags = parsed.recentFlags.filter((f: unknown) => typeof f === "string");
      } else {
        // Seed from existing recorded countries if none saved yet
        const existingCodes = Object.keys(countryVisits);
        recentFlags = existingCodes.slice(-3).reverse().map((c) => getCountryMetadata(c).flag);
      }
    } else {
      saveVisits();
    }
  } catch (err) {
    console.error("Failed to read counter file:", err);
  }
}

function saveVisits() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      COUNTER_FILE,
      JSON.stringify(
        {
          totalVisits,
          countries: countryVisits,
          recentFlags: recentFlags.slice(0, 10),
        },
        null,
        2
      ),
      "utf-8"
    );
  } catch (err) {
    console.error("Failed to write counter.json:", err);
  }
}

export function getCountryStats(): CountryStat[] {
  const entries = Object.entries(countryVisits);
  if (entries.length === 0) {
    return [];
  }

  const sum = entries.reduce((acc, [, count]) => acc + count, 0);
  const total = Math.max(1, sum);

  return entries
    .map(([code, count]) => {
      const meta = getCountryMetadata(code);
      const percentage = Math.round((count / total) * 100);
      return {
        ...meta,
        count,
        percentage,
      };
    })
    .sort((a, b) => b.count - a.count);
}

/**
 * Get current visit counts and last 3 visits country flags.
 */
export function getVisitsData(detectedVisitorCountry?: VisitorCountry) {
  return {
    totalVisits,
    visits: totalVisits,
    visits24h: totalVisits,
    recentFlags: recentFlags.slice(0, 3),
    countries: getCountryStats(),
    visitorCountry: detectedVisitorCountry,
  };
}

/**
 * Increment total visits, prepend visitor's country flag, and return updated stats.
 */
export function recordSiteVisit(visitor: VisitorCountry) {
  totalVisits += 1;
  const countryCode = visitor.code || "UNKNOWN";
  countryVisits[countryCode] = (countryVisits[countryCode] || 0) + 1;
  
  if (visitor.flag) {
    recentFlags.unshift(visitor.flag);
    if (recentFlags.length > 10) {
      recentFlags = recentFlags.slice(0, 10);
    }
  }
  
  saveVisits();

  return getVisitsData(visitor);
}

