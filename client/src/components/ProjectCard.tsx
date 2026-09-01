import { Link } from "react-router-dom";
import type { Project } from "../types";
import { Cover } from "./Cover";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card" to={`/work/${project.slug}`}>
      <Cover project={project} />
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="stack-row">
          {project.liveUrl ? <span className="live-pill">Live</span> : null}
          {project.stack.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
