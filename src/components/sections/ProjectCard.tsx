"use client";

import type { MotionValue } from "framer-motion";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { easeOutExpo } from "@/lib/motion";
import { useCoarsePointer } from "@/hooks/useCoarsePointer";

const NEON = {
  fill: "bg-[#c8ff3d] text-zinc-950",
  outline: "border-2 border-[#c8ff3d] bg-transparent text-[#c8ff3d]",
} as const;

export type ProjectCardData = {
  title: string;
  description: string;
  image: string | StaticImageData;
  /** Optional — not shown in the compact FITME-style layout */
  tech?: string[];
  /** Fallback when `githubUrl` / `liveUrl` are omitted */
  href?: string;
  githubUrl?: string;
  liveUrl?: string;
};

type ProjectCardProps = {
  project: ProjectCardData;
  index: number;
  layout?: "featured" | "stacked";
  scrollYProgress?: MotionValue<number>;
  reduceMotion?: boolean;
};

const MAGNET_STRENGTH = 0.1;
const TILT_MAX = 5;

function CardActions({ project }: { project: ProjectCardData }) {
  const hasGithub = Boolean(project.githubUrl);
  const hasLive = Boolean(project.liveUrl);
  const fallback = project.href ?? "#";

  if (hasGithub || hasLive) {
    return (
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {hasGithub && (
          <Link
            href={project.githubUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${NEON.fill}`}
          >
            Github
          </Link>
        )}
        {hasLive && (
          <Link
            href={project.liveUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[#c8ff3d]/10 ${NEON.outline}`}
          >
            Live
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Link
        href={fallback}
        className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${NEON.fill}`}
      >
        View project
      </Link>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  layout = "featured",
  scrollYProgress,
  reduceMotion = false,
}: ProjectCardProps) {
  const coarse = useCoarsePointer();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const zeroProgress = useMotionValue(0);
  const progress = scrollYProgress ?? zeroProgress;

  const magX = useTransform(mx, (v) => v * MAGNET_STRENGTH * 36);
  const magY = useTransform(my, (v) => v * MAGNET_STRENGTH * 36);
  const parallaxY = useTransform(progress, [0, 1], [index * 10, -index * 10]);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [TILT_MAX, -TILT_MAX]), {
    stiffness: 280,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-TILT_MAX, TILT_MAX]), {
    stiffness: 280,
    damping: 26,
  });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (coarse || reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [coarse, reduceMotion, mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const isStacked = layout === "stacked";
  const enableTilt = !coarse && !reduceMotion && !isStacked;
  const enableMagnet = enableTilt;

  const inner = (
    <div className="group relative flex h-full flex-col rounded-[1.75rem] border border-zinc-800 bg-black p-6 transition-[border-color,box-shadow] duration-300 sm:rounded-[2rem] sm:p-7 md:p-8 hover:border-zinc-600 hover:shadow-[0_0_0_1px_rgba(200,255,61,0.12)]">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-zinc-800/80">
        <motion.div
          className="h-full w-full"
          whileHover={coarse || reduceMotion ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes={
              isStacked
                ? "(max-width: 768px) 100vw, 90vw"
                : "(max-width: 1200px) 50vw, 360px"
            }
            priority={index < 2}
          />
        </motion.div>
      </div>

      <h3 className="mt-5 text-left text-base font-bold uppercase tracking-[0.12em] text-white sm:mt-6 sm:text-lg">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-left text-pretty text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>

      <CardActions project={project} />
    </div>
  );

  const hoverScale = coarse || reduceMotion || isStacked ? undefined : { scale: 1.02 };

  if (isStacked) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: easeOutExpo }}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ y: reduceMotion ? undefined : parallaxY }}
      initial={reduceMotion ? false : { opacity: 0, x: 80 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: easeOutExpo }}
      className="relative w-[min(85vw,300px)] shrink-0 sm:w-[min(70vw,320px)] lg:w-[min(58vw,340px)]"
    >
      <motion.div
        ref={ref}
        style={{
          x: enableMagnet ? magX : undefined,
          y: enableMagnet ? magY : undefined,
          perspective: 1200,
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        whileHover={hoverScale}
        transition={{ duration: 0.35, ease: easeOutExpo }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="h-full"
      >
        {inner}
      </motion.div>
    </motion.div>
  );
}
