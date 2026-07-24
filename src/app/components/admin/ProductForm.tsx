import Link from "next/link";
import { saveProductAction } from "../../actions/admin";
import type { ProductRow } from "../../types/database";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AdminField, AdminNotice } from "./AdminUI";

export function ProductForm({
  product,
  saved,
  error,
}: {
  product?: ProductRow;
  saved?: boolean;
  error?: string;
}) {
  return (
    <div>
      <AdminNotice saved={saved} error={error} />
      {product?.image_url && (
        <div className="mt-6 flex items-center gap-4 border border-[#C0C0C0]/15 bg-[#111113] p-4">
          <ImageWithFallback
            src={product.image_url}
            alt={`${product.name} preview`}
            className="size-24 bg-black object-cover"
          />
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C0C0C0]">
              Current image preview
            </p>
            <p className="mt-2 break-all text-xs text-[#D9D9D9]/55">
              {product.image_url}
            </p>
          </div>
        </div>
      )}

      <form
        action={saveProductAction}
        className="mt-6 space-y-8 border border-[#C0C0C0]/15 bg-[#111113] p-5 sm:p-7"
      >
        {product && (
          <input type="hidden" name="productId" value={product.id} />
        )}
        <fieldset>
          <legend className="font-playfair text-2xl">Core details</legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AdminField label="Name">
              <input
                name="name"
                defaultValue={product?.name}
                required
                className="account-input"
              />
            </AdminField>
            <AdminField label="Brand">
              <input
                name="brand"
                defaultValue={product?.brand}
                required
                className="account-input"
              />
            </AdminField>
            <AdminField label="Slug" hint="Lowercase letters, numbers, and hyphens.">
              <input
                name="slug"
                defaultValue={product?.slug}
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                className="account-input"
              />
            </AdminField>
            <AdminField label="Category">
              <select
                name="category"
                defaultValue={product?.category ?? "unisex"}
                className="account-input"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </AdminField>
            <AdminField label="Price (PKR)">
              <input
                name="price"
                type="number"
                min="0"
                step="1"
                defaultValue={product?.price ?? 2000}
                required
                className="account-input"
              />
            </AdminField>
            <AdminField label="Size (ml)">
              <input
                name="sizeMl"
                type="number"
                min="1"
                step="1"
                defaultValue={product?.size_ml ?? 50}
                required
                className="account-input"
              />
            </AdminField>
            <AdminField label="SKU">
              <input
                name="sku"
                defaultValue={product?.sku ?? ""}
                className="account-input"
              />
            </AdminField>
            <AdminField label="Image URL">
              <input
                name="imageUrl"
                type="url"
                defaultValue={product?.image_url ?? ""}
                placeholder="https://…"
                className="account-input"
              />
            </AdminField>
            <AdminField label="Stock quantity">
              <input
                name="stockQuantity"
                type="number"
                min="0"
                step="1"
                defaultValue={product?.stock_quantity ?? ""}
                className="account-input"
              />
            </AdminField>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-playfair text-2xl">Fragrance profile</legend>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <AdminField label="Top notes" hint="Comma-separated">
              <textarea
                name="topNotes"
                rows={3}
                defaultValue={product?.top_notes.join(", ")}
                className="account-input resize-none"
              />
            </AdminField>
            <AdminField label="Heart notes" hint="Comma-separated">
              <textarea
                name="heartNotes"
                rows={3}
                defaultValue={product?.heart_notes.join(", ")}
                className="account-input resize-none"
              />
            </AdminField>
            <AdminField label="Base notes" hint="Comma-separated">
              <textarea
                name="baseNotes"
                rows={3}
                defaultValue={product?.base_notes.join(", ")}
                className="account-input resize-none"
              />
            </AdminField>
          </div>
          <div className="mt-5">
            <AdminField label="Occasions" hint="Comma-separated">
              <input
                name="occasions"
                defaultValue={product?.occasions.join(", ")}
                className="account-input"
              />
            </AdminField>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-playfair text-2xl">Description</legend>
          <div className="mt-5 space-y-5">
            <AdminField label="Short description">
              <textarea
                name="shortDescription"
                rows={3}
                defaultValue={product?.short_description ?? ""}
                className="account-input resize-none"
              />
            </AdminField>
            <AdminField label="Long description">
              <textarea
                name="longDescription"
                rows={8}
                defaultValue={product?.long_description ?? ""}
                className="account-input resize-y"
              />
            </AdminField>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-playfair text-2xl">Availability</legend>
          <div className="mt-5 flex flex-wrap gap-6 text-sm text-[#D9D9D9]/70">
            <Toggle
              name="isActive"
              label="Active on storefront"
              defaultChecked={product?.is_active ?? true}
            />
            <Toggle
              name="isFeatured"
              label="Featured product"
              defaultChecked={product?.is_featured ?? false}
            />
            <Toggle
              name="trackInventory"
              label="Track inventory"
              defaultChecked={product?.track_inventory ?? false}
            />
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-4 border-t border-[#C0C0C0]/10 pt-6">
          <button className="bg-[#C0C0C0] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-white">
            {product ? "Save product" : "Create product"}
          </button>
          <Link
            href="/admin/products"
            className="text-sm text-[#D9D9D9]/60 underline underline-offset-4 hover:text-white"
          >
            Cancel
          </Link>
          {product && (
            <Link
              href={`/product/${product.slug}`}
              className="ml-auto text-sm text-[#C0C0C0] underline underline-offset-4"
            >
              View storefront page
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}

function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="size-4 accent-[#C0C0C0]"
      />
      {label}
    </label>
  );
}
