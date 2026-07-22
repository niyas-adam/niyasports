"use client";

import Image from "next/image";
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

const fallbackImages: Record<string, string> = {
  Basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80",
  Running: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
  Yoga: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80",
  Fitness: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  Apparel: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
  Accessories: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
  Strength: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80",
  Cardio: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
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

  const imgSrc =
    product.image_url || fallbackImages[product.category] || fallbackImages.Fitness;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-surface border border-line overflow-hidden hover:bg-surface-2 transition-colors"
    >
      <div className="aspect-square bg-surface-2 relative overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-muted uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-semibold text-ink mt-1 group-hover:text-red-bright transition">
          {product.title}
        </h3>
        <p className="text-sm text-muted mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
          <span className="text-lg font-bold text-ink">
            ${Number(product.price).toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-red hover:bg-red-bright text-white p-2 transition"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
