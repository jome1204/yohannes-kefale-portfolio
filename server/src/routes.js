import { Router } from "express";
import { store } from "./store.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const api = Router();

api.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "yohannes-kefale-api",
    store: store.mode(),
    time: new Date().toISOString(),
  });
});

api.get("/profile", async (_req, res, next) => {
  try {
    const profile = await store.getProfile();
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

api.get("/skills", async (_req, res, next) => {
  try {
    res.json(await store.getSkills());
  } catch (error) {
    next(error);
  }
});

api.get("/experience", async (_req, res, next) => {
  try {
    res.json(await store.getExperience());
  } catch (error) {
    next(error);
  }
});

api.get("/projects", async (req, res, next) => {
  try {
    res.json(await store.getProjects(req.query.featured === "true"));
  } catch (error) {
    next(error);
  }
});

api.get("/projects/:slug", async (req, res, next) => {
  try {
    const project = await store.getProject(req.params.slug);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    next(error);
  }
});

api.post("/contact", async (req, res, next) => {
  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const subject = String(req.body?.subject || "Project inquiry").trim();
    const message = String(req.body?.message || "").trim();

    if (name.length < 2) {
      return res.status(400).json({ error: "Please include your name." });
    }
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please include a valid email." });
    }
    if (message.length < 12) {
      return res.status(400).json({ error: "Please write a slightly longer message." });
    }

    const saved = await store.createMessage({ name, email, subject, message });
    res.status(201).json({
      ok: true,
      id: saved._id,
      message: "Thanks — I will get back to you shortly.",
    });
  } catch (error) {
    next(error);
  }
});
