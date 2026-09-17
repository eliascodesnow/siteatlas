import Link from "next/link";
import { PlatformShell } from "@/components/platform/PlatformShell";

export default function NotFound() {
  return (
    <PlatformShell>
      <section className="container-wide flex min-h-[60vh] flex-col justify-center py-24">
        <p className="eyebrow text-mute">404</p>
        <h1 className="display-1 mt-4">Nothing here.</h1>
        <p className="mt-6 max-w-md text-mute sm:text-lg">The page may have moved, or the concept you are looking for has not been published yet.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/explore" className="btn-ink">
            Try exploring another concept
          </Link>
          <Link href="/" className="btn-outline">
            Back to SiteAtlas
          </Link>
        </div>
      </section>
    </PlatformShell>
  );
}
