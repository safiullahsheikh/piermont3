import Link from "next/link";
import { CATEGORIES, PROJECTS } from "../work/projects";

/** "All" plus one link per category with its project count; the current one is marked. */
export function CategoryNav({ current }: { current?: string }) {
  const items = [
    { href: "/case-studies", label: "All", count: PROJECTS.length, slug: undefined },
    ...CATEGORIES.map((c) => ({
      href: `/case-studies/${c.slug}`,
      label: c.title,
      count: PROJECTS.filter((p) => p.group === c.group).length,
      slug: c.slug,
    })),
  ];
  return (
    <nav aria-label="Case study categories" className="pm-filter">
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="pm-filter__link"
              aria-current={item.slug === current ? "page" : undefined}
            >
              {item.label}
              <span className="pm-filter__count">{item.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
