import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPortfolio } from "@/lib/portfolio";
import { getTestimonials } from "@/lib/testimonials";
import { getPublishedPosts } from "@/lib/blog";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { CvDownloadButton } from "@/components/CvDownloadButton";
import { SubscribeForm } from "@/components/SubscribeForm";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { SkillsCarousel } from "@/components/SkillsCarousel";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { AnimateIn } from "@/components/AnimateIn";

export default async function HomePage() {
  const data = await getPortfolio();
  const { profile, projects, skills, experience } = data;
  const featured = projects.filter((p) => p.featured);
  const testimonials = await getTestimonials();
  const posts = await getPublishedPosts();
  const latestRole = experience[0];

  return (
    <>
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent)_0%,_transparent_50%)] opacity-[0.07] animate-pulse-slow" />
        <article className="relative mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <AnimateIn>
            <ProfileAvatar name={profile.name} avatarUrl={profile.avatarUrl} size="lg" />
          </AnimateIn>
          <section className="flex-1">
            <AnimateIn delay={100}>
              <p className="mb-4 font-mono text-sm text-[var(--color-accent)]">{profile.title}</p>
              <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                <span className="gradient-text">Hi, I&apos;m {profile.name}.</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                {profile.tagline}
              </p>
              <nav className="flex flex-wrap gap-4">
                <Link href="/projects" className="btn-primary">
                  View projects
                  <ArrowRight size={18} />
                </Link>
                <CvDownloadButton />
                <Link href="/about" className="btn-secondary">
                  About me
                </Link>
              </nav>
            </AnimateIn>
          </section>
        </article>
      </section>

      {featured.length > 0 && (
        <section className="border-t border-[var(--color-border)] px-6 py-20">
          <article className="mx-auto max-w-5xl">
            <AnimateIn>
              <h2 className="mb-10 text-2xl font-semibold">Featured projects</h2>
            </AnimateIn>
            <ProjectsCarousel projects={featured} />
            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
            >
              See all projects <ArrowRight size={16} />
            </Link>
          </article>
        </section>
      )}

      {skills.length > 0 && (
        <section className="border-t border-[var(--color-border)] px-6 py-20">
          <article className="mx-auto max-w-5xl">
            <AnimateIn>
              <h2 className="mb-10 text-2xl font-semibold">Skills & tools</h2>
            </AnimateIn>
            <SkillsCarousel skills={skills} />
          </article>
        </section>
      )}

      {latestRole && (
        <section className="border-t border-[var(--color-border)] px-6 py-20">
          <article className="mx-auto max-w-5xl">
            <AnimateIn>
              <h2 className="mb-6 text-2xl font-semibold">Experience</h2>
              <section className="card p-6">
                <h3 className="text-lg font-semibold text-white">{latestRole.role}</h3>
                <p className="text-sm text-[var(--color-accent)]">
                  {latestRole.company} · {latestRole.period}
                </p>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{latestRole.description}</p>
              </section>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
              >
                Full timeline <ArrowRight size={16} />
              </Link>
            </AnimateIn>
          </article>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="border-t border-[var(--color-border)] px-6 py-20">
          <article className="mx-auto max-w-5xl">
            <AnimateIn>
              <h2 className="mb-10 text-2xl font-semibold">Testimonials</h2>
            </AnimateIn>
            <TestimonialsCarousel testimonials={testimonials} />
          </article>
        </section>
      )}

      {posts.length > 0 && (
        <section className="border-t border-[var(--color-border)] px-6 py-20">
          <article className="mx-auto max-w-5xl">
            <AnimateIn>
              <header className="mb-8 flex items-end justify-between">
                <h2 className="text-2xl font-semibold">Latest from the blog</h2>
                <Link href="/blog" className="text-sm text-[var(--color-accent)] hover:underline">
                  View all
                </Link>
              </header>
              <ul className="grid list-none gap-4 p-0 md:grid-cols-2">
                {posts.slice(0, 2).map((post) => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="card block p-6 transition-colors hover:border-[var(--color-accent)]/40">
                      <h3 className="mb-2 font-semibold text-white">{post.title}</h3>
                      <p className="text-sm text-[var(--color-muted)]">{post.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </article>
        </section>
      )}

      <section className="border-t border-[var(--color-border)] px-6 py-20">
        <article className="mx-auto max-w-xl text-center">
          <AnimateIn>
            <h2 className="mb-2 text-2xl font-semibold">Stay updated</h2>
            <p className="mb-6 text-sm text-[var(--color-muted)]">
              Subscribe for project updates and blog posts. You&apos;ll get a welcome email.
            </p>
            <SubscribeForm />
          </AnimateIn>
        </article>
      </section>
    </>
  );
}
