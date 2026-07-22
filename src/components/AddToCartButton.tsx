"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

type Product = {
  id: string;
  title: string;
  price: number;
  image_url: string | null;
};

export default function AddToCartButton({
  product,
  compact,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { dispatch } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image_url: product.image_url,
      },
    });
  };

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        className="p-2 bg-accent hover:bg-accent-bright text-white transition"
        title="Add to cart"
      >
        <ShoppingCart size={16} />
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-6 w-full bg-accent hover:bg-accent-bright text-white py-3 px-6 font-semibold uppercase tracking-wider text-sm transition inline-flex items-center justify-center gap-2 rounded-lg"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </button>
  );
}
