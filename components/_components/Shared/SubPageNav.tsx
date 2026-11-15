"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

/**
 * Chrome for the routes that are not the home page. The home page carries its
 * own identity in the hero, so it deliberately has no nav bar — this exists so
 * /blogs and /projects are not dead ends.
 *
 * The right padding clears the globally fixed ThemeToggle in app/layout.tsx.
 */

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Writing" },
];

const SubPageNav = () => {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);

  /**
   * Transparent over the top of the page, opaque once content starts passing
   * underneath — a sticky bar with no backdrop reads as text floating loose
   * over the screenshots.
   */
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        lifted && "border-b border-line bg-surface/80 backdrop-blur-xl",
      )}>
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[1800px] items-center gap-4 px-6 py-4 sm:px-8 md:px-16 2xl:px-26">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-content-subtle uppercase transition-colors duration-300 hover:text-content 2xl:text-xs">
          <span
            aria-hidden
            className="h-px w-6 bg-content-subtle transition-all duration-500 group-hover:w-9 group-hover:bg-accent"
          />
          Satyam
        </Link>

        <ul className="ml-auto flex items-center gap-1.5 pr-14">
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "inline-flex items-center rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase transition-all duration-300 ease-out-depth 2xl:text-[11px]",
                    active
                      ? "glass text-content"
                      : "text-content-subtle hover:text-content",
                  )}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default SubPageNav;
