import { FiLock } from "react-icons/fi";
import clsx from "clsx";

type LockChipProps = {
  label?: string;
  className?: string;
};

/** The one visual marker that a project is a real product, not a demo. */
const LockChip = ({ label = "Access locked", className }: LockChipProps) => (
  <span
    className={clsx(
      "inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-content-muted uppercase backdrop-blur-md",
      className,
    )}>
    <FiLock aria-hidden className="size-3 text-accent" />
    {label}
  </span>
);

export default LockChip;
