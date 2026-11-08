import { ContactCard } from "@/components/contact/contact-card";
import { Projects } from "@/components/projects/projects";
import { Reveal } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { Trans } from "@/lib/language";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "JuanRouter, Sakura, and more: AI products, multiplayer systems, and AIoT devices built by Juan.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section
        className="relative z-10 mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-100 sm:pb-20"
        data-journey="My work"
      >
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            <Trans en="My recent work" id="Karya terbaru saya" />
          </h1>
          <p className="max-w-[33ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            <Trans en="From an AI platform to multiplayer worlds and IoT devices, projects I’ve built and operated. Tap a card for details." id="Dari platform AI, dunia multiplayer, hingga perangkat IoT: proyek yang saya bangun dan jalankan. Pilih kartu untuk melihat detail." />
          </p>
        </Reveal>
      </section>
      <Projects />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
