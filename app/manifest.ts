import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Piermont Studios",
    short_name: "Piermont",
    start_url: "/",
    display: "standalone",
    background_color: "#040a17",
    theme_color: "#040a17",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
