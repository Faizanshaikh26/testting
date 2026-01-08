"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

type Application = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  design_category: string;
  score: number;
  label: string;
  status: string;
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
      } else {
        setUser(user);
        fetchApplications();
      }
    };
    checkUser();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("id, created_at, full_name, email, design_category, score, label, status")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data as Application[]);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f2ea]">
        <p className="text-sm uppercase tracking-widest opacity-40">Loading Atelier...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#111111]">
      <header className="border-b border-black/5 bg-white/40 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="tracking-[0.24em] text-xs uppercase">Atelier Admin</span>
            <span className="h-4 w-px bg-black/10" />
            <span className="text-xs text-black/50">Welcome, {user?.user_metadata?.full_name}</span>
          </div>
          <button onClick={handleLogout} className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100">
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-3xl">Applications</h1>
          <p className="mt-2 text-sm text-black/50">Reviewing the next generation of design talent.</p>
        </div>

        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/10 py-20 text-center">
              <p className="text-sm text-black/40">No applications received yet.</p>
            </div>
          ) : (
            applications.map((app) => (
              <Link
                key={app.id}
                href={`/admin/applications/${app.id}`}
                className="group flex items-center justify-between rounded-2xl border border-black/5 bg-white/60 p-6 transition-all hover:border-black/10 hover:bg-white"
              >
                <div className="flex items-center gap-8">
                  <div>
                    <p className="font-serif text-lg">{app.full_name}</p>
                    <p className="text-xs text-black/40">{app.email}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs uppercase tracking-widest text-black/40">Category</p>
                    <p className="mt-1 text-sm">{app.design_category}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs uppercase tracking-widest text-black/40">Score</p>
                    <p className="mt-1 text-sm">{app.score || "—"}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs uppercase tracking-widest text-black/40">Label</p>
                    <p className="mt-1 text-sm">{app.label || "Pending"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${
                    app.status === 'selected' ? 'bg-green-100 text-green-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-black/5 text-black/60'
                  }`}>
                    {app.status}
                  </span>
                  <span className="text-black/20 transition-colors group-hover:text-black">→</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
