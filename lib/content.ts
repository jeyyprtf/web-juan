export const profile = {
  name: "Juan",
  fullName: "Juan Madhy",
  title: "AI Specialist & Engineer",
  tagline: "Independent engineer focused and obsessed with anything about AI.",
  email: "business@juan.web.id",
  whatsapp: "+6288805385353",
  location: "Malang, Indonesia",
  url: "https://juan.web.id",
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
    company: "Chickin Indonesia",
    role: "AIoT Intern",
    period: "2024",
    description:
      "Deepened understanding of AI and IoT in industry while actively deploying and implementing solutions on-site. Designed and developed a portable sensor configuration tool. Served as PIC for AI-based detection technology deployment in partner rural livestock farms.",
    brand: "#FF6B35",
  },
] as const;

export const education = [
  {
    school: "Politeknik Negeri Malang",
    degree: "Business Information Systems",
    period: "2025 – Present",
  },
  {
    school: "SMKN 1 Kademangan",
    degree: "Computer Network & Telecommunications Engineering",
    period: "2022 – 2025",
  },
] as const;

export const certifications = [
  {
    title: "IoT Intern Program",
    issuer: "Chickin Indonesia",
    year: "2024",
  },
  {
    title: "Expo Inovasi Vokasi (INOVAKS)",
    issuer: "Malang State Polytechnic",
    year: "2025",
  },
  {
    title: 'Sharing Session "Independent College Student Strategy"',
    issuer: "Anbim Yogyakarta",
    year: "2024",
  },
  {
    title: "ERP & Artificial Intelligence Future Technology Workshop",
    issuer: "Maspion IT Surabaya (Microsoft)",
    year: "2024",
  },
  {
    title: "Industrial IoT: Modbus RTU/TCP with MQTT & Node-RED",
    issuer: "PT Avisha Inovasi Indonesia",
    year: "2024",
  },
  {
    title: "Ardumeka Podcast Participant",
    issuer: "PT Avisha Inovasi Indonesia",
    year: "2025",
  },
] as const;

export const skills = [
  "AI Systems & Agents",
  "AI Automation",
  "AI Assistants",
  "AIoT & Edge AI",
  "Full Stack Development",
  "API & Backend Services",
  "IoT & Embedded Systems",
  "Industrial Sensors / Modbus",
  "Smart Infrastructure",
] as const;

export type StackChip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
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
  { label: "Tailwind CSS", slug: "tailwindcss", bg: "#2BBCF5", fg: "#ffffff" },
  { label: "PostgreSQL", slug: "postgresql", bg: "#4169E1", fg: "#ffffff" },
  { label: "Supabase", slug: "supabase", bg: "#3ECF8E", fg: "#0a0a0a" },
  { label: "Docker", slug: "docker", bg: "#2496ED", fg: "#ffffff" },
  { label: "MQTT", slug: "mqtt", bg: "#660066", fg: "#ffffff" },
  { label: "Arduino", slug: "arduino", bg: "#00878F", fg: "#ffffff" },
  { label: "Git", slug: "git", bg: "#F05032", fg: "#ffffff" },
  { label: "GitHub", slug: "github", bg: "#181717", fg: "#ffffff" },
];
