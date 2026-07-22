"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { User } from "lucide-react";
import LogoImage from "./LogoImage";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const isHome = pathname === "/";
  if (isHome) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-bg/90 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LogoImage width={32} height={32} />
          <span className="font-anton text-lg text-ink tracking-wide">UNITED SPORTS</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm text-muted hover:text-ink transition font-medium"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted hover:text-ink transition font-medium"
          >
            About
          </Link>
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-accent hover:bg-accent-bright text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-lg transition"
            >
              <User size={16} />
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-accent hover:bg-accent-bright text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-lg transition"
            >
              <User size={16} />
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
