"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f2ea] px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-black/60">Admin</p>
          <h1 className="mt-3 font-serif text-3xl">Atelier Access</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-black/50">Email</label>
            <input
              required
              type="email"
              className="w-full border-b border-black/10 bg-transparent py-2 outline-none focus:border-black/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-black/50">Password</label>
            <input
              required
              type="password"
              className="w-full border-b border-black/10 bg-transparent py-2 outline-none focus:border-black/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-full bg-[#111111] py-3 text-sm text-[#f6f2ea] disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-black/40">
          Restricted access for authorized personnel only.
        </p>
      </motion.div>
    </div>
  );
}
