import { NextRequest, NextResponse } from "next/server";
import { searchStorefrontProducts } from "../../../lib/products";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  if (query.trim().length < 2) {
    return NextResponse.json({ products: [] });
  }

  const products = await searchStorefrontProducts(query);
  return NextResponse.json(
    { products },
    { headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" } },
  );
}
