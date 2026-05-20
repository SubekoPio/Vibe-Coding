import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPortfolio } from "@/lib/portfolio";
import { getTestimonials } from "@/lib/testimonials";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { CvDownloadButton } from "@/components/CvDownloadButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SkillGrid } from "@/components/SkillGrid";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { AnimateIn } from "@/components/AnimateIn";

export default async function AboutPage() {
  const { profile, experience, skills } = await getPortfolio();
  const testimonials = await getTestimonials();
  const storyParagraphs = (profile.aboutStory || profile.bio).split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <AnimateIn>
        <header className="mb-16 flex flex-col items-start gap-8 lg:flex-row lg:items-center">
          <ProfileAvatar name={profile.name} avatarUrl={profile.avatarUrl} size="lg" />
          <section className="flex-1">
            <p className="mb-2 font-mono text-sm text-[var(--color-accent)]">About me</p>
            <h1 className="mb-3 text-4xl font-bold">{profile.name}</h1>
            <p className="mb-2 text-xl text-[var(--color-muted)]">{profile.title}</p>
            <p className="mb-6 text-[var(--color-muted)]">{profile.location}</p>
            <nav className="flex flex-wrap gap-3">
              <CvDownloadButton className="btn-secondary text-sm" />
              <WhatsAppButton whatsapp={profile.whatsapp} className="btn-secondary text-sm" />
              <Link href="/contact" className="btn-primary text-sm">
                Contact me <ArrowRight size={16} />
              </Link>
            </nav>
          </section>
        </header>
      </AnimateIn>

      <AnimateIn>
        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">My story</h2>
          <section className="space-y-5 text-lg leading-relaxed text-[#e8eef5]">
            {storyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        </section>
      </AnimateIn>

      <AnimateIn>
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-semibold">Skills</h2>
          <SkillGrid skills={skills} />
        </section>
      </AnimateIn>

      <section className="mb-20">
        <h2 className="mb-8 text-2xl font-semibold">Experience</h2>
        <ol className="relative space-y-10 border-l border-[var(--color-border)] pl-8">
          {experience.map((job, i) => (
            <AnimateIn key={job.id} delay={i * 100}>
              <li className="relative">
                <span className="absolute -left-[2.125rem] top-1.5 h-3 w-3 rounded-full bg-[var(--color-accent)]" />
                <header className="mb-2">
                  <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  <p className="text-sm text-[var(--color-accent)]">
                    {job.company} · {job.period}
                  </p>
                </header>
                <p className="mb-3 text-sm text-[var(--color-muted)]">{job.description}</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-[#e8eef5]">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            </AnimateIn>
          ))}
        </ol>
      </section>

      {testimonials.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-8 text-2xl font-semibold">What people say</h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </section>
      )}
    </article>
  );
}
