import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { User, Package, Calendar, DollarSign } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Dashboard</h1>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="text-orange-500" size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {profile?.full_name || user.email}
            </h2>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">Order History</h2>

      {!orders || orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Package className="mx-auto text-slate-300" size={48} />
          <p className="text-slate-500 mt-4">No orders yet</p>
          <a
            href="/"
            className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-green-500" />
                  <span className="font-semibold text-lg">
                    ${Number(order.total_amount).toFixed(2)}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
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
