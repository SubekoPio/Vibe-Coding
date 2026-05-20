import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog";
import { AnimateIn } from "@/components/AnimateIn";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <AnimateIn>
        <h1 className="mb-4 text-3xl font-bold">Blog</h1>
        <p className="mb-12 max-w-2xl text-[var(--color-muted)]">
          Thoughts on engineering, projects, and building software that lasts.
        </p>
      </AnimateIn>

      <ul className="grid list-none gap-8 p-0 md:grid-cols-2">
        {posts.map((post, i) => (
          <li key={post.id}>
            <AnimateIn delay={i * 80}>
              <Link href={`/blog/${post.slug}`} className="card group block overflow-hidden transition-colors hover:border-[var(--color-accent)]/40">
                {post.coverImageUrl ? (
                  <figure className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={post.coverImageUrl}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </figure>
                ) : (
                  <figure className="flex h-44 items-center justify-center bg-[var(--color-surface)] font-mono text-sm text-[var(--color-muted)]">
                    {post.title}
                  </figure>
                )}
                <section className="p-6">
                  <p className="mb-2 flex items-center gap-2 text-xs text-[var(--color-muted)]">
                    <Calendar size={14} />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="mb-2 text-xl font-semibold text-white group-hover:text-[var(--color-accent)]">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--color-muted)]">{post.excerpt}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs text-[var(--color-accent)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </section>
              </Link>
            </AnimateIn>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-[var(--color-muted)]">No posts yet. Check back soon.</p>
      )}
    </article>
  );
}
