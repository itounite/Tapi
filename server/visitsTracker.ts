import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const COUNTER_FILE = path.join(DATA_DIR, "counter.json");
const OLD_VISITS_FILE = path.join(DATA_DIR, "visits.json");
const CLOUD_COUNTER_URL = "https://countapi.mileshilliard.com/api/v1";
const CLOUD_KEY = "tapilife_site_visits_official";

let totalVisits = 1;

/**
 * Initialize total visit counter from disk and sync with cloud.
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

  // Asynchronously sync with cloud counter to survive ephemeral disk resets (e.g. on Render)
  syncWithCloudCounter();
}

async function syncWithCloudCounter() {
  try {
    const res = await fetch(`${CLOUD_COUNTER_URL}/get/${CLOUD_KEY}`);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === "number" && data.value > totalVisits) {
        totalVisits = data.value;
        saveVisits();
      }
    }
  } catch {
    // Non-blocking, continue with local count
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

  // Asynchronously ping cloud counter so cloud stays updated
  fetch(`${CLOUD_COUNTER_URL}/hit/${CLOUD_KEY}`).catch(() => {
    // Non-blocking background sync
  });

  return totalVisits;
}

