import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { checkoutSchema } from "../../lib/commerce";
import {
  createConfirmationToken,
  hashConfirmationToken,
} from "../../lib/orders";
import { enforceRateLimit } from "../../lib/rate-limit";
import { createSupabaseAdminClient } from "../../lib/supabase/admin";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export const dynamic = "force-dynamic";

function validationErrors(
  issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>,
) {
  return issues.reduce<Record<string, string>>((errors, issue) => {
    const field = String(issue.path[0] ?? "form");
    errors[field] ??= issue.message;
    return errors;
  }, {});
}

export async function POST(request: NextRequest) {
  try {
    const allowed = await enforceRateLimit(request, "checkout", 8, 900);

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Too many checkout attempts. Please wait before trying again.",
        },
        { status: 429 },
      );
    }

    const body: unknown = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please correct the highlighted checkout details.",
          fields: validationErrors(parsed.error.issues),
        },
        { status: 400 },
      );
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = supabase
      ? await supabase.auth.getUser()
      : { data: { user: null } };
    const admin = createSupabaseAdminClient();
    const confirmationToken = createConfirmationToken();
    const confirmationTokenHash =
      hashConfirmationToken(confirmationToken);

    const { data, error } = await admin.rpc("create_cod_order", {
      p_customer_name: parsed.data.name,
      p_customer_phone: parsed.data.phone,
      p_customer_email: parsed.data.email ?? "",
      p_city: parsed.data.city,
      p_delivery_address: parsed.data.address,
      p_order_notes: parsed.data.notes ?? "",
      p_items: parsed.data.items.map((item) => ({
        slug: item.productId,
        quantity: item.quantity,
      })),
      p_user_id: user?.id ?? null,
      p_idempotency_key: parsed.data.idempotencyKey,
      p_confirmation_token_hash: confirmationTokenHash,
    });

    if (error || !data?.[0]) {
      const unavailable =
        error?.message.toLowerCase().includes("unavailable") ||
        error?.message.toLowerCase().includes("stock");

      return NextResponse.json(
        {
          error: unavailable
            ? "One or more fragrances changed or are no longer available. Review your bag and try again."
            : "We could not place your order. Please try again.",
        },
        { status: unavailable ? 409 : 500 },
      );
    }

    const created = data[0];

    if (parsed.data.saveAddress && user) {
      await admin.from("customer_addresses").insert({
        user_id: user.id,
        label: "Home",
        full_name: parsed.data.name,
        phone: parsed.data.phone,
        city: parsed.data.city,
        address_line: parsed.data.address,
        notes: parsed.data.notes ?? null,
        is_default: false,
      });
    }

    await admin
      .from("orders")
      .update({
        confirmation_token_hash: confirmationTokenHash,
        confirmation_token_expires_at: new Date(
          Date.now() + 24 * 60 * 60 * 1000,
        ).toISOString(),
      })
      .eq("id", created.order_id);

    return NextResponse.json(
      {
        orderNumber: created.order_number,
        confirmationToken,
        subtotal: created.subtotal,
        shippingFee: created.shipping_fee,
        total: created.total,
        currency: created.currency,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
          ETag: createHash("sha256")
            .update(created.order_id)
            .digest("hex"),
        },
      },
    );
  } catch (error) {
    console.error("Order creation failed.", {
      type: error instanceof Error ? error.name : "UnknownError",
    });

    return NextResponse.json(
      {
        error:
          "Checkout is temporarily unavailable. Please try again shortly.",
      },
      { status: 503 },
    );
  }
}
