"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import type { Shot } from "./projects.data";

/** Nothing to subscribe to — the value only ever changes by mounting. */
const subscribeNever = () => () => {};

type PreviewLightboxProps = {
  shots: Shot[];
  /** null when closed — the whole overlay is unmounted between opens. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Full-screen screen-by-screen preview.
 *
 * The product cannot be handed over, so this is the closest thing to using it:
 * every screen at full size, captioned, walkable with the keyboard. It is a
 * real modal — focus moves in, the page behind stops scrolling, and Escape
 * always gets you out.
 */
const PreviewLightbox = ({
  shots,
  index,
  onClose,
  onNavigate,
}: PreviewLightboxProps) => {
  const reduceMotion = Boolean(useReducedMotion());
  const dialogRef = useRef<HTMLDivElement>(null);
  // False through SSR and hydration, true thereafter: the portal needs a real
  // document.body, which only exists on the client.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const open = index !== null;

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      // Wraps, so arrowing past either end continues the tour.
      onNavigate((index + step + shots.length) % shots.length);
    },
    [index, onNavigate, shots.length],
  );

  // Keyboard is the primary way through a gallery this size.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [go, onClose, open]);

  // Hold the page still underneath, and give it back exactly what it had.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    const restoreFocus = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
      restoreFocus?.focus?.();
    };
  }, [open]);

  /* Paired so the narrowing below covers the position as well as the shot —
     TypeScript cannot carry `index !== null` into the JSX on its own. */
  const current = index === null ? null : { shot: shots[index], position: index };

  if (!mounted) return null;

  /**
   * Portalled to the body on purpose. Every page here wraps its content in a
   * `isolate` main, which is its own stacking context — a modal rendered
   * inside it cannot rise above the globally fixed theme toggle no matter what
   * z-index it carries.
   */
  return createPortal(
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center bg-surface/80 p-4 backdrop-blur-xl sm:p-8">
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.shot.title} — screen ${current.position + 1} of ${shots.length}`}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex max-h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl outline-none">
            {/* ------------------------------------------------- Title bar */}
            <div className="flex items-center gap-4 border-b border-line px-5 py-4 sm:px-7">
              <span className="font-mono text-[10px] tracking-[0.18em] text-accent tabular-nums">
                {String(current.position + 1).padStart(2, "0")} /{" "}
                {String(shots.length).padStart(2, "0")}
              </span>

              <span className="truncate text-sm font-medium text-content">
                {current.shot.title}
              </span>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="ml-auto inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-content transition-colors duration-300 hover:border-line-strong">
                <FiX aria-hidden className="size-4" />
              </button>
            </div>

            {/* ---------------------------------------------------- The shot */}
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-surface/40 p-4 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.shot.id}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  className="flex items-center justify-center">
                  <Image
                    src={current.shot.src}
                    alt={current.shot.alt}
                    width={current.shot.width}
                    height={current.shot.height}
                    sizes="92vw"
                    className="h-auto max-h-[62vh] w-auto max-w-full rounded-lg shadow-elev-3"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ------------------------------------------- Caption and paging */}
            <div className="flex flex-col gap-4 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:px-7">
              <p className="max-w-3xl text-sm leading-6 text-content-muted">
                {current.shot.caption}
              </p>

              <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous screen"
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-line text-content transition-colors duration-300 hover:border-line-strong">
                  <FiArrowLeft aria-hidden className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next screen"
                  className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-line text-content transition-colors duration-300 hover:border-line-strong">
                  <FiArrowRight aria-hidden className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default PreviewLightbox;
