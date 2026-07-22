"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import LogoImage from "@/components/LogoImage";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifySent, setVerifySent] = useState(false);
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
      });
    }

    setVerifySent(true);
    setLoading(false);
  };

  if (verifySent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-4">
            <LogoImage width={64} height={64} />
          </div>
          <h1 className="font-anton text-4xl text-ink">Check Your Email</h1>
          <p className="text-muted mt-4 text-sm leading-relaxed">
            We sent a confirmation link to <strong className="text-ink">{email}</strong>.
            Click the link to activate your account, then sign in.
          </p>
          <Link
            href="/login"
            className="inline-block mt-8 bg-red hover:bg-red-bright text-white px-8 py-3 font-semibold uppercase tracking-wider text-sm transition"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <LogoImage width={64} height={64} />
          </div>
          <h1 className="font-anton text-4xl text-ink">Create Account</h1>
          <p className="text-muted mt-2 text-sm">Join United Sports today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-red-bright transition text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-red-bright transition text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              className="w-full px-4 py-3 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-red-bright transition text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="w-full px-4 py-3 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-red-bright transition text-sm"
            />
          </div>

          {error && (
            <div className="bg-red/10 text-red-bright p-3 text-sm border border-red/30">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red hover:bg-red-bright disabled:opacity-50 text-white py-3 font-semibold uppercase tracking-wider text-sm transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-ink hover:text-red-bright font-medium transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
