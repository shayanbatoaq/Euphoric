import "server-only";

import { cache } from "react";
import {
  getProductById,
  products as fallbackProducts,
  type Product,
  type ProductCategory,
} from "../data/products";
import type { ProductRow } from "../types/database";
import { createSupabaseServerClient } from "./supabase/server";

const categoryLabels: Record<ProductRow["category"], ProductCategory> = {
  men: "Men",
  women: "Women",
  unisex: "Unisex",
};

export function toStorefrontProduct(row: ProductRow): Product {
  return {
    id: row.slug,
    name: row.name,
    brand: row.brand,
    displayName: `${row.name} by ${row.brand}`,
    category: categoryLabels[row.category],
    price: row.price,
    sizeMl: row.size_ml,
    notes: {
      top: row.top_notes,
      heart: row.heart_notes,
      base: row.base_notes,
    },
    shortDescription: row.short_description ?? "",
    longDescription: row.long_description ?? row.short_description ?? "",
    image: row.image_url || "/product-placeholder.svg",
  };
}

type ProductSummaryRow = Pick<
  ProductRow,
  | "slug"
  | "name"
  | "brand"
  | "category"
  | "price"
  | "size_ml"
  | "short_description"
  | "image_url"
>;

function toStorefrontSummary(row: ProductSummaryRow): Product {
  return {
    id: row.slug,
    name: row.name,
    brand: row.brand,
    displayName: `${row.name} by ${row.brand}`,
    category: categoryLabels[row.category],
    price: row.price,
    sizeMl: row.size_ml,
    notes: { top: [], heart: [], base: [] },
    shortDescription: row.short_description ?? "",
    longDescription: "",
    image: row.image_url || "/product-placeholder.svg",
  };
}

export const getStorefrontProducts = cache(async (): Promise<Product[]> => {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase
    .from("products")
    .select(
      "slug,name,brand,category,price,size_ml,short_description,image_url",
    )
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("name");

  if (error) {
    console.error("Storefront product query failed.", { code: error.code });
    return fallbackProducts;
  }

  return (data ?? []).map(toStorefrontSummary);
});

export const getStorefrontProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return getProductById(slug);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.error("Storefront product detail query failed.", {
        code: error.code,
      });
      return getProductById(slug);
    }

    return data ? toStorefrontProduct(data) : undefined;
  },
);

export async function getFeaturedStorefrontProducts(limit = 4) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    const preferred = [
      "hero-burberry-men",
      "weekend-woman-burberry-women",
      "ck-one-calvin-klien-unisex",
      "voyage-nautica-men",
    ];
    return preferred
      .map(getProductById)
      .filter((product): product is Product => Boolean(product))
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "slug,name,brand,category,price,size_ml,short_description,image_url",
    )
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error || !data?.length) {
    return (await getStorefrontProducts()).slice(0, limit);
  }
  return data.map(toStorefrontSummary);
}

export async function getRelatedStorefrontProducts(
  product: Product,
  limit = 3,
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return fallbackProducts
      .filter(
        (candidate) =>
          candidate.id !== product.id &&
          candidate.category === product.category,
      )
      .slice(0, limit);
  }

  const category = product.category.toLowerCase() as ProductRow["category"];
  const { data, error } = await supabase
    .from("products")
    .select(
      "slug,name,brand,category,price,size_ml,short_description,image_url",
    )
    .eq("is_active", true)
    .eq("category", category)
    .neq("slug", product.id)
    .order("is_featured", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []).map(toStorefrontSummary);
}

export async function searchStorefrontProducts(
  query: string,
  limit = 12,
) {
  const normalized = query.trim().replace(/[,%()]/g, "").slice(0, 80);
  if (normalized.length < 2) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    const lower = normalized.toLowerCase();
    return fallbackProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(lower) ||
          product.brand.toLowerCase().includes(lower) ||
          product.displayName.toLowerCase().includes(lower),
      )
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "slug,name,brand,category,price,size_ml,short_description,image_url",
    )
    .eq("is_active", true)
    .or(
      `name.ilike.%${normalized}%,brand.ilike.%${normalized}%,sku.ilike.%${normalized}%`,
    )
    .order("name")
    .limit(limit);

  if (error) {
    console.error("Storefront search failed.", { code: error.code });
    // Keep search usable when the remote catalog is unavailable or has not
    // been provisioned yet. The bundled catalog is the same source used by
    // the storefront fallback and contains the product records users can
    // search for locally.
    const lower = normalized.toLowerCase();
    return fallbackProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(lower) ||
          product.brand.toLowerCase().includes(lower) ||
          product.displayName.toLowerCase().includes(lower),
      )
      .slice(0, limit);
  }
  return (data ?? []).map(toStorefrontSummary);
}
