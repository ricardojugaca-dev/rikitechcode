/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import SearchWrapper from "@/components/search-wrapper";
import { Menu, X, Youtube, Linkedin, Github, Send, Search } from "lucide-react";

// Agrega el tipo de las props a tu componente SiteNav:
interface SiteNavProps {
  posts?: { slug: string; title: string; description: string }[];
}


export function SiteNav({ posts = [] }: SiteNavProps) {

  

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);



  const toggleMenu = () => setIsOpen(!isOpen);

  // Listener para atajo de teclado (Ctrl + K o Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto w-full flex h-14 items-center justify-between px-3 sm:px-6">
          
          {/* CONTENEDOR IZQUIERDO: LOGO Y REDES EN ESCRITORIO */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="flex items-center font-medium text-lg tracking-tighter h-8 w-8 rounded-md overflow-hidden hover:opacity-80 transition-opacity shrink-0"
            >
              <img
                src="/magicui-logo.png"
                alt="Riki Tech Code Logo"
                className="w-10 h-10 object-cover"
              />
            </Link>

            <div className="hidden md:block h-4 w-px bg-border/60" />

            <div className="hidden md:flex items-center gap-1.5">
              <SocialIcons />
            </div>
          </div>

          {/* REDES SOCIALES EN MÓVIL (Centradas) */}
          <div className="flex md:hidden items-center justify-center gap-1 sm:gap-1.5 mx-auto">
            <SocialIcons />
          </div>

          {/* CONTENEDOR DERECHO: BUSCADOR, ENLACES, TEMA Y MENÚ MÓVIL */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* BOTÓN DE BÚSQUEDA */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-border/60 bg-muted/40 hover:bg-muted text-muted-foreground text-xs transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="hidden lg:inline">Buscar...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-background border border-border/80 rounded font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Enlaces de navegación (Escritorio) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground mr-2">
              <Link href="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                Sobre mí
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacidad
              </Link>
            </nav>

            {/* CAMBIO DE TEMA */}
            <ThemeToggle />

            {/* BOTÓN HAMBURGUESA (Móviles) */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isOpen && (
          <div className="md:hidden border-b border-border/40 bg-background px-6 py-4 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-3 text-sm font-medium">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Inicio
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Sobre mí
              </Link>
              <Link 
                href="/privacy" 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Privacidad
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchWrapper
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts} // Se los pasa a SearchWrapper
      />

      
    </>
  );
}

function SocialIcons() {
  return (
    <>
      <a
        href="https://t.me/tu_canal"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 sm:p-2 rounded-full bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all duration-200"
        aria-label="Telegram"
      >
        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
      <a
        href="https://youtube.com/@tu_canal"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 sm:p-2 rounded-full bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-200"
        aria-label="YouTube"
      >
        <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
      <a
        href="https://linkedin.com/in/tu_usuario"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 sm:p-2 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-200"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
      <a
        href="https://github.com/tu_usuario"
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 sm:p-2 rounded-full bg-foreground/10 text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
        aria-label="GitHub"
      >
        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
    </>
  );
}
