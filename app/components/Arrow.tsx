/** Trailing arrow for outline pill buttons. Decorative: the label carries the meaning. */
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className="pm-arrow"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      focusable="false"
      style={diagonal ? { transform: "rotate(-45deg)" } : undefined}
    >
      <path
        d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
