"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import nebulaAnalyticsImage from "@/assets/nebula-analytics.jpg";
import workSplitPortrait from "@/assets/project.png";
import { easeOutExpo } from "@/lib/motion";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";

/** Replace images with your own assets under `public/` or `@/assets`. */
export const workProjects: ProjectCardData[] = [
  {
    title: "Nebula Analytics",
    description:
      "Real-time dashboards with edge caching and sub-100ms interactions for dense operational data.",
    image: nebulaAnalyticsImage,
    githubUrl: "https://github.com",
    liveUrl: "#",
  },
  {
    title: "Lumen Pay",
    description:
      "Glass-native checkout flows and a tokenized component library built for accessibility.",
    image: "/window.svg",
    githubUrl: "https://github.com",
    liveUrl: "#",
  },
  {
    title: "Atlas Mail",
    description:
      "Thread virtualization and optimistic UI for a fast, dense inbox experience at scale.",
    image: "/vercel.svg",
    githubUrl: "https://github.com",
    liveUrl: "#",
  },
  {
    title: "Orbit CRM",
    description:
      "Pipeline automation with webhook orchestration, audit trails, and role-aware views.",
    image: "/file.svg",
    githubUrl: "https://github.com",
    liveUrl: "#",
  },
];

const subtitleWords =
  "Projects I've built with precision and creativity".split(" ");

function useMinMd() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const fn = () => setOk(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return ok;
}

function SectionHeader({ className }: { className?: string }) {
  return (
    <header className={className}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="mx-auto max-w-5xl text-balance text-center text-[48px] font-medium leading-tight tracking-tight"
      >
        <span className="text-emerald-400">Selected</span>{" "}
        <span className="text-zinc-50">Work</span>
      </motion.h2>
      <p className="mx-auto mt-2 max-w-2xl text-pretty text-center text-sm leading-relaxed text-zinc-400 sm:mt-3 sm:text-base md:text-lg">
        {subtitleWords.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: 0.08 + i * 0.04, ease: easeOutExpo }}
            className="inline-block pr-[0.28em]"
          >
            {word}
          </motion.span>
        ))}
      </p>
    </header>
  );
}

function GridBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-[-50%] opacity-[0.4]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 28, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b]" />
      {[
        { left: "8%", top: "22%", d: 0 },
        { left: "72%", top: "38%", d: 1.2 },
        { left: "44%", top: "68%", d: 2.4 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
          style={{ left: p.left, top: p.top }}
          animate={{ opacity: [0.2, 0.85, 0.2], y: [0, -16, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.d }}
        />
      ))}
    </div>
  );
}

