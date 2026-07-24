import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { StorefrontProvider } from "./context/StorefrontContext";
import { getStorefrontProducts } from "./lib/products";
import "../styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Euphoric | Premium Perfume Impressions",
    template: "%s | Euphoric",
  },
  description:
    "Explore 194 premium perfume impressions for men, women, and every identity—luxury-inspired fragrance made accessible for everyday elegance.",
  openGraph: {
    type: "website",
    siteName: "Euphoric",
    title: "Euphoric | Premium Perfume Impressions",
    description:
      "Luxury-inspired perfume impressions for every day, delivered across Pakistan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Euphoric | Premium Perfume Impressions",
    description:
      "Luxury-inspired perfume impressions for every day, delivered across Pakistan.",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const catalog = await getStorefrontProducts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Euphoric",
    url: siteUrl,
    logo: `${siteUrl}/euphoric-logo.png`,
    sameAs: [
      "https://www.instagram.com/euphoricpak/",
      "https://www.facebook.com/profile.php?id=61560426114088",
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replaceAll("<", "\\u003c"),
          }}
        />
        <StorefrontProvider catalog={catalog}>
          <div className="min-h-screen bg-[#0A0A0A]">
            <Navbar />
            {children}
            <Footer />
          </div>
        </StorefrontProvider>
      </body>
    </html>
  );
}
