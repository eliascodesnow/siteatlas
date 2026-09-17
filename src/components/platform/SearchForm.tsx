"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

export function SearchForm({ initial = "", large = false, autoFocus = false }: { initial?: string; large?: boolean; autoFocus?: boolean }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();

  function submit(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    track("search", { query: term.slice(0, 80) });
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  return (
    <form onSubmit={submit} role="search" className="w-full">
      <label htmlFor="site-search" className="sr-only">
        Search businesses, industries or locations
      </label>
      <div className={`flex items-center gap-3 border-b border-ink ${large ? "pb-4" : "pb-2"}`}>
        <input
          id="site-search"
          name="q"
          type="search"
          autoFocus={autoFocus}
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search businesses, industries or locations…"
          className={`w-full bg-transparent placeholder:text-mute-2 focus:outline-none ${large ? "font-serif text-3xl sm:text-5xl" : "text-base"}`}
        />
        <button type="submit" className="shrink-0 text-sm text-mute hover:text-ink" aria-label="Search">
          Search →
        </button>
      </div>
    </form>
  );
}
