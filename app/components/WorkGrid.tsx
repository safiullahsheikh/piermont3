import Image from "next/image";
import Link from "next/link";
import { projectHref, type Project } from "../work/projects";
import { LazyVideo } from "./LazyVideo";

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="sol-work-grid" data-reveal-stagger data-reveal>
      {projects.map((item) => (
        <article key={item.slug} className="sol-work-item" data-reveal-child>
          <div className="sol-work-media">
            {item.video ? (
              <LazyVideo
                src={item.video}
                poster={item.image}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                style={{ objectPosition: item.focus }}
              />
            )}
          </div>
          <h3 className="sol-work-title">
            <Link href={projectHref(item)} className="sol-work-link">
              {item.client}
            </Link>
          </h3>
          <p className="sol-work-service">{item.service}</p>
        </article>
      ))}
    </div>
  );
}
