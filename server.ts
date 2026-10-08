import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initVisitsTracker, getTotalVisits, incrementVisits } from "./server/visitsTracker";

async function startServer() {
  const app = express();
  // Support dynamic PORT in cloud environments like Render while maintaining port 3000 in AI Studio
  const isAIStudio = Boolean(process.env.APPLET_ID || process.env.DEFAULT_APP_PORT);
  const PORT = !isAIStudio && process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Initialize total visits tracker
  initVisitsTracker();

  // Global header to set X-Robots-Tag: noindex, nofollow on all responses
  app.use((req, res, next) => {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    next();
  });

  // Support JSON and URL-encoded body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Ensure robots.txt is accessible from the root domain
  const publicDir = path.join(process.cwd(), "public");
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(publicDir, "robots.txt"));
  });

  // API Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Basic visits count endpoints
  app.get("/api/visits", (req, res) => {
    const totalVisits = getTotalVisits();
    res.json({ totalVisits, visits: totalVisits });
  });

  app.post("/api/visits", (req, res) => {
    const totalVisits = incrementVisits();
    res.json({ totalVisits, visits: totalVisits });
  });

  // Serve static assets from public directory (favicons, icons, webmanifest)
  app.use(express.static(publicDir));

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
