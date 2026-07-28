import { siteConfig } from "@/lib/metadata";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Juan",
    alternateName: ["Juan Madhy", "jeyyprtf"],
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "AI Specialist & Engineer",
    description: siteConfig.description,
    image: `${siteConfig.url}/juan.webp`,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "AIoT",
      "Full Stack Development",
      "IoT",
      "Embedded Systems",
      "Automation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: "Juan",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
