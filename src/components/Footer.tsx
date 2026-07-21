import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">NIYASPORTS</h3>
            <p className="text-sm">Your destination for premium sports gear, apparel, and equipment.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#categories" className="hover:text-orange-400 transition">Categories</Link></li>
              <li><Link href="/#products" className="hover:text-orange-400 transition">Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-orange-400 transition cursor-pointer">Contact Us</span></li>
              <li><span className="hover:text-orange-400 transition cursor-pointer">Shipping Info</span></li>
              <li><span className="hover:text-orange-400 transition cursor-pointer">Returns</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-orange-400 transition">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-orange-400 transition">Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} NiyaSports. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
