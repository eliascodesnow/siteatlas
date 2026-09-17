import Link from "next/link";
import { BusinessCard } from "@/components/platform/BusinessCard";
import { TrackView, TrackedLink } from "@/components/platform/TrackedLink";
import { buildSections, navFromSections } from "@/concepts/blueprints";
import { ConceptNav } from "@/concepts/ConceptNav";
import { renderSection } from "@/concepts/sections";
import { CATEGORY_MAP } from "@/data/taxonomy";
import type { BusinessRow } from "@/db/schema";
import { conceptDisclosure } from "@/lib/site";
import type { BusinessSummary, CategorySlug, SectionConfig } from "@/lib/types";
import { businessConceptMessage, whatsappLink } from "@/lib/whatsapp";

export function ConceptFrame({ business: b, related }: { business: BusinessRow; related: BusinessSummary[] }) {
  const sections = buildSections(b);
  const nav = navFromSections(sections);
  const contact = sections.find((s): s is Extract<SectionConfig, { type: "contact" }> => s.type === "contact");
  const contactId = contact?.id ?? "contact";
  const hero = sections.find((s): s is Extract<SectionConfig, { type: "hero" }> => s.type === "hero");
  const secondaryId = sections.find((s) => s.type !== "hero" && "id" in s && s.id)?.["id" as keyof SectionConfig] as string | undefined;
  const cta = hero?.cta ?? "Get in touch";
  const overlay = hero?.variant === "full";
  const category = CATEGORY_MAP[b.category as CategorySlug];
  const themeClass = `concept palette-${b.theme.palette} font-${b.theme.font} ${b.theme.radius === "sm" ? "radius-sm" : ""}`;

  return (
    <div id="top" className={themeClass}>
      <TrackView event="concept_view" props={{ business: b.slug, category: b.category, city: b.citySlug }} />

      {/* SiteAtlas bar – persistent, small, honest */}
      <div className="sticky top-0 z-40 flex h-9 items-center justify-between gap-4 bg-ink px-4 text-[0.7rem] text-paper sm:px-6">
        <Link href="/explore" className="flex items-center gap-3 whitespace-nowrap">
          <span className="font-semibold tracking-[0.14em]">SITEATLAS</span>
          <span className="hidden text-paper/60 sm:inline">Concept by Kinetix Africa</span>
        </Link>
        <p className="hidden truncate text-paper/60 md:block">Independent website concept for {b.name} — not the official website</p>
        <TrackedLink
          href={whatsappLink(businessConceptMessage(b.name))}
          external
          event="business_cta_click"
          props={{ business: b.slug, placement: "top_bar" }}
          className="whitespace-nowrap font-medium underline underline-offset-2"
        >
          Get this website
        </TrackedLink>
      </div>

      <ConceptNav name={b.name} slug={b.slug} items={nav} contactId={contactId} cta={cta} style={b.theme.nav ?? "bar"} overlay={overlay} />

      {sections.map((s, i) => renderSection(s, { b, contactId, secondaryId }, i))}

      {/* Concept footer (business-side) */}
      <footer className="border-t px-5 py-10 text-sm sm:px-8 lg:px-14" style={{ borderColor: "var(--c-line)", color: "var(--c-muted)" }}>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="c-display text-2xl" style={{ color: "var(--c-fg)" }}>{b.name}</p>
            <p className="mt-1">{[b.neighborhood, b.city, b.country].filter(Boolean).join(", ")}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((it) => (
              <li key={it.id}>
                <a href={`#${it.id}`} className="hover:underline">{it.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed">{conceptDisclosure(b.name)}</p>
        <p className="mt-2 text-xs">Business information researched {b.lastResearched}.</p>
      </footer>

      {/* Kinetix Africa conversion */}
      <section className="bg-ink px-5 py-20 text-paper sm:px-8 lg:px-14 lg:py-28" style={{ fontFamily: "var(--font-platform-sans)" }}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-paper/50">Like what you see?</p>
            <h2 className="display-2 mt-4 text-paper">Your business could have a website built around the way your customers actually experience your brand.</h2>
          </div>
          <div className="flex flex-col items-start justify-end gap-4 lg:col-span-4 lg:col-start-9 lg:items-end">
            <TrackedLink
              href={whatsappLink(businessConceptMessage(b.name))}
              external
              event="business_cta_click"
              props={{ business: b.slug, placement: "concept_footer" }}
              className="inline-flex items-center gap-3 bg-paper px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-paper-2"
            >
              Get this website <span aria-hidden>→</span>
            </TrackedLink>
            <Link href="/explore" className="text-sm text-paper/70 underline underline-offset-4 hover:text-paper">
              Explore more concepts
            </Link>
            <p className="text-xs text-paper/40">Opens WhatsApp with “{b.name}” already in the message.</p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-paper px-5 py-16 text-ink sm:px-8 lg:px-14 lg:py-24" style={{ fontFamily: "var(--font-platform-sans)" }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-mute">Explore more concepts</p>
              <h2 className="display-3 mt-3">More in {category?.name ?? "this category"} and {b.city}</h2>
            </div>
            <Link href={`/categories/${b.category}`} className="link-underline text-sm">
              Browse {category?.short.toLowerCase()}
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {related.map((r) => (
              <BusinessCard key={r.slug} business={r} variant="compact" />
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-6 border-t border-line pt-6 text-sm">
            <Link href="/explore" className="link-underline">Back to concepts</Link>
            <Link href={`/locations/${b.countrySlug}/${b.citySlug}`} className="link-underline">More in {b.city}</Link>
            <Link href="/" className="link-underline">SiteAtlas home</Link>
          </div>
        </section>
      )}
    </div>
  );
}
