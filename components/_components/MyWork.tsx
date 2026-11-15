"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Typography from "@/components/utils/Typography";
import ProjectCard from "./Work/ProjectCard";
import { PROJECTS } from "./Work/projects.data";

/**
 * The work section on the home page. It shows the products rather than links
 * to them: each one is deployed and access-locked, so the card opens a case
 * study instead of a live URL.
 */
const MyWork = () => {
  const reduceMotion = Boolean(useReducedMotion());

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      id="work"
      aria-label="Selected work"
      data-theme-surface
      className="ambient-field relative isolate overflow-hidden bg-surface text-content">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line"
      />

      <div className="mx-auto w-full max-w-[1800px] px-6 py-20 sm:px-8 md:px-16 md:py-28 2xl:px-26 2xl:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
          variants={reveal}
          className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <div className="max-w-2xl">
            <Typography variant="overline" className="text-content-subtle">
              Selected work
            </Typography>
            <span aria-hidden className="mt-4 block h-1 w-10 bg-accent" />

            <Typography variant="body" className="mt-8 text-content-muted">
              Products in use, not prototypes. Each one is documented here with
              the screens and the mechanics — the deployment itself stays behind
              a request.
            </Typography>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-content-subtle uppercase transition-colors duration-300 hover:text-content 2xl:text-[11px]">
            All projects
            <span
              aria-hidden
              className="h-px w-8 bg-content-subtle transition-all duration-500 group-hover:w-12 group-hover:bg-accent"
            />
          </Link>
        </motion.div>

        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.li
              key={project.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={0.1 + index * 0.08}
              variants={reveal}
              className="h-full">
              <ProjectCard project={project} priority={index === 0} />
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          custom={0.2}
          variants={reveal}
          className="mt-14 border-t border-line pt-8">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-content-subtle uppercase transition-colors duration-300 hover:text-content 2xl:text-xs">
            <span
              aria-hidden
              className="h-px w-8 bg-content-subtle transition-all duration-500 group-hover:w-12 group-hover:bg-accent"
            />
            Read the writing
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MyWork;
