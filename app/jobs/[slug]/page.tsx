"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";

type Job = {
  slug: string;
  title: string;
  category: "Women" | "Men" | "Unisex";
  designType: string;
  experience: string;
  environment: string;
  overview: string;
  expectations: string[];
  mindset: string[];
  tools: string[];
};

const JOBS: Job[] = [
  {
    slug: "conceptual-knitwear-designer",
    title: "Conceptual Knitwear Designer",
    category: "Women",
    designType: "Luxury Knitwear • Concept-led",
    experience: "3–6 years",
    environment: "Studio-first • Hybrid",
    overview:
      "You will design knitwear that begins with narrative—texture, silhouette, and restraint built from a clear conceptual point of view.",
    expectations: [
      "Develop seasonal knit stories and hero pieces",
      "Translate concept into stitch language and swatches",
      "Collaborate closely with pattern and development partners",
    ],
    mindset: [
      "You can articulate intention before execution",
      "You edit with discipline—nothing is accidental",
      "You treat material as meaning",
    ],
    tools: ["Adobe Illustrator", "Procreate", "Technical flats", "Yarn research"],
  },
  {
    slug: "menswear-assistant-designer",
    title: "Menswear Assistant Designer",
    category: "Men",
    designType: "Tailoring • Modern essentials",
    experience: "1–3 years",
    environment: "On-site • Atelier rhythm",
    overview:
      "Support the creative team across research, fittings, and development—while bringing your own eye for proportion and detail.",
    expectations: [
      "Build research boards and silhouette studies",
      "Assist during fittings and update flats",
      "Support development tracking with care and clarity",
    ],
    mindset: [
      "You notice what others miss",
      "You respect craft and timelines equally",
      "You’re curious, not rushed",
    ],
    tools: ["Adobe Illustrator", "Google Suite", "Fit notes", "Fabric sourcing"],
  },
  {
    slug: "unisex-accessories-designer",
    title: "Unisex Accessories Designer",
    category: "Unisex",
    designType: "Leather goods • Object-driven design",
    experience: "4–8 years",
    environment: "Hybrid • Travel for sampling",
    overview:
      "Design accessories as objects of desire—quiet statements with impeccable construction and concept-led hardware choices.",
    expectations: [
      "Own concept and development from sketch to sample",
      "Partner with vendors on materials and construction",
      "Create cohesive capsule stories across categories",
    ],
    mindset: [
      "You design with tactile intelligence",
      "You think in systems, not single pieces",
      "You balance boldness with restraint",
    ],
    tools: ["Adobe Illustrator", "3D references", "Spec packs", "Material libraries"],
  },
];

export default function JobDetailsPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const job = JOBS.find((j) => j.slug === slug);
  if (!job) notFound();

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
          <div className="flex items-center gap-4">
            <Link className="text-sm text-black/70 hover:text-black" href="/jobs">
              Jobs
            </Link>
            <Link
              href="/apply"
              className="rounded-full border border-black/20 px-4 py-2 text-sm hover:border-black/40"
            >
              Apply
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.24em] text-black/60">
              Role
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl">
              {job.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2 text-sm text-black/70">
              <span className="rounded-full border border-black/10 bg-[#fbf8f3] px-3 py-1">
                {job.category}
              </span>
              <span className="rounded-full border border-black/10 bg-[#fbf8f3] px-3 py-1">
                {job.designType}
              </span>
              <span className="rounded-full border border-black/10 bg-[#fbf8f3] px-3 py-1">
                {job.experience}
              </span>
              <span className="rounded-full border border-black/10 bg-[#fbf8f3] px-3 py-1">
                {job.environment}
              </span>
            </div>

            <div className="mt-8 space-y-10 text-[15px] leading-relaxed text-black/75">
              <section>
                <h2 className="font-serif text-2xl">Role overview</h2>
                <p className="mt-3">{job.overview}</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl">Expectations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  {job.expectations.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl">
                  Required design mindset
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  {job.mindset.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl">Preferred tools</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  {job.tools.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-black/10 bg-[#fbf8f3] p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-black/60">
                Apply
              </p>
              <h3 className="mt-3 font-serif text-2xl">
                Show the work behind the work.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/70">
                We’ll ask for your portfolio, a resume, and a few creative
                questions—kept simple, kept human.
              </p>
              <Link
                href="/apply"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm text-[#f6f2ea] hover:bg-black"
              >
                Start application
              </Link>
              <p className="mt-4 text-xs text-black/50">
                No account required.
              </p>
            </div>
          </aside>
        </motion.div>

        <footer className="mt-14 border-t border-black/10 py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-black/55">
              Atelier Hire — concept-first hiring for fashion.
            </p>
            <div className="flex gap-6 text-sm text-black/65">
              <Link className="hover:text-black" href="/">
                Home
              </Link>
              <Link className="hover:text-black" href="/jobs">
                Jobs
              </Link>
              <Link className="hover:text-black" href="/apply">
                Apply
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
