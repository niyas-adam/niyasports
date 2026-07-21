"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

type Product = {
  id: string;
  title: string;
  price: number;
  image_url: string;
  stock: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: Number(product.price),
        quantity: 1,
        image_url: product.image_url,
      },
    });
    dispatch({ type: "OPEN_CART" });
  };

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock <= 0}
      className="mt-8 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-3"
    >
      <ShoppingCart size={22} />
      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
