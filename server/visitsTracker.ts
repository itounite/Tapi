import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const COUNTER_FILE = path.join(DATA_DIR, "counter.json");
const OLD_VISITS_FILE = path.join(DATA_DIR, "visits.json");

let totalVisits = 1;

/**
 * Initialize total visit counter from disk.
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
    } else if (fs.existsSync(OLD_VISITS_FILE)) {
      const raw = fs.readFileSync(OLD_VISITS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        totalVisits = Math.max(1, parsed.length);
      }
      saveVisits();
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
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ totalVisits }), "utf-8");
  } catch (err) {
    console.error("Failed to write counter.json:", err);
  }
}

/**
 * Get current total visits count.
 */
export function getTotalVisits(): number {
  return totalVisits;
}

/**
 * Increment total visits whenever someone opens the website.
 */
export function incrementVisits(): number {
  totalVisits += 1;
  saveVisits();
  return totalVisits;
}

