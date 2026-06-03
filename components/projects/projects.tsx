import {
  ArrowRight,
  Bot,
  Cpu,
  Layers,
  Leaf,
  Smartphone,
  Sprout,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
  liveDemo?: string;
  github?: string;
};

const PROJECTS: Project[] = [
  {
    id: "tfe-erp",
    icon: Layers,
    iconLabel: "TFE ERP",
    title:
      "An ERP system that adapts to any business scale — from small teams to enterprise operations.",
    description:
      "Built a comprehensive ERP featuring task dashboards, progress tracking, task assignment, and meeting notes to streamline business workflows.",
    meta: "Full Stack Developer • On Develop",
    imageRatio: 1516 / 780,
    image: "/projects/tfe-erp.png",
    imageAlt: "TFE ERP dashboard showing progress tracking and task management",
    liveDemo: "https://erp.juan.web.id",
    github: "https://github.com/jeyyprtf/erp",
  },
  {
    id: "smarthome-ai",
    icon: Bot,
    iconLabel: "SmartHome AI",
    title:
      "A SmartHome AIoT Ecosystem with an integrated Live AI Assistant for intelligent home control.",
    description:
      "Engineered a complete smart home system combining AI assistant capabilities with online device control and real-time AI interaction.",
    meta: "AI & IoT Engineer • On Develop",
    imageRatio: 4 / 3,
    image: "/projects/smarthome-ai.png",
    imageAlt: "SmartHome AI Assistant hardware prototype with ESP32-S3",
    github: "https://github.com/jeyyprtf/AI-SmartHome-Jarvis-NodeJS",
  },
  {
    id: "nevada",
    icon: Leaf,
    iconLabel: "Nevada",
    title:
      "Smart hydroponics IoT device with real-time monitoring and automated nutrition management.",
    description:
      "Developed a full-stack hydroponics system featuring dashboard information, automation controls, and nutrient level monitoring with sensor integration.",
    meta: "IoT Developer • Done",
    imageRatio: 1516 / 780,
    image: "/projects/nevada.png",
    imageAlt: "Nevada smart hydroponics dashboard showing crop progress and water quality",
    liveDemo: "https://nevada.juan.web.id",
    github: "https://github.com/jeyyprtf/Nevada",
  },
  {
    id: "putu",
    icon: Smartphone,
    iconLabel: "PuTu",
    title:
      "A task center for organizing college tasks, course schedules, and class information.",
    description:
      "Created a mobile-first academic organizer that helps students manage deadlines, track schedules, and stay on top of their coursework.",
    meta: "Frontend Developer • Done",
    imageRatio: 3 / 4,
    image: "/projects/putu.png",
    imageAlt: "PuTu mobile app dashboard showing task overview and schedule",
    liveDemo: "https://jeyyprtf.github.io/mockup-putu-mobile",
    github: "https://github.com/jeyyprtf/mockup-putu-mobile",
  },
  {
    id: "portable-sensor",
    icon: Cpu,
    iconLabel: "Portable Sensor Tool",
    title:
      "A portable tool for industrial Modbus sensor configuration and troubleshooting.",
    description:
      "Built an embedded tool for field technicians to label, change, troubleshoot, and reset sensor addresses — reducing configuration time significantly.",
    meta: "Embedded Engineer • Done",
    imageRatio: 4 / 3,
    image: "/projects/portable-sensor.png",
    imageAlt: "Portable Sensor Tool circuit diagram with ESP32 and LCD display",
    liveDemo: "https://wokwi.com/projects/415857379042801665",
    github: "https://github.com/jeyyprtf/PortableSensorTool",
  },
  {
    id: "sif-skaneka",
    icon: Sprout,
    iconLabel: "SIF Skaneka",
    title:
      "Integrated farming technology with automated fish feeding, plant watering, and aquaponic water recycling.",
    description:
      "Developed an IoT-based integrated farming system with automated feeding schedules, soil-triggered watering, and a real-time monitoring dashboard.",
    meta: "IoT Developer • Done",
    imageRatio: 3 / 4,
    image: "/projects/sif-skaneka.png",
    imageAlt: "Smart Integrated Farming system being presented at an exhibition",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              From smart IoT devices to AI-powered systems, a look at the
              solutions I&rsquo;ve built for real-world problems.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
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
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
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
          <div className="project-card__image-inner">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
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
          {(project.liveDemo || project.github) && (
            <div className="flex items-center gap-2">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 text-[12px] font-medium tracking-tight text-foreground/60 hover:text-foreground transition-colors"
                >
                  Live Demo ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 text-[12px] font-medium tracking-tight text-foreground/60 hover:text-foreground transition-colors"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </FadeIn>
  );
}
