"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiMaximize2 } from "react-icons/fi";
import Typography from "@/components/utils/Typography";
import PreviewLightbox from "./PreviewLightbox";
import { SHOT_GROUPS, type Project } from "./projects.data";

type ProjectShowcaseProps = {
  project: Project;
};

/**
 * The screens, grouped the way the product is: what it does, how you get in,
 * and how it is sold. Every thumbnail opens the same gallery, so the preview
 * walks the whole product rather than one section of it.
 */
const ProjectShowcase = ({ project }: ProjectShowcaseProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const groups = SHOT_GROUPS.map((group) => ({
    ...group,
    shots: project.shots.filter((shot) => shot.group === group.id),
  })).filter((group) => group.shots.length > 0);

  return (
    <>
      <div className="space-y-16">
        {groups.map((group) => (
          <section key={group.id} aria-label={group.label}>
            <div className="flex items-baseline gap-4">
              <Typography as="h3" variant="title" className="text-content">
                {group.label}
              </Typography>
              <span
                aria-hidden
                className="h-px flex-1 bg-line"
              />
              <span className="font-mono text-[10px] tracking-[0.18em] text-content-subtle tabular-nums">
                {String(group.shots.length).padStart(2, "0")}
              </span>
            </div>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {group.shots.map((shot) => {
                const index = project.shots.indexOf(shot);

                /* The thumbnail takes the screen's own proportions, clamped so
                   a 5.6:1 filter strip and a near-square dropdown both still
                   read as cards rather than as a hairline and a tower. */
                const ratio = Math.min(
                  Math.max(shot.width / shot.height, 1.3),
                  2.6,
                );

                return (
                  <motion.li
                    key={shot.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      aria-label={`Preview ${shot.title}`}
                      className="glass group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl text-left transition-transform duration-500 ease-out-depth hover:-translate-y-1">
                      {/* Contain, not cover: cropping these to one ratio would
                          throw away the thing each screen is there to show. */}
                      <span
                        style={{ aspectRatio: ratio }}
                        className="relative flex items-center justify-center overflow-hidden bg-surface/50 p-4">
                        {/* Intrinsic rather than `fill`: a 369px-wide dropdown
                            stretched across the card is a blurred mess, so a
                            small screen is allowed to stay small. */}
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          sizes="(min-width: 640px) 44vw, 92vw"
                          className="h-auto max-h-full w-auto max-w-full rounded-sm object-contain drop-shadow-sm transition-transform duration-700 ease-out-depth group-hover:scale-[1.04]"
                        />

                        {/* Only on hover/focus — the shot should be readable at rest. */}
                        <span
                          aria-hidden
                          className="absolute inset-0 flex items-center justify-center bg-surface/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/80 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-content uppercase">
                            <FiMaximize2 className="size-3 text-accent" />
                            Preview
                          </span>
                        </span>
                      </span>

                      <span className="flex flex-1 flex-col p-5">
                        <span className="text-sm font-medium text-content transition-colors duration-300 group-hover:text-accent">
                          {shot.title}
                        </span>
                        <span className="mt-2 text-sm leading-6 text-content-muted">
                          {shot.caption}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <PreviewLightbox
        shots={project.shots}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
};

export default ProjectShowcase;
