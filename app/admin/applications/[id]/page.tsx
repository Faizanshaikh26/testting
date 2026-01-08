"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Application = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  design_category: string;
  portfolio_link: string;
  resume_url: string;
  portfolio_images: string[];
  answer_collection: string;
  answer_project: string;
  answer_inspiration: string;
  score: number;
  label: string;
  status: string;
};

export default function ApplicationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [app, setApp] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchApp = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setApp(data as Application);
      }
      setIsLoading(false);
    };
    fetchApp();
  }, [id]);

  const updateApp = async (updates: Partial<Application>) => {
    setIsUpdating(true);
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (res.ok) {
      const updated = await res.json();
      setApp(updated);
    }
    setIsUpdating(false);
  };

  if (isLoading) return <div className="p-10 text-center text-xs uppercase tracking-widest opacity-40">Loading...</div>;
  if (!app) return <div className="p-10 text-center">Application not found.</div>;

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#111111]">
      <header className="border-b border-black/5 bg-white/40 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/admin/dashboard" className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100">
            ← Back to Dashboard
          </Link>
          <div className="flex gap-3">
            <button
              disabled={isUpdating}
              onClick={() => updateApp({ status: 'selected' })}
              className={`rounded-full px-6 py-2 text-xs uppercase tracking-widest transition-colors ${
                app.status === 'selected' ? 'bg-green-600 text-white' : 'bg-black/5 hover:bg-black/10'
              }`}
            >
              Select
            </button>
            <button
              disabled={isUpdating}
              onClick={() => updateApp({ status: 'rejected' })}
              className={`rounded-full px-6 py-2 text-xs uppercase tracking-widest transition-colors ${
                app.status === 'rejected' ? 'bg-red-600 text-white' : 'bg-black/5 hover:bg-black/10'
              }`}
            >
              Reject
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Info & Answers */}
          <div className="space-y-12 lg:col-span-7">
            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-black/40">Candidate</p>
              <h1 className="mt-2 font-serif text-4xl">{app.full_name}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-black/60">
                <span>{app.email}</span>
                <span>•</span>
                <span>{app.phone}</span>
                <span>•</span>
                <span className="text-black">{app.design_category}</span>
              </div>
            </section>

            <section className="space-y-8">
              <div>
                <h3 className="font-serif text-xl">Collection Concept</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/75 whitespace-pre-wrap">{app.answer_collection}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl">Process Story</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/75 whitespace-pre-wrap">{app.answer_project}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl">Inspiration</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/75 whitespace-pre-wrap">{app.answer_inspiration}</p>
              </div>
            </section>

            <section>
              <h3 className="mb-6 font-serif text-xl">Portfolio Work</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {app.portfolio_images.map((url, i) => (
                  <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-black/5">
                    <Image
                      src={url}
                      alt={`Portfolio ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    {/* UI Watermark */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
                      <p className="rotate-[-30deg] text-xs uppercase tracking-[0.5em] text-white mix-blend-difference">
                        Atelier Hire • Confidential
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Evaluation */}
          <aside className="space-y-8 lg:col-span-5">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-black/5 bg-white/60 p-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-black/40">Advisory Score</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-serif text-5xl">{app.score}</span>
                  <span className="text-sm uppercase tracking-widest text-black/40">/ 100</span>
                </div>
                <p className={`mt-2 text-xs uppercase tracking-widest ${
                  app.label === 'Strong' ? 'text-green-600' :
                  app.label === 'Good' ? 'text-blue-600' :
                  app.label === 'Average' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {app.label}
                </p>
              </div>

              <div className="space-y-4 border-t border-black/5 pt-6">
                <p className="text-xs uppercase tracking-widest text-black/40">Manual Override</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={app.score}
                  onChange={(e) => updateApp({ score: parseInt(e.target.value) })}
                  className="w-full accent-black"
                />
              </div>

              <div className="space-y-4 border-t border-black/5 pt-6">
                <p className="text-xs uppercase tracking-widest text-black/40">Documents</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={app.resume_url}
                    target="_blank"
                    className="flex items-center justify-between rounded-lg border border-black/5 bg-white p-3 text-sm hover:bg-black/5"
                  >
                    <span>Resume (PDF)</span>
                    <span className="text-black/30">↗</span>
                  </a>
                  {app.portfolio_link && (
                    <a
                      href={app.portfolio_link}
                      target="_blank"
                      className="flex items-center justify-between rounded-lg border border-black/5 bg-white p-3 text-sm hover:bg-black/5"
                    >
                      <span>External Portfolio</span>
                      <span className="text-black/30">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
