"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import Link from "next/link";

export default function CartDrawer() {
  const { state, dispatch, totalPrice, totalItems } = useCart();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => dispatch({ type: "CLOSE_CART" })} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Cart ({totalItems})</h2>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="hover:text-orange-500 transition"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {state.items.length === 0 ? (
            <div className="text-center text-slate-400 mt-12">
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
                  📦
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
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
                      className="p-1 hover:text-orange-500 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                      className="p-1 hover:text-orange-500 transition"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                      className="p-1 ml-2 hover:text-red-500 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg font-medium transition"
            >
              View Cart & Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
