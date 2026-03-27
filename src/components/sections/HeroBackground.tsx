"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

/** Same file as `src/assets/background.mp4`, served from `/public` for Next.js. */
const VIDEO_SRC = "/background.mp4";

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, [mx, my]);

  const gradient = useMotionTemplate`radial-gradient(650px circle at ${sx}% ${sy}%, rgba(139, 92, 246, 0.22), transparent 55%)`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full min-h-full w-full min-w-full scale-[1.02] object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#09090b]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.35),transparent)]" />
      <motion.div
        className="absolute inset-0 opacity-90"
        style={{ backgroundImage: gradient }}
      />
      <div className="animate-mesh-drift absolute -left-1/4 top-1/4 h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-violet-600/25 blur-[100px]" />
      <div className="animate-mesh-drift-slow absolute -right-1/4 bottom-1/4 h-[min(60vw,480px)] w-[min(60vw,480px)] rounded-full bg-fuchsia-600/20 blur-[110px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(9,9,11,0.85)_65%,#09090b)]" />
      {[
        { left: "12%", top: "28%", delay: "0s", size: "w-1 h-1" },
        { left: "78%", top: "18%", delay: "1.2s", size: "w-1.5 h-1.5" },
        { left: "64%", top: "52%", delay: "2.1s", size: "w-1 h-1" },
        { left: "22%", top: "62%", delay: "0.8s", size: "w-1 h-1" },
        { left: "88%", top: "72%", delay: "1.6s", size: "w-1 h-1" },
      ].map((p, i) => (
        <span
          key={i}
          className={`animate-float-particle absolute rounded-full bg-white/40 ${p.size}`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
