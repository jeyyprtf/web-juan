"use client";

import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactCardCtas } from "./contact-card-ctas";
import { ContactForm } from "./contact-form";
import { Reveal } from "@/components/ui/motion-primitives";
import { profile } from "@/lib/content";

const ShaderFlow = dynamic(
  () => import("../shaders/shader-flow").then((m) => m.ShaderFlow),
  { ssr: false }
);

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactCard(): ReactNode {
  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <Reveal>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow scale={3} brightness={3}/>
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let&rsquo;s connect
                </h2>
                <p className="max-w-[36ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[20px]">
                  Collaborate, discuss a project, or just say hello — form
                  opens your email app (no backend required).
                </p>
                <ContactForm />
                <ContactCardCtas />
              </div>

              <div className="border-foreground/8 flex flex-col justify-between gap-6 rounded-[1.1rem] border bg-background p-5 sm:p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-foreground/10 sm:h-28 sm:w-28">
                    <Image
                      src={profile.portrait}
                      alt={`${profile.name} portrait`}
                      fill
                      sizes="112px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-foreground text-[17px] font-semibold tracking-tight">
                      {profile.name}
                    </p>
                    <p className="text-foreground/60 text-[13px] tracking-tight">
                      {profile.title}
                    </p>
                    <p className="text-foreground/70 mx-auto mt-1 max-w-[28ch] text-[13px] leading-relaxed tracking-tight sm:text-[14px]">
                      &ldquo;{profile.motto}&rdquo;
                    </p>
                    <p className="text-foreground/45 mt-1 text-[12px] tracking-tight">
                      {profile.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    <SocialIcon
                      href={`mailto:${profile.email}`}
                      label="Email"
                      lucideIcon={Mail}
                    />
                    <SocialIcon
                      href={profile.social.github}
                      label="GitHub"
                      imageSrc="/github.svg"
                    />
                    <SocialIcon
                      href={profile.social.linkedin}
                      label="LinkedIn"
                      imageSrc="/linkedin.svg"
                    />
                    <SocialIcon
                      href={profile.social.instagram}
                      label="Instagram"
                      imageSrc="/instagram.svg"
                    />
                    <SocialIcon
                      href={profile.social.tiktok}
                      label="TikTok"
                      imageSrc="/tiktok.svg"
                    />
                    <SocialIcon
                      href={`https://wa.me/${profile.whatsapp}`}
                      label="WhatsApp"
                      imageSrc="/whatsapp.svg"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-0.5 text-center">
                    <p className="text-[12px] tracking-tight text-foreground/55">
                      2026 &copy; Juan
                    </p>
                    <p className="text-[11px] tracking-tight text-foreground/40">
                      AI Specialist · Built with Next.js
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  lucideIcon: LucideIcon,
  imageSrc,
}: {
  href: string;
  label: string;
  lucideIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  imageSrc?: string;
}): ReactNode {
  const isExternal = href.startsWith("http");
  const props = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      href={href}
      aria-label={label}
      className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
      {...props}
    >
      {LucideIcon ? (
        <LucideIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={14}
          height={14}
          aria-hidden="true"
          className="max-h-[14px] max-w-[14px] object-contain dark:invert"
        />
      ) : null}
    </Link>
  );
}
