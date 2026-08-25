import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { initStore } from "./store.js";
import { api } from "./routes.js";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/dist");

export async function createApp() {
  const app = express();
  const origins = String(process.env.CLIENT_URL || "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  app.set("trust proxy", 1);
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(
    cors({
      origin: existsSync(dist) ? true : origins,
      methods: ["GET", "POST", "OPTIONS"],
    })
  );
  app.use(express.json({ limit: "32kb" }));
  if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
  app.use(
    "/api/contact",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 12,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "Too many messages. Please try again in a few minutes." },
    })
  );

  await initStore();
  app.use("/api", api);

  if (existsSync(dist)) {
    app.use(express.static(dist));
    app.get(/^(?!\/api).*/, (_req, res) => {
      res.sendFile(path.join(dist, "index.html"));
    });
  } else {
    app.get("/", (_req, res) => {
      res.json({
        name: "Yohannes Kefale API",
        docs: "/api/health",
      });
    });
    app.use((req, res) => {
      res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
    });
  }

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Unexpected server error" });
  });

  return app;
}
