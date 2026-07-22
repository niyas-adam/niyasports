import { createClient } from "@/lib/supabase-server";
import ProductCard from "@/components/ProductCard";

const fallbackProducts = [
  {
    id: "placeholder-1",
    title: "Basketball",
    price: 49.99,
    description: "Official size and weight basketball for indoor and outdoor play.",
    image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
    category: "Basketball",
  },
  {
    id: "placeholder-2",
    title: "Running Shoes",
    price: 129.99,
    description: "Lightweight and responsive running shoes for everyday training.",
    image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    category: "Running",
  },
  {
    id: "placeholder-3",
    title: "Yoga Mat",
    price: 34.99,
    description: "Premium non-slip yoga mat with extra padding for comfort.",
    image_url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80",
    category: "Yoga",
  },
  {
    id: "placeholder-4",
    title: "Dumbbell Set",
    price: 89.99,
    description: "Adjustable dumbbell set for home and gym strength training.",
    image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    category: "Fitness",
  },
];

export default async function ProductGrid({ limit }: { limit?: number }) {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: products } = await query;
  const displayProducts =
    products && products.length > 0 ? products : fallbackProducts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayProducts.slice(0, limit || displayProducts.length).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
