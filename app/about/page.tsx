import { Certifications } from "@/components/about/certifications";
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "About Juan — AI Specialist & Engineer building intelligent systems, automation, and AIoT.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">Juan</span>.
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                I&rsquo;m an <strong className="font-semibold text-foreground">AI Specialist & Engineer</strong> and Business Information Systems student at <strong className="font-semibold text-foreground">Politeknik Negeri Malang</strong> — building things that work in the real world, not just demos.
              </p>
              <p>
                My work sits at the intersection of <strong className="font-semibold text-foreground">AI, automation, and IoT</strong>: assistants, intelligent services, and field-ready AIoT. From portable sensor tools for technicians to AI detection deployments in rural farming, I focus on tech that <strong className="font-semibold text-foreground">solves real problems for real people</strong>.
              </p>
              <p>
                I&rsquo;m driven by one belief: <strong className="font-semibold text-foreground">smart systems should empower people, not complicate their lives</strong>. If you need someone who bridges cutting-edge AI with on-the-ground implementation — let&rsquo;s build something.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Certifications />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
