"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Loader2, Send } from "lucide-react";
import Image from "next/image";
import { easeOutExpo } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import contactMeImage from "@/assets/contact-me.png";
import githubIcon from "@/assets/github.webp";
import instagramIcon from "@/assets/instagram.webp";
import linkedinIcon from "@/assets/linkedin.webp";
import twitterIcon from "@/assets/twitter.webp";

/**
 * LinkedIn: set `NEXT_PUBLIC_LINKEDIN_URL` in `.env.local` to your full profile URL
 * (e.g. https://www.linkedin.com/in/your-handle). The icon link already opens in a new tab.
 */
const linkedInProfileUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ||
  "https://www.linkedin.com/in/";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/ajaymalisetti/",
    label: "Instagram",
    icon: instagramIcon,
  },
  { href: linkedInProfileUrl, label: "LinkedIn", icon: linkedinIcon },
  { href: "https://twitter.com/", label: "Twitter / X", icon: twitterIcon },
  { href: "https://github.com/ajaymalisetti", label: "GitHub", icon: githubIcon },
] as const;

const CONTACT_PHONE_TEL = "+917675997288";
const CONTACT_PHONE_LABEL = "+91 76759 97288";
const CONTACT_EMAIL = "malisettiajay003@gmail.com";

const socialListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
} as const;

const socialItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
} as const;

const CONTACT_LINE1 =
  "Tell me about your next launch — scope, timeline, and links welcome.";
const LINE2_PREFIX = "I'm open for freelance — ";
const LINE2_SUFFIX = "let's connect!";
const CONTACT_LINE2 = LINE2_PREFIX + LINE2_SUFFIX;

const NEON_SHADOW =
  "0 0 16px rgba(139, 92, 246, 0.28), 0 0 32px rgba(99, 102, 241, 0.18), 0 0 1px rgba(196, 181, 253, 0.35)";
const NEON_SHADOW_STRONG =
  "0 0 28px rgba(139, 92, 246, 0.45), 0 0 52px rgba(99, 102, 241, 0.32), 0 0 2px rgba(196, 181, 253, 0.5)";

const line1ContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.048,
      delayChildren: 0.06,
    },
  },
} as const;

const line1WordVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(7px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      ease: easeOutExpo,
    },
  },
} as const;

const LINE1_WORD_COUNT = CONTACT_LINE1.split(" ").length;
/** After line 1’s last word finishes (stagger + motion duration) + short pause */
const TYPEWRITER_START_MS =
  60 +
  (LINE1_WORD_COUNT - 1) * 48 +
  580 +
  120;

function ContactLine1({ copyInView }: { copyInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="mx-auto max-w-2xl px-1"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.014 }}
      transition={{ duration: 0.42, ease: easeOutExpo }}
    >
      <motion.p
        variants={line1ContainerVariants}
        initial="hidden"
        animate={copyInView ? "show" : "hidden"}
        className="text-pretty text-center text-sm text-zinc-300 transition-[text-shadow] duration-500 ease-out sm:text-base"
        style={{ textShadow: hovered ? NEON_SHADOW_STRONG : NEON_SHADOW }}
      >
        {CONTACT_LINE1.split(" ").map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={line1WordVariants}
            className="inline-block"
            style={{
              marginRight: i < LINE1_WORD_COUNT - 1 ? "0.3em" : undefined,
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}

function ContactLine2Typewriter({ copyInView }: { copyInView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [typingOn, setTypingOn] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!copyInView) {
      setTypingOn(false);
      setCharCount(0);
      return;
    }
    const id = window.setTimeout(() => setTypingOn(true), TYPEWRITER_START_MS);
    return () => window.clearTimeout(id);
  }, [copyInView]);

  useEffect(() => {
    if (!typingOn) return;
    if (charCount >= CONTACT_LINE2.length) return;
    const id = window.setTimeout(() => {
      setCharCount((c) => c + 1);
    }, 30);
    return () => window.clearTimeout(id);
  }, [typingOn, charCount]);

  const prefixLen = LINE2_PREFIX.length;
  const part1 = CONTACT_LINE2.slice(0, Math.min(charCount, prefixLen));
  const part2 =
    charCount > prefixLen ? CONTACT_LINE2.slice(prefixLen, charCount) : "";
  const showCursor = typingOn;

  return (
    <motion.div
      className="mx-auto mt-5 max-w-3xl px-1 sm:mt-6"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.018 }}
      transition={{ duration: 0.45, ease: easeOutExpo }}
    >
      <span className="sr-only">{CONTACT_LINE2}</span>
      <p
        aria-hidden
        className="text-pretty text-center text-xl font-semibold tracking-tight transition-[text-shadow] duration-500 ease-out sm:text-2xl md:text-3xl"
        style={{ textShadow: hovered ? NEON_SHADOW_STRONG : NEON_SHADOW }}
      >
        <span className="text-violet-100">{part1}</span>
        <span className="text-emerald-400">{part2}</span>
        {showCursor ? (
          <motion.span
            aria-hidden
            className="ml-0.5 inline-block h-[0.82em] w-px translate-y-[0.06em] align-middle sm:h-[0.85em]"
            style={{
              backgroundColor:
                charCount >= prefixLen ? "rgb(52, 211, 153)" : "rgb(196, 181, 253)",
            }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{
              duration: 0.9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ) : null}
      </p>
    </motion.div>
  );
}

