export default function Loading() {
  return (
    <div className="container-wide pt-16 lg:pt-24" aria-busy="true" aria-label="Loading concepts">
      <div className="h-3 w-24 bg-paper-2" />
      <div className="mt-6 h-14 w-3/4 max-w-2xl bg-paper-2" />
      <div className="mt-16 h-20 border-y border-line" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
        <div className="aspect-[4/3] bg-paper-2 lg:col-span-7" />
        <div className="aspect-[3/4] bg-paper-2 lg:col-span-5" />
        <div className="aspect-[4/3] bg-paper-2 lg:col-span-4" />
        <div className="aspect-[4/3] bg-paper-2 lg:col-span-4" />
        <div className="aspect-[4/3] bg-paper-2 lg:col-span-4" />
      </div>
    </div>
  );
}
