import type { ReactNode } from "react";
import Typography from "@/components/utils/Typography";

type PageHeadingProps = {
  overline: string;
  title: ReactNode;
  lede?: string;
  /** Sits at the end of the row on wide screens — a count, a link, a chip. */
  aside?: ReactNode;
};

/**
 * The masthead shared by /blogs and /projects. It repeats the About section's
 * opening beat — overline, accent rule, heading — so a sub-page reads as the
 * same site rather than as a different template.
 */
const PageHeading = ({ overline, title, lede, aside }: PageHeadingProps) => (
  <div className="flex flex-wrap items-end justify-between gap-6">
    <div className="max-w-3xl">
      <Typography variant="overline" className="text-content-subtle">
        {overline}
      </Typography>
      <span aria-hidden className="mt-4 block h-1 w-10 bg-accent" />

      <Typography
        as="h1"
        variant="display"
        className="mt-7 text-content [text-shadow:var(--display-shadow)]">
        {title}
      </Typography>

      {lede && (
        <Typography variant="body" className="mt-6 max-w-2xl text-content-muted">
          {lede}
        </Typography>
      )}
    </div>

    {aside}
  </div>
);

export default PageHeading;
