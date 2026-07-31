"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText } from "lucide-react";

// Estructura de cada artículo que recibe el modal
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

  // Cerrar el modal al presionar la tecla 'Escape'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Filtrar artículos por coincidencias en el título o descripción
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.description?.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (slug: string) => {
    onClose();
    setQuery("");
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Capa de fondo para cerrar al hacer clic fuera del recuadro */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Recuadro principal del Modal */}
      <div className="relative w-full max-w-xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Campo de búsqueda (Input) */}
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Buscar artículos o temas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de resultados */}
        <div className="overflow-y-auto p-2 flex-1 divide-y divide-border/50">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => handleSelect(post.slug)}
                className="w-full text-left p-3 hover:bg-accent/50 rounded-lg transition-colors flex items-start gap-3 group"
              >
                <FileText className="w-5 h-5 text-muted-foreground group-hover:text-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  {post.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                      {post.description}
                    </p>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No se encontraron artículos para &quot;
              <span className="text-foreground">{query}</span>
              &quot;
            </div>
          )}
        </div>

        {/* Pie del modal con tips visuales */}
        <div className="px-4 py-2.5 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>Presiona <kbd className="font-mono bg-background px-1 border rounded">Esc</kbd> para salir</span>
          <span>Selecciona con un clic</span>
        </div>

      </div>
    </div>
  );
}