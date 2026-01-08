import Link from "next/link";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(246,242,234,0.75)] backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="tracking-[0.24em] text-xs uppercase text-[#111111]"
          >
            Atelier&nbsp;Hire
          </Link>
          <Link className="text-sm text-black/70 hover:text-black" href="/jobs">
            Jobs
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.24em] text-black/60">
          Apply
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
          Application opens here next.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-black/70">
          The full, portfolio-first application flow is the next build step.
          For now, you can browse roles and read expectations in detail.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/jobs"
            className="rounded-full border border-black/15 px-6 py-3 text-sm text-black/75 hover:border-black/30"
          >
            Explore roles
          </Link>
          <Link
            href="/"
            className="rounded-full bg-[#111111] px-6 py-3 text-sm text-[#f6f2ea] hover:bg-black"
          >
            Back home
          </Link>
        </div>
      </main>
    </div>
  );
}
