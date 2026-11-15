import Image from "next/image";
import Link from "next/link";
import LockChip from "./LockChip";
import type { Project } from "./projects.data";

type ProjectCardProps = {
  project: Project;
  /** The first card on a page carries the LCP image, so it is not lazy. */
  priority?: boolean;
};

/**
 * Deliberately compact. The section is sized to hold five or six of these at
 * once, so the card gives the screenshot the space and keeps the copy to what
 * is needed to decide whether to open the case study.
 */
const ProjectCard = ({ project, priority = false }: ProjectCardProps) => (
  <Link
    href={`/projects/${project.slug}`}
    className="glass group flex h-full flex-col overflow-hidden rounded-xl transition-transform duration-500 ease-out-depth hover:-translate-y-1">
    <div className="relative aspect-video overflow-hidden">
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 31vw, (min-width: 640px) 46vw, 100vw"
        className="object-cover object-top-left transition-transform duration-700 ease-out-depth group-hover:scale-[1.03]"
      />

      {/* Held to the bottom third — a scrim across the whole shot reads as a
          rendering fault rather than as lighting. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-surface/85 via-surface/0 via-30% to-transparent"
      />

      <LockChip className="absolute bottom-3 left-4 bg-surface/70" />
    </div>

    <div className="flex flex-1 flex-col p-5">
      <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
        {project.status}
      </span>

      <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-content transition-colors duration-300 group-hover:text-accent">
        {project.name}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-content-muted">
        {project.tagline}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 3).map((item) => (
          <li
            key={item}
            className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-content-subtle">
            {item}
          </li>
        ))}
      </ul>

      <span className="mt-auto flex items-center gap-2.5 pt-5 font-mono text-[10px] tracking-[0.18em] text-content-subtle uppercase">
        View case study
        <span
          aria-hidden
          className="h-px w-5 bg-content-subtle transition-all duration-500 group-hover:w-9 group-hover:bg-accent"
        />
      </span>
    </div>
  </Link>
);

export default ProjectCard;
