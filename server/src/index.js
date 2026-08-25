import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { initStore } from "./store.js";
import { api } from "./routes.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: [clientUrl, "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json({ limit: "32kb" }));
app.use(morgan("dev"));
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

app.get("/", (_req, res) => {
  res.json({
    name: "Yohannes Kefale API",
    docs: "/api/health",
    routes: [
      "GET /api/health",
      "GET /api/profile",
      "GET /api/skills",
      "GET /api/experience",
      "GET /api/projects",
      "GET /api/projects/:slug",
      "POST /api/contact",
    ],
  });
});

app.use("/api", api);

app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Unexpected server error" });
});

const { mode, uri } = await initStore();

app.listen(port, () => {
  console.log(`API ready on http://localhost:${port}`);
  console.log(`Data store: ${mode}`);
  console.log(uri);
});
