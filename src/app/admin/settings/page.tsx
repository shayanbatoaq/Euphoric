import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "../../lib/supabase/admin";
import { requireAdmin } from "../../lib/auth";
import { updateSettingsAction } from "../../actions/admin";
import {
  AdminField,
  AdminHeader,
  AdminNotice,
} from "../../components/admin/AdminUI";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin("/admin/settings");
  const query = await searchParams;
  const admin = createSupabaseAdminClient();
  const { data: settings } = await admin
    .from("store_settings")
    .select("*")
    .eq("id", true)
    .single();
  if (!settings) notFound();

  return (
    <div>
      <AdminHeader
        eyebrow="Configuration"
        title="Store settings"
        description="Operational values used by server-side checkout and customer support."
      />
      <AdminNotice saved={Boolean(query.saved)} error={query.error} />

      <form
        action={updateSettingsAction}
        className="mt-8 max-w-4xl space-y-8 border border-[#C0C0C0]/15 bg-[#111113] p-6"
      >
        <fieldset>
          <legend className="font-playfair text-2xl">Store identity</legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <AdminField label="Store name">
              <input
                name="storeName"
                defaultValue={settings.store_name}
                required
                className="account-input"
              />
            </AdminField>
            <AdminField label="Support email">
              <input
                name="supportEmail"
                type="email"
                defaultValue={settings.support_email}
                required
                className="account-input"
              />
            </AdminField>
            <AdminField label="Support phone">
              <input
                name="supportPhone"
                defaultValue={settings.support_phone}
                required
                className="account-input"
              />
            </AdminField>
            <AdminField label="WhatsApp number">
              <input
                name="whatsappNumber"
                defaultValue={settings.whatsapp_number}
                required
                className="account-input"
              />
            </AdminField>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-playfair text-2xl">Commerce</legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <AdminField
              label="Shipping fee (PKR)"
              hint="Server-side checkout uses this value."
            >
              <input
                name="shippingFee"
                type="number"
                min="0"
                step="1"
                defaultValue={settings.shipping_fee}
                required
                className="account-input"
              />
            </AdminField>
            <AdminField label="Low-stock threshold">
              <input
                name="lowStockThreshold"
                type="number"
                min="0"
                step="1"
                defaultValue={settings.low_stock_threshold}
                required
                className="account-input"
              />
            </AdminField>
          </div>
          <div className="mt-5 flex flex-wrap gap-6 text-sm text-[#D9D9D9]/70">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="codEnabled"
                defaultChecked={settings.cod_enabled}
                className="size-4 accent-[#C0C0C0]"
              />
              Cash on delivery enabled
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="payfastPlaceholderEnabled"
                defaultChecked={settings.payfast_placeholder_enabled}
                className="size-4 accent-[#C0C0C0]"
              />
              Show card-payment placeholder
            </label>
          </div>
        </fieldset>
        <button className="bg-[#C0C0C0] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black">
          Save settings
        </button>
      </form>
    </div>
  );
}
