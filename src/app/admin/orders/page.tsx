"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { ShoppingCart, Search, ChevronDown } from "lucide-react";

type OrderItem = {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  products: { title: string } | null;
};

type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  created_at: string;
  profiles: { full_name: string } | null;
  order_items: OrderItem[];
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-900/30 text-yellow-400",
  processing: "bg-blue-900/30 text-blue-400",
  completed: "bg-green-900/30 text-green-400",
  cancelled: "bg-red/10 text-red-bright",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const supabase = createClient();

  const fetchOrders = useCallback(async () => {
    let query = supabase
      .from("orders")
      .select("*, profiles(full_name), order_items(*, products(title))")
      .order("created_at", { ascending: false });

    if (search) {
      query = query.or(
        `id.ilike.%${search}%,profiles.full_name.ilike.%${search}%`
      );
    }

    const { data } = await query;
    if (data) setOrders(data);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    setUpdating(null);
    fetchOrders();
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="text-red-bright" size={28} />
        <h1 className="font-anton text-3xl text-ink">Orders</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input
          type="text"
          placeholder="Search by order ID or customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-red-bright transition text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-bright mx-auto" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-surface border border-line">
          <ShoppingCart className="mx-auto text-muted" size={48} />
          <p className="text-muted mt-3">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface border border-line overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpanded(expanded === order.id ? null : order.id)
                }
                className="w-full flex items-center justify-between p-4 hover:bg-surface-2 transition text-left"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-medium text-sm text-ink">
                      {order.profiles?.full_name || "Unknown"}
                    </p>
                    <p className="text-xs text-muted">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-muted">
                    #{order.id.slice(0, 8)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-ink">
                    ${Number(order.total_amount).toFixed(2)}
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium ${
                      statusColors[order.status] || "bg-surface-2 text-muted"
                    }`}
                  >
                    {order.status}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition ${
                      expanded === order.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {expanded === order.id && (
                <div className="border-t border-line px-4 py-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
                      Order Items
                    </h4>
                    <div className="space-y-2">
                      {order.order_items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-ink">
                            {item.products?.title || "Unknown Product"}
                            <span className="text-muted ml-2">
                              x{item.quantity}
                            </span>
                          </span>
                          <span className="font-medium text-ink">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
                      Update Status
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["pending", "processing", "completed", "cancelled"].map(
                        (status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(order.id, status)}
                            disabled={updating === order.id || order.status === status}
                            className={`px-3 py-1.5 text-xs font-medium border transition uppercase tracking-wider ${
                              order.status === status
                                ? "bg-surface-2 border-line text-muted cursor-not-allowed"
                                : "border-line text-muted hover:border-red-bright hover:text-red-bright"
                            }`}
                          >
                            {status}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm border-t border-line pt-3">
                    <span className="text-muted">
                      Customer: {order.profiles?.full_name || "N/A"}
                    </span>
                    <span className="font-bold text-lg text-ink">
                      Total: ${Number(order.total_amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}