function WorkSectionSimple() {
  return (
    <section
      id="work"
      className="relative scroll-mt-[5.5rem] border-t border-white/[0.06] px-4 py-16 sm:scroll-mt-28 sm:px-6 sm:py-24 md:py-28"
    >
      <div className="relative mx-auto max-w-6xl min-w-0">
        <GridBackdrop />
        <div className="relative">
          <SectionHeader className="mb-10 sm:mb-12" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {workProjects.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={i}
                layout="stacked"
                reduceMotion
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSectionMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(1900);
  const [maxScroll, setMaxScroll] = useState(640);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const parent = track?.parentElement;
    if (!track || !parent) return;
    const overflow = Math.max(0, track.scrollWidth - parent.clientWidth + 56);
    setMaxScroll(overflow);
    setSectionHeight(window.innerHeight + overflow / (1 - HORIZONTAL_SCROLL_DWELL));
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (trackRef.current?.parentElement) ro.observe(trackRef.current.parentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressClamped = useTransform(scrollYProgress, (v) =>
    Math.min(1, Math.max(0, v)),
  );
  const horizontalProgress = useTransform(
    progressClamped,
    [0, HORIZONTAL_SCROLL_DWELL, 1],
    [0, 0, 1],
  );
  const smoothHorizontalProgress = useSpring(horizontalProgress, {
    stiffness: 88,
    damping: 30,
    mass: 0.32,
  });
  const x = useTransform(smoothHorizontalProgress, (p) => -p * maxScroll);

  return (
    <section id="work" className="relative scroll-mt-[5.5rem] border-t border-white/[0.06]">
      <div ref={containerRef} style={{ height: sectionHeight }} className="relative">
        <div className="sticky top-0 flex h-[100dvh] w-full flex-col overflow-hidden bg-[#09090b]">
          <GridBackdrop />
          <div className="relative z-[2] shrink-0 px-4 pb-5 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.25rem))] sm:px-6">
            <SectionHeader className="w-full min-w-0" />
          </div>
          <div
            role="region"
            aria-label="Project showcase"
            className="relative z-[2] flex min-h-0 min-w-0 flex-1 overflow-hidden pb-5"
          >
            <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
              <div className="pointer-events-none absolute inset-y-4 left-0 z-10 w-8 bg-gradient-to-r from-[#09090b] to-transparent" />
              <div className="pointer-events-none absolute inset-y-4 right-0 z-10 w-10 bg-gradient-to-l from-[#09090b] to-transparent" />
              <div className="relative flex h-full min-h-0 min-w-0 items-center overflow-visible">
                <motion.div
                  ref={trackRef}
                  style={{ x }}
                  className="flex w-max items-stretch gap-4 pl-3 pr-24"
                >
                  {workProjects.map((p, i) => (
                    <ProjectCard
                      key={p.title}
                      project={p}
                      index={i}
                      scrollYProgress={smoothHorizontalProgress}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Share with horizontal progress mapping so scroll distance matches card travel speed. */
const HORIZONTAL_SCROLL_DWELL = 0.12;

function WorkSectionDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(2600);
  const [maxScroll, setMaxScroll] = useState(800);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const parent = track?.parentElement;
    if (!track || !parent) return;
    const overflow = Math.max(0, track.scrollWidth - parent.clientWidth + 64);
    setMaxScroll(overflow);
    /* Extra vertical scroll so dwell + horizontal motion feels like the original speed */
    setSectionHeight(
      window.innerHeight + overflow / (1 - HORIZONTAL_SCROLL_DWELL),
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (trackRef.current?.parentElement) ro.observe(trackRef.current.parentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressClamped = useTransform(scrollYProgress, (v) =>
    Math.min(1, Math.max(0, v)),
  );

  const horizontalProgress = useTransform(
    progressClamped,
    [0, HORIZONTAL_SCROLL_DWELL, 1],
    [0, 0, 1],
  );
  const smoothHorizontalProgress = useSpring(horizontalProgress, {
    stiffness: 90,
    damping: 32,
    mass: 0.28,
  });

  const x = useTransform(smoothHorizontalProgress, (p) => -p * maxScroll);

  return (
    <section id="work" className="relative scroll-mt-[5.5rem] border-t border-white/[0.06]">
      <div ref={containerRef} style={{ height: sectionHeight }} className="relative">
        <div className="sticky top-0 flex h-[100dvh] w-full flex-col overflow-hidden bg-[#09090b]">
          <GridBackdrop />

          <div className="relative z-[2] shrink-0 px-4 pb-5 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.25rem))] sm:px-6 sm:pb-6 lg:px-10 lg:pb-8">
            <SectionHeader className="w-full min-w-0" />
          </div>

          <div
            role="region"
            aria-label="Project showcase"
            className="relative z-[2] flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden pt-2 pb-4 sm:pt-3 lg:pb-8"
          >
            <div className="relative flex min-h-0 w-1/2 shrink-0 min-w-0 flex-col items-center justify-center overflow-hidden py-2 pl-4 pr-1 sm:pl-6 sm:pr-2 lg:pl-10 lg:pr-3">
              <div className="relative h-[min(68dvh,640px)] w-full max-w-[min(100%,460px)] shrink-0">
                <Image
                  src={workSplitPortrait}
                  alt="Malisetti Ajay"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 0px, 50vw"
                  priority
                />
              </div>
            </div>
            <div className="relative flex min-h-0 w-1/2 min-w-0 flex-1 flex-col overflow-hidden pr-0 sm:pl-1 lg:pl-2">
              <div className="relative z-[1] min-h-0 min-w-0 flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-y-6 left-0 z-10 w-10 bg-gradient-to-r from-[#09090b] to-transparent sm:w-12" />
                <div className="pointer-events-none absolute inset-y-6 right-0 z-10 w-12 bg-gradient-to-l from-[#09090b] to-transparent lg:w-16" />
                <div className="relative z-[1] flex min-h-0 min-w-0 flex-1 items-center overflow-visible py-2">
                  <motion.div
                    ref={trackRef}
                    style={{ x }}
                    className="flex w-max items-stretch gap-4 pl-0 pr-[min(12vw,160px)] lg:gap-5 lg:pl-1 lg:pr-[min(10vw,200px)]"
                  >
                    {workProjects.map((p, i) => (
                      <ProjectCard
                        key={p.title}
                        project={p}
                        index={i}
                        scrollYProgress={smoothHorizontalProgress}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkSection() {
  const reduceMotion = useReducedMotion();
  const desktop = useMinMd();

  if (reduceMotion) {
    return <WorkSectionSimple />;
  }
  if (!desktop) {
    return <WorkSectionMobile />;
  }
  return <WorkSectionDesktop />;
}
