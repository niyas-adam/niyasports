"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image_url: product.image_url,
      },
    });
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square bg-slate-100 flex items-center justify-center p-8">
        <div className="text-6xl">
          {product.category === "Basketball" ? "🏀" :
           product.category === "Running" ? "👟" :
           product.category === "Yoga" ? "🧘" :
           product.category === "Apparel" ? "👕" :
           product.category === "Fitness" ? "🏋️" :
           product.category === "Accessories" ? "🎒" :
           product.category === "Strength" ? "💪" :
           product.category === "Cardio" ? "🏃" : "🏅"}
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-800 mt-1 group-hover:text-orange-500 transition">
          {product.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
