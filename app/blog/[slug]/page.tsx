import { docs, meta } from "@/.source";
import { DocsBody } from "fumadocs-ui/page";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { MobileTableOfContents } from "@/components/mobile-toc";
import { ReadMoreSection } from "@/components/read-more-section";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { HashScrollHandler } from "@/components/hash-scroll-handler";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface BlogData {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
  author?: string;
}

interface BlogPage {
  url: string;
  data: BlogData;
}

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const page = blogSource.getPage([slug]);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const date = new Date(page.data.date);
  const formattedDate = formatDate(date);

  // Obtener y ordenar los 5 posts más recientes
  const allPages = blogSource.getPages() as BlogPage[];
  const recentPosts = allPages
    .map((p) => ({
      ...p,
      parsedDate: new Date(p.data.date),
    }))
    .sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime())
    .slice(0, 5);

  // 8 Redes sociales con sus botones estilizados de dos tonos
  const socialLinks = [
    {
      name: "YouTube",
      url: "https://youtube.com",
      bgClass: "bg-[#FF0000]",
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      bgClass: "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]",
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "Telegram",
      url: "https://telegram.org",
      bgClass: "bg-[#229ED9]",
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
    {
      name: "Tik Tok",
      url: "https://tiktok.com",
      bgClass: "bg-[#FE2C55]",
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.67 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.57-1.25 2.57.03.95.58 1.83 1.42 2.27.85.45 1.9.43 2.73-.04.79-.44 1.32-1.27 1.38-2.17.06-2.88.02-5.76.03-8.64-.01-4.25-.01-8.5.01-12.75z"/>
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      url: "https://x.com",
      bgClass: "bg-[#0f1419]",
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com",
      bgClass: "bg-[#24292e]",
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      bgClass: "bg-[#0A66C2]",
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      bgClass: "bg-[#1877F2]",
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-between">
      <HashScrollHandler />
      
      {/* FONDO FLICKERING GRID */}
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      {/* SECCIÓN SUPERIOR: METADATOS Y TÍTULO */}
      <div className="space-y-4 border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Button variant="outline" asChild className="h-6 w-6">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="sr-only">Back to all articles</span>
                </Link>
              </Button>

              {page.data.tags && page.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 text-muted-foreground">
                  {page.data.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {page.data.tags && page.data.tags.length > 0 && (
                <span className="text-border">•</span>
              )}

              <time className="font-medium text-muted-foreground">
                {formattedDate}
              </time>
            </div>

            <div className="flex items-center">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border/80 bg-muted/40 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>
                  Autor{" "}
                  <strong className="font-semibold text-foreground">
                    RikiTech Code
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {page.data.title}
          </h1>

          {page.data.description && (
            <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
              {page.data.description}
            </p>
          )}
        </div>
      </div>

      {/* CONTENEDOR DE LA REJILLA CON LÍNEAS DIVISIONARIAS VISIBLES EN MÓVIL Y DESKTOP */}
      <div className="relative flex-1 max-w-7xl w-full mx-auto z-10 px-3 sm:px-0">
        
        {/* LÍNEAS DIVISIONARIAS VERTICALES DE BORDE EXTERIOR */}
        <div className="absolute inset-y-0 left-3 right-3 sm:left-0 sm:right-0 max-w-7xl mx-auto border-x border-border pointer-events-none z-20" />

        {/* CAMBIO CLAVE 1: flex-col en móvil, md:flex-row en escritorio. Divide las secciones con borde. */}
        <div className="flex flex-col md:flex-row md:divide-x divide-y md:divide-y-0 divide-border w-full h-full min-h-full">
          
          {/* COLUMNA IZQUIERDA: CONTENIDO Y POSTS RELACIONADOS */}
          <main className="flex-1 w-full min-w-0 p-0 overflow-hidden flex flex-col justify-between">
            <div>
              {page.data.thumbnail && (
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden object-cover border-b border-border">
                  <Image
                    src={page.data.thumbnail}
                    alt={page.data.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <div className="p-4 sm:p-6 lg:p-10">
                <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">
                  <DocsBody>
                    <MDX />
                  </DocsBody>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-border/60">
              <ReadMoreSection
                currentSlug={[slug]}
                currentTags={page.data.tags}
              />
            </div>
          </main>

          {/* CAMBIO CLAVE 2: quitamos 'hidden', ahora se muestra siempre. En móvil abarca w-full, en md toma su ancho normal */}
          <aside className="w-full md:w-[300px] lg:w-[380px] flex-shrink-0 p-4 lg:p-8 bg-muted/30 dark:bg-muted/10">
            <div className="sticky top-20 space-y-6">
              
              {/* 1. TARJETA DE LOGO + REDES SOCIALES (DOS TONOS) */}
              <div className="border border-border/80 rounded-xl p-5 bg-card/90 text-card-foreground shadow-sm flex flex-col items-center text-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                    <span className="text-xl font-bold text-primary">RC</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">
                      RikiTech Code
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Desarrollo Web & Tecnología
                    </p>
                  </div>
                </div>

                <p className="text-xs font-medium text-muted-foreground border-t border-border/60 pt-3 w-full">
                  ¡Sígueme en todas mis redes sociales!
                </p>

                {/* Grid de 8 redes sociales (se adapta de 2 a 4 columnas según la pantalla) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2.5 w-full pt-1">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative flex items-center h-10 rounded-lg overflow-hidden text-white font-medium shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${social.bgClass}`}
                    >
                      {/* Franja izquierda más oscura para el icono */}
                      <div className="w-9 h-full bg-black/15 flex items-center justify-center flex-shrink-0 border-r border-white/10">
                        {social.icon}
                      </div>

                      {/* Texto del botón */}
                      <span className="flex-1 text-center text-xs font-semibold pr-2 tracking-wide truncate">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* 2. TARJETA DE RECENT POSTS */}
              <div className="border border-border/80 rounded-xl p-5 bg-card/90 text-card-foreground shadow-sm space-y-4">
                <h3 className="font-semibold text-sm text-foreground border-b border-border/60 pb-2.5">
                  Recent Posts
                </h3>

                <div className="flex flex-col divide-y divide-border/40">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.url}
                      href={post.url}
                      className="group py-3 first:pt-0 last:pb-0 flex items-start gap-3 transition-colors"
                    >
                      {post.data.thumbnail ? (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-border/60">
                          <Image
                            src={post.data.thumbnail}
                            alt={post.data.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground border border-border/60">
                          RC
                        </div>
                      )}

                      <div className="flex flex-col justify-between flex-1 min-w-0 space-y-1">
                        {post.data.tags && post.data.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.data.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <h4 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {post.data.title}
                        </h4>

                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <time>{formatDate(post.parsedDate)}</time>
                          <span>•</span>
                          <span>RikiTech Code</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      <MobileTableOfContents />
    </div>
  );
}