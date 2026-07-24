import { notFound } from "next/navigation";
import { requireAdmin } from "../../../lib/auth";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { AdminHeader } from "../../../components/admin/AdminUI";
import { ProductForm } from "../../../components/admin/ProductForm";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  await requireAdmin(`/admin/products/${id}`);
  const query = await searchParams;
  const admin = createSupabaseAdminClient();
  const { data: product } = await admin
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!product) notFound();

  return (
    <div>
      <AdminHeader
        eyebrow="Catalogue"
        title={product.name}
        description={`${product.brand} · ${product.slug}`}
      />
      <ProductForm
        product={product}
        saved={Boolean(query.saved)}
        error={query.error}
      />
    </div>
  );
}
