/** Single source for business details used by the footer, contact page and SEO data. */
export const SITE_URL = "https://piermontstudios.com";

export const PHONE = { display: "307-655-6848", href: "tel:+13076556848", e164: "+13076556848" };

export const EMAIL = "harris@piermontstudios.com";

/** Paste the final profile URLs here; they feed the footer and search-engine data. */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/piermontstudios" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/piermont-studios/" },
] as const;

/**
 * Per page metadata. Next merges `openGraph` shallowly, so a page that sets
 * only `title` would inherit the home page's og:title and og:url.
 */
export function pageMeta({
  title,
  description,
  path,
  image = "/og.png",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): import("next").Metadata {
  // Google shows ~60 title chars and ~160 description chars; long titles drop the brand suffix.
  const full = title.length > 42 ? title : `${title} | Piermont Studios`;
  description = clip(description, 158);
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Piermont Studios",
      locale: "en_US",
      title: full,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [image],
    },
  };
}

function clip(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "")}…`;
}

/** Review profiles shown as icons in the footer. Set `href` to the profile URL; null renders the icon without a link. */
export const REVIEWS: { label: string; icon: string; href: string | null }[] = [
  { label: "Bark", icon: "/reviews/bark.png", href: null },
  { label: "Trustpilot", icon: "/reviews/trustpilot.png", href: null },
  { label: "Google Reviews", icon: "/reviews/google.png", href: null },
  { label: "Clutch", icon: "/reviews/clutch.png", href: null },
];
