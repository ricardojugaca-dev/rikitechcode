import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import { metadataKeywords } from "./metadata";
import { SiteNav } from "@/components/site-nav";
import Footer from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top"; // 1. Verificar esta importación
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import "@/app/globals.css";

export const viewport: Viewport = {
  themeColor: "black",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Riki Tech Code',
    template: `%s | Riki Tech Code`,  
  },
  description: 'Blog de programación, desarrollo web y proyectos de software por Ricardo.',
  keywords: metadataKeywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <SiteNav />
          <main>{children}</main>
          <Footer />

          {/* 2. VERIFICAR QUE ESTÉ DENTRO DEL BODY Y THEMEPROVIDER */}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}