import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogueBrowser, readFilters, readPage, type SearchParamsMap } from "@/components/platform/CatalogueBrowser";
import { PageIntro } from "@/components/platform/EmptyState";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { TrackView, TrackedLink } from "@/components/platform/TrackedLink";
import { CATEGORY_MAP } from "@/data/taxonomy";
import type { CategorySlug } from "@/lib/types";
import { categoryEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug as CategorySlug];
  if (!cat) return { title: "Category not found" };
  return {
    title: `${cat.name} website concepts`,
    description: `Independent website concepts for ${cat.name.toLowerCase()} businesses in Kenya and beyond, by Kinetix Africa.`,
    alternates: { canonical: `/categories/${cat.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<SearchParamsMap> }) {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug as CategorySlug];
  if (!cat) notFound();
  const sp = await searchParams;
  const filters = readFilters(sp, { category: cat.slug });

  return (
    <PlatformShell>
      <TrackView event="category_view" props={{ category: cat.slug }} />
      <PageIntro eyebrow="Category" title={cat.name} body={cat.description}>
        <TrackedLink
          href={whatsappLink(categoryEnquiryMessage(cat.name))}
          external
          event="whatsapp_cta_click"
          props={{ placement: "category", category: cat.slug }}
          className="link-underline mt-6 inline-block text-sm"
        >
          Run a {cat.short.toLowerCase()} business? Talk to Kinetix Africa
        </TrackedLink>
      </PageIntro>
      <CatalogueBrowser filters={filters} page={readPage(sp)} searchParams={sp} hide={["category"]} emptyTitle="No concepts match." emptyBody="Try clearing the location or style filter." />
    </PlatformShell>
  );
}
