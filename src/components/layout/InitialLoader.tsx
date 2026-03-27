"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIntroGate } from "@/components/layout/IntroGateContext";

/** Served from `public/loading.mp4` (source asset: `src/assets/loading.mp4`). */
const LOADING_VIDEO_SRC = "/loading.mp4";

/** Set in sessionStorage after the intro video finishes once (per browser tab). */
const INTRO_VIDEO_SEEN_KEY = "portfolio-intro-video-seen";

/** Safety: never block the app forever if `ended` never fires */
const MAX_LOADER_MS = 120_000;

/**
 * Full-viewport intro: plays the full video only on the first load in this tab session.
 * Later navigations / reloads skip the video and unlock the app immediately.
 */
export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { signalIntroComplete } = useIntroGate();

  const dismissSkipVideo = useCallback(() => {
    signalIntroComplete();
    setVisible(false);
  }, [signalIntroComplete]);

  const dismissAfterFullPlay = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_VIDEO_SEEN_KEY, "1");
    } catch {
      /* private mode / quota */
    }
    signalIntroComplete();
    setVisible(false);
  }, [signalIntroComplete]);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_VIDEO_SEEN_KEY) === "1") {
        dismissSkipVideo();
      }
    } catch {
      /* play video path */
    }
  }, [dismissSkipVideo]);

  useEffect(() => {
    if (!visible) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => dismissSkipVideo());
  }, [visible, dismissSkipVideo]);

  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(dismissSkipVideo, MAX_LOADER_MS);
    return () => window.clearTimeout(id);
  }, [visible, dismissSkipVideo]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#09090b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: visible ? "auto" : "none" }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-95"
            src={LOADING_VIDEO_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden
            onEnded={dismissAfterFullPlay}
            onError={dismissSkipVideo}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
