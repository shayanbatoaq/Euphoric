import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { products } from "../src/app/data/products";
import type { Database } from "../src/app/types/database";

const featuredSlugs = new Set([
  "hero-burberry-men",
  "weekend-woman-burberry-women",
  "ck-one-calvin-klien-unisex",
  "voyage-nautica-men",
]);

function extractOccasions(longDescription: string) {
  const marker = "Perfect for:";
  const markerIndex = longDescription.indexOf(marker);

  if (markerIndex < 0) {
    return [];
  }

  return longDescription
    .slice(markerIndex + marker.length)
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

function generateSku(slug: string, category: string) {
  const categoryCode =
    category === "Men" ? "MEN" : category === "Women" ? "WMN" : "UNI";
  const digest = createHash("sha1")
    .update(slug)
    .digest("hex")
    .slice(0, 8)
    .toUpperCase();

  return `EUP-${categoryCode}-${digest}`;
}

async function seed() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
    /\/rest\/v1\/?$/,
    "",
  );
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.",
    );
  }

  const supabase = createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  const records = products.map((product) => ({
    slug: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category.toLowerCase() as
      | "men"
      | "women"
      | "unisex",
    price: product.price,
    size_ml: product.sizeMl,
    short_description: product.shortDescription,
    long_description: product.longDescription,
    top_notes: product.notes.top,
    heart_notes: product.notes.heart,
    base_notes: product.notes.base,
    occasions: extractOccasions(product.longDescription),
    image_url: product.image,
    sku: generateSku(product.id, product.category),
    stock_quantity: null,
    track_inventory: false,
    is_active: true,
    is_featured: featuredSlugs.has(product.id),
  }));

  const batchSize = 100;

  for (let index = 0; index < records.length; index += batchSize) {
    const batch = records.slice(index, index + batchSize);
    const { error } = await supabase
      .from("products")
      .upsert(batch, { onConflict: "slug" });

    if (error) {
      throw error;
    }
  }

  const { count, error } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true });

  if (error) {
    throw error;
  }

  process.stdout.write(
    `Seeded ${records.length} Euphoric products. Database count: ${count ?? "unknown"}.\n`,
  );
}

seed().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Product seed failed: ${message}\n`);
  process.exitCode = 1;
});
