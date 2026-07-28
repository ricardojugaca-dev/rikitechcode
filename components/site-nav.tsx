/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react"; // Usamos iconos de Lucide (ya vienen instalados en la plantilla)

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto w-full flex h-14 items-center justify-between px-6">
        
        {/* LADO IZQUIERDO: LOGO ORIGINAL */}
        <div className="flex items-center">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 font-medium text-lg tracking-tighter h-8 w-8 rounded-md overflow-hidden hover:opacity-80 transition-opacity"
          >
            <img
              src="/magicui-logo.png"
              alt="Riki Tech Code Logo"
              className="w-10 h-10 object-cover"
            />
          </Link>
        </div>

        {/* LADO DERECHO: ENLACES (Escritorio) + TEMA + BOTÓN MÓVIL */}
        <div className="flex items-center gap-4">
          
          {/* Enlaces de navegación (Ocultos en móviles, visibles en tablets/PC) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
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

          {/* BOTÓN DE CAMBIO DE TEMA (Intacto a la derecha) */}
          <ThemeToggle />

          {/* BOTÓN HAMBURGUESA (Visible solo en móviles) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE (Aparece al hacer clic en hamburguesa) */}
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
  );
}