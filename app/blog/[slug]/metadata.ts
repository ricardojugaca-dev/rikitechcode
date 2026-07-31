import { Metadata } from "next";
import { blog } from "@/lib/source";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const page = blog.getPage([slug]);

    if (!page) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const ogUrl = `${siteConfig.url}/blog/${slug}`;
    const ogImage = `${ogUrl}/opengraph-image`;

    const tags = Array.isArray(page.data.tags)
      ? page.data.tags.filter(
          (tag): tag is string => typeof tag === "string"
        )
      : [];

    const author =
      typeof page.data.author === "string" && page.data.author.trim()
        ? page.data.author
        : "Magic UI";

    const thumbnail =
      typeof page.data.thumbnail === "string" &&
      page.data.thumbnail.trim()
        ? page.data.thumbnail
        : ogImage;

    const date =
      typeof page.data.date === "string"
        ? page.data.date
        : undefined;

    return {
      title: page.data.title,
      description: page.data.description,
      keywords: [
        page.data.title,
        ...tags,
        "Blog",
        "Article",
        "Web Development",
        "Programming",
        "Technology",
        "Software Engineering",
      ],
      authors: [
        {
          name: author,
          url: siteConfig.url,
        },
      ],
      creator: author,
      publisher: "Magic UI",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: page.data.title,
        description: page.data.description,
        type: "article",
        url: ogUrl,
        publishedTime: date,
        authors: [author],
        tags,
        images: [
          {
            url: thumbnail,
            width: 1200,
            height: 630,
            alt: page.data.title,
          },
        ],
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary_large_image",
        title: page.data.title,
        description: page.data.description,
        images: [thumbnail],
        creator: "@dillionverma",
        site: "@dillionverma",
      },
      alternates: {
        canonical: ogUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}