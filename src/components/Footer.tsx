import Link from "next/link";
import LogoImage from "./LogoImage";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <LogoImage width={36} height={36} />
              <span className="font-anton text-xl text-ink tracking-wide">UNITED SPORTS</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Premium sports equipment and apparel for athletes of every level.
              Quality gear, fast delivery, exceptional support.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/products" className="hover:text-ink transition">All Products</Link></li>
              <li><Link href="/products?category=Basketball" className="hover:text-ink transition">Basketball</Link></li>
              <li><Link href="/products?category=Running" className="hover:text-ink transition">Running</Link></li>
              <li><Link href="/products?category=Fitness" className="hover:text-ink transition">Fitness</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/about" className="hover:text-ink transition">About Us</Link></li>
              <li><span className="hover:text-ink transition cursor-default">Contact</span></li>
              <li><span className="hover:text-ink transition cursor-default">FAQ</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line mt-10 pt-8 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} United Sports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
