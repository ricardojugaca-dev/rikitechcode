"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Usamos tanto scrollY como document.documentElement.scrollTop
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-6 right-6 z-[9999] p-3 rounded-full bg-card border border-border text-foreground shadow-lg hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 animate-in fade-in zoom-in-75"
    >
      <ArrowUp className="w-5 h-5 text-primary" />
    </button>
  );
}