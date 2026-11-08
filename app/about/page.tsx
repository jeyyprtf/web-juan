import { Certifications } from "@/components/about/certifications";
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { Reveal } from "@/components/ui/motion-primitives";
import { profile } from "@/lib/content";
import { Trans } from "@/lib/language";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "About Juan, Founder of JuanRouter — building and operating a multi-model AI platform, from product and engineering to marketing and community.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section
        className="relative z-10 mx-auto w-full max-w-312 pt-40 sm:pt-56"
        data-journey="Story"
      >
        <PolaroidStrip />
      </section>

      <section
        className="relative z-10 mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24"
        data-journey="Story"
      >
        <Reveal>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              <Trans en="Hello! I’m " id="Halo! Saya " />
              <span className="border-b border-foreground/30 pb-0.5">Juan</span>
              .
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <Trans en={<>
              <p>
                I&rsquo;m the{" "}
                <a
                  href={profile.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring text-foreground font-semibold underline underline-offset-4"
                >
                  {profile.title}
                </a>
                , a multi-model AI platform for Indonesian users. I build and
                run the product, connecting AI API access with payments in
                Rupiah, subscriptions, and everyday user support.
              </p>
              <p>
                As its solo founder, I own product strategy, engineering,
                pricing, and operations, alongside marketing, content, and its
                Telegram community. The gateway and chat use open-source
                foundations, with Codex and Claude Code assisting development.
                I make the product decisions and take responsibility for
                running the service.
              </p>
              <p>
                My background spans AI, software engineering, and IoT. I also
                founded{" "}
                <strong className="font-semibold text-foreground">
                  Sakura
                </strong>
                , a Minecraft server where I build multiplayer systems, Java
                plugins, and AI workflows for building and judging competitions.
                I&rsquo;m also studying Business Information Systems at{" "}
                <strong className="font-semibold text-foreground">
                  Politeknik Negeri Malang
                </strong>
                .
              </p>
              <p>
                I&rsquo;m driven by one belief:{" "}
                <strong className="font-semibold text-foreground">
                  smart systems should empower people, not complicate their
                  lives
                </strong>
                . That guides how I build JuanRouter and work with its users.
                If you&rsquo;d like to discuss AI products or a collaboration,
                let&rsquo;s talk.
              </p>
              </>} id={<>
              <p>
                Saya adalah <a href={profile.companyUrl} target="_blank" rel="noopener noreferrer" className="focus-ring text-foreground font-semibold underline underline-offset-4">Founder JuanRouter</a>, platform AI multi-model untuk pengguna Indonesia. Saya membangun dan menjalankan produk yang menghubungkan akses API AI dengan pembayaran Rupiah, langganan, dan dukungan pengguna.
              </p>
              <p>
                Sebagai pendiri tunggal, saya menangani strategi produk, engineering, harga, operasional, pemasaran, konten, dan komunitas Telegram. Gateway dan chat menggunakan fondasi open-source, dengan bantuan Codex dan Claude Code dalam pengembangan. Keputusan produk dan tanggung jawab layanan tetap saya pegang.
              </p>
              <p>
                Latar belakang saya mencakup AI, software engineering, dan IoT. Saya juga mendirikan <strong className="font-semibold text-foreground">Sakura</strong>, server Minecraft tempat saya membangun sistem multiplayer, plugin Java, dan alur AI untuk membangun serta menilai kompetisi. Saya juga menempuh pendidikan Sistem Informasi Bisnis di <strong className="font-semibold text-foreground">Politeknik Negeri Malang</strong>.
              </p>
              <p>
                Saya percaya <strong className="font-semibold text-foreground">sistem cerdas seharusnya membantu manusia, bukan mempersulit hidupnya</strong>. Prinsip ini memandu saya dalam membangun JuanRouter dan bekerja bersama pengguna. Jika ingin berdiskusi tentang produk AI atau kolaborasi, mari terhubung.
              </p>
              </>} />
            </div>
          </div>
        </Reveal>
      </section>

      <section
        className="relative z-10 mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28"
        data-journey="Background"
      >
        <div className="flex flex-col gap-10">
          <Reveal>
            <Experience />
          </Reveal>
          <Reveal delay={0.05}>
            <Education />
          </Reveal>
          <Reveal delay={0.05}>
            <Certifications />
          </Reveal>
          <Reveal delay={0.05}>
            <div data-journey="Stack">
              <Skills />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div data-journey="Stack">
              <Stack />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
