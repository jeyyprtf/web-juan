import type { Metadata } from "next";
import { profile } from "@/lib/content";

export const siteConfig = {
  name: "Juan",
  title: `${profile.name} — ${profile.title}`,
  description: `${profile.fullName}, ${profile.title}. ${profile.tagline} Product, engineering, operations, and community.`,
  url: "https://juan.web.id",
  ogImage: "/opengraph-image",
  creator: "@jeyy_prtf",
  email: profile.email,
  authors: [
    {
      name: "Juan",
      url: "https://juan.web.id",
    },
  ],
  keywords: [
    "Juan",
    "Juan Madhy",
    "JuanRouter",
    "Founder of JuanRouter",
    "Solo Founder",
    "Product Engineering",
    "AI Platform",
    "AIoT",
    "AI Automation",
    "Full Stack Developer",
    "IoT Engineer",
    "Smart Systems",
    "Malang",
    "Portfolio",
  ],
  social: {
    github: "https://github.com/jeyyprtf",
    linkedin: "https://linkedin.com/in/inijuan",
    instagram: "https://instagram.com/jeyy_prtf",
    tiktok: "https://tiktok.com/@jeyy_prtf",
  },
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? siteConfig.title,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.title,
        },
      ],
    },
    twitter: {
      title: title ?? siteConfig.title,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
