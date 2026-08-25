import snapshot from "./snapshot.json";
import type { Experience, Profile, Project, SkillGroup } from "./types";

const API = "/api";

async function getJson<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${API}${path}`);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json() as Promise<T>;
  } catch {
    return fallback(path) as T;
  }
}

function fallback(path: string) {
  if (path === "/profile") return snapshot.profile as Profile;
  if (path === "/skills") return snapshot.skills as SkillGroup[];
  if (path === "/experience") return snapshot.experience as Experience[];
  if (path === "/projects") return snapshot.projects as Project[];
  const match = path.match(/^\/projects\/(.+)$/);
  if (match) {
    return snapshot.projects.find((item) => item.slug === match[1]) || null;
  }
  throw new Error("Nothing in the local snapshot for this request.");
}

export const api = {
  profile: () => getJson<Profile>("/profile"),
  skills: () => getJson<SkillGroup[]>("/skills"),
  experience: () => getJson<Experience[]>("/experience"),
  projects: () => getJson<Project[]>("/projects"),
  project: (slug: string) => getJson<Project>(`/projects/${slug}`),
  health: () => getJson("/health"),
  contact: async (payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(data.error || "Could not send message");
      return data;
    } catch {
      const subject = encodeURIComponent(payload.subject || "Project inquiry");
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} <${payload.email}>`);
      window.location.href = `mailto:yohannes.kefale1204@gmail.com?subject=${subject}&body=${body}`;
      return { message: "Opening your email app so the message can be sent directly." };
    }
  },
};
