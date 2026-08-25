const API = "/api";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  profile: () => getJson("/profile"),
  skills: () => getJson("/skills"),
  experience: () => getJson("/experience"),
  projects: () => getJson("/projects"),
  project: (slug: string) => getJson(`/projects/${slug}`),
  health: () => getJson("/health"),
  contact: async (payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const response = await fetch(`${API}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { error?: string; message?: string };
    if (!response.ok) {
      throw new Error(data.error || "Could not send message");
    }
    return data;
  },
};
