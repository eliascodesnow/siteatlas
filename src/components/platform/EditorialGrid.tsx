import { BusinessCard, type CardVariant } from "@/components/platform/BusinessCard";
import { Reveal } from "@/components/platform/Reveal";
import type { BusinessSummary } from "@/lib/types";

/**
 * Editorial archive grid: a repeating 12-column rhythm where card sizes vary
 * on purpose (wide / tall / standard) so the page never reads as a uniform grid.
 */
const PATTERN: { span: string; variant: CardVariant }[] = [
  { span: "lg:col-span-7", variant: "standard" },
  { span: "lg:col-span-5", variant: "tall" },
  { span: "lg:col-span-4", variant: "standard" },
  { span: "lg:col-span-4", variant: "standard" },
  { span: "lg:col-span-4", variant: "standard" },
  { span: "lg:col-span-5", variant: "tall" },
  { span: "lg:col-span-7", variant: "standard" },
];

export function EditorialGrid({ items, offset = 0 }: { items: BusinessSummary[]; offset?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-16">
      {items.map((b, i) => {
        const p = PATTERN[(i + offset) % PATTERN.length];
        return (
          <Reveal key={b.slug} className={`sm:col-span-1 ${p.span}`}>
            <BusinessCard business={b} variant={p.variant} />
          </Reveal>
        );
      })}
    </div>
  );
}

export function SimpleGrid({ items, variant = "standard", cols = 3 }: { items: BusinessSummary[]; variant?: CardVariant; cols?: 2 | 3 | 4 }) {
  const colClass = cols === 4 ? "lg:grid-cols-4" : cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 ${colClass}`}>
      {items.map((b) => (
        <BusinessCard key={b.slug} business={b} variant={variant} />
      ))}
    </div>
  );
}
