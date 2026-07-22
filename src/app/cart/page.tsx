"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function CartPage() {
  const { state, dispatch, totalPrice } = useCart();

  const handleCheckout = async () => {
    const { createClient } = await import("@/lib/supabase");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: totalPrice,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      alert("Failed to create order. Please try again.");
      return;
    }

    const orderItems = state.items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      alert("Failed to save order items.");
      return;
    }

    dispatch({ type: "CLEAR_CART" });
    alert("Order placed successfully!");
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 bg-bg min-h-screen">
      <CartDrawer />

      <div className="flex items-center gap-4 mb-10">
        <Link href="/" className="text-muted hover:text-ink transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-anton text-4xl text-ink">Shopping Cart</h1>
      </div>

      {state.items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto text-muted" size={64} />
          <p className="text-muted mt-4">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block mt-6 bg-accent hover:bg-accent-bright text-white px-8 py-3 font-semibold uppercase tracking-wider text-sm rounded-lg transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="bg-surface border border-line p-4 flex gap-4 rounded-xl"
              >
                <div className="w-24 h-24 bg-surface-2 border border-line rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingBag className="text-muted" size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="text-accent-bright font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          dispatch({ type: "REMOVE_ITEM", payload: item.id });
                        } else {
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          });
                        }
                      }}
                      className="p-1.5 border border-line text-muted hover:text-ink transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-ink w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                      className="p-1.5 border border-line text-muted hover:text-ink transition"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                      className="p-1.5 border border-accent/30 text-accent-bright hover:bg-accent/10 ml-auto transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-lg text-ink">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface border border-line p-6 h-fit rounded-xl">
            <h2 className="text-lg font-semibold text-ink mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="text-accent-bright">Free</span>
              </div>
            </div>
            <div className="border-t border-line mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg text-ink">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-accent hover:bg-accent-bright text-white py-3 font-semibold uppercase tracking-wider text-sm mt-6 rounded-lg transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
