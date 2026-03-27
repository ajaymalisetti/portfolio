"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import type { ReactNode } from "react";

/** Spring tuned for ~0.9–1.1s settle with a light landing overshoot (not cartoon). */
const LANDING_SPRING = {
  type: "spring" as const,
  stiffness: 108,
  damping: 17.5,
  mass: 0.9,
};

export type DropInFromTopProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before motion begins */
  delay?: number;
  /** Starting offset as viewport fraction (e.g. 1.15 ≈ just above fold) */
  fromViewportHeight?: number;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "animate" | "transition"
>;

/**
 * Drops content from above the viewport with spring landing, optional motion blur,
 * and slight scale-in. Respects `prefers-reduced-motion`.
 */
export function DropInFromTop({
  children,
  className,
  delay = 0,
  fromViewportHeight = 1.18,
  ...rest
}: DropInFromTopProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: easeOutExpo, delay }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  const fromY = `-${Math.round(fromViewportHeight * 100)}vh`;

  return (
    <motion.div
      className={className}
      initial={{
        y: fromY,
        opacity: 0.9,
        scale: 0.95,
        filter: "blur(12px)",
      }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        y: { ...LANDING_SPRING, delay },
        scale: { ...LANDING_SPRING, delay },
        opacity: {
          duration: 0.5,
          delay: delay + 0.04,
          ease: easeOutExpo,
        },
        filter: {
          duration: 0.88,
          delay: delay + 0.02,
          ease: easeOutExpo,
        },
      }}
      style={{ willChange: "transform, filter" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
