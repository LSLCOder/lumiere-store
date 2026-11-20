type AuthFormSkeletonProps = {
  /** The form's fields, in order, with any hint shown under them. */
  fields: { label: string; hint?: string }[];
  action: string;
};

/**
 * Shown while the page checks the session. It has the form's shape and size
 * but no inputs, so nothing typed into it can be lost when the real form
 * arrives, and the page doesn't jump.
 */
export function AuthFormSkeleton({ fields, action }: AuthFormSkeletonProps) {
  return (
    <div aria-busy="true" className="stack">
      <p className="sr-only">Loading the form…</p>
      {fields.map(({ label, hint }) => (
        <div key={label} aria-hidden="true">
          {/* Inline, like the real <label>, so the line height matches. */}
          <span className="label">{label}</span>
          {/* Same height as a filled-in `.field` (50px). */}
          <div className="mt-2 h-[3.125rem] border" />
          {hint ? (
            <p className="text-caption text-ink-muted mt-2">{hint}</p>
          ) : null}
        </div>
      ))}
      <div aria-hidden="true" className="btn btn-primary btn-block opacity-40">
        {action}
      </div>
    </div>
  );
}
