"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Image,
  ChevronLeft,
  LogOut,
  ShieldAlert,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Logo", href: "/admin/logo", icon: Image },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    fetch("/api/admin/me")
      .then(async (res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        setIsAdmin(true);
        setLoading(false);
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router, isLoginPage]);

  const handleSignOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-bright" />
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-bg flex">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-surface border-r border-line transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-line">
          {sidebarOpen && (
            <Link
              href="/admin"
              className="font-anton text-lg text-ink tracking-wide flex items-center gap-2"
            >
              <ShieldAlert size={18} className="text-accent-bright" />
              Admin
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-muted hover:text-ink transition"
          >
            <ChevronLeft
              size={20}
              className={`transition ${!sidebarOpen && "rotate-180"}`}
            />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 transition ${
                  active
                    ? "bg-accent text-white"
                    : "text-muted hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-line">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 text-muted hover:bg-surface-2 hover:text-ink transition w-full text-sm"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
