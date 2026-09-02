import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initVisitsTracker, getVisitsInLast24Hours, recordVisit } from "./server/visitsTracker";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize trailing 24-hour visits tracker
  initVisitsTracker();

  app.use(express.json());

  // API Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get visits in the last 24 hours
  app.get("/api/visits", (req, res) => {
    const visits24h = getVisitsInLast24Hours();
    res.json({ visits24h });
  });

  // Record a new site visit and return visits in the last 24 hours
  app.post("/api/visits", (req, res) => {
    const forwarded = req.headers["x-forwarded-for"];
    const clientIp = typeof forwarded === "string" 
      ? forwarded.split(",")[0].trim() 
      : req.socket.remoteAddress || "unknown";
    
    const visits24h = recordVisit(clientIp);
    res.json({ visits24h });
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
