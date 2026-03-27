import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { WorkSection } from "@/components/sections/WorkSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Experience />
      <WorkSection /> 
      <Contact />
      <footer className="border-t border-white/[0.06] px-4 py-8 text-center text-[0.7rem] leading-relaxed text-zinc-600 sm:px-6 sm:py-10 sm:text-xs">
        Designed and developed by Ajay Malisetti
      </footer>
    </main>
  );
}
