"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  description?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

export default function SearchModal({ isOpen, onClose, posts }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Limpiar la búsqueda cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  // Cerrar el modal con 'Escape'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Lógica de filtrado: Exige mínimo 2 caracteres para realizar la búsqueda
  const isQueryTooShort = query.trim().length < 2;

  const filteredPosts = isQueryTooShort
    ? []
    : posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.description?.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (slug: string) => {
    onClose();
    setQuery("");
    router.push(`/blog/${slug}`);
  };

  return (
    /* 
      CONTENEDOR PRINCIPAL:
      - Móvil: Centrado horizontalmente (justify-center).
      - Escritorio (sm:): Alineado a la derecha (sm:justify-end) con margen para quedar
        debajo de los enlaces del Navbar (Inicio, Blog, Sobre mí, Tema, etc.).
    */
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:justify-end pt-16 px-4 sm:pr-12 max-w-7xl mx-auto animate-in fade-in duration-150 pointer-events-none">
      
      {/* 
        CAPA DE FONDO (Overlay):
        - Móvil: Fondo oscuro con desenfoque.
        - Escritorio (sm:): Transparente sin desenfoque para mantener la vista limpia.
      */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none pointer-events-auto" onClick={onClose} />

      {/* 
        MODAL / DROPDOWN
      */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-background border border-border rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col sm:shadow-lg sm:border-border/80 pointer-events-auto">
        
        {/* Campo de Búsqueda */}
        <div className="flex items-center px-4 border-b border-border">
          {/* Solo se muestra el icono de la lupa */}
          <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenedor de Resultados con Altura Controlada (Máximo ~5 artículos antes del scroll) */}
        <div className="overflow-y-auto max-h-[320px] p-2 divide-y divide-border/50">
          
          {/* Estado inicial / Búsqueda vacía */}
          {isQueryTooShort ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              Buscar...
            </div>
          ) : filteredPosts.length > 0 ? (
            /* Resultados de artículos */
            filteredPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => handleSelect(post.slug)}
                className="w-full text-left p-3 hover:bg-accent/50 rounded-lg transition-colors flex items-start gap-3 group"
              >
                <FileText className="w-5 h-5 text-muted-foreground group-hover:text-foreground shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {post.title}
                  </h4>
                  {post.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {post.description}
                    </p>
                  )}
                </div>
              </button>
            ))
          ) : (
            /* Sin coincidencias */
            <div className="py-8 text-center text-xs text-muted-foreground">
              No se encontraron resultados para &quot;
              <span className="text-foreground font-medium">{query}</span>
              &quot;
            </div>
          )}
        </div>

        {/* Pie del modal */}
        <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            <kbd className="font-mono bg-background px-1.5 py-0.5 border rounded text-[10px]">Esc</kbd> salir
          </span>
          {filteredPosts.length > 0 && (
            <span>{filteredPosts.length} resultado(s)</span>
          )}
        </div>

      </div>
    </div>
  );
}