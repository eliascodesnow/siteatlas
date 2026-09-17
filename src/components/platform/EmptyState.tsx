import Link from "next/link";

export function EmptyState({ title, body, action }: { title: string; body: string; action?: { href: string; label: string } }) {
  return (
    <div className="border border-dashed border-line-2 px-6 py-16 text-center sm:py-24">
      <p className="font-serif text-3xl sm:text-4xl">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-mute">{body}</p>
      {action && (
        <Link href={action.href} className="btn-outline mt-8">
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function PageIntro({ eyebrow, title, body, children }: { eyebrow?: string; title: string; body?: string; children?: React.ReactNode }) {
  return (
    <div className="container-wide pb-10 pt-12 sm:pt-16 lg:pb-14 lg:pt-24">
      {eyebrow && <p className="eyebrow text-mute">{eyebrow}</p>}
      <h1 className="display-2 mt-4 max-w-4xl">{title}</h1>
      {body && <p className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">{body}</p>}
      {children}
    </div>
  );
}
