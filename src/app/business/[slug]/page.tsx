import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConceptFrame } from "@/concepts/ConceptFrame";
import { pexelsUrl, poolImage } from "@/data/images";
import { CATEGORY_MAP } from "@/data/taxonomy";
import { getBusinessBySlug, getRelatedBusinesses } from "@/lib/queries";
import { SITE_URL } from "@/lib/site";
import type { CategorySlug } from "@/lib/types";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBusinessBySlug(slug);
  if (!b) return { title: "Concept not found" };
  const img = poolImage(b.imagery.pool, b.imagery.hero);
  const place = b.neighborhood ? `${b.neighborhood}, ${b.city}` : b.city;
  const title = `${b.name} Website Concept`;
  const description = `Independent website concept for ${b.name}, a ${b.subcategory.toLowerCase()} in ${place}, designed by Kinetix Africa. Not the official website.`;
  return {
    title,
    description,
    alternates: { canonical: `/business/${b.slug}` },
    openGraph: {
      title: `${title} | SiteAtlas`,
      description,
      type: "article",
      url: `${SITE_URL}/business/${b.slug}`,
      images: [{ url: pexelsUrl(img.id, 1200, 630), width: 1200, height: 630, alt: img.alt }],
    },
    twitter: { card: "summary_large_image", title: `${title} | SiteAtlas`, description },
  };
}

export default async function BusinessPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = await getBusinessBySlug(slug);
  if (!b) notFound();
  const related = await getRelatedBusinesses(b, 4);
  const category = CATEGORY_MAP[b.category as CategorySlug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${b.name} Website Concept`,
    description: `Independent website design concept for ${b.name} by Kinetix Africa. Not the official website of ${b.name}.`,
    url: `${SITE_URL}/business/${b.slug}`,
    genre: category?.name,
    creator: { "@type": "Organization", name: "Kinetix Africa" },
    isPartOf: { "@type": "WebSite", name: "SiteAtlas", url: SITE_URL },
    about: { "@type": "LocalBusiness", name: b.name, address: { "@type": "PostalAddress", addressLocality: b.city, addressCountry: b.country } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ConceptFrame business={b} related={related} />
    </>
  );
}
