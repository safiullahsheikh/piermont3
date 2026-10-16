/** Shown while a page streams in on a slow connection: one ripple, nothing else. */
export default function Loading() {
  return (
    <div className="pm-loading" role="status">
      <span className="pm-loading__ring" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
