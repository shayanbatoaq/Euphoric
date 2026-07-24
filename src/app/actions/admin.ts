"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "../lib/auth";
import {
  enquiryStatusSchema,
  orderStatusSchema,
  productMutationSchema,
} from "../lib/commerce";
import { sendOrderStatusEmail } from "../lib/email";
import { getOrderWithItemsById } from "../lib/orders";
import { createSupabaseAdminClient } from "../lib/supabase/admin";
import { createSupabaseServerClient } from "../lib/supabase/server";

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function csvList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function actionError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function updateOrderAction(formData: FormData) {
  await requireAdmin("/admin/orders");
  const orderNumber = text(formData, "orderNumber");
  const path = `/admin/orders/${encodeURIComponent(orderNumber)}`;
  const parsed = orderStatusSchema.safeParse({
    orderId: text(formData, "orderId"),
    orderStatus: text(formData, "orderStatus"),
    paymentStatus: text(formData, "paymentStatus"),
    adminNote: text(formData, "adminNote"),
    override: formData.get("override") === "on",
  });

  if (!parsed.success) {
    actionError(path, parsed.error.issues[0]?.message ?? "Invalid update.");
  }

  const before = await getOrderWithItemsById(parsed.data.orderId);
  if (!before) actionError(path, "Order not found.");

  const supabase = await createSupabaseServerClient();
  if (!supabase) actionError(path, "Admin service unavailable.");

  const { error } = await supabase.rpc("admin_update_order", {
    p_order_id: parsed.data.orderId,
    p_new_status: parsed.data.orderStatus,
    p_payment_status: parsed.data.paymentStatus,
    p_admin_note: parsed.data.adminNote,
    p_override: parsed.data.override,
  });

  if (error) actionError(path, error.message);

  const after = await getOrderWithItemsById(parsed.data.orderId);
  if (
    after &&
    before.order_status !== after.order_status
  ) {
    await sendOrderStatusEmail(
      after,
      before.order_status,
      after.order_status,
      parsed.data.adminNote || undefined,
    ).catch(() => undefined);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(path);
  revalidatePath(`/account/orders/${orderNumber}`);
  redirect(`${path}?saved=1`);
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin("/admin/products");
  const productId = text(formData, "productId");
  const sourcePath = productId
    ? `/admin/products/${encodeURIComponent(productId)}`
    : "/admin/products/new";
  const parsed = productMutationSchema.safeParse({
    slug: text(formData, "slug"),
    name: text(formData, "name"),
    brand: text(formData, "brand"),
    category: text(formData, "category"),
    price: text(formData, "price"),
    size_ml: text(formData, "sizeMl"),
    short_description: text(formData, "shortDescription") || null,
    long_description: text(formData, "longDescription") || null,
    top_notes: csvList(text(formData, "topNotes")),
    heart_notes: csvList(text(formData, "heartNotes")),
    base_notes: csvList(text(formData, "baseNotes")),
    occasions: csvList(text(formData, "occasions")),
    image_url: text(formData, "imageUrl") || null,
    sku: text(formData, "sku") || null,
    stock_quantity: text(formData, "stockQuantity") || null,
    track_inventory: formData.get("trackInventory") === "on",
    is_active: formData.get("isActive") === "on",
    is_featured: formData.get("isFeatured") === "on",
  });

  if (!parsed.success) {
    actionError(
      sourcePath,
      parsed.error.issues[0]?.message ?? "Check the product details.",
    );
  }

  const admin = createSupabaseAdminClient();
  const productValues = {
    slug: parsed.data.slug,
    name: parsed.data.name,
    brand: parsed.data.brand,
    category: parsed.data.category,
    price: parsed.data.price,
    size_ml: parsed.data.size_ml,
    short_description: parsed.data.short_description ?? null,
    long_description: parsed.data.long_description ?? null,
    top_notes: parsed.data.top_notes,
    heart_notes: parsed.data.heart_notes,
    base_notes: parsed.data.base_notes,
    occasions: parsed.data.occasions,
    image_url: parsed.data.image_url ?? null,
    sku: parsed.data.sku ?? null,
    stock_quantity: parsed.data.track_inventory
      ? (parsed.data.stock_quantity ?? 0)
      : null,
    track_inventory: parsed.data.track_inventory,
    is_active: parsed.data.is_active,
    is_featured: parsed.data.is_featured,
  };
  if (productId) {
    const id = z.string().uuid().safeParse(productId);
    if (!id.success) actionError(sourcePath, "Invalid product.");
    const { error } = await admin
      .from("products")
      .update(productValues)
      .eq("id", id.data);
    if (error) actionError(sourcePath, error.message);
  } else {
    const { data, error } = await admin
      .from("products")
      .insert(productValues)
      .select("id")
      .single();
    if (error || !data) {
      actionError(sourcePath, error?.message ?? "Could not create product.");
    }
    revalidatePath("/shop");
    redirect(`/admin/products/${data.id}?saved=1`);
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/product/${productValues.slug}`);
  revalidatePath("/admin/products");
  revalidatePath(sourcePath);
  redirect(`${sourcePath}?saved=1`);
}

export async function updateEnquiryStatusAction(formData: FormData) {
  await requireAdmin("/admin/enquiries");
  const enquiryId = z.string().uuid().safeParse(text(formData, "enquiryId"));
  const status = enquiryStatusSchema.safeParse(text(formData, "status"));
  const path = `/admin/enquiries/${encodeURIComponent(text(formData, "enquiryId"))}`;

  if (!enquiryId.success || !status.success) {
    actionError(path, "Invalid enquiry update.");
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("contact_enquiries")
    .update({ status: status.data })
    .eq("id", enquiryId.data);
  if (error) actionError(path, error.message);

  revalidatePath("/admin/enquiries");
  revalidatePath(path);
  redirect(`${path}?saved=1`);
}

const settingsSchema = z.object({
  storeName: z.string().trim().min(1).max(120),
  supportEmail: z.string().trim().email().max(254),
  supportPhone: z.string().trim().min(7).max(40),
  whatsappNumber: z.string().trim().min(7).max(30),
  shippingFee: z.coerce.number().int().min(0).max(1_000_000),
  lowStockThreshold: z.coerce.number().int().min(0).max(100_000),
  codEnabled: z.boolean(),
  payfastPlaceholderEnabled: z.boolean(),
});

export async function updateSettingsAction(formData: FormData) {
  await requireAdmin("/admin/settings");
  const parsed = settingsSchema.safeParse({
    storeName: text(formData, "storeName"),
    supportEmail: text(formData, "supportEmail"),
    supportPhone: text(formData, "supportPhone"),
    whatsappNumber: text(formData, "whatsappNumber"),
    shippingFee: text(formData, "shippingFee"),
    lowStockThreshold: text(formData, "lowStockThreshold"),
    codEnabled: formData.get("codEnabled") === "on",
    payfastPlaceholderEnabled:
      formData.get("payfastPlaceholderEnabled") === "on",
  });

  if (!parsed.success) {
    actionError(
      "/admin/settings",
      parsed.error.issues[0]?.message ?? "Check the settings.",
    );
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("store_settings")
    .update({
      store_name: parsed.data.storeName,
      support_email: parsed.data.supportEmail,
      support_phone: parsed.data.supportPhone,
      whatsapp_number: parsed.data.whatsappNumber,
      shipping_fee: parsed.data.shippingFee,
      low_stock_threshold: parsed.data.lowStockThreshold,
      cod_enabled: parsed.data.codEnabled,
      payfast_placeholder_enabled:
        parsed.data.payfastPlaceholderEnabled,
    })
    .eq("id", true);

  if (error) actionError("/admin/settings", error.message);
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
