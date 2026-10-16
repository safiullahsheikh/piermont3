import type { NextConfig } from "next";
import { PROJECTS, projectHref } from "./app/work/projects";

const nextConfig: NextConfig = {
  // Old URLs, matching production's 308s.
  async redirects() {
    return [
      { source: "/services", destination: "/solutions", permanent: true },
      { source: "/projects", destination: "/case-studies", permanent: true },
      { source: "/work", destination: "/case-studies", permanent: true },
      ...PROJECTS.map((p) => ({
        source: `/work/${p.slug}`,
        destination: projectHref(p),
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
