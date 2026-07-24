import Link from "next/link";
import { createSupabaseAdminClient } from "../../lib/supabase/admin";
import { requireAdmin } from "../../lib/auth";
import { formatProductPrice } from "../../data/products";
import { AdminHeader } from "../../components/admin/AdminUI";

const PAGE_SIZE = 30;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await requireAdmin("/admin/products");
  const query = await searchParams;
  const page = Math.max(1, Number.parseInt(query.page ?? "1", 10) || 1);
  const search = (query.q ?? "").trim().replace(/[,%()]/g, "").slice(0, 100);
  const admin = createSupabaseAdminClient();
  let request = admin
    .from("products")
    .select("*", { count: "exact" })
    .order("updated_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (search) {
    request = request.or(
      `name.ilike.%${search}%,brand.ilike.%${search}%,slug.ilike.%${search}%,sku.ilike.%${search}%`,
    );
  }
  if (query.category && ["men", "women", "unisex"].includes(query.category)) {
    request = request.eq(
      "category",
      query.category as "men" | "women" | "unisex",
    );
  }
  if (query.visibility === "active") request = request.eq("is_active", true);
  if (query.visibility === "inactive") request = request.eq("is_active", false);

  const { data: products, count } = await request;
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
  const preserved = new URLSearchParams(
    Object.entries(query).flatMap(([key, value]) =>
      value && key !== "page" ? [[key, value]] : [],
    ),
  );

  return (
    <div>
      <AdminHeader
        eyebrow="Catalogue"
        title="Products"
        description={`${count ?? 0} matching products. Products are deactivated instead of deleted so historical order snapshots remain intact.`}
        actionHref="/admin/products/new"
        actionLabel="Add product"
      />

      <form className="mt-8 grid gap-3 border border-[#C0C0C0]/15 bg-[#111113] p-4 md:grid-cols-[minmax(0,2fr)_1fr_1fr_auto]">
        <input
          name="q"
          defaultValue={search}
          placeholder="Name, brand, slug, or SKU"
          className="account-input"
        />
        <select
          name="category"
          defaultValue={query.category}
          className="account-input"
        >
          <option value="">All categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>
        <select
          name="visibility"
          defaultValue={query.visibility}
          className="account-input"
        >
          <option value="">All visibility</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="bg-[#C0C0C0] px-5 text-xs font-semibold uppercase tracking-wider text-black">
          Apply
        </button>
      </form>

      <div className="mt-6 overflow-x-auto border border-[#C0C0C0]/15">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-[#171719] text-xs uppercase tracking-wider text-[#C0C0C0]">
            <tr>
              <th className="px-4 py-4">Product</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">SKU</th>
              <th className="px-4 py-4">Stock</th>
              <th className="px-4 py-4">Visibility</th>
              <th className="px-4 py-4 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C0C0C0]/10">
            {(products ?? []).map((product) => (
              <tr key={product.id} className="bg-[#111113]">
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-medium underline decoration-[#C0C0C0]/40 underline-offset-4"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs text-[#D9D9D9]/50">
                    {product.brand} · {product.slug}
                  </p>
                </td>
                <td className="px-4 py-4 capitalize">{product.category}</td>
                <td className="px-4 py-4 text-[#D9D9D9]/60">
                  {product.sku ?? "—"}
                </td>
                <td className="px-4 py-4">
                  {product.track_inventory
                    ? (product.stock_quantity ?? 0)
                    : "Not tracked"}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`border px-2 py-1 text-[10px] uppercase tracking-wider ${
                      product.is_active
                        ? "border-emerald-300/25 text-emerald-100"
                        : "border-red-300/25 text-red-100"
                    }`}
                  >
                    {product.is_active ? "Active" : "Inactive"}
                  </span>
                  {product.is_featured && (
                    <span className="ml-2 border border-[#C0C0C0]/25 px-2 py-1 text-[10px] uppercase tracking-wider text-[#C0C0C0]">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-right text-[#C0C0C0]">
                  {formatProductPrice(product.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-[#D9D9D9]/55">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          {[
            ["Previous", Math.max(1, page - 1), page <= 1],
            ["Next", Math.min(totalPages, page + 1), page >= totalPages],
          ].map(([label, target, disabled]) => {
            const next = new URLSearchParams(preserved);
            next.set("page", String(target));
            return (
              <Link
                key={String(label)}
                href={
                  disabled ? "#" : `/admin/products?${next.toString()}`
                }
                aria-disabled={Boolean(disabled)}
                className={`border border-[#C0C0C0]/20 px-4 py-2 ${
                  disabled
                    ? "pointer-events-none opacity-35"
                    : "hover:border-[#C0C0C0]"
                }`}
              >
                {String(label)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
