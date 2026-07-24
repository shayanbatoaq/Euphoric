import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { createSupabaseAdminClient } from "../../../../lib/supabase/admin";
import type {
  OrderStatus,
  PaymentStatus,
} from "../../../../types/database";

const orderStatuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "dispatched",
  "delivered",
  "cancelled",
  "returned",
];
const paymentStatuses: PaymentStatus[] = [
  "pending",
  "paid",
  "failed",
  "refunded",
];

function safeSearch(value: string) {
  return value.trim().replace(/[,%()]/g, "").slice(0, 100);
}

function csvCell(value: unknown) {
  let output = String(value ?? "").replaceAll('"', '""');
  if (/^[=+\-@]/.test(output)) output = `'${output}`;
  return `"${output}"`;
}

export async function GET(request: NextRequest) {
  await requireAdmin("/admin/orders");
  const params = request.nextUrl.searchParams;
  const search = safeSearch(params.get("q") ?? "");
  const status = params.get("status") as OrderStatus | null;
  const payment = params.get("payment") as PaymentStatus | null;
  const admin = createSupabaseAdminClient();
  let query = admin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10_000);

  if (search) {
    query = query.or(
      `order_number.ilike.%${search}%,customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%,customer_email.ilike.%${search}%`,
    );
  }
  if (status && orderStatuses.includes(status)) {
    query = query.eq("order_status", status);
  }
  if (payment && paymentStatuses.includes(payment)) {
    query = query.eq("payment_status", payment);
  }
  if (params.get("from")) {
    query = query.gte("created_at", `${params.get("from")}T00:00:00`);
  }
  if (params.get("to")) {
    query = query.lte("created_at", `${params.get("to")}T23:59:59`);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: "Could not export orders." }, {
      status: 500,
    });
  }

  const headers = [
    "Order number",
    "Placed at",
    "Customer",
    "Phone",
    "Email",
    "City",
    "Address",
    "Order status",
    "Payment method",
    "Payment status",
    "Subtotal",
    "Shipping",
    "Total",
    "Currency",
  ];
  const rows = (data ?? []).map((order) =>
    [
      order.order_number,
      order.created_at,
      order.customer_name,
      order.customer_phone,
      order.customer_email,
      order.city,
      order.delivery_address,
      order.order_status,
      order.payment_method,
      order.payment_status,
      order.subtotal,
      order.shipping_fee,
      order.total,
      order.currency,
    ]
      .map(csvCell)
      .join(","),
  );
  const csv = [headers.map(csvCell).join(","), ...rows].join("\r\n");

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="euphoric-orders-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
