"use client";

import Image from "next/image";
import { useState } from "react";
import { pexelsUrl } from "@/data/images";

interface PhotoProps {
  id: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  /** object-position for art direction */
  position?: string;
}

/** Remote photo with graceful fallback. Always fills its parent. */
export function Photo({ id, alt, className = "", sizes = "100vw", priority = false, width = 1600, position }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`absolute inset-0 ${className}`} style={{ background: "var(--c-surface, #ebe8e2)" }} />
    );
  }
  return (
    <Image
      src={pexelsUrl(id, width)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
