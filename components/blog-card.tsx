import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  tags?: string[]; // Recepción del arreglo completo de categorías
  showRightBorder?: boolean;
}

export function BlogCard({
  url,
  title,
  description,
  date,
  thumbnail,
  tags = ["Desarrollo"], // Valor por defecto en caso de no tener etiquetas
  showRightBorder = true,
}: BlogCardProps) {
  return (
    <Link
      href={url}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-2 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/40 transition-all duration-300 ease-out"
    >
      <div className="flex flex-col">
        {/* MINIATURA */}
        {thumbnail && (
          <div className="relative w-full h-48 overflow-hidden rounded-xl">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* CONTENIDO DE LA TARJETA */}
        <div className="p-5 flex flex-col gap-3">
          
          {/* FECHA Y LISTA DE TODAS LAS CATEGORÍAS */}
          <div className="flex flex-col gap-2">
            <time className="text-xs font-medium text-muted-foreground">
              {date}
            </time>

            {/* Mapeo de todas las etiquetas del artículo */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* TÍTULO */}
          <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* DESCRIPCIÓN */}
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* PIE DE TARJETA CON INDICADOR */}
      <div className="px-5 pb-4 pt-1 flex items-center text-xs font-semibold text-primary">
        <span>Leer artículo</span>
        <svg
          className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}