import { requireAdmin } from "../../../lib/auth";
import { AdminHeader } from "../../../components/admin/AdminUI";
import { ProductForm } from "../../../components/admin/ProductForm";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin("/admin/products/new");
  const query = await searchParams;

  return (
    <div>
      <AdminHeader
        eyebrow="Catalogue"
        title="Add product"
        description="Create a product record for the storefront and secure server-side checkout."
      />
      <ProductForm error={query.error} />
    </div>
  );
}
