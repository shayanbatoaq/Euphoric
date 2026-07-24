import { HomePage } from "./pages/HomePage";
import { getFeaturedStorefrontProducts } from "./lib/products";

export default async function Page() {
  const featuredProducts = await getFeaturedStorefrontProducts();
  return <HomePage featuredProducts={featuredProducts} />;
}
