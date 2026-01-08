"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

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

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 48], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 48], [0, 0.12]);

  return (
    <motion.header
      className="sticky top-0 z-50"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        className="mx-auto max-w-6xl px-6"
        style={{
          backgroundColor: bgOpacity
            // @ts-expect-error framer-motion transforms to CSS at runtime
            ? "rgba(246, 242, 234, 0.72)"
            : "rgba(246, 242, 234, 0)",
          borderBottom: borderOpacity
            // @ts-expect-error framer-motion transforms to CSS at runtime
            ? "1px solid rgba(17, 17, 17, 0.12)"
            : "1px solid rgba(17, 17, 17, 0)",
        }}
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="tracking-[0.24em] text-xs uppercase text-[#111111]"
          >
            Atelier&nbsp;Hire
          </Link>

          <nav className="flex items-center gap-6 text-sm text-[#1a1a1a]">
            <Link className="opacity-80 hover:opacity-100" href="/">
              Home
            </Link>
            <a className="opacity-80 hover:opacity-100" href="#about">
              About
            </a>
            <Link className="opacity-80 hover:opacity-100" href="/jobs">
              Jobs
            </Link>
            <Link
              className="rounded-full border border-black/20 px-4 py-2 text-sm hover:border-black/40"
              href="/apply"
            >
              Apply
            </Link>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -24]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.03]);

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#111111]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="pt-10 sm:pt-14">
          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-[#efe8dc]">
            <motion.div
              className="relative h-[520px] w-full"
              style={{ y: heroY, scale: heroScale }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2400&q=80"
                alt="Designer hands sketching and working with fabric"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/70 via-[#0f0f0f]/25 to-transparent" />
            </motion.div>

            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-7 sm:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-2xl"
                >
                  <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/80">
                    Portfolio-first hiring for fashion
                  </p>
                  <h1 className="font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
                    Hire fashion designers who think in concepts, not just
                    resumes.
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
                    A calmer way to hire: editorial portfolios, real process,
                    and the creative decisions behind the work—so brands can
                    find taste, not templates.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#roles"
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm text-[#111111] hover:bg-white/90"
                    >
                      Explore open roles
                    </a>
                    <a
                      href="#about"
                      className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm text-white hover:border-white/55"
                    >
                      Our philosophy
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 sm:py-20">
          <Reveal>
            <div className="grid gap-10 sm:grid-cols-12 sm:items-start">
              <div className="sm:col-span-5">
                <p className="text-xs uppercase tracking-[0.24em] text-black/60">
                  About
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                  Built for fashion brands, not HR teams.
                </h2>
              </div>

              <div className="space-y-5 text-[15px] leading-relaxed text-black/75 sm:col-span-7">
                <p>
                  This platform is designed around how fashion actually hires:
                  by eye, by concept, by the quiet logic inside a collection.
                </p>
                <p>
                  We prioritize portfolios and process—how a designer arrives at
                  silhouette, material, and meaning—before credentials get a
                  chance to flatten the story.
                </p>
                <p>
                  The experience is intentionally minimal. Less admin. Less
                  noise. More room to see the work.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Roles */}
        <section id="roles" className="pb-16 sm:pb-20">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-black/60">
                  Open roles
                </p>
                <h3 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Current openings
                </h3>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <Link
                href="/jobs"
                className="hidden text-sm text-black/70 hover:text-black sm:inline"
              >
                View all roles
              </Link>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {JOBS.map((job, idx) => (
              <Reveal key={job.slug} delay={idx * 0.03}>
                <Link
                  href={`/jobs/${job.slug}`}
                  className={cx(
                    "group block rounded-2xl border border-black/10 bg-[#fbf8f3] p-6",
                    "transition-transform duration-300 hover:-translate-y-1 hover:border-black/20"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-serif text-xl leading-snug">
                      {job.title}
                    </h4>
                    <span className="rounded-full border border-black/10 bg-white/40 px-3 py-1 text-xs text-black/70">
                      {job.category}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-black/70">
                    {job.overview}
                  </p>

                  <div className="mt-6 grid gap-2 text-sm text-black/70">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-black/45">Design type</span>
                      <span className="text-right">{job.designType}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-black/45">Experience</span>
                      <span className="text-right">{job.experience}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-black/45">Environment</span>
                      <span className="text-right">{job.environment}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.24em] text-black/45">
                      Read role
                    </span>
                    <span className="text-sm text-black/60 transition-colors group-hover:text-black">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/jobs"
              className="inline-flex items-center rounded-full border border-black/15 px-5 py-2.5 text-sm text-black/75 hover:border-black/30"
            >
              View all roles
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/10 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="tracking-[0.24em] text-xs uppercase text-black/70">
                Atelier Hire
              </p>
              <p className="mt-2 text-sm text-black/55">
                Concept-first hiring for fashion teams.
              </p>
            </div>

            <div className="flex gap-6 text-sm text-black/65">
              <Link className="hover:text-black" href="/">
                Home
              </Link>
              <a className="hover:text-black" href="#about">
                About
              </a>
              <Link className="hover:text-black" href="/jobs">
                Jobs
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
