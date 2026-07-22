"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoImage from "@/components/LogoImage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <LogoImage width={64} height={64} />
          </div>
          <h1 className="font-anton text-4xl text-ink">Welcome Back</h1>
          <p className="text-muted mt-2 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright rounded-lg transition text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright rounded-lg transition text-sm"
            />
          </div>

          {error && (
            <div className="bg-accent/10 text-accent-bright p-3 text-sm border border-accent/30 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-bright disabled:opacity-50 text-white py-3 font-semibold uppercase tracking-wider text-sm rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-ink hover:text-accent-bright font-medium transition"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
