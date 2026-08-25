import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { api } from "./api";
import { Nav } from "./components/Nav";
import { HomeView } from "./pages/Home";
import { ProjectPage } from "./pages/ProjectPage";
import type { Experience, Profile, Project, SkillGroup } from "./types";

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const node = document.querySelector(location.hash);
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location]);

  useEffect(() => {
    Promise.all([api.profile(), api.skills(), api.experience(), api.projects()])
      .then(([p, s, e, w]) => {
        setProfile(p as Profile);
        setSkills(s as SkillGroup[]);
        setExperience(e as Experience[]);
        setProjects(w as Project[]);
      })
      .catch(() =>
        setError("The API is not reachable. Start the server with npm run dev from the project root.")
      );
  }, []);

  if (error) {
    return (
      <div className="error-box">
        <div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="loader">
        <div>
          <div className="spinner" />
          Loading Yohannes Kefale
        </div>
      </div>
    );
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav profile={profile} />
      <main id="main">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                profile={profile}
                skills={skills}
                experience={experience}
                projects={projects}
              />
            }
          />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer shell">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>MERN · Addis Ababa · Remote</span>
      </footer>
    </>
  );
}
