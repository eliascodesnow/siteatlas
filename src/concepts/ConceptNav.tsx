"use client";

import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/platform/TrackedLink";
import type { NavItem } from "@/concepts/blueprints";
import { businessConceptMessage, whatsappLink } from "@/lib/whatsapp";

interface ConceptNavProps {
  name: string;
  slug: string;
  items: NavItem[];
  contactId: string;
  cta: string;
  style: "bar" | "centered" | "minimal";
  overlay: boolean;
}

/** The concept's own navigation. Anchors scroll within the concept; the CTA is the business's primary action. */
export function ConceptNav({ name, slug, items, contactId, cta, style, overlay }: ConceptNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparent = overlay && !scrolled && !open;
  const wrapStyle = transparent
    ? { color: "#fff", background: "transparent", borderColor: "transparent" }
    : { color: "var(--c-fg)", background: "color-mix(in srgb, var(--c-bg) 92%, transparent)", borderColor: "var(--c-line)" };

  const brand = (
    <a href="#top" className="c-display text-xl tracking-tight sm:text-2xl" aria-label={`${name} — back to top`}>
      {name}
    </a>
  );
  const links = (
    <ul className="hidden items-center gap-7 lg:flex">
      {items.map((it) => (
        <li key={it.id}>
          <a href={`#${it.id}`} className="text-sm opacity-80 transition-opacity hover:opacity-100">
            {it.label}
          </a>
        </li>
      ))}
    </ul>
  );
  const ctaEl = (
    <a href={`#${contactId}`} className="hidden text-sm font-semibold underline underline-offset-4 lg:inline">
      {cta}
    </a>
  );
  const burger = (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center lg:hidden"
      aria-expanded={open}
      aria-controls="concept-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => setOpen((v) => !v)}
    >
      <span className="relative block h-3 w-5">
        <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
        <span className={`absolute left-0 top-3 h-px w-5 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
      </span>
    </button>
  );

  return (
    <>
      <div className={`sticky top-9 z-30 border-b backdrop-blur-[2px] transition-colors duration-300 ${overlay ? "-mb-[4.25rem]" : ""}`} style={wrapStyle}>
        <div className="flex h-[4.25rem] items-center justify-between px-5 sm:px-8 lg:px-14">
          {style === "centered" ? (
            <>
              <div className="flex-1">{links}</div>
              {brand}
              <div className="flex flex-1 items-center justify-end gap-4">
                {ctaEl}
                {burger}
              </div>
            </>
          ) : style === "minimal" ? (
            <>
              {brand}
              <div className="flex items-center gap-6">
                {ctaEl}
                <button type="button" className="hidden text-sm opacity-80 hover:opacity-100 lg:inline" aria-expanded={open} aria-controls="concept-menu" onClick={() => setOpen((v) => !v)}>
                  {open ? "Close" : "Menu"}
                </button>
                {burger}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-10">
                {brand}
                {links}
              </div>
              <div className="flex items-center gap-4">
                {ctaEl}
                {burger}
              </div>
            </>
          )}
        </div>
      </div>

      {open && (
        <div id="concept-menu" className="fixed inset-x-0 bottom-0 top-9 z-20 flex flex-col px-5 pt-24 sm:px-8 lg:px-14" style={{ background: "var(--c-bg)", color: "var(--c-fg)" }}>
          <ul className="space-y-1">
            {items.map((it) => (
              <li key={it.id}>
                <a href={`#${it.id}`} onClick={() => setOpen(false)} className="c-display block border-b py-4 text-3xl sm:text-4xl" style={{ borderColor: "var(--c-line)" }}>
                  {it.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`#${contactId}`} onClick={() => setOpen(false)} className="c-display block border-b py-4 text-3xl sm:text-4xl" style={{ borderColor: "var(--c-line)" }}>
                {cta}
              </a>
            </li>
          </ul>
          <div className="mt-auto pb-10">
            <TrackedLink href={whatsappLink(businessConceptMessage(name))} external event="business_cta_click" props={{ business: slug, placement: "concept_menu" }} className="c-btn w-full justify-center">
              Get this website
            </TrackedLink>
          </div>
        </div>
      )}
    </>
  );
}
