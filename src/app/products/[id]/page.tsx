import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AddToCartButton from "@/components/AddToCartButton";

const fallbackImages: Record<string, string> = {
  Basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  Running: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  Yoga: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
  Fitness: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  Apparel: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
  Accessories: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  Strength: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
  Cardio: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  const imgSrc =
    product.image_url ||
    fallbackImages[product.category] ||
    fallbackImages.Fitness;

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div className="bg-surface-2 border border-line aspect-square relative overflow-hidden rounded-xl">
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-muted uppercase tracking-wider">
            {product.category}
          </span>
          <h1 className="font-anton text-4xl md:text-5xl text-ink mt-2 leading-tight">
            {product.title}
          </h1>
          <p className="text-3xl font-bold text-accent-bright mt-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <div className="mt-2">
            {product.stock > 0 ? (
              <span className="text-muted text-sm">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-accent text-sm font-medium">Out of Stock</span>
            )}
          </div>
          <p className="text-muted mt-6 leading-relaxed">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
