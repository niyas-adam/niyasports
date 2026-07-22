import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image_url: string | null;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-surface border border-line overflow-hidden flex flex-col transition rounded-xl"
    >
      <div className="aspect-square bg-surface-2 relative overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted text-sm">No image</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-muted uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-semibold text-ink mt-1 group-hover:text-accent-bright transition line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-muted mt-1 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-accent-bright">
            ${Number(product.price).toFixed(2)}
          </span>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </Link>
  );
}
