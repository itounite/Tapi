import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const VISITS_FILE = path.join(DATA_DIR, "visits.json");
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const IP_DEBOUNCE_MS = 5 * 60 * 1000; // 5 minutes debounce per IP

let visitTimestamps: number[] = [];
const recentIps = new Map<string, number>();

/**
 * Initialize visits from disk or seed with natural visits for the past 24h on first run.
 */
export function initVisitsTracker() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(VISITS_FILE)) {
      const raw = fs.readFileSync(VISITS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        visitTimestamps = parsed.filter((t: unknown) => typeof t === "number");
      }
    }
  } catch (err) {
    console.error("Failed to read visits.json:", err);
  }

  const now = Date.now();
  const cutoff = now - TWENTY_FOUR_HOURS_MS;
  visitTimestamps = visitTimestamps.filter((t) => t > cutoff);
  saveVisits();
}

function saveVisits() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(VISITS_FILE, JSON.stringify(visitTimestamps), "utf-8");
  } catch (err) {
    console.error("Failed to write visits.json:", err);
  }
}

/**
 * Clean up old entries and get count of visits in the trailing 24 hours.
 */
export function getVisitsInLast24Hours(): number {
  const now = Date.now();
  const cutoff = now - TWENTY_FOUR_HOURS_MS;
  visitTimestamps = visitTimestamps.filter((t) => t > cutoff);
  return visitTimestamps.length;
}

/**
 * Record a visit, debouncing rapid hits from the same IP.
 */
export function recordVisit(ip?: string): number {
  const now = Date.now();
  const cutoff = now - TWENTY_FOUR_HOURS_MS;

  // Prune IP tracking map older than debounce window
  for (const [recordedIp, timestamp] of recentIps.entries()) {
    if (now - timestamp > IP_DEBOUNCE_MS) {
      recentIps.delete(recordedIp);
    }
  }

  // If valid IP provided and seen within debounce window, return current count without incrementing
  if (ip && ip !== "unknown") {
    const lastSeen = recentIps.get(ip);
    if (lastSeen && now - lastSeen < IP_DEBOUNCE_MS) {
      return getVisitsInLast24Hours();
    }
    recentIps.set(ip, now);
  }

  // Prune older than 24 hours and append new visit
  visitTimestamps = visitTimestamps.filter((t) => t > cutoff);
  visitTimestamps.push(now);
  saveVisits();

  return visitTimestamps.length;
}
