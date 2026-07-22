import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import LogoImage from "@/components/LogoImage";
import {
  hero,
  categories,
  about,
  location,
} from "@/lib/content";

const categoryImages: Record<string, string> = {
  "Jerseys & Apparel": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
  Footwear: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  "Training Equipment": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  Accessories: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
};

export default function Home() {
  return (
    <>
      <CartDrawer />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-bg border-b border-line">
        <div className="text-center px-4 py-24">
          <div className="mb-8 flex justify-center">
            <LogoImage width={150} height={150} priority />
          </div>
          <h1 className="font-anton text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.85] text-ink mb-6">
            {hero.headline}
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto mb-10 font-medium">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="bg-red hover:bg-red-bright text-white px-10 py-4 text-base font-semibold uppercase tracking-widest transition"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="border border-line text-ink hover:bg-surface px-10 py-4 text-base font-semibold uppercase tracking-widest transition"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section id="products" className="py-24 md:py-32 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-ink mb-16">
            SHOP BY<br />CATEGORY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative aspect-[4/3] md:aspect-[16/10] bg-surface-2 overflow-hidden border border-line"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent z-10" />
                <div
                  className="absolute inset-0 bg-cover bg-center z-0 transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${categoryImages[cat.title]})` }}
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
                  <h3 className="font-anton text-3xl md:text-4xl text-ink mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted">{cat.subtitle}</p>
                </div>
                <div className="absolute inset-0 bg-red/0 group-hover:bg-red/10 transition duration-500 z-10" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="py-24 md:py-32 bg-surface border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-ink mb-2">
            POPULAR<br />PRODUCTS
          </h2>
          <p className="text-muted text-base mb-12 max-w-lg">
            Top picks from our collection — curated for peak performance.
          </p>
          <ProductGrid />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="border border-line p-8 md:p-12 inline-block mb-6">
                <LogoImage width={80} height={80} />
              </div>
              <h2 className="section-heading text-ink mb-6">
                {about.headline}
              </h2>
              <p className="text-base text-muted leading-relaxed max-w-xl">
                {about.body}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {about.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-anton text-4xl md:text-5xl text-red-bright">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-24 md:py-32 bg-surface border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-ink mb-16">
            {location.headline}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-base text-muted leading-relaxed mb-8">
                {location.address}
              </p>
              <table className="w-full mb-8">
                <tbody>
                  {location.hours.map((row) => (
                    <tr key={row.day} className="border-b border-line">
                      <td className="py-3 pr-4 text-sm text-ink font-medium">
                        {row.day}
                      </td>
                      <td className="py-3 text-sm text-muted text-right">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-muted mb-6">
                Phone: {location.phone}
              </p>
              <a
                href={location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red hover:bg-red-bright text-white px-8 py-3 text-sm font-semibold uppercase tracking-widest transition"
              >
                Get Directions
              </a>
            </div>
            <div className="w-full aspect-[4/3] border border-line overflow-hidden bg-surface-2">
              <iframe
                src={location.googleMapsUrl}
                width="100%"
                height="100%"
                style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="United Sports Location"
                className="border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
