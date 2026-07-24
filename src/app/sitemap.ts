import type { MetadataRoute } from "next";
import { getStorefrontProducts } from "./lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const products = await getStorefrontProducts();
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/shop", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: product.image
        ? [new URL(product.image, siteUrl).toString()]
        : undefined,
    })),
  ];
}
