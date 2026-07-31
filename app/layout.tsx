import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import { metadataKeywords } from "./metadata";
import { SiteNav } from "@/components/site-nav";
import Footer from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { blog } from "@/lib/source";
import "@/app/globals.css";

export const viewport: Viewport = {
  themeColor: "black",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Riki Tech Code",
    template: `%s | Riki Tech Code`,
  },
  description:
    "Blog de programación, desarrollo web y proyectos de software por Ricardo.",
  keywords: metadataKeywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Leemos los artículos MDX en el servidor de forma nativa
  const posts = blog.getPages().map((page) => ({
    slug: page.url.replace("/blog/", ""),
    title: page.data.title,
    description: page.data.description ?? "",
  }));

  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HashScrollHandler />
          <SiteNav posts={posts} />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}