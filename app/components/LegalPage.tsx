import type { ReactNode } from "react";

/** Shared layout for the privacy policy and terms: title, lead, date, then plain sections. */
export function LegalPage({
  title,
  updated,
  lead,
  children,
}: {
  title: string;
  updated: { label: string; iso: string };
  lead: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="pm-page">
      <article className="pm-page__inner pm-prose">
        <h1 className="pm-page__title">{title}</h1>
        <p className="pm-page__lead">{lead}</p>
        <p className="pm-prose__date">
          Last updated <time dateTime={updated.iso}>{updated.label}</time>
        </p>
        {children}
      </article>
    </main>
  );
}
