import type { Metadata } from "next";

export const SITE = {
  name: "Pip & Structure", // working title — swap for your brand
  url: "https://www.example.com", // TODO: replace with your real domain
  description:
    "Forex market analysis, ICT/SMC concepts, and pair-by-pair breakdowns for traders who want structure, not noise.",
  twitterHandle: "@yourhandle", // TODO
};

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string; // e.g. "/blog/xauusd-weekly-outlook"
  image?: string; // absolute or root-relative OG image path
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  image = "/og-default.png",
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataArgs): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: image }],
      locale: "en_US",
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: SITE.twitterHandle,
    },
  };
}

// JSON-LD builder for a blog post — rendered via components/seo/JsonLd.tsx
export function buildArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image = "/og-default.png",
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [`${SITE.url}${image}`],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}${path}`,
    },
  };
}
