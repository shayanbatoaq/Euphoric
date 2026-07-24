import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "../../pages/ProductPage";
import {
  getRelatedStorefrontProducts,
  getStorefrontProductBySlug,
} from "../../lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getStorefrontProductBySlug(id);
  if (!product) return { title: "Fragrance not found | Euphoric" };

  return {
    title: `${product.displayName} | Euphoric`,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title: product.displayName,
      description: product.shortDescription,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getStorefrontProductBySlug(id);
  if (!product) notFound();
  const relatedProducts = await getRelatedStorefrontProducts(product);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.displayName,
      description: product.shortDescription,
      image: [new URL(product.image, siteUrl).toString()],
      brand: { "@type": "Brand", name: "Euphoric" },
      category: `${product.category} perfume impression`,
      offers: {
        "@type": "Offer",
        priceCurrency: "PKR",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/product/${product.id}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Shop",
          item: `${siteUrl}/shop`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.displayName,
          item: `${siteUrl}/product/${product.id}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
      <ProductPage product={product} relatedProducts={relatedProducts} />
    </>
  );
}
