"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import Link from "next/link";

export default function CartDrawer() {
  const { state, dispatch, totalPrice, totalItems } = useCart();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={() => dispatch({ type: "CLOSE_CART" })} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-bg border-l border-line flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-line">
          <h2 className="text-lg font-semibold text-ink">Cart ({totalItems})</h2>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="text-muted hover:text-ink transition"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {state.items.length === 0 ? (
            <div className="text-center text-muted mt-16">
              <ShoppingBag className="mx-auto mb-3" size={40} />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-line">
                <div className="w-20 h-20 bg-surface-2 border border-line flex items-center justify-center shrink-0">
                  <ShoppingBag className="text-muted" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-ink truncate">{item.title}</h3>
                  <p className="text-sm text-muted">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
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
                      className="p-1 border border-line text-muted hover:text-ink transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-medium text-sm text-ink w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                      className="p-1 border border-line text-muted hover:text-ink transition"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                      className="p-1 ml-2 text-muted hover:text-red-bright transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-ink shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-line p-5 space-y-4">
            <div className="flex justify-between text-lg font-bold text-ink">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="block w-full bg-red hover:bg-red-bright text-white text-center py-3 font-semibold uppercase tracking-wider text-sm transition"
            >
              View Cart & Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
