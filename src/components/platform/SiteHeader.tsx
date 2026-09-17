"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/platform/TrackedLink";
import { generalEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

const NAV = [
  { href: "/explore", label: "Explore" },
  { href: "/categories", label: "Categories" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-[2px]">
      <div className="container-wide flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" className="flex items-baseline gap-2" aria-label="SiteAtlas home">
          <span className="text-[1.05rem] font-semibold tracking-[0.14em]">SITEATLAS</span>
          <span className="hidden text-[0.7rem] tracking-[0.08em] text-mute sm:inline">by KINETIX AFRICA</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${active ? "text-ink" : "text-mute hover:text-ink"}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/search" className="flex h-10 w-10 items-center justify-center text-ink hover:text-mute" aria-label="Search concepts">
            <SearchIcon />
          </Link>
          <TrackedLink
            href={whatsappLink(generalEnquiryMessage())}
            external
            event="whatsapp_cta_click"
            props={{ placement: "header" }}
            className="btn-ink hidden !py-2.5 lg:inline-flex"
          >
            Get a website
          </TrackedLink>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-px w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-3 h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-paper lg:hidden">
          <nav aria-label="Mobile" className="container-wide flex flex-col pt-6">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-line py-5 font-serif text-3xl">
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="border-b border-line py-5 font-serif text-3xl">
              Search
            </Link>
          </nav>
          <div className="container-wide mt-auto pb-8">
            <TrackedLink
              href={whatsappLink(generalEnquiryMessage())}
              external
              event="whatsapp_cta_click"
              props={{ placement: "mobile_menu" }}
              className="btn-ink w-full justify-center"
            >
              Get a website
            </TrackedLink>
            <p className="mt-4 text-xs text-mute">Opens WhatsApp to Kinetix Africa.</p>
          </div>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
