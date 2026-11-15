"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiLock, FiMail } from "react-icons/fi";
import Typography from "@/components/utils/Typography";
import type { Project } from "./projects.data";

type AccessPanelProps = {
  project: Project;
};

/**
 * Why the URL is not here, and how to get it.
 *
 * The masked host is deliberately not the real one — it is a visual statement
 * that something exists behind it, not an obfuscated link, so there is nothing
 * to un-mask in the markup.
 */
const AccessPanel = ({ project }: AccessPanelProps) => {
  const [open, setOpen] = useState(false);
  const reduceMotion = Boolean(useReducedMotion());

  const { access } = project;

  const mailto = `mailto:${access.contactEmail}?subject=${encodeURIComponent(
    `Access request — ${project.name}`,
  )}&body=${encodeURIComponent(
    `Hi Satyam,\n\nI'd like access to ${project.name}.\n\nWho I am:\nWhat I'd like to see:\n\nThanks`,
  )}`;

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-6 p-6 sm:p-8">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
            <FiLock aria-hidden className="size-3" />
            Access locked
          </span>

          <p className="mt-4 font-mono text-sm text-content-subtle select-none">
            {access.maskedUrl}
          </p>

          <Typography variant="caption" className="mt-4 text-content-muted">
            {access.reason}
          </Typography>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="inline-flex h-11 shrink-0 cursor-pointer items-center rounded-full bg-invert px-6 text-sm font-semibold text-on-invert shadow-elev-2 transition-shadow duration-300 hover:shadow-elev-3">
          {open ? "Hide details" : "Request access"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden">
            <div className="border-t border-line px-6 py-7 sm:px-8">
              <Typography variant="caption" className="text-content-subtle">
                What access looks like
              </Typography>

              <ul className="mt-5 space-y-3">
                {access.grants.map((grant) => (
                  <li key={grant} className="flex items-start gap-3">
                    <FiCheck
                      aria-hidden
                      className="mt-1 size-3.5 shrink-0 text-accent"
                    />
                    <span className="text-sm leading-6 text-content-muted">
                      {grant}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={mailto}
                className="group mt-7 inline-flex items-center gap-3 rounded-full border border-line-strong px-5 py-2.5 text-sm text-content transition-colors duration-300 hover:border-accent hover:text-accent">
                <FiMail aria-hidden className="size-4" />
                {access.contactEmail}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessPanel;
