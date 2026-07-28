export const profile = {
  name: "Juan",
  fullName: "Juan Madhy",
  title: "AI Specialist & Engineer",
  tagline: "Independent engineer focused and obsessed with anything about AI.",
  motto: "Smart systems should empower people — not complicate their lives.",
  email: "business@juan.web.id",
  whatsapp: "+6288805385353",
  location: "Malang, Indonesia",
  url: "https://juan.web.id",
  portrait: "/juan.webp",
  social: {
    github: "https://github.com/jeyyprtf",
    linkedin: "https://linkedin.com/in/inijuan",
    instagram: "https://instagram.com/jeyy_prtf",
    tiktok: "https://tiktok.com/@jeyy_prtf",
  },
  cvPath: "/cv/cv-juan.pdf",
  certsDrive:
    "https://drive.google.com/drive/folders/1p31dzN7TkdrjkoSJEjeo_SXM9QQBFjTw?usp=sharing",
} as const;

export const experience = [
  {
    id: "chickin",
    company: "Chickin Indonesia",
    role: "AIoT Intern",
    period: "2024",
    description:
      "Deepened understanding of AI and IoT in industry while actively deploying and implementing solutions on-site. Designed and developed a portable sensor configuration tool. Served as PIC for AI-based detection technology deployment in partner rural livestock farms.",
    detail:
      "Worked hands-on with industrial sensors, field deployments, and AI detection pipelines for livestock partners. Owned portable Modbus tooling used by technicians and coordinated on-site rollouts in rural farms — bridging product engineering with real operations.",
    highlights: [
      "Portable sensor configuration tool",
      "PIC for AI detection deployments",
      "On-site industrial AIoT implementation",
    ],
    brand: "#FF6B35",
  },
] as const;

export const education = [
  {
    id: "polinema",
    school: "Politeknik Negeri Malang",
    degree: "Business Information Systems",
    period: "2025 – Present",
    detail:
      "Currently studying Business Information Systems with a focus on applying AI, software, and systems thinking to real business and industrial problems.",
  },
  {
    id: "smkn",
    school: "SMKN 1 Kademangan",
    degree: "Computer Network & Telecommunications Engineering",
    period: "2022 – 2025",
    detail:
      "Built a strong foundation in networking, telecommunications, and hands-on technical problem solving that later expanded into IoT, embedded systems, and full-stack engineering.",
  },
] as const;

export const certifications = [
  {
    id: "iot-intern",
    title: "IoT Intern Program",
    issuer: "Chickin Indonesia",
    year: "2024",
    detail:
      "Industry internship program covering practical IoT systems, sensors, and field deployment in livestock technology environments.",
  },
  {
    id: "inovaks",
    title: "Expo Inovasi Vokasi (INOVAKS)",
    issuer: "Malang State Polytechnic",
    year: "2025",
    detail:
      "Vocational innovation expo participation showcasing applied tech projects and solutions.",
  },
  {
    id: "anbim",
    title: 'Sharing Session "Independent College Student Strategy"',
    issuer: "Anbim Yogyakarta",
    year: "2024",
    detail:
      "Session on strategies for independent, self-directed college student growth and career building.",
  },
  {
    id: "maspion-ai",
    title: "ERP & Artificial Intelligence Future Technology Workshop",
    issuer: "Maspion IT Surabaya (Microsoft)",
    year: "2024",
    detail:
      "Workshop on ERP systems and emerging AI technologies for enterprise and future-ready software stacks.",
  },
  {
    id: "modbus-nodered",
    title: "Industrial IoT: Modbus RTU/TCP with MQTT & Node-RED",
    issuer: "PT Avisha Inovasi Indonesia",
    year: "2024",
    detail:
      "Hands-on industrial IoT training: Modbus protocols, MQTT messaging, and Node-RED flow automation.",
  },
  {
    id: "ardumeka",
    title: "Ardumeka Podcast Participant",
    issuer: "PT Avisha Inovasi Indonesia",
    year: "2025",
    detail:
      "Podcast participation discussing practical embedded, IoT, and maker engineering experiences.",
  },
] as const;

