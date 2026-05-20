import Image from "next/image";

export function ProfileAvatar({
  name,
  avatarUrl,
  size = "lg",
}: {
  name: string;
  avatarUrl: string;
  size?: "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dim = size === "lg" ? 120 : 80;
  const className =
    size === "lg"
      ? "h-[120px] w-[120px] text-2xl"
      : "h-20 w-20 text-lg";

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={dim}
        height={dim}
        className={`${className} rounded-full border-2 border-[var(--color-accent)]/40 object-cover`}
        unoptimized={avatarUrl.startsWith("/uploads")}
      />
    );
  }

  return (
    <span
      className={`${className} flex shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-border)] bg-[var(--color-surface-elevated)] font-semibold text-[var(--color-accent)]`}
      aria-hidden
    >
      {initials}
    </span>
  );
}
