"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminSignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    secretCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/login");
      } else {
        const data = await res.json();
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
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
          <h1 className="mt-3 font-serif text-3xl">Create Admin Account</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-black/50">Full Name</label>
            <input
              required
              type="text"
              className="w-full border-b border-black/10 bg-transparent py-2 outline-none focus:border-black/40"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-black/50">Work Email</label>
            <input
              required
              type="email"
              className="w-full border-b border-black/10 bg-transparent py-2 outline-none focus:border-black/40"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-black/50">Password</label>
            <input
              required
              type="password"
              className="w-full border-b border-black/10 bg-transparent py-2 outline-none focus:border-black/40"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-black/50">Secret Code</label>
            <input
              required
              type="password"
              className="w-full border-b border-black/10 bg-transparent py-2 outline-none focus:border-black/40"
              value={formData.secretCode}
              onChange={(e) => setFormData({ ...formData, secretCode: e.target.value })}
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-full bg-[#111111] py-3 text-sm text-[#f6f2ea] disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
