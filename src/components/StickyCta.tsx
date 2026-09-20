"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

/** Mobile-only fixed action bar: sessions get interrupted, the action must survive. */
export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 320);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  if (pathname === "/start-a-project") return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line-dark)] bg-ink/90 p-3 backdrop-blur-xl md:hidden"
        >
          <Link
            href="/start-a-project"
            className="flex h-13 items-center justify-center gap-3 bg-ivory text-[15px] font-medium text-ink"
          >
            Send Us Your Tech Pack
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 9h13M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
