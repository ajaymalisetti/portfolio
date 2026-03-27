"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIntroGate } from "@/components/layout/IntroGateContext";
import { DropInFromTop } from "@/components/motion/DropInFromTop";
import { easeOutExpo } from "@/lib/motion";
import heroImage from "@/assets/hero.png";
import { HeroBackground } from "./HeroBackground";

/** Rotating greeting on the first line; “I’m Ajay” on the line below. */
const GREETINGS = [
  "Hi",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Olá",
  "Namaste",
  "你好",
  "नमस्ते",
  "こんにちは",
  "안녕하세요",
  "Привет",
] as const;

const GREETING_INTERVAL_MS = 2800;

const line2 = "";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

function RevealLine({ text }: { text: string }) {
  return (
    <span className="block overflow-hidden">
      <span className="flex flex-wrap">
        {text.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={letter}
            className="inline-block"
          >
            {char === " " ? "\u00a0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export function Hero() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const { introComplete } = useIntroGate();

  useEffect(() => {
    const id = window.setInterval(() => {
      setGreetingIndex((i) => (i + 1) % GREETINGS.length);
    }, GREETING_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-x-clip px-4 pb-[max(6rem,env(safe-area-inset-bottom))] pt-[max(7.5rem,env(safe-area-inset-top)+5.5rem)] sm:px-6 sm:pb-32 sm:pt-32">
      <HeroBackground />
      <div className="relative mx-auto grid w-full max-w-6xl min-w-0 items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,440px)] lg:gap-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:mb-6 sm:text-xs"
          >
            
          </motion.p>
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl text-balance text-[clamp(1.875rem,5vw+0.85rem,4.5rem)] font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:leading-[1.05] lg:leading-[1.02]"
          >
            <span className="block space-y-1 sm:space-y-2">
              <span
                className="relative block min-h-[1.15em] overflow-hidden text-emerald-400"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={GREETINGS[greetingIndex]}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                    className="block"
                  >
                    {GREETINGS[greetingIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <motion.span variants={letter} className="block text-zinc-50">
                I&apos;m Ajay 
              </motion.span>
            </span>
            <RevealLine text={line2} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65, ease: easeOutExpo }}
            className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-zinc-400 sm:mt-8 sm:text-lg"
          >
            Full stack developer focused on performance, seamless user experiences, and scalable systems — built with precision and clarity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link
              href="/#work"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-medium text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md transition-colors hover:border-violet-400/30 hover:bg-white/[0.09] sm:min-h-0 sm:w-auto sm:justify-start"
            >
              View work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex min-h-12 items-center justify-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300 sm:min-h-0 sm:justify-start"
            >
              Let&apos;s talk
            </Link>
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]">
          {introComplete ? (
            <DropInFromTop delay={0.12} fromViewportHeight={1.2}>
              <div className="relative overflow-hidden rounded-xl bg-transparent p-0">
                <Image
                  src={heroImage}
                  alt="Malisetti Ajay portrait"
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            </DropInFromTop>
          ) : (
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white/[0.02] ring-1 ring-white/[0.06]"
              aria-hidden
            />
          )}
        </div>
      </div>
    </section>
  );
}
