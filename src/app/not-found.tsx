import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="text-center">
        <h1 className="font-anton text-6xl text-ink">404</h1>
        <p className="text-muted mt-4">Page not found</p>
        <Link
          href="/"
          className="inline-block mt-6 bg-accent hover:bg-accent-bright text-white px-8 py-3 font-semibold uppercase tracking-wider text-sm rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
