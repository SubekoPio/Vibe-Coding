"use client";

import Image from "next/image";
import { usePortfolio } from "@/hooks/usePortfolio";
import { FileUpload } from "@/components/admin/FileUpload";
import type { Profile } from "@/lib/types";

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-[var(--color-muted)]">{label}</span>
      {multiline ? (
        <textarea className="input min-h-[100px]" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export default function AdminProfilePage() {
  const { data, setData, loading, saving, message, save, reload } = usePortfolio();

  if (loading || !data) return <p className="text-[var(--color-muted)]">Loading…</p>;

  function updateProfile(patch: Partial<Profile>) {
    setData({ ...data!, profile: { ...data!.profile, ...patch } });
  }

  const p = data.profile;

  return (
    <article>
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      <section className="mb-8 flex items-center gap-6">
        {p.avatarUrl ? (
          <Image
            src={p.avatarUrl}
            alt={p.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full border border-[var(--color-border)] object-cover"
            unoptimized
          />
        ) : (
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-muted)]">
            No photo
          </span>
        )}
        <FileUpload
          label="Profile photo"
          accept="image/jpeg,image/png,image/webp,image/gif"
          endpoint="/api/upload/avatar"
          hint="JPEG, PNG, WebP or GIF — max 5MB"
          onSuccess={(url) => {
            updateProfile({ avatarUrl: url });
            reload();
          }}
        />
      </section>

      <FileUpload
        label="CV / Resume (PDF)"
        accept="application/pdf"
        endpoint="/api/upload/resume"
        hint="PDF only — max 10MB. Visitors can download from /api/cv"
        onSuccess={(url) => {
          updateProfile({ resumeUrl: url });
          reload();
        }}
      />

      {p.resumeUrl && (
        <p className="mb-6 text-sm text-[var(--color-muted)]">
          Current CV:{" "}
          <a href="/api/cv" className="text-[var(--color-accent)] hover:underline">
            Download preview
          </a>
        </p>
      )}

      <form
        className="max-w-xl space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          save(data);
        }}
      >
        <Field label="Name" value={p.name} onChange={(v) => updateProfile({ name: v })} />
        <Field label="Title" value={p.title} onChange={(v) => updateProfile({ title: v })} />
        <Field label="Tagline" value={p.tagline} onChange={(v) => updateProfile({ tagline: v })} />
        <Field label="Bio (short)" value={p.bio} onChange={(v) => updateProfile({ bio: v })} multiline />
        <Field
          label="About story (About page)"
          value={p.aboutStory || ""}
          onChange={(v) => updateProfile({ aboutStory: v })}
          multiline
        />
        <Field label="Email" value={p.email} onChange={(v) => updateProfile({ email: v })} />
        <Field
          label="WhatsApp number"
          value={p.whatsapp || ""}
          onChange={(v) => updateProfile({ whatsapp: v })}
        />
        <p className="text-xs text-[var(--color-muted)] -mt-2">
          Country code + number, digits only (e.g. 256700000000 for Uganda)
        </p>
        <Field label="Location" value={p.location} onChange={(v) => updateProfile({ location: v })} />

        <fieldset className="space-y-3 border-t border-[var(--color-border)] pt-4">
          <legend className="text-sm font-medium text-white">Social links</legend>
          {p.socials.map((s, i) => (
            <section key={i} className="grid gap-2 sm:grid-cols-3">
              <input
                className="input"
                placeholder="Label"
                value={s.label}
                onChange={(e) => {
                  const socials = [...p.socials];
                  socials[i] = { ...s, label: e.target.value };
                  updateProfile({ socials });
                }}
              />
              <input
                className="input"
                placeholder="Platform"
                value={s.platform}
                onChange={(e) => {
                  const socials = [...p.socials];
                  socials[i] = { ...s, platform: e.target.value };
                  updateProfile({ socials });
                }}
              />
              <input
                className="input"
                placeholder="URL"
                value={s.url}
                onChange={(e) => {
                  const socials = [...p.socials];
                  socials[i] = { ...s, url: e.target.value };
                  updateProfile({ socials });
                }}
              />
            </section>
          ))}
          <button
            type="button"
            className="btn-secondary text-xs"
            onClick={() =>
              updateProfile({
                socials: [...p.socials, { platform: "", url: "", label: "" }],
              })
            }
          >
            Add social link
          </button>
        </fieldset>

        <footer className="flex items-center gap-4 pt-4">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          {message && <span className="text-sm text-[var(--color-accent)]">{message}</span>}
        </footer>
      </form>
    </article>
  );
}
