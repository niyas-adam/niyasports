"use client";

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <CartDrawer />

      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="hover:text-orange-500 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
      </div>

      {state.items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto text-slate-300" size={64} />
          <p className="text-slate-500 text-lg mt-4">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition"
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
                className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-3xl">
                  📦
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-orange-500 font-bold mt-1">
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
                      className="p-1.5 border rounded-lg hover:bg-slate-50 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                      className="p-1.5 border rounded-lg hover:bg-slate-50 transition"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                      className="p-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 ml-auto transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mt-6 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
