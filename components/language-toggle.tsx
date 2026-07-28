"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    // Detectar si ya hay un idioma guardado en el navegador
    const savedLang = localStorage.getItem("app_lang") as "es" | "en" | null;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === "es" ? "en" : "es";
    setLang(nextLang);
    localStorage.setItem("app_lang", nextLang);
    
    // Cambia el atributo 'lang' del HTML para lectores y SEO
    document.documentElement.lang = nextLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-border/60 bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200"
      aria-label="Cambiar idioma"
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="uppercase tracking-wider">{lang}</span>
    </button>
  );
}