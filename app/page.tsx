import { Suspense } from "react";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { TagFilter } from "@/components/tag-filter";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { blog } from "@/lib/source"; // 👈 Usamos la fuente centralizada de Fumadocs

interface BlogData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  authorImage?: string;
  thumbnail?: string;
}

interface BlogPage {
  url: string;
  data: BlogData;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const POSTS_PER_PAGE = 9; // Configurado a 9 tarjetas por página

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  // Obtenemos los blogs directamente desde la fuente centralizada 'blog'
  const allPages = (blog.getPages() as unknown as BlogPage[]) || [];
  
  const sortedBlogs = allPages.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const allTags = [
    "All",
    ...Array.from(
      new Set(sortedBlogs.flatMap((blogItem) => blogItem.data.tags || []))
    ).sort(),
  ];

  const selectedTag = resolvedSearchParams.tag || "All";
  
  // 1. Filtrar los blogs por tag seleccionado
  const filteredBlogs =
    selectedTag === "All"
      ? sortedBlogs
      : sortedBlogs.filter((blogItem) => blogItem.data.tags?.includes(selectedTag));

  // 2. Cálculo de Paginación
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  // Cortar el arreglo para mostrar únicamente las 9 tarjetas de la página activa
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const tagCounts = allTags.reduce((acc, tag) => {
    if (tag === "All") {
      acc[tag] = sortedBlogs.length;
    } else {
      acc[tag] = sortedBlogs.filter((blogItem) =>
        blogItem.data.tags?.includes(tag)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background relative">
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

      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              RikiTech Code
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Bienvenido a mi blog de tecnología, tutoriales y desarrollo de software.
            </p>
          </div>
        </div>
        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 py-8">
        <Suspense fallback={<div>Loading articles...</div>}>
          {/* CUADRÍCULA DE TARJETAS (PAGINADAS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((blogItem) => {
              const date = new Date(blogItem.data.date);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={blogItem.url}
                  url={blogItem.url}
                  title={blogItem.data.title}
                  description={blogItem.data.description}
                  date={formattedDate}
                  thumbnail={blogItem.data.thumbnail}
                  tags={blogItem.data.tags}
                />
              );
            })}
          </div>

          {/* CONTROLES DE PAGINACIÓN (Aparece si hay más de 1 página) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {/* Botón Anterior */}
              {currentPage > 1 ? (
                <Link
                  href={`/?tag=${selectedTag}&page=${currentPage - 1}`}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  Anterior
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm font-medium border border-border/40 text-muted-foreground rounded-lg opacity-50 cursor-not-allowed">
                  Anterior
                </span>
              )}

              {/* Indicador / Números de página */}
              <div className="flex items-center gap-1 px-3 text-sm font-medium text-muted-foreground">
                Página <span className="text-foreground font-bold mx-1">{currentPage}</span> de <span className="text-foreground font-bold ml-1">{totalPages}</span>
              </div>

              {/* Botón Siguiente */}
              {currentPage < totalPages ? (
                <Link
                  href={`/?tag=${selectedTag}&page=${currentPage + 1}`}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  Siguiente
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm font-medium border border-border/40 text-muted-foreground rounded-lg opacity-50 cursor-not-allowed">
                  Siguiente
                </span>
              )}
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}