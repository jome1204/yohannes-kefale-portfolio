import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Profile } from "./models/Profile.js";
import { Project } from "./models/Project.js";
import { Experience } from "./models/Experience.js";
import { SkillGroup } from "./models/SkillGroup.js";
import { Message } from "./models/Message.js";
import { connectDb } from "./db.js";
import { experience, profile, projects, seedDatabase, skillGroups } from "./seed.js";

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data");
const messagesFile = path.join(dataDir, "messages.json");

let mode = "memory";

const memory = {
  profile: { ...profile, _id: "profile" },
  skills: skillGroups.map((item, index) => ({ ...item, _id: `skill-${index}` })),
  experience: experience.map((item, index) => ({ ...item, _id: `job-${index}` })),
  projects: projects.map((item, index) => ({ ...item, _id: `project-${index}` })),
  messages: [],
};

async function loadMessages() {
  try {
    const raw = await readFile(messagesFile, "utf8");
    memory.messages = JSON.parse(raw);
  } catch {
    memory.messages = [];
  }
}

async function saveMessages() {
  await mkdir(dataDir, { recursive: true });
  await writeFile(messagesFile, JSON.stringify(memory.messages, null, 2));
}

export async function initStore() {
  const uri = process.env.MONGODB_URI?.trim();
  if (uri) {
    const info = await connectDb(uri);
    await seedDatabase();
    mode = "mongodb";
    return info;
  }

  await loadMessages();
  mode = "memory";
  return {
    mode,
    uri: "local JSON / in-memory (set MONGODB_URI to use MongoDB)",
  };
}

export const store = {
  mode: () => mode,

  async getProfile() {
    if (mode === "mongodb") return Profile.findOne().lean();
    return memory.profile;
  },

  async getSkills() {
    if (mode === "mongodb") return SkillGroup.find().sort({ order: 1 }).lean();
    return [...memory.skills].sort((a, b) => a.order - b.order);
  },

  async getExperience() {
    if (mode === "mongodb") return Experience.find().sort({ order: 1 }).lean();
    return [...memory.experience].sort((a, b) => a.order - b.order);
  },

  async getProjects(featuredOnly = false) {
    if (mode === "mongodb") {
      const filter = featuredOnly ? { featured: true } : {};
      return Project.find(filter).sort({ order: 1 }).lean();
    }
    return memory.projects
      .filter((item) => (featuredOnly ? item.featured : true))
      .sort((a, b) => a.order - b.order);
  },

  async getProject(slug) {
    if (mode === "mongodb") return Project.findOne({ slug }).lean();
    return memory.projects.find((item) => item.slug === slug) || null;
  },

  async createMessage(payload) {
    if (mode === "mongodb") {
      const saved = await Message.create(payload);
      return saved;
    }
    const saved = {
      _id: `msg-${Date.now()}`,
      ...payload,
      read: false,
      createdAt: new Date().toISOString(),
    };
    memory.messages.unshift(saved);
    await saveMessages();
    return saved;
  },
};
