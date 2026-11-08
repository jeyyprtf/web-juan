"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type Language = "en" | "id";
const KEY = "juan-portfolio-language";
const EVENT = "juan-language-change";
let fallback: Language = "en";
let storageAvailable = true;

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getLanguage(): Language {
  if (!storageAvailable) return fallback;
  try {
    const saved = localStorage.getItem(KEY);
    return saved === "id" || saved === "en" ? saved : fallback;
  } catch {
    storageAvailable = false;
    return fallback;
  }
}

const LanguageContext = createContext<Language>("en");

export function setLanguage(language: Language): void {
  fallback = language;
  try {
    localStorage.setItem(KEY, language);
  } catch {
    storageAvailable = false;
  }
  window.dispatchEvent(new Event(EVENT));
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const language = useSyncExternalStore(
    subscribe,
    getLanguage,
    (): Language => "en"
  );
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = language;
    const titles: Record<string, [string, string]> = {
      "/": ["Juan — Founder of JuanRouter", "Juan — Pendiri JuanRouter"],
      "/projects": ["Projects | Juan", "Proyek | Juan"],
      "/about": ["About | Juan", "Tentang | Juan"],
    };
    const title = titles[pathname];
    if (title) document.title = title[language === "id" ? 1 : 0];
  }, [language, pathname]);
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): Language {
  return useContext(LanguageContext);
}

export function Trans({ en, id }: { en: ReactNode; id: ReactNode }): ReactNode {
  return useLanguage() === "id" ? id : en;
}
