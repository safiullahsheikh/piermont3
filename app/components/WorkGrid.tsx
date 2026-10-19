import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { projectHref, type Project } from "../work/projects";
import { LazyVideo } from "./LazyVideo";

/** View transition name shared by a project's card media and its case study hero, so one morphs into the other. */
export const morphName = (p: Project) => `pm-project-${p.slug}`;

/** One project card; the title link covers the whole card. */
export function WorkCard({ project: p, as: Tag = "li" }: { project: Project; as?: "li" | "article" }) {
  return (
    <Tag className="pm-work-card">
      <ViewTransition name={morphName(p)} share="pm-morph" default="none">
        <div className="pm-work-card__media">
          {p.video ? (
            <LazyVideo src={p.video} poster={p.image} className="pm-work-card__fill" />
          ) : (
            <Image src={p.image} alt={p.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectPosition: p.focus }} />
          )}
        </div>
      </ViewTransition>
      <h3 className="pm-work-card__title">
        <Link href={projectHref(p)}>{p.client}</Link>
      </h3>
      <p className="pm-work-card__service">{p.service}</p>
    </Tag>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="pm-work-grid">
      {projects.map((p) => (
        <WorkCard key={p.slug} project={p} />
      ))}
    </ul>
  );
}
