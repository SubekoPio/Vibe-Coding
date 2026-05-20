import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 font-mono text-sm text-[var(--color-accent)]">404</p>
      <h1 className="mb-4 text-3xl font-bold">Page not found</h1>
      <p className="mb-8 max-w-md text-[var(--color-muted)]">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </section>
  );
}
