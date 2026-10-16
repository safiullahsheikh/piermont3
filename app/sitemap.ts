import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";
import { SOLUTIONS } from "./solutions/solutions";
import { CATEGORIES, PROJECTS, projectHref } from "./work/projects";

const BASE = "https://piermontstudios.com";

const ROUTES = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/process", priority: 0.7 },
  { path: "/testimonials", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
  { path: "/solutions", priority: 0.8 },
  { path: "/case-studies", priority: 0.8 },
  { path: "/blog", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  ...SOLUTIONS.map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.8 })),
  ...CATEGORIES.map((c) => ({ path: `/case-studies/${c.slug}`, priority: 0.7 })),
  ...PROJECTS.map((p) => ({ path: projectHref(p), priority: 0.6 })),
  ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.5 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