function ContactCopyLines() {
  const copyRef = useRef<HTMLDivElement>(null);
  const copyInView = useInView(copyRef, {
    once: false,
    margin: "-10% 0px -12% 0px",
    amount: 0.22,
  });

  return (
    <div ref={copyRef}>
      <ContactLine1 copyInView={copyInView} />
      <ContactLine2Typewriter copyInView={copyInView} />
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const disableScrollLinkedAnimation = reduceMotion;

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 92%", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 34,
    mass: 0.34,
  });

  const imageScaleMV = useTransform(
    progress,
    [0, 0.2, 0.45, 0.72, 1],
    [2.3, 2.05, 1.62, 1.24, 1],
  );
  const imageXMV = useTransform(
    progress,
    [0, 0.22, 0.46, 0.72, 1],
    ["-30vw", "-14vw", "-4vw", "0vw", "0vw"],
  );
  const imageYMV = useTransform(progress, [0, 0.22, 0.56, 1], ["-12%", "-5%", "0%", "-2%"]);
  const imageBlurMV = useTransform(
    progress,
    [0, 0.2, 0.55],
    ["blur(20px)", "blur(8px)", "blur(0px)"],
  );
  const imageOpacityMV = useTransform(progress, [0, 0.1], [0.68, 1]);

  const headingOpacityMV = useTransform(progress, [0.03, 0.22], [0, 1]);
  const headingYMV = useTransform(progress, [0.03, 0.22], [16, 0]);
  const headingBlurMV = useTransform(progress, [0.03, 0.24], ["blur(8px)", "blur(0px)"]);

  const descOpacityMV = useTransform(progress, [0.22, 0.4], [0, 1]);
  const descYMV = useTransform(progress, [0.22, 0.4], [24, 0]);
  const descBlurMV = useTransform(progress, [0.22, 0.44], ["blur(8px)", "blur(0px)"]);

  const formOpacityMV = useTransform(progress, [0.42, 0.64], [0, 1]);
  const formYMV = useTransform(progress, [0.42, 0.64], [34, 0]);
  const formBlurMV = useTransform(progress, [0.42, 0.68], ["blur(10px)", "blur(0px)"]);

  const imageMotionStyle = disableScrollLinkedAnimation
    ? undefined
    : {
        scale: imageScaleMV,
        x: imageXMV,
        y: imageYMV,
        opacity: imageOpacityMV,
        filter: imageBlurMV,
      };

  const headingMotionStyle = disableScrollLinkedAnimation
    ? undefined
    : {
        opacity: headingOpacityMV,
        y: headingYMV,
        filter: headingBlurMV,
      };
  const descMotionStyle = disableScrollLinkedAnimation
    ? undefined
    : {
        opacity: descOpacityMV,
        y: descYMV,
        filter: descBlurMV,
      };
  const formMotionStyle = disableScrollLinkedAnimation
    ? undefined
    : {
        opacity: formOpacityMV,
        y: formYMV,
        filter: formBlurMV,
      };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    window.setTimeout(() => setStatus("sent"), 1200);
  }

  const contactPhoneLinkClass =
    "min-w-0 max-w-full shrink-0 break-words text-sm text-emerald-400 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] sm:text-base";
  const contactEmailLinkClass =
    "min-w-0 max-w-full break-words text-sm text-violet-300 transition-colors hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] sm:text-base";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="overflow-x-clip scroll-mt-[5.5rem] border-t border-white/[0.06] sm:scroll-mt-28"
    >
      <div ref={stageRef} className="relative overflow-x-clip sm:h-[250dvh] lg:h-[230dvh]">
        <div className="relative overflow-x-hidden bg-[#09090b] px-4 pt-[max(5rem,calc(env(safe-area-inset-top)+3.75rem))] sm:sticky sm:top-0 sm:z-10 sm:flex sm:h-[100dvh] sm:items-start sm:overflow-hidden sm:px-6 sm:pt-[max(5.5rem,calc(env(safe-area-inset-top)+4.25rem))]">
          <div className="mx-auto w-full max-w-6xl min-w-0 py-6 pb-[max(1rem,env(safe-area-inset-bottom))] sm:py-10 md:py-14">
        <motion.h2
          initial={reduceMotion ? { opacity: 0, y: 20 } : undefined}
          whileInView={reduceMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={reduceMotion ? { once: true, margin: "-80px" } : undefined}
          transition={reduceMotion ? { duration: 0.5, ease: easeOutExpo } : undefined}
          className="mt-4 text-balance text-center text-2xl font-semibold tracking-tight text-zinc-50 sm:mt-6 sm:text-3xl md:text-4xl"
          style={headingMotionStyle}
        >
          Contact <span className="text-emerald-400">me</span>
        </motion.h2>
        <motion.p
          initial={reduceMotion ? { opacity: 0, y: 12 } : undefined}
          whileInView={reduceMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={reduceMotion ? { once: true, margin: "-80px" } : undefined}
          transition={
            reduceMotion
              ? { duration: 0.45, delay: 0.06, ease: easeOutExpo }
              : undefined
          }
          className="mt-3 text-balance text-center text-base text-zinc-300 sm:text-lg"
          style={descMotionStyle}
        >
          Let&apos;s build something amazing 🚀
        </motion.p>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={reduceMotion ? { opacity: 0, y: 24 } : undefined}
            whileInView={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={reduceMotion ? { once: true, margin: "-60px" } : undefined}
            transition={
              reduceMotion
                ? {
                    duration: 0.5,
                    delay: 0.2,
                    ease: easeOutExpo,
                  }
                : undefined
            }
            className="order-2 mx-auto w-full max-w-sm rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl sm:max-w-md sm:rounded-2xl sm:p-8 lg:order-1 lg:mx-0 lg:justify-self-start"
            style={formMotionStyle}
          >
                <label className="block text-sm font-medium text-zinc-300">
                  Name
                  <input
                    name="name"
                    required
                    className="mt-2 min-h-12 w-full rounded-xl border border-white/[0.08] bg-zinc-950/50 px-4 py-3 text-base text-zinc-100 outline-none ring-violet-500/0 transition-[box-shadow,border-color] placeholder:text-zinc-600 focus:border-violet-400/35 focus:ring-2 focus:ring-violet-500/20 sm:min-h-0 sm:text-sm"
                    placeholder="Alex Rivera"
                    autoComplete="name"
                  />
                </label>
                <label className="mt-5 block text-sm font-medium text-zinc-300">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 min-h-12 w-full rounded-xl border border-white/[0.08] bg-zinc-950/50 px-4 py-3 text-base text-zinc-100 outline-none ring-violet-500/0 transition-[box-shadow,border-color] placeholder:text-zinc-600 focus:border-violet-400/35 focus:ring-2 focus:ring-violet-500/20 sm:min-h-0 sm:text-sm"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </label>
                <label className="mt-5 block text-sm font-medium text-zinc-300">
                  Message
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="mt-2 min-h-[7.5rem] w-full resize-y rounded-xl border border-white/[0.08] bg-zinc-950/50 px-4 py-3 text-base text-zinc-100 outline-none ring-violet-500/0 transition-[box-shadow,border-color] placeholder:text-zinc-600 focus:border-violet-400/35 focus:ring-2 focus:ring-violet-500/20 sm:min-h-0 sm:resize-none sm:text-sm"
                    placeholder="Project goals, timeline, links…"
                  />
                </label>

                <motion.button
                  type="submit"
                  disabled={status === "loading" || status === "sent"}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="relative mt-8 flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-violet-500/90 to-violet-600 px-4 py-3.5 text-base font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_12px_40px_rgba(109,40,217,0.35)] disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-0 sm:text-sm"
                >
                  <AnimatePresence mode="wait">
                    {status === "loading" && (
                      <motion.span
                        key="load"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending
                      </motion.span>
                    )}
                    {status === "sent" && (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Message sent
                      </motion.span>
                    )}
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" aria-hidden />
                        Send message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: easeOutExpo }}
            className="relative order-1 mx-auto w-full max-w-[min(100%,520px)] lg:order-2"
            style={imageMotionStyle}
          >
            <motion.div
              className="relative aspect-square w-full overflow-hidden"
            >
              <Image
                src={contactMeImage}
                alt="Contact illustration"
                fill
                className="object-contain"
                sizes="(max-width: 1023px) 86vw, 48vw"
              />
            </motion.div>
          </motion.div>
        </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-6xl min-w-0 bg-[#09090b] px-4 pb-10 sm:px-6 sm:pb-14 md:pb-20">
        <div className="mt-20 sm:mt-6">
          <ContactCopyLines />
          <motion.ul
            className="mt-7 flex flex-wrap items-center justify-center gap-7 sm:mt-8 sm:gap-9 md:gap-10"
            variants={socialListVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35, margin: "-40px" }}
          >
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <motion.li key={label} variants={socialItemVariants}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl p-1.5 opacity-85 outline-none ring-violet-500/0 transition-[opacity,transform] hover:scale-105 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-violet-500/40"
                  aria-label={label}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={40}
                    height={40}
                    className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center sm:mt-9 sm:gap-x-6">
            <a href={`tel:${CONTACT_PHONE_TEL}`} className={contactPhoneLinkClass}>
              {CONTACT_PHONE_LABEL}
            </a>
            <span className="shrink-0 select-none text-zinc-500" aria-hidden>
              ·
            </span>
            <a href={`mailto:${CONTACT_EMAIL}`} className={contactEmailLinkClass}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
