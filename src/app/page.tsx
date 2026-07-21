import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";

const categories = [
  { name: "Basketball", icon: "🏀", color: "bg-orange-50 text-orange-600" },
  { name: "Running", icon: "👟", color: "bg-blue-50 text-blue-600" },
  { name: "Yoga", icon: "🧘", color: "bg-green-50 text-green-600" },
  { name: "Fitness", icon: "🏋️", color: "bg-purple-50 text-purple-600" },
  { name: "Apparel", icon: "👕", color: "bg-pink-50 text-pink-600" },
  { name: "Accessories", icon: "🎒", color: "bg-yellow-50 text-yellow-600" },
];

export default function Home() {
  return (
    <>
      <CartDrawer />
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Elevate Your{" "}
              <span className="text-orange-500">Game</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300">
              Premium sports gear and apparel for athletes who demand the best.
              Train harder. Perform better.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#products"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Shop Now
              </a>
              <a
                href="#categories"
                className="border border-white/30 hover:border-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section id="categories" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Shop by Category
          </h2>
          <p className="mt-2 text-slate-500 text-center">
            Find exactly what you need
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href="#products"
                className={`${cat.color} rounded-xl p-6 text-center hover:shadow-md transition cursor-pointer`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <p className="mt-2 font-medium text-sm">{cat.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Popular Products
          </h2>
          <p className="mt-2 text-slate-500 text-center">
            Top picks from our collection
          </p>
          <ProductGrid />
        </div>
      </section>

      <section className="bg-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Join the NiyaSports Community
          </h2>
          <p className="mt-2 text-orange-100">
            Sign up for exclusive deals and early access to new products.
          </p>
          <a
            href="/register"
            className="inline-block mt-6 bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
          >
            Create Account
          </a>
        </div>
      </section>
    </>
  );
}
