import { createClient } from "@/lib/supabase-server";
import ProductCard from "./ProductCard";

export default async function ProductGrid() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-slate-400 mt-10">No products available yet.</p>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
