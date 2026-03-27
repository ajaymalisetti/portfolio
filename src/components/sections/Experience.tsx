"use client";

import Image from "next/image";
import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  motion,
} from "framer-motion";
import { useRef } from "react";
import gamyamBrand from "@/assets/gamyam.png";
import iInformaticsBrand from "@/assets/white_Logo.png";
import workSplitPortrait from "@/assets/work1.png";

function ExperienceCard({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const phase = useTransform(progress, [range[0], range[1]], [0, 1]);
  const moveY = useTransform(phase, [0, 1], [140, 0]);
  const tiltX = useTransform(phase, [0, 1], [16, 0]);
  const tiltY = useTransform(phase, [0, 1], [0, 0]);
  const zLift = useTransform(phase, [0, 1], [-45, 0]);
  const opacity = useTransform(phase, [0, 0.45, 1], [0, 0.9, 1]);

  const y = useSpring(moveY, { stiffness: 74, damping: 26, mass: 0.56 });
  const rotateX = useSpring(tiltX, { stiffness: 95, damping: 30, mass: 0.5 });
  const rotateY = useSpring(tiltY, { stiffness: 95, damping: 30, mass: 0.5 });
  const z = useSpring(zLift, { stiffness: 90, damping: 30, mass: 0.54 });
  const fade = useSpring(opacity, { stiffness: 90, damping: 30, mass: 0.54 });

  return (
    <motion.article
      style={{
        y,
        opacity: fade,
        rotateX,
        rotateY,
        z,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.28)_inset,0_22px_50px_rgba(0,0,0,0.45),0_0_28px_rgba(167,139,250,0.18)] sm:p-6"
    >
      {children}
    </motion.article>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 82%", "end 22%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.45,
  });
  const imageYRaw = useTransform(progress, [0.08, 0.36], [-120, 0]);
  const imageOpacityRaw = useTransform(progress, [0.08, 0.26], [0, 1]);
  const imageY = useSpring(imageYRaw, { stiffness: 120, damping: 18, mass: 0.8 });
  const imageOpacity = useSpring(imageOpacityRaw, { stiffness: 130, damping: 24, mass: 0.5 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-x-clip scroll-mt-[5.5rem] border-t border-white/[0.06] sm:scroll-mt-28"
    >
      <div className="relative lg:h-[220dvh]">
        <div className="flex w-full flex-col overflow-visible lg:sticky lg:top-0 lg:h-[100dvh] lg:overflow-hidden">
          <div className="mx-auto w-full max-w-6xl min-w-0 px-4 pb-10 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.25rem))] sm:px-6 lg:pb-0">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              <span className="text-emerald-400">My</span> Experience
            </h2>

            <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="order-2 mx-auto flex w-full max-w-xl flex-col gap-4 [perspective:1200px] sm:gap-5 lg:order-1">
                <ExperienceCard progress={progress} range={[0.02, 0.46]}>
                  <div className="min-w-0">
                    <Image
                      src={gamyamBrand}
                      alt="Gamyam"
                      className="h-9 w-auto object-contain sm:h-10"
                      priority
                    />
                    <p className="mt-1 text-sm uppercase tracking-wide text-zinc-400">
                      Jan 2026 - Present
                    </p>
                  </div>

                  <div className="my-4 h-px bg-white/[0.1]" />

                  <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                    I currently work as a React developer. My daily tasks include
                    creating stateful components while maintaining clean user
                    interfaces.
                  </p>
                </ExperienceCard>

                <ExperienceCard progress={progress} range={[0.48, 0.92]}>
                  <div className="min-w-0">
                    <Image
                      src={iInformaticsBrand}
                      alt="i Informatics"
                      className="h-9 w-auto object-contain sm:h-10"
                    />
                    <p className="mt-1 text-sm uppercase tracking-wide text-zinc-400">
                      July 2023 - Jan 2026
                    </p>
                  </div>

                  <div className="my-4 h-px bg-white/[0.1]" />

                  <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                    Developed a proprietary intraday trading platform, Novus, with
                    robust logic and integrated workflows, while also managing
                    client communications and understanding business requirements.
                  </p>
                </ExperienceCard>
              </div>

              <motion.div
                style={{ y: imageY, opacity: imageOpacity }}
                className="relative order-1 mx-auto w-full max-w-[290px] sm:max-w-[340px] lg:order-2 lg:max-w-[400px]"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={workSplitPortrait}
                    alt="Ajay Malisetti working illustration"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 70vw, 38vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
