import type { CSSProperties } from "react";
import type { Project } from "../types";

export function Cover({ project, className = "cover" }: { project: Project; className?: string }) {
  const { from, to, accent, motif } = project.cover;
  return (
    <div className={className}>
      <span className="cover-label">
        {project.category} · {project.year}
      </span>
      <div
        className="cover-art"
        data-motif={motif}
        style={
          {
            "--from": from,
            "--to": to,
            "--accent": accent,
          } as CSSProperties
        }
      />
    </div>
  );
}
