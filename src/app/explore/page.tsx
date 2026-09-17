import type { Metadata } from "next";
import { CatalogueBrowser, readFilters, readPage, type SearchParamsMap } from "@/components/platform/CatalogueBrowser";
import { PageIntro } from "@/components/platform/EmptyState";
import { PlatformShell } from "@/components/platform/PlatformShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore website concepts",
  description: "Browse every SiteAtlas website concept — real businesses across Kenya and beyond, reimagined by Kinetix Africa.",
  alternates: { canonical: "/explore" },
};

export default async function ExplorePage({ searchParams }: { searchParams: Promise<SearchParamsMap> }) {
  const sp = await searchParams;
  const filters = readFilters(sp);
  return (
    <PlatformShell>
      <PageIntro eyebrow="The archive" title="Every concept in the catalogue." body="Filter by industry, city, neighbourhood or the style of website you have in mind." />
      <CatalogueBrowser filters={filters} page={readPage(sp)} searchParams={sp} />
    </PlatformShell>
  );
}
