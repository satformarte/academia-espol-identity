import { createContext, useContext, useState, type ReactNode } from "react";
import { ca, type Translations } from "@/i18n/ca";
import { es } from "@/i18n/es";

export type Lang = "ca" | "es";

const STORAGE_KEY = "espol_lang";

const translations: Record<Lang, Translations> = { ca, es };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const detectDefaultLang = (): Lang => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "ca") return stored;
  const hostname = window.location.hostname;
  if (hostname.endsWith(".es")) return "es";
  if (hostname.endsWith(".com")) return "ca";
  return "ca";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detectDefaultLang);

  const setLang = (newLang: Lang) => {
    localStorage.setItem(STORAGE_KEY, newLang);
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
