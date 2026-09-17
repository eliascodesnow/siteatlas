"use client";

import Link from "next/link";
import { useEffect, type CSSProperties, type ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  event: AnalyticsEvent;
  props?: Record<string, string | number | boolean | null | undefined>;
  className?: string;
  children: ReactNode;
  external?: boolean;
  ariaLabel?: string;
  style?: CSSProperties;
}

export function TrackedLink({ href, event, props, className, children, external, ariaLabel, style }: TrackedLinkProps) {
  const onClick = () => track(event, props);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick} aria-label={ariaLabel} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel} style={style}>
      {children}
    </Link>
  );
}

/** Fires a view event once on mount (concept, category, location views). */
export function TrackView({ event, props }: { event: AnalyticsEvent; props?: Record<string, string | number | boolean | null | undefined> }) {
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
