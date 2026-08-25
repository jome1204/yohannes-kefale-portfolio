export type Stat = { value: string; label: string };
export type Language = { name: string; level: string };
export type EducationItem = { degree: string; school: string; detail: string };

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  photoUrl: string;
  availability: string;
  summary: string;
  stats: Stat[];
  languages: Language[];
  education: EducationItem[];
  certifications: string[];
};

export type SkillGroup = {
  _id: string;
  category: string;
  items: string[];
};

export type Experience = {
  _id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
};

export type ProjectCover = {
  from: string;
  to: string;
  accent: string;
  motif: string;
};

export type Project = {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  featured: boolean;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  highlights: string[];
  repoUrl: string;
  liveUrl: string;
  cover: ProjectCover;
};

export type SiteData = {
  profile: Profile;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
};
