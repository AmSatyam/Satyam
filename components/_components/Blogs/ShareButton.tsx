"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiShare2 } from "react-icons/fi";

type ShareButtonProps = {
  title: string;
};

/**
 * Shares the current URL. Native share sheet where there is one (phones), a
 * clipboard copy with confirmation everywhere else. The URL is read at click
 * time rather than at render, so this stays safe in a server-rendered tree.
 */
const ShareButton = ({ title }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const onShare = useCallback(async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* Dismissed, or unavailable in this context — fall through to copy. */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard can be blocked; there is nothing useful to say about it. */
    }
  }, [title]);

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label={copied ? "Link copied" : "Share this post"}
      className="glass inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-content transition-transform duration-500 ease-out-depth hover:-translate-y-0.5">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "share"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          className="inline-flex">
          {copied ? (
            <FiCheck aria-hidden className="size-4 text-accent" />
          ) : (
            <FiShare2 aria-hidden className="size-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ShareButton;
