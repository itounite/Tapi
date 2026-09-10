import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initVisitsTracker, getTotalVisits, incrementVisits } from "./server/visitsTracker";
import {
  initMetricsTracker,
  trackVisit,
  updateHeartbeat,
  getMetricsData,
  clearMetrics,
  extractClientIp,
  METRICS_PASSWORD,
  TimeRange,
} from "./server/metricsTracker";

async function startServer() {
  const app = express();
  // Support dynamic PORT in cloud environments like Render while maintaining port 3000 in AI Studio
  const isAIStudio = Boolean(process.env.APPLET_ID || process.env.DEFAULT_APP_PORT);
  const PORT = !isAIStudio && process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Initialize total visits and detailed metrics trackers
  initVisitsTracker();
  initMetricsTracker();

  // Support JSON and URL-encoded/text body for sendBeacon
  app.use(express.json());
  app.use(express.text({ type: ["text/plain", "application/json"] }));

  // API Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Legacy visits count endpoints (for compatibility)
  app.get("/api/visits", (req, res) => {
    const totalVisits = getTotalVisits();
    res.json({ totalVisits, visits: totalVisits, visits24h: totalVisits });
  });

  app.post("/api/visits", (req, res) => {
    const totalVisits = incrementVisits();
    res.json({ totalVisits, visits: totalVisits, visits24h: totalVisits });
  });

  // Track pageview visit with IP, Country, Helsinki Time, Page, etc.
  app.post("/api/metrics/track", async (req, res) => {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const ip = extractClientIp(
        req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.headers["cf-connecting-ip"],
        req.socket.remoteAddress
      );
      const userAgent = req.headers["user-agent"] || body.userAgent || "";
      const pathVisited = body.path || "/";
      const referrer = body.referrer || req.headers["referer"] || "Direct";

      const record = await trackVisit({
        ip,
        path: pathVisited,
        referrer,
        userAgent,
        sessionId: body.sessionId,
        pageId: body.pageId,
        clientHint: body.clientHint,
      });

      // Synchronize total visit count
      incrementVisits();

      res.json({ success: true, recordId: record.id, pageId: record.pageId });
    } catch (err) {
      console.error("Error in /api/metrics/track:", err);
      res.status(500).json({ error: "Failed to track visit" });
    }
  });

  // Heartbeat / duration update for active pageview
  app.post("/api/metrics/heartbeat", (req, res) => {
    try {
      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch {
          body = {};
        }
      }
      const pageId = body.pageId;
      const durationSeconds = Number(body.durationSeconds) || 0;

      if (pageId && durationSeconds >= 0) {
        updateHeartbeat({ pageId, durationSeconds });
      }
      res.json({ success: true });
    } catch {
      res.json({ success: false });
    }
  });

  // Verify /metrics password
  app.post("/api/metrics/auth", (req, res) => {
    const { password } = req.body || {};
    if (password === METRICS_PASSWORD) {
      return res.json({ success: true });
    }
    return res.status(401).json({ error: "Invalid password" });
  });

  // Protected analytics data query
  app.get("/api/metrics/data", (req, res) => {
    const authHeader = req.headers.authorization;
    const bearerPassword = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
    const providedPassword = (req.query.password as string) || bearerPassword;

    if (providedPassword !== METRICS_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized. Password 'itowillunite' required." });
    }

    const range = (req.query.range as TimeRange) || "24h";
    const data = getMetricsData(range);
    res.json({ success: true, ...data });
  });

  // Protected clear metrics
  app.post("/api/metrics/clear", (req, res) => {
    const providedPassword = req.body?.password;
    if (providedPassword !== METRICS_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    clearMetrics();
    res.json({ success: true, message: "Metrics cleared" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving of Vite output dist folder
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
