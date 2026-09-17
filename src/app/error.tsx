"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="container-wide flex min-h-[70vh] flex-col justify-center py-24">
      <p className="eyebrow text-mute">Something went wrong</p>
      <h1 className="display-2 mt-4">We couldn&apos;t load this page.</h1>
      <p className="mt-6 max-w-md text-mute">This is on our side, not yours. Try again, or head back to the catalogue.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button type="button" onClick={reset} className="btn-ink">
          Try again
        </button>
        <Link href="/explore" className="btn-outline">
          Explore concepts
        </Link>
      </div>
    </main>
  );
}
