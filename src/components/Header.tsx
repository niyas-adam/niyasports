"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useCart } from "./CartProvider";
import LogoImage from "./LogoImage";
import { nav } from "@/lib/content";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, dispatch } = useCart();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", data.user.id)
          .single();
        setIsAdmin(profile?.is_admin ?? false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .single();
          setIsAdmin(profile?.is_admin ?? false);
        } else {
          setIsAdmin(false);
        }
      }
    );
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-0">
            <LogoImage width={40} height={40} className="object-contain" />
            <span className="text-2xl font-anton text-ink tracking-wide -ml-1">
              NITED SPORTS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-ink transition uppercase tracking-wider font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#location"
              className="bg-red hover:bg-red-bright text-white px-5 py-2 text-sm font-semibold uppercase tracking-wider transition"
            >
              Visit Store
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch({ type: "OPEN_CART" })}
              className="relative text-muted hover:text-ink transition"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red text-white text-xs w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {user && isAdmin && (
              <Link
                href="/admin"
                className="hidden md:block text-xs text-muted hover:text-ink transition uppercase tracking-wider"
              >
                Admin
              </Link>
            )}

            <button
              className="md:hidden text-muted hover:text-ink transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-line px-4 pb-5 pt-3 space-y-3">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-muted hover:text-ink transition uppercase tracking-wider"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#location"
            className="block text-center bg-red hover:bg-red-bright text-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition"
            onClick={() => setMobileOpen(false)}
          >
            Visit Store
          </Link>
          {user && isAdmin && (
            <Link
              href="/admin"
              className="block py-2 text-sm text-muted hover:text-ink transition uppercase tracking-wider"
              onClick={() => setMobileOpen(false)}
            >
              Admin Panel
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
