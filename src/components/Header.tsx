"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // close the mobile menu when the route changes (state reset during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-[var(--line-dark)] bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1520px] items-center justify-between px-5 transition-[height] duration-500 md:px-10 ${
            scrolled ? "h-16" : "h-[72px] md:h-[88px]"
          }`}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative py-2 text-[13.5px] tracking-[0.01em] transition-colors ${
                  isActive(item.href) ? "text-ivory" : "text-ivory/70 hover:text-ivory"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-green transition-transform duration-500 ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="ml-3 flex items-center gap-2 md:ml-0 md:gap-4">
            <Link
              href="/start-a-project"
              className="group relative hidden h-11 items-center gap-2 overflow-hidden bg-ivory px-5 text-[13.5px] font-medium text-ink lg:inline-flex"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-green transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="relative">Start a Project</span>
              <svg className="relative transition-transform duration-500 group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 9h13M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
              </svg>
            </Link>

            {/* Mobile: the specialism stays visible; it never hides behind the menu */}
            <Link
              href="/workwear-uniforms"
              className="relative whitespace-nowrap py-1 text-[12px] font-medium text-ivory lg:hidden"
            >
              Workwear &amp; Uniforms
              <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-px bg-green" />
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative -mr-3 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-ivory transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[5px]"}`}
              />
              <span
                className={`absolute h-px w-6 bg-ivory transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[5px]"}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-28 lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/start-a-project", label: "Start a Project" }].map(
                (item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline justify-between border-b border-[var(--line-dark)] py-5 font-display text-[1.9rem] leading-none text-ivory"
                    >
                      {item.label}
                      <span className="eyebrow text-sage">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>
            <div className="eyebrow space-y-2 text-sage">
              <p>{site.email}</p>
              <p>WhatsApp {site.whatsapp}</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
