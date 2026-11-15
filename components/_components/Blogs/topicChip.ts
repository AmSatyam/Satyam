import clsx from "clsx";

/**
 * One definition of a topic chip, shared by the interactive filter on the
 * index and the plain links in an article's sidebar, so the two can never
 * drift apart visually.
 */
export const topicChipClass = (active: boolean) =>
  clsx(
    "relative inline-flex cursor-pointer items-center rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
    active
      ? "text-on-invert"
      : "panel-flat text-content-muted hover:text-content",
  );
