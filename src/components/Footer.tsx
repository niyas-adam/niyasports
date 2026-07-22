import Link from "next/link";
import LogoImage from "./LogoImage";
import { site, footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-line mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-0">
              <LogoImage width={28} height={28} className="object-contain" />
              <span className="text-lg font-anton text-ink tracking-wide -ml-0.5">
                NITED SPORTS
              </span>
            </Link>
            <p className="text-sm text-muted max-w-xs text-center md:text-left">
              {site.tagline}
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted">{footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
