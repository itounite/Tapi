import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initVisitsTracker, getVisitsData, recordSiteVisit, detectVisitorCountry } from "./server/visitsTracker";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize total visits tracker
  initVisitsTracker();

  app.use(express.json());

  // Helper to resolve client IP and country
  const resolveVisitor = (req: express.Request) => {
    const forwarded = req.headers["x-forwarded-for"];
    const clientIp = typeof forwarded === "string"
      ? forwarded.split(",")[0].trim()
      : req.socket.remoteAddress || "";

    const timeZone = (req.body && req.body.timeZone) || (req.query.timeZone as string) || undefined;
    const locale = (req.body && req.body.locale) || (req.query.locale as string) || (req.headers["accept-language"] as string) || undefined;

    return detectVisitorCountry({
      ip: clientIp,
      headers: req.headers,
      timeZone,
      locale,
    });
  };

  // API Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get total visits count and country breakdown
  app.get("/api/visits", (req, res) => {
    const visitor = resolveVisitor(req);
    const data = getVisitsData(visitor);
    res.json(data);
  });

  // Increment visits and record country whenever someone opens the website
  app.post("/api/visits", (req, res) => {
    const visitor = resolveVisitor(req);
    const data = recordSiteVisit(visitor);
    res.json(data);
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
