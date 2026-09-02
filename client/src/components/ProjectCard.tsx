import { Link } from "react-router-dom";
import type { Project } from "../types";
import { Cover } from "./Cover";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link className="project-card-main" to={`/work/${project.slug}`}>
        <Cover project={project} />
        <div className="project-body">
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
      </Link>
      <div className="project-card-meta">
        <div className="stack-row">
          {project.liveUrl ? (
            <a className="live-pill" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live demo
            </a>
          ) : null}
          {project.stack.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
