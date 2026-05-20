import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPortfolio } from "@/lib/portfolio";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolio();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${profile.name} | ${profile.title}`,
      template: `%s | ${profile.name}`,
    },
    description: profile.tagline,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: profile.name,
      title: `${profile.name} | ${profile.title}`,
      description: profile.tagline,
      images: profile.avatarUrl ? [{ url: profile.avatarUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} | ${profile.title}`,
      description: profile.tagline,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile } = await getPortfolio();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar name={profile.name} />
        <main className="flex-1">{children}</main>
        <Footer name={profile.name} socials={profile.socials} />
      </body>
    </html>
  );
}