export const skills = [
  {
    id: "ai-systems",
    label: "AI Systems & Agents",
    detail:
      "Designing agentic workflows, tool-using assistants, and AI services that plug into real products and ops.",
  },
  {
    id: "ai-automation",
    label: "AI Automation",
    detail:
      "Automating repetitive work with LLMs, pipelines, and integrations — less busywork, more leverage.",
  },
  {
    id: "ai-assistants",
    label: "AI Assistants",
    detail:
      "Voice/text assistants and copilots for homes, teams, and field tools — practical, not gimmicky.",
  },
  {
    id: "aiot",
    label: "AIoT & Edge AI",
    detail:
      "Combining sensors, edge devices, and AI inference for systems that work offline and on-site.",
  },
  {
    id: "fullstack",
    label: "Full Stack Development",
    detail:
      "End-to-end web apps: APIs, dashboards, auth, data models, and production deployment.",
  },
  {
    id: "api",
    label: "API & Backend Services",
    detail:
      "Reliable backends, REST/realtime APIs, and service boundaries for scalable products.",
  },
  {
    id: "iot",
    label: "IoT & Embedded Systems",
    detail:
      "ESP32, sensors, firmware, and hardware-software bridges for industrial and consumer IoT.",
  },
  {
    id: "modbus",
    label: "Industrial Sensors / Modbus",
    detail:
      "Modbus RTU/TCP tooling, addressing, and troubleshooting for field technicians and plants.",
  },
  {
    id: "smart-infra",
    label: "Smart Infrastructure",
    detail:
      "Hydroponics, farming, and home automation systems with monitoring and control loops.",
  },
] as const;

export type StackChip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
  monogram?: string;
};

