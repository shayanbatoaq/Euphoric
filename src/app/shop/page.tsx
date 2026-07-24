import { Suspense } from "react";
import { ShopPage } from "../pages/ShopPage";
import { getStorefrontProducts } from "../lib/products";

export const metadata = {
  title: "Shop perfume impressions | Euphoric",
  description:
    "Explore Euphoric perfume impressions for men, women, and unisex fragrance lovers.",
};

export default async function Page() {
  const products = await getStorefrontProducts();

  return (
    <Suspense
      fallback={<div className="min-h-screen bg-[#0A0A0A]" aria-hidden="true" />}
    >
      <ShopPage products={products} />
    </Suspense>
  );
}
