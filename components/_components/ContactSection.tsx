"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import Typography from "@/components/utils/Typography";

/**
 * The contact section on the home page.
 *
 * There is no API route behind this: the form posts straight to a Google Apps
 * Script web app (see scripts/contact.gs), which appends a row to a Sheet and
 * mails it on. That keeps the whole thing inside the static Vercel deploy —
 * nothing to host, no secrets in the bundle beyond a URL that is meant to be
 * public.
 *
 * The request deliberately goes out as `text/plain`. Sending JSON would make
 * the browser fire a CORS preflight, and Apps Script web apps do not answer
 * OPTIONS — the body is still JSON, only the header is relaxed.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_CLASS =
  "w-full rounded-[5px] border border-line bg-surface-raised px-4 py-2.5 text-base text-content shadow-edge transition-colors duration-200 placeholder:text-content-subtle hover:border-line-strong";

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    setStatus("sending");

    try {
      if (!ENDPOINT) throw new Error("NEXT_PUBLIC_CONTACT_ENDPOINT is not set");

      await fetch(ENDPOINT, {
        method: "POST",
        // Not application/json — see the note at the top of this file.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          // Hidden field. Humans leave it empty; most bots fill every input.
          company: data.get("company"),
        }),
      });

      formRef.current?.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      data-theme-surface
      className="ambient-field relative isolate overflow-hidden bg-surface text-content">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line"
      />

      <div className="mx-auto w-full max-w-[1800px] px-6 py-20 sm:px-8 md:px-16 md:py-28 2xl:px-26 2xl:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={0}
            variants={reveal}
            className="max-w-xl">
            <Typography variant="overline" className="text-content-subtle">
              Contact
            </Typography>
            <span aria-hidden className="mt-4 block h-1 w-10 bg-accent" />

            <Typography variant="h3" className="mt-8">
              Let&apos;s build something.
            </Typography>

            <Typography variant="body" className="mt-6 text-content-muted">
              Have a project, a role, or a question in mind? Leave your details
              and I&apos;ll get back to you — usually within a day or two.
            </Typography>
          </motion.div>

          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.1}
            variants={reveal}
            className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Typography
                as="label"
                variant="caption"
                className="font-medium text-content-muted">
                Name
              </Typography>
              <input
                type="text"
                name="name"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Your name"
                className={FIELD_CLASS}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Typography
                as="label"
                variant="caption"
                className="font-medium text-content-muted">
                Email
              </Typography>
              <input
                type="email"
                name="email"
                required
                maxLength={150}
                autoComplete="email"
                placeholder="you@example.com"
                className={FIELD_CLASS}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Typography
                as="label"
                variant="caption"
                className="font-medium text-content-muted">
                Message
              </Typography>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={2000}
                placeholder="What are you working on?"
                className={clsx(FIELD_CLASS, "resize-y")}
              />
            </div>

            {/* Honeypot — hidden from people and assistive tech, not from bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="cursor-pointer rounded-[5px] bg-invert px-6 py-2.5 text-sm font-medium text-on-invert transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              <p
                aria-live="polite"
                className={clsx(
                  "text-sm transition-opacity duration-300",
                  status === "sent" && "text-accent",
                  status === "error" && "text-content",
                  (status === "idle" || status === "sending") &&
                    "text-content-subtle",
                )}>
                {status === "sent" && "Thanks — I'll be in touch soon."}
                {status === "error" &&
                  "Couldn't send that. Try again, or mail me directly."}
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
