import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { getBlogPosts, getPostBySlug } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
      >
        <ArrowLeft size={16} />
        All posts
      </Link>

      {post.coverImageUrl && (
        <figure className="relative mb-8 h-56 w-full overflow-hidden rounded-xl border border-[var(--color-border)] sm:h-72">
          <Image src={post.coverImageUrl} alt="" fill className="object-cover" unoptimized />
        </figure>
      )}

      <header className="mb-8 animate-fade-in">
        <p className="mb-3 flex items-center gap-2 text-sm text-[var(--color-muted)]">
          <Calendar size={16} />
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
        <ul className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-[var(--color-accent)]/10 px-3 py-0.5 text-xs text-[var(--color-accent)]">
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <section className="space-y-5 text-lg leading-relaxed text-[#e8eef5]">
        {paragraphs.map((p, i) => (
          <p key={i} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            {p}
          </p>
        ))}
      </section>
    </article>
  );
}
