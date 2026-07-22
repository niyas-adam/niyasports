import { createClient } from "@/lib/supabase-server";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { data: revenueData } = await supabase
    .from("orders")
    .select("total_amount")
    .eq("status", "completed");

  const totalRevenue =
    revenueData?.reduce((sum, o) => sum + Number(o.total_amount), 0) ?? 0;

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: lowStock } = await supabase
    .from("products")
    .select("*")
    .lt("stock", 10)
    .order("stock", { ascending: true })
    .limit(5);

  const stats = [
    {
      label: "Total Products",
      value: totalProducts ?? 0,
      icon: Package,
      color: "bg-blue-900/30 text-blue-400",
    },
    {
      label: "Total Orders",
      value: totalOrders ?? 0,
      icon: ShoppingCart,
      color: "bg-purple-900/30 text-purple-400",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-green-900/30 text-green-400",
    },
    {
      label: "Total Users",
      value: totalUsers ?? 0,
      icon: Users,
      color: "bg-accent/20 text-accent-bright",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="text-accent-bright" size={28} />
        <h1 className="font-anton text-3xl text-ink">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-surface border border-line p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p className="text-2xl font-bold text-ink mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-line p-5">
          <h2 className="font-semibold text-ink mb-4">Recent Orders</h2>
          {!recentOrders || recentOrders.length === 0 ? (
            <p className="text-sm text-muted">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b border-line last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {order.profiles?.full_name || "Unknown"}
                    </p>
                    <p className="text-xs text-muted">
                      ${Number(order.total_amount).toFixed(2)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-green-900/30 text-green-400"
                        : order.status === "pending"
                        ? "bg-yellow-900/30 text-yellow-400"
                        : order.status === "cancelled"
                        ? "bg-accent/10 text-accent-bright"
                        : "bg-surface-2 text-muted"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-surface border border-line p-5">
          <h2 className="font-semibold text-ink mb-4">Low Stock Alerts</h2>
          {!lowStock || lowStock.length === 0 ? (
            <p className="text-sm text-muted">All products are well stocked</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between py-2 border-b border-line last:border-0"
                >
                  <p className="text-sm font-medium text-ink">{product.title}</p>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium ${
                      product.stock === 0
                        ? "bg-accent/10 text-accent-bright"
                        : "bg-yellow-900/30 text-yellow-400"
                    }`}
                  >
                    {product.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
