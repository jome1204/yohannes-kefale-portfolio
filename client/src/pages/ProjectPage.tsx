import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import type { Project } from "../types";
import { Cover } from "../components/Cover";

export function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    api
      .project(slug)
      .then((data) => setProject(data as Project))
      .catch(() => setError("This project is not in the archive."));
  }, [slug]);

  if (error) {
    return (
      <div className="error-box">
        <div>
          <p>{error}</p>
          <Link className="back" to={{ pathname: "/", hash: "work" }}>
            Back to work
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="loader">
        <div>
          <div className="spinner" />
          Loading case study
        </div>
      </div>
    );
  }

  return (
    <article className="page">
      <div className="shell">
        <Link className="back" to={{ pathname: "/", hash: "work" }}>
          ← Selected work
        </Link>
        <header className="detail-hero">
          <p className="kicker">
            {project.category} · {project.year}
            {project.featured ? " · Featured" : ""}
          </p>
          <h1>{project.title}</h1>
          <p>{project.subtitle}. {project.summary}</p>
        </header>
        <Cover project={project} className="detail-cover cover" />
        <div className="detail-grid">
          <div className="prose">
            <h2>The problem</h2>
            <p>{project.problem}</p>
            <h2>The approach</h2>
            <p>{project.solution}</p>
            <h2>The result</h2>
            <p>{project.outcome}</p>
          </div>
          <aside className="side-card">
            <div className="kicker">Stack</div>
            <div className="stack-row" style={{ margin: "0.8rem 0 1.2rem" }}>
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="kicker">Highlights</div>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="hero-actions">
              {project.liveUrl ? (
                <a className="btn btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live demo
                </a>
              ) : null}
              {project.repoUrl ? (
                <a className={project.liveUrl ? "btn btn-ghost" : "btn btn-primary"} href={project.repoUrl} target="_blank" rel="noreferrer">
                  View repository
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
