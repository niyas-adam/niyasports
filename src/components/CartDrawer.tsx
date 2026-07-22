"use client";

import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import Link from "next/link";

export default function CartDrawer() {
  const { state, dispatch, totalPrice, isOpen, toggleCart } = useCart();

  return (
    <>
      <button
        onClick={toggleCart}
        className="fixed top-4 right-4 z-40 bg-accent hover:bg-accent-bright text-white p-3 transition"
      >
        <ShoppingCart size={20} />
        {state.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-accent text-xs font-bold w-5 h-5 flex items-center justify-center">
            {state.items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={toggleCart}
          />
          <div className="absolute top-0 right-0 h-full w-full max-w-md bg-bg border-l border-line flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-line">
              <h2 className="font-semibold text-ink">Cart ({state.items.length})</h2>
              <button onClick={toggleCart} className="text-muted hover:text-ink transition">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {state.items.length === 0 ? (
                <p className="text-muted text-sm text-center py-8">Your cart is empty</p>
              ) : (
                state.items.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-surface border border-line p-3">
                    <div className="w-16 h-16 bg-surface-2 border border-line flex items-center justify-center shrink-0">
                      <ShoppingCart size={24} className="text-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-ink truncate">{item.title}</h3>
                      <p className="text-accent-bright text-sm font-bold mt-0.5">
                        ${item.price.toFixed(2)}
                      </p>
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
                          className="p-0.5 border border-line text-muted hover:text-ink transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs text-ink w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: { id: item.id, quantity: item.quantity + 1 },
                            })
                          }
                          className="p-0.5 border border-line text-muted hover:text-ink transition"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                          className="p-0.5 border border-accent/30 text-accent-bright hover:bg-accent/10 ml-auto transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {state.items.length > 0 && (
              <div className="border-t border-line p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Total</span>
                  <span className="font-bold text-ink text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={toggleCart}
                  className="block w-full bg-accent hover:bg-accent-bright text-white py-3 text-center font-semibold uppercase tracking-wider text-sm transition"
                >
                  View Cart & Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
