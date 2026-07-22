import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/components/LogoImage";
import ProductGrid from "@/components/ProductGrid";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  HeadphonesIcon,
} from "lucide-react";

const categories = [
  { name: "Basketball", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80", desc: "Hoops & gear" },
  { name: "Running", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80", desc: "Speed & endurance" },
  { name: "Yoga & Wellness", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80", desc: "Mind & body" },
  { name: "Fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", desc: "Train hard" },
  { name: "Apparel", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", desc: "Look the part" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", desc: "Essential extras" },
];

const stats = [
  { value: "500+", label: "Products" },
  { value: "10k+", label: "Customers" },
  { value: "99%", label: "Satisfaction" },
  { value: "Free", label: "Shipping" },
];

const features = [
  { icon: ShoppingBag, title: "Curated Collection", desc: "Hand-picked gear for every sport" },
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders over $50" },
  { icon: ShieldCheck, title: "Premium Quality", desc: "Only the best brands & materials" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "We're always here to help" },
];

export default function HomePage() {
  return (
    <div className="bg-bg">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-bg to-bg" />
        <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-20 md:pt-36 md:pb-28 text-center">
          <div className="flex justify-center mb-6">
            <LogoImage width={72} height={72} />
          </div>
          <h1 className="font-anton text-5xl md:text-7xl text-ink tracking-tight leading-none">
            UNITED SPORTS
          </h1>
          <p className="text-muted text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Premium gear for the modern athlete. From the court to the gym, we equip your journey.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-bright text-white px-8 py-3.5 font-semibold uppercase tracking-wider text-sm rounded-lg transition"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-line text-ink hover:bg-surface px-8 py-3.5 font-semibold uppercase tracking-wider text-sm rounded-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="font-anton text-3xl text-ink mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-2 border border-line"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-anton text-base text-white">{cat.name}</h3>
                <p className="text-xs text-muted mt-0.5 hidden sm:block">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-anton text-3xl text-ink">Featured Products</h2>
            <p className="text-muted text-sm mt-1">Our top picks for you</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-ink hover:text-accent-bright font-medium transition"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid limit={4} />
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface border border-line p-6 text-center rounded-xl">
              <p className="font-anton text-3xl text-accent-bright">{stat.value}</p>
              <p className="text-muted text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 bg-surface border border-line flex items-center justify-center mx-auto mb-4 rounded-xl">
                  <Icon className="text-accent-bright" size={22} />
                </div>
                <h3 className="font-semibold text-ink text-sm">{feature.title}</h3>
                <p className="text-muted text-xs mt-1">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
