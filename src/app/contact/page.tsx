import { Mail, MapPin } from "lucide-react";
import { getPortfolio } from "@/lib/portfolio";
import { SubscribeForm } from "@/components/SubscribeForm";
import { ContactForm } from "@/components/ContactForm";
import { CvDownloadButton } from "@/components/CvDownloadButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnimateIn } from "@/components/AnimateIn";

export default async function ContactPage() {
  const { profile } = await getPortfolio();

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <AnimateIn>
        <h1 className="mb-4 text-3xl font-bold">Contact</h1>
        <p className="mb-12 max-w-2xl text-[var(--color-muted)]">
          Open to engineering roles, contract work, and interesting collaborations.
        </p>
      </AnimateIn>

      <section className="grid gap-8 lg:grid-cols-2">
        <AnimateIn>
          <section className="card space-y-6 p-8">
            <h2 className="text-lg font-semibold">Send a message</h2>
            <ContactForm />
          </section>
        </AnimateIn>

        <section className="space-y-8">
          <AnimateIn delay={100}>
            <section className="card space-y-6 p-8">
              <h2 className="text-lg font-semibold">Direct contact</h2>
              <p className="flex items-center gap-3 text-[#e8eef5]">
                <Mail size={20} className="text-[var(--color-accent)]" />
                <a href={`mailto:${profile.email}`} className="hover:text-[var(--color-accent)]">
                  {profile.email}
                </a>
              </p>
              <p className="flex items-center gap-3 text-[var(--color-muted)]">
                <MapPin size={20} className="text-[var(--color-accent)]" />
                {profile.location}
              </p>
              <nav className="flex flex-wrap gap-3">
                <WhatsAppButton whatsapp={profile.whatsapp} />
                <CvDownloadButton className="btn-secondary text-sm" />
              </nav>
              <ul className="flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-6">
                {profile.socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-accent)] hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </AnimateIn>

          <AnimateIn delay={200}>
            <section className="card p-8">
              <h2 className="mb-2 text-lg font-semibold">Subscribe</h2>
              <p className="mb-6 text-sm text-[var(--color-muted)]">
                Get updates when I publish new projects or blog posts.
              </p>
              <SubscribeForm />
            </section>
          </AnimateIn>
        </section>
      </section>
    </article>
  );
}
