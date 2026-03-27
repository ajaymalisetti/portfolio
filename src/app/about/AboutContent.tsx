"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { easeOutExpo } from "@/lib/motion";

function AnimatedLetters({
  text,
  baseDelay = 0,
  className,
}: {
  text: string;
  baseDelay?: number;
  className?: string;
}) {
  return (
    <p className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 8, color: "rgb(113 113 122)" }}
          animate={{ opacity: 1, y: 0, color: "rgb(212 212 216)" }}
          transition={{
            duration: 0.45,
            delay: baseDelay + index * 0.012,
            ease: easeOutExpo,
          }}
          className="inline-block"
          style={{
            textShadow:
              char.trim().length > 0
                ? "0 0 10px rgba(52,211,153,0.14)"
                : undefined,
          }}
        >
          {char === " " ? "\u00a0" : char}
        </motion.span>
      ))}
    </p>
  );
}

export function AboutContent() {
  return (
    <main className="min-h-dvh px-4 pb-[max(6rem,env(safe-area-inset-bottom))] pt-[max(7.5rem,env(safe-area-inset-top)+5.5rem)] sm:px-6 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-2xl min-w-0">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back home
        </Link>
        <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl sm:mt-10 sm:rounded-2xl sm:p-10">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl"
          >
            About
          </motion.h1>

          <AnimatedLetters
            baseDelay={0.08}
            className="mt-5 text-pretty text-sm leading-relaxed sm:mt-6 sm:text-base"
            text="I’m a Full Stack Developer with 3 years of experience building responsive and scalable web applications. I specialize in modern JavaScript frameworks like React and Angular, along with strong skills in HTML, CSS, and backend integration."
          />
          <AnimatedLetters
            baseDelay={0.26}
            className="mt-4 text-pretty text-sm leading-relaxed sm:text-base"
            text="I’m highly skilled at leveraging AI tools to build modern, efficient applications faster and smarter, helping turn ideas into real-world products with optimized performance and clean user experiences."
          />
          <AnimatedLetters
            baseDelay={0.44}
            className="mt-4 text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base"
            text="Beyond coding, I enjoy dancing, playing chess, and going to the gym to build strength and discipline. These activities help me stay creative, focused, and consistent both personally and professionally."
          />
        </div>
      </div>
    </main>
  );
}
