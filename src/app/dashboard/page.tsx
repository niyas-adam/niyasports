import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { User, Package, Calendar, DollarSign, LogOut } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 bg-bg min-h-screen">
      <h1 className="font-anton text-4xl text-ink mb-10">My Account</h1>

      <div className="bg-surface border border-line p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-red/20 flex items-center justify-center">
            <User className="text-red-bright" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink">
              {profile?.full_name || user.email}
            </h2>
            <p className="text-sm text-muted">{user.email}</p>
            {profile?.is_admin && (
              <Link
                href="/admin"
                className="text-xs text-red-bright hover:text-red mt-1 inline-block uppercase tracking-wider font-medium"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>

      <h2 className="font-anton text-3xl text-ink mb-6">Order History</h2>

      {!orders || orders.length === 0 ? (
        <div className="bg-surface border border-line p-16 text-center">
          <Package className="mx-auto text-muted" size={48} />
          <p className="text-muted mt-4">No orders yet</p>
          <Link
            href="/"
            className="inline-block mt-6 bg-red hover:bg-red-bright text-white px-8 py-3 font-semibold uppercase tracking-wider text-sm transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface border border-line p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar size={16} className="text-muted" />
                  <span className="text-sm text-muted">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                    order.status === "completed"
                      ? "bg-green-900/30 text-green-400"
                      : order.status === "pending"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-surface-2 text-muted"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-red-bright" />
                  <span className="font-bold text-lg text-ink">
                    ${Number(order.total_amount).toFixed(2)}
                  </span>
                </div>
                <span className="text-xs text-muted font-mono">
                  #{order.id.slice(0, 8)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
