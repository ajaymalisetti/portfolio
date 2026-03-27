import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
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
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl">
            About
          </h1>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-zinc-400 sm:mt-6 sm:text-base">
            This route exists so you can feel route-level transitions powered by{" "}
            <code className="break-words rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-zinc-300 sm:text-sm">
              AnimatePresence
            </code>{" "}
            in the app template. Replace this copy with your story, clients, or
            press links.
          </p>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-500 sm:text-base">
            Tip: keep long-form case studies on dedicated URLs and link them from
            the Work grid.
          </p>
        </div>
      </div>
    </main>
  );
}
