"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "../lib/auth";
import { normalizePakistanPhone } from "../lib/commerce";
import { createSupabaseServerClient } from "../lib/supabase/server";

const optionalPhone = z
  .string()
  .trim()
  .max(32)
  .transform((value) => (value ? normalizePakistanPhone(value) : null))
  .refine(
    (value) => !value || /^\+92 3\d{2}-\d{7}$/.test(value),
    "Enter a valid Pakistani mobile number.",
  );

const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: optionalPhone,
});

const addressSchema = z.object({
  label: z.string().trim().max(60).optional(),
  fullName: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .transform(normalizePakistanPhone)
    .pipe(z.string().regex(/^\+92 3\d{2}-\d{7}$/)),
  city: z.string().trim().min(2).max(100),
  addressLine: z.string().trim().min(10).max(500),
  notes: z.string().trim().max(500).optional(),
  isDefault: z.boolean(),
});

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

export async function updateProfileAction(formData: FormData) {
  const auth = await requireUser("/account/profile");
  const parsed = profileSchema.safeParse({
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
  });

  if (!parsed.success) {
    redirect(
      `/account/profile?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Check your details.")}`,
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/account/profile?error=Account+service+unavailable");

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.fullName,
      phone: parsed.data.phone,
    })
    .eq("id", auth.user.id);

  if (error) {
    redirect(`/account/profile?error=${encodeURIComponent(error.message)}`);
  }

  await supabase.auth.updateUser({
    data: { full_name: parsed.data.fullName },
  });
  revalidatePath("/account", "layout");
  redirect("/account/profile?saved=1");
}

export async function createAddressAction(formData: FormData) {
  const auth = await requireUser("/account/addresses");
  const parsed = addressSchema.safeParse({
    label: text(formData, "label") || undefined,
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
    city: text(formData, "city"),
    addressLine: text(formData, "addressLine"),
    notes: text(formData, "notes") || undefined,
    isDefault: formData.get("isDefault") === "on",
  });

  if (!parsed.success) {
    redirect(
      `/account/addresses?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Check the address.")}`,
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/account/addresses?error=Account+service+unavailable");

  if (parsed.data.isDefault) {
    const { error: resetError } = await supabase
      .from("customer_addresses")
      .update({ is_default: false })
      .eq("user_id", auth.user.id);

    if (resetError) {
      redirect(
        `/account/addresses?error=${encodeURIComponent(resetError.message)}`,
      );
    }
  }

  const { error } = await supabase.from("customer_addresses").insert({
    user_id: auth.user.id,
    label: parsed.data.label || null,
    full_name: parsed.data.fullName,
    phone: parsed.data.phone,
    city: parsed.data.city,
    address_line: parsed.data.addressLine,
    notes: parsed.data.notes || null,
    is_default: parsed.data.isDefault,
  });

  if (error) {
    redirect(`/account/addresses?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/account/addresses");
  redirect("/account/addresses?saved=1");
}

export async function deleteAddressAction(formData: FormData) {
  const auth = await requireUser("/account/addresses");
  const addressId = z.string().uuid().safeParse(text(formData, "addressId"));

  if (!addressId.success) {
    redirect("/account/addresses?error=Invalid+address");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/account/addresses?error=Account+service+unavailable");

  const { error } = await supabase
    .from("customer_addresses")
    .delete()
    .eq("id", addressId.data)
    .eq("user_id", auth.user.id);

  if (error) {
    redirect(`/account/addresses?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/account/addresses");
  redirect("/account/addresses?deleted=1");
}

export async function setDefaultAddressAction(formData: FormData) {
  const auth = await requireUser("/account/addresses");
  const addressId = z.string().uuid().safeParse(text(formData, "addressId"));

  if (!addressId.success) {
    redirect("/account/addresses?error=Invalid+address");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/account/addresses?error=Account+service+unavailable");

  const { error: resetError } = await supabase
    .from("customer_addresses")
    .update({ is_default: false })
    .eq("user_id", auth.user.id);

  if (resetError) {
    redirect(
      `/account/addresses?error=${encodeURIComponent(resetError.message)}`,
    );
  }

  const { error } = await supabase
    .from("customer_addresses")
    .update({ is_default: true })
    .eq("id", addressId.data)
    .eq("user_id", auth.user.id);

  if (error) {
    redirect(`/account/addresses?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/account/addresses");
  redirect("/account/addresses?saved=1");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
