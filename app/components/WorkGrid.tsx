import Image from "next/image";
import Link from "next/link";
import { projectHref, type Project } from "../work/projects";
import { LazyVideo } from "./LazyVideo";

/** Project cards; the title link covers the whole card. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="pm-work-grid">
      {projects.map((item) => (
        <li key={item.slug} className="pm-work-card">
          <div className="pm-work-card__media">
            {item.video ? (
              <LazyVideo src={item.video} poster={item.image} className="pm-work-card__fill" />
            ) : (
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectPosition: item.focus }}
              />
            )}
          </div>
          <h3 className="pm-work-card__title">
            <Link href={projectHref(item)}>{item.client}</Link>
          </h3>
          <p className="pm-work-card__service">{item.service}</p>
        </li>
      ))}
    </ul>
  );
}
