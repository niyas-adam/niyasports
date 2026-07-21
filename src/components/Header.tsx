"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useCart } from "./CartProvider";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, dispatch } = useCart();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-secondary text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            NIYASPORTS
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-orange-400 transition">Home</Link>
            <Link href="/#categories" className="hover:text-orange-400 transition">Categories</Link>
            <Link href="/#products" className="hover:text-orange-400 transition">Products</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch({ type: "OPEN_CART" })}
              className="relative hover:text-orange-400 transition"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/dashboard" className="hover:text-orange-400 transition flex items-center gap-1">
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <button onClick={handleSignOut} className="hover:text-orange-400 transition">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Sign In
              </Link>
            )}

            <button
              className="md:hidden hover:text-orange-400 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-800 px-4 pb-4 space-y-3">
          <Link href="/" className="block py-2 hover:text-orange-400" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/#categories" className="block py-2 hover:text-orange-400" onClick={() => setMobileOpen(false)}>Categories</Link>
          <Link href="/#products" className="block py-2 hover:text-orange-400" onClick={() => setMobileOpen(false)}>Products</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="block py-2 hover:text-orange-400" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={handleSignOut} className="block py-2 text-orange-400">Sign Out</button>
            </>
          ) : (
            <Link href="/login" className="block py-2 text-orange-400" onClick={() => setMobileOpen(false)}>Sign In</Link>
          )}
        </div>
      )}
    </header>
  );
}
