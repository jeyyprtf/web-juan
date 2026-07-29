"use client";

import { Mail, MapPin } from "lucide-react";
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
    <section
      className="relative z-10 mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10"
      data-journey="Let's connect"
    >
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
              <ShaderFlow scale={3} brightness={3} />
            </div>

            <div className="relative grid gap-6 p-5 sm:gap-7 sm:p-6 md:grid-cols-[1.05fr_0.95fr] md:items-stretch md:gap-5 md:p-5 lg:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let&rsquo;s connect
                </h2>
                <p className="max-w-[36ch] text-[17px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[19px]">
                  Collaborate, discuss a project, or just say hello — form
                  opens your email app (no backend required).
                </p>
                <ContactForm />
                <ContactCardCtas />
              </div>

              <div className="border-foreground/8 bg-background flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[1.1rem] border sm:min-h-[32rem]">
                {/* large portrait fills top */}
                <div className="relative aspect-[4/3.2] w-full shrink-0 overflow-hidden sm:aspect-[4/3.4] md:min-h-[14rem] md:flex-1 md:aspect-auto">
                  <Image
                    src={profile.portrait}
                    alt={`${profile.name} portrait`}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="object-cover object-top grayscale"
                    priority={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  <div className="absolute right-3 bottom-3 left-3 flex flex-col gap-1">
                    <p className="text-foreground text-[1.35rem] font-semibold tracking-tight sm:text-[1.5rem]">
                      {profile.name}
                    </p>
                    <p className="text-foreground/70 text-[13px] font-medium tracking-tight sm:text-[14px]">
                      {profile.title}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
                  <div className="flex flex-col gap-3">
                    <p className="text-foreground/80 text-[15px] leading-relaxed tracking-tight sm:text-[16px]">
                      &ldquo;{profile.motto}&rdquo;
                    </p>
                    <div className="text-foreground/50 flex items-center gap-1.5 text-[13px] tracking-tight">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {profile.location}
                    </div>
                    <span className="border-foreground/10 bg-foreground/4 text-foreground/70 inline-flex w-fit rounded-full border px-3 py-1 text-[12px] font-medium tracking-tight">
                      Open to collabs & roles
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-foreground/45 text-[11px] font-medium tracking-wider uppercase">
                      Find me
                    </p>
                    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3">
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
                    <p className="text-foreground/40 pt-1 text-center text-[11px] tracking-tight">
                      2026 © Juan · AI Specialist
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
  lucideIcon?: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
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
      className="border-foreground/10 hover:border-foreground/20 focus-ring bg-foreground/[0.03] hover:bg-foreground/[0.06] inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-foreground/75 transition-colors hover:text-foreground sm:h-12"
      {...props}
    >
      {LucideIcon ? (
        <LucideIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
          className="max-h-4 max-w-4 object-contain dark:invert"
        />
      ) : null}
      <span className="text-[11px] font-medium tracking-tight sm:text-[12px]">
        {label}
      </span>
    </Link>
  );
}
