import Link from "next/link";
import { Github, Youtube, Instagram, Send, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUMNA 1: BRANDING & DESCRIPCIÓN (Centrado en móvil, a la izquierda en PC) */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <Link 
              href="/" 
              className="font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
            >
              RikiTech Code
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Blog de tecnología, desarrollo de software, tutoriales web y experiencias en el mundo de la programación.
            </p>

            {/* ÍCONOS DE REDES SOCIALES (Centrados en móvil, a la izquierda en PC) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              
              {/* Telegram */}
              <a
                href="https://t.me/tu_canal" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc] hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@tu_canal" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@tu_usuario" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-foreground/10 text-foreground hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-200"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.33-6.33V9.08a8.16 8.16 0 0 0 4.91 1.6V7.23a4.85 4.85 0 0 1-.99-.54z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/tu_usuario" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/tu_usuario" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/tu_pagina" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              {/* Logo Oficial de X */}
              <a
                href="https://x.com/tu_usuario" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-foreground/10 text-foreground hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-200"
                aria-label="X"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/tu_usuario" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-foreground/10 text-foreground hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>

            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN (Centrada en móvil) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h3 className="text-sm font-semibold text-foreground">Navegación</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Artículos / Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  Sobre mí
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: LEGAL & MONETIZACIÓN (Centrada en móvil) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* LÍNEA SEPARADORA Y COPYRIGHT */}
        <div className="mt-12 pt-6 border-t border-border/50 flex items-center justify-center md:justify-between text-xs text-muted-foreground">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} RikiTech Code. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}