"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { easeOutExpo } from "@/lib/motion";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-zinc-950/40 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-3">
          <Link
            href="/"
            className="flex min-h-11 min-w-11 shrink-0 items-center gap-2 rounded-lg text-sm font-medium tracking-tight text-zinc-100 sm:min-h-0 sm:min-w-0"
          >
            <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] sm:flex sm:h-8 sm:w-8">
              <Sparkles className="h-4 w-4 text-violet-300" aria-hidden />
            </span>
            <span
              className="text-zinc-100 tracking-tighter"
              style={{
                fontSize: "xx-large",
                fontFamily: "monospace",
                fontStyle: "italic",
                letterSpacing: "-0.08em",
              }}
            >
              <span className="text-emerald-400">Ajay</span> Malisetti
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex md:gap-2 lg:gap-3"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const isAbout = item.href === "/about";
              const active = isAbout && pathname === "/about";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-4 py-2.5 text-base font-semibold transition-all duration-200 ${
                    active
                      ? "text-zinc-50"
                      : "text-zinc-400 hover:scale-[1.03] hover:bg-white/[0.07] hover:text-emerald-300 hover:shadow-[0_0_24px_rgba(52,211,153,0.15)] active:scale-[0.99]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-xl border border-white/10 bg-white/[0.06]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-zinc-200 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-md md:hidden"
            style={{
              paddingTop: "max(5.5rem, calc(env(safe-area-inset-top) + 4.5rem))",
            }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              aria-label="Mobile primary"
              onClick={(e) => e.stopPropagation()}
            >
              {nav.map((item, i) => {
                const isAbout = item.href === "/about";
                const active = isAbout && pathname === "/about";
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={`block rounded-xl border px-5 py-4 text-lg font-semibold transition-all duration-200 ${
                        active
                          ? "border-emerald-500/35 bg-white/[0.1] text-zinc-50 shadow-[0_0_28px_rgba(52,211,153,0.14)]"
                          : "border-white/[0.06] bg-white/[0.03] text-zinc-300 hover:border-emerald-500/25 hover:bg-white/[0.08] hover:text-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)] active:scale-[0.99] active:bg-white/[0.06]"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
