"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { IconCloud } from "@/components/ui/icon-cloud";
import { easeOutExpo } from "@/lib/motion";

const SKILL_ICON_SLUGS = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
] as const;

const skillIconImages = SKILL_ICON_SLUGS.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

const HIGHLIGHT_SKILLS = [
  { slug: "html5", label: "HTML" },
  { slug: "css", label: "CSS" },
  { slug: "bootstrap", label: "Bootstrap" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "react", label: "React.js" },
  { slug: "angular", label: "Angular" },
  { slug: "python", label: "Python" },
  { slug: "postgresql", label: "SQL" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "nextdotjs", label: "Next.js" },
] as const;

function highlightIconPath(slug: string) {
  const color = slug === "angular" ? "dd0031" : slug;
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

const highlightFromBottom = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.14,
    },
  },
};

const highlightItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOutExpo },
  },
};

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="scroll-mt-[5.5rem] border-t border-white/[0.06] px-4 py-8 sm:scroll-mt-28 sm:px-6 sm:py-11 md:py-16"
    >
      <div className="mx-auto max-w-6xl min-w-0">
        <div className="grid grid-cols-1 gap-x-0 gap-y-10 lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:gap-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="min-w-0 lg:col-start-2 lg:row-start-1 lg:pl-2"
          >
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-fuchsia-300/90 sm:text-xs">
              Toolkit
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              <motion.span
                className="inline-block text-emerald-400"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.88, 1, 0.88],
                        textShadow: [
                          "0 0 18px rgba(52, 211, 153, 0.35)",
                          "0 0 32px rgba(52, 211, 153, 0.55)",
                          "0 0 18px rgba(52, 211, 153, 0.35)",
                        ],
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                Skills
              </motion.span>{" "}
              <span className="text-zinc-50">in motion</span>
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400 sm:mt-5 sm:text-lg">
              An ever-evolving ecosystem of tools and frameworks—spinning
              continuously, adapting to build faster, smarter, and better digital
              experiences.
            </p>
          </motion.div>

          <div className="flex min-h-0 min-w-0 justify-center overflow-x-clip lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="relative flex w-full max-w-[min(100%,560px)] items-center justify-center overflow-hidden [&>canvas]:h-auto [&>canvas]:max-w-full [&>canvas]:w-full">
              <IconCloud images={skillIconImages} size={520} />
            </div>
          </div>

          <div className="min-w-0 lg:col-start-2 lg:row-start-2 lg:pl-2">
            {reduceMotion ? (
              <ul
                className="flex list-none flex-wrap justify-center gap-2 sm:justify-start"
                aria-label="Highlighted skills"
              >
                {HIGHLIGHT_SKILLS.map(({ slug, label }) => (
                  <li key={slug}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 pr-3 text-sm text-zinc-200">
                      <Image
                        src={highlightIconPath(slug)}
                        alt=""
                        width={18}
                        height={18}
                        className="size-[18px] shrink-0"
                        unoptimized
                      />
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <motion.ul
                className="flex list-none flex-wrap justify-center gap-2 sm:justify-start"
                variants={highlightFromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-32px", amount: 0.2 }}
                aria-label="Highlighted skills"
              >
                {HIGHLIGHT_SKILLS.map(({ slug, label }) => (
                  <motion.li key={slug} variants={highlightItem}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 pr-3 text-sm text-zinc-200 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
                      <Image
                        src={highlightIconPath(slug)}
                        alt=""
                        width={18}
                        height={18}
                        className="size-[18px] shrink-0"
                        unoptimized
                      />
                      {label}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
