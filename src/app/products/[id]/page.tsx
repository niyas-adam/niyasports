import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AddToCartButton from "@/components/AddToCartButton";

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-slate-100 rounded-2xl aspect-square flex items-center justify-center">
          <div className="text-8xl">
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

        <div>
          <span className="text-sm font-medium text-orange-500 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">{product.title}</h1>
          <p className="text-4xl font-bold text-orange-500 mt-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <div className="mt-2">
            {product.stock > 0 ? (
              <span className="text-green-600 text-sm font-medium">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 text-sm font-medium">Out of Stock</span>
            )}
          </div>
          <p className="text-slate-600 mt-6 leading-relaxed">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
