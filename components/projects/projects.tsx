"use client";

import {
  ArrowRight,
  Bot,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  Leaf,
  ShoppingBag,
  Smartphone,
  Sprout,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentType, type ReactNode } from "react";

import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/motion-primitives";
import { projects as PROJECTS, type ProjectContent } from "@/lib/content";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "tfe-erp": Layers,
  "smarthome-ai": Bot,
  nevada: Leaf,
  putu: Smartphone,
  "portable-sensor": Cpu,
  "sif-skaneka": Sprout,
  "example-umkm": ShoppingBag,
  "example-kost": Store,
  "example-warung-makan": UtensilsCrossed,
};

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;
  const [active, setActive] = useState<ProjectContent | null>(null);

  return (
    <section
      className="relative z-10 w-full"
      data-journey={withHeadline ? "Projects" : "My work"}
    >
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <Reveal className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              From smart IoT devices to AI-powered systems, a look at the
              solutions I&rsquo;ve built for real-world problems.
            </p>
          </Reveal>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 0.05, 0.25)}>
              <ProjectCard
                project={project}
                index={index}
                onOpen={() => setActive(project)}
              />
            </Reveal>
          ))}
        </div>

        {viewMoreVisible ? (
          <Reveal className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        ) : null}
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.iconLabel ?? "Project"}
      >
        {active ? <ProjectDetail project={active} /> : null}
      </Modal>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectContent;
  index: number;
  onOpen: () => void;
}): ReactNode {
  const Icon = ICONS[project.id] ?? Layers;
  return (
    <div className="mb-6 break-inside-avoid md:mb-7">
      <article
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        className="project-card focus-ring flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 transition-transform duration-300 hover:-translate-y-0.5 sm:p-3.5"
      >
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.iconLabel}
          </span>
        </header>

        <div
          className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner relative h-full w-full">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index < 2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between px-1 pb-2">
          <p className="text-[12px] tracking-tight text-foreground/50">
            {project.meta}
          </p>
          <span className="text-[12px] font-medium tracking-tight text-foreground/55">
            Details ↗
          </span>
        </div>
      </article>
    </div>
  );
}

function ProjectDetail({ project }: { project: ProjectContent }): ReactNode {
  const Icon = ICONS[project.id] ?? Layers;
  return (
    <div className="flex flex-col gap-5">
      <div
        className="ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
        style={{ aspectRatio: Math.min(project.imageRatio, 16 / 9) }}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 672px, 100vw"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="border-foreground/10 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium text-foreground/70">
          <Icon className="h-3 w-3" aria-hidden="true" />
          {project.role}
        </span>
        <span className="border-foreground/10 rounded-full border px-3 py-1 text-[12px] font-medium text-foreground/70">
          {project.status}
        </span>
      </div>

      <p className="text-[16px] leading-relaxed tracking-tight text-foreground/75 sm:text-[17px]">
        {project.detail}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-foreground/5 text-foreground/70 rounded-full px-3 py-1 text-[12px] font-medium tracking-tight"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        {project.liveDemo ? (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring bg-foreground text-background inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Live demo
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring border-foreground/10 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            GitHub
          </a>
        ) : null}
      </div>
    </div>
  );
}