export const stack: StackChip[] = [
  { label: "Python", slug: "python", bg: "#3776AB", fg: "#ffffff" },
  { label: "TypeScript", slug: "typescript", bg: "#3178C6", fg: "#ffffff" },
  { label: "JavaScript", slug: "javascript", bg: "#F7DF1E", fg: "#0a0a0a" },
  { label: "Next.js", slug: "nextdotjs", bg: "#000000", fg: "#ffffff" },
  { label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
  { label: "Node.js", slug: "nodedotjs", bg: "#339933", fg: "#ffffff" },
  { label: "FastAPI", slug: "fastapi", bg: "#009688", fg: "#ffffff" },
  { label: "Express", slug: "express", bg: "#1f1f1f", fg: "#ffffff" },
  { label: "Claude Code", slug: "anthropic", bg: "#D97757", fg: "#ffffff", monogram: "CC" },
  { label: "OpenCode", slug: "opencode", bg: "#0A0A0A", fg: "#ffffff", monogram: "OC" },
  { label: "Codex", slug: "openai", bg: "#10A37F", fg: "#ffffff", monogram: "CX" },
  { label: "Tailwind CSS", slug: "tailwindcss", bg: "#2BBCF5", fg: "#ffffff" },
  { label: "PostgreSQL", slug: "postgresql", bg: "#4169E1", fg: "#ffffff" },
  { label: "Supabase", slug: "supabase", bg: "#3ECF8E", fg: "#0a0a0a" },
  { label: "Docker", slug: "docker", bg: "#2496ED", fg: "#ffffff" },
  { label: "MQTT", slug: "mqtt", bg: "#660066", fg: "#ffffff" },
  { label: "Arduino", slug: "arduino", bg: "#00878F", fg: "#ffffff" },
  { label: "Git", slug: "git", bg: "#F05032", fg: "#ffffff" },
  { label: "GitHub", slug: "github", bg: "#181717", fg: "#ffffff" },
];

export type ProjectContent = {
  id: string;
  iconLabel: string;
  title: string;
  description: string;
  detail: string;
  meta: string;
  role: string;
  status: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
  tags: string[];
  liveDemo?: string;
  github?: string;
};

export const projects: ProjectContent[] = [
  {
    id: "tfe-erp",
    iconLabel: "TFE ERP",
    title:
      "An ERP system that adapts to any business scale — from small teams to enterprise operations.",
    description:
      "Built a comprehensive ERP featuring task dashboards, progress tracking, task assignment, and meeting notes to streamline business workflows.",
    detail:
      "TFE ERP is a modular operations system: task boards, progress tracking, assignments, and meeting notes in one place. Built for teams that outgrow spreadsheets but still need flexibility across business sizes.",
    meta: "Full Stack Developer • On Develop",
    role: "Full Stack Developer",
    status: "On Develop",
    imageRatio: 1516 / 780,
    image: "/projects/tfe-erp.webp",
    imageAlt: "TFE ERP dashboard showing progress tracking and task management",
    tags: ["Next.js", "Full Stack", "ERP", "Dashboard"],
    liveDemo: "https://erp.juan.web.id",
    github: "https://github.com/jeyyprtf/erp",
  },
  {
    id: "smarthome-ai",
    iconLabel: "SmartHome AI",
    title:
      "A SmartHome AIoT Ecosystem with an integrated Live AI Assistant for intelligent home control.",
    description:
      "Engineered a complete smart home system combining AI assistant capabilities with online device control and real-time AI interaction.",
    detail:
      "End-to-end smart home stack: live AI assistant, device control, and hardware prototypes (ESP32-S3). Focused on natural interaction and reliable AIoT control loops — not just a dashboard demo.",
    meta: "AI & IoT Engineer • On Develop",
    role: "AI & IoT Engineer",
    status: "On Develop",
    imageRatio: 4 / 3,
    image: "/projects/smarthome-ai.webp",
    imageAlt: "SmartHome AI Assistant hardware prototype with ESP32-S3",
    tags: ["AI Assistant", "AIoT", "ESP32", "Node.js"],
    github: "https://github.com/jeyyprtf/AI-SmartHome-Jarvis-NodeJS",
  },
  {
    id: "nevada",
    iconLabel: "Nevada",
    title:
      "Smart hydroponics IoT device with real-time monitoring and automated nutrition management.",
    description:
      "Developed a full-stack hydroponics system featuring dashboard information, automation controls, and nutrient level monitoring with sensor integration.",
    detail:
      "Nevada connects sensors, automation, and a live dashboard for hydroponic growers: water quality, nutrition, and crop progress in one system.",
    meta: "IoT Developer • Done",
    role: "IoT Developer",
    status: "Done",
    imageRatio: 1516 / 780,
    image: "/projects/nevada.webp",
    imageAlt:
      "Nevada smart hydroponics dashboard showing crop progress and water quality",
    tags: ["IoT", "Hydroponics", "Sensors", "Dashboard"],
    liveDemo: "https://nevada.juan.web.id",
    github: "https://github.com/jeyyprtf/Nevada",
  },
  {
    id: "putu",
    iconLabel: "PuTu",
    title:
      "A task center for organizing college tasks, course schedules, and class information.",
    description:
      "Created a mobile-first academic organizer that helps students manage deadlines, track schedules, and stay on top of their coursework.",
    detail:
      "PuTu is a mobile-first academic hub: tasks, schedules, and class info designed for students who need clarity without clutter.",
    meta: "Frontend Developer • Done",
    role: "Frontend Developer",
    status: "Done",
    imageRatio: 3 / 4,
    image: "/projects/putu.webp",
    imageAlt: "PuTu mobile app dashboard showing task overview and schedule",
    tags: ["Frontend", "Mobile", "UX"],
    liveDemo: "https://jeyyprtf.github.io/mockup-putu-mobile",
    github: "https://github.com/jeyyprtf/mockup-putu-mobile",
  },
  {
    id: "portable-sensor",
    iconLabel: "Portable Sensor Tool",
    title:
      "A portable tool for industrial Modbus sensor configuration and troubleshooting.",
    description:
      "Built an embedded tool for field technicians to label, change, troubleshoot, and reset sensor addresses — reducing configuration time significantly.",
    detail:
      "Field-ready Modbus utility for technicians: label, re-address, troubleshoot, and reset sensors faster — born from real industrial pain points at Chickin.",
    meta: "Embedded Engineer • Done",
    role: "Embedded Engineer",
    status: "Done",
    imageRatio: 4 / 3,
    image: "/projects/portable-sensor.webp",
    imageAlt: "Portable Sensor Tool circuit diagram with ESP32 and LCD display",
    tags: ["Embedded", "Modbus", "ESP32", "Industrial"],
    liveDemo: "https://wokwi.com/projects/415857379042801665",
    github: "https://github.com/jeyyprtf/PortableSensorTool",
  },
  {
    id: "sif-skaneka",
    iconLabel: "SIF Skaneka",
    title:
      "Integrated farming technology with automated fish feeding, plant watering, and aquaponic water recycling.",
    description:
      "Developed an IoT-based integrated farming system with automated feeding schedules, soil-triggered watering, and a real-time monitoring dashboard.",
    detail:
      "Smart Integrated Farming: automated feeding, soil-triggered watering, aquaponic recycling, and monitoring — presented as a complete exhibition system.",
    meta: "IoT Developer • Done",
    role: "IoT Developer",
    status: "Done",
    imageRatio: 3 / 4,
    image: "/projects/sif-skaneka.webp",
    imageAlt:
      "Smart Integrated Farming system being presented at an exhibition",
    tags: ["IoT", "Farming", "Automation"],
  },
  {
    id: "example-umkm",
    iconLabel: "UMKM Website",
    title:
      "A modern landing page template for small and medium businesses (UMKM) to establish their online presence.",
    description:
      "Built a clean, responsive business website example featuring product showcase, business info, and contact sections — tailored for local Indonesian SMEs.",
    detail:
      "Template landing page for Indonesian SMEs: product showcase, business story, and clear contact paths — ready to adapt for local brands.",
    meta: "Frontend Developer • Done",
    role: "Frontend Developer",
    status: "Done",
    imageRatio: 16 / 9,
    image: "/projects/web1-umkm.webp",
    imageAlt: "UMKM business website template landing page",
    tags: ["Frontend", "UMKM", "Landing"],
    liveDemo: "https://contoh1.juan.web.id",
    github: "https://github.com/jeyyprtf/EXAMPLE-umkm",
  },
  {
    id: "example-kost",
    iconLabel: "Kost Website",
    title:
      "A boarding house (kost) listing website to help property owners showcase their rooms online.",
    description:
      "Designed a responsive rental property website with room listings, amenities details, pricing info, and contact form for prospective tenants.",
    detail:
      "Kost listing experience with rooms, amenities, pricing, and contact — built for owners who need a simple online presence.",
    meta: "Frontend Developer • Done",
    role: "Frontend Developer",
    status: "Done",
    imageRatio: 16 / 9,
    image: "/projects/web2-kost.webp",
    imageAlt: "Kost boarding house listing website with room details",
    tags: ["Frontend", "Listing", "Rental"],
    liveDemo: "https://contoh2.juan.web.id",
    github: "https://github.com/jeyyprtf/EXAMPLE-kost",
  },
  {
    id: "example-warung-makan",
    iconLabel: "Warung Makan Website",
    title:
      "A restaurant website template for local Indonesian eateries (warung makan) to attract more customers.",
    description:
      "Created a warm, inviting food business website featuring menu display, operating hours, location info, and a simple ordering call-to-action.",
    detail:
      "Warm warung template: menu, hours, location, and a clear order CTA — designed for local food businesses going online.",
    meta: "Frontend Developer • Done",
    role: "Frontend Developer",
    status: "Done",
    imageRatio: 16 / 9,
    image: "/projects/web3-warung.webp",
    imageAlt:
      "Warung makan restaurant website template with menu and contact info",
    tags: ["Frontend", "F&B", "Landing"],
    liveDemo: "https://contoh3.juan.web.id",
    github: "https://github.com/jeyyprtf/EXAMPLE-WEB-warung-makan",
  },
];
