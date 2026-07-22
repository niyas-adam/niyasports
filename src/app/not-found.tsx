import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="font-anton text-8xl text-accent-bright">404</h1>
      <p className="text-muted mt-4 text-lg max-w-md">
        Page not found. The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 bg-accent hover:bg-accent-bright text-white px-8 py-3 font-semibold uppercase tracking-wider text-sm rounded-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
