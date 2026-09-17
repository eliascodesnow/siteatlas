import Link from "next/link";
import { TrackedLink } from "@/components/platform/TrackedLink";
import { KINETIX_WHATSAPP_DISPLAY, generalEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <p className="text-[1.05rem] font-semibold tracking-[0.14em]">SITEATLAS</p>
          <p className="mt-1 text-[0.7rem] tracking-[0.08em] text-mute">by KINETIX AFRICA</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute">
            A curated showcase of independent website concepts created by Kinetix Africa for real businesses across Kenya and beyond.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-mute">Browse</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/explore" className="hover:text-mute">Explore</Link></li>
            <li><Link href="/categories" className="hover:text-mute">Categories</Link></li>
            <li><Link href="/locations" className="hover:text-mute">Locations</Link></li>
            <li><Link href="/about" className="hover:text-mute">About</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-mute">Contact</p>
          <p className="mt-4 text-sm">
            WhatsApp{" "}
            <TrackedLink
              href={whatsappLink(generalEnquiryMessage())}
              external
              event="whatsapp_cta_click"
              props={{ placement: "footer" }}
              className="link-underline"
            >
              {KINETIX_WHATSAPP_DISPLAY}
            </TrackedLink>
          </p>
          <Link href="/contact" className="mt-3 inline-block text-sm text-mute hover:text-ink">
            Talk to Kinetix Africa →
          </Link>
        </div>
      </div>
      <div className="container-wide flex flex-col gap-4 border-t border-line py-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl leading-relaxed">
          All concepts on SiteAtlas are independent design studies by Kinetix Africa. They are not the official websites of the businesses shown and imply no affiliation, endorsement or authorisation.
        </p>
        <p className="shrink-0">© {new Date().getFullYear()} Kinetix Africa</p>
      </div>
    </footer>
  );
}
