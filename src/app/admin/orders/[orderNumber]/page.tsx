import { notFound } from "next/navigation";
import { requireAdmin } from "../../../lib/auth";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { updateOrderAction } from "../../../actions/admin";
import { formatProductPrice } from "../../../data/products";
import {
  formatDate,
  formatStatus,
  StatusBadge,
} from "../../../components/account/OrderUI";
import {
  AdminHeader,
  AdminNotice,
} from "../../../components/admin/AdminUI";
import { AdminOrderTools } from "../../../components/admin/AdminOrderTools";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { ConfirmSubmitButton } from "../../../components/ConfirmSubmitButton";
import type {
  OrderStatus,
  PaymentStatus,
} from "../../../types/database";

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

export default async function AdminOrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { orderNumber } = await params;
  const query = await searchParams;
  await requireAdmin(`/admin/orders/${orderNumber}`);
  const admin = createSupabaseAdminClient();
  const { data: order } = await admin
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .maybeSingle();
  if (!order) notFound();

  const [{ data: items }, { data: history }] = await Promise.all([
    admin
      .from("order_items")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at"),
    admin
      .from("order_status_history")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div className="admin-print-order">
      <AdminHeader
        eyebrow="Order"
        title={order.order_number}
        description={`Placed ${formatDate(order.created_at)} · ${order.customer_name}`}
      />
      <AdminNotice saved={Boolean(query.saved)} error={query.error} />
      <AdminOrderTools
        phone={order.customer_phone}
        address={`${order.delivery_address}, ${order.city}`}
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <section className="border border-[#C0C0C0]/15 bg-[#111113]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C0C0C0]/10 px-5 py-4">
              <h3 className="font-playfair text-2xl">Items</h3>
              <div className="flex gap-2">
                <StatusBadge value={order.order_status} />
                <StatusBadge value={order.payment_status} />
              </div>
            </div>
            <div className="divide-y divide-[#C0C0C0]/10">
              {(items ?? []).map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[56px_1fr_auto] gap-4 p-5 text-sm"
                >
                  <ImageWithFallback
                    src={item.product_image_url || "/product-placeholder.svg"}
                    alt=""
                    className="h-16 w-14 bg-black object-cover"
                  />
                  <div>
                    <p>{item.product_name}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-[#D9D9D9]/50">
                      {item.product_brand} · {item.product_size_ml} ml · Qty{" "}
                      {item.quantity} · {formatProductPrice(item.unit_price)} each
                    </p>
                  </div>
                  <p className="text-[#C0C0C0]">
                    {formatProductPrice(item.line_total)}
                  </p>
                </div>
              ))}
            </div>
            <dl className="space-y-3 border-t border-[#C0C0C0]/10 p-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#D9D9D9]/55">Subtotal</dt>
                <dd>{formatProductPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#D9D9D9]/55">Shipping</dt>
                <dd>{formatProductPrice(order.shipping_fee)}</dd>
              </div>
              <div className="flex justify-between border-t border-[#C0C0C0]/10 pt-3 font-medium">
                <dt>Total</dt>
                <dd className="text-[#C0C0C0]">
                  {formatProductPrice(order.total)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="border border-[#C0C0C0]/15 bg-[#111113] p-5">
            <h3 className="font-playfair text-2xl">Status history</h3>
            <ol className="mt-5 space-y-5 border-l border-[#C0C0C0]/20 pl-5">
              {(history ?? []).map((entry) => (
                <li key={entry.id}>
                  <p className="text-sm">
                    {entry.previous_status
                      ? `${formatStatus(entry.previous_status)} → `
                      : ""}
                    {formatStatus(entry.new_status)}
                  </p>
                  <p className="mt-1 text-xs text-[#D9D9D9]/50">
                    {formatDate(entry.created_at)}
                    {entry.note ? ` · ${entry.note}` : ""}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <form
            action={updateOrderAction}
            className="admin-print-hidden space-y-5 border border-[#C0C0C0]/15 bg-[#111113] p-5"
          >
            <h3 className="font-playfair text-2xl">Update order</h3>
            <input type="hidden" name="orderId" value={order.id} />
            <input
              type="hidden"
              name="orderNumber"
              value={order.order_number}
            />
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
                Order status
              </span>
              <select
                name="orderStatus"
                defaultValue={order.order_status}
                className="account-input"
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
                Payment status
              </span>
              <select
                name="paymentStatus"
                defaultValue={order.payment_status}
                className="account-input"
              >
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
                Internal note
              </span>
              <textarea
                name="adminNote"
                rows={4}
                defaultValue={order.admin_notes ?? ""}
                className="account-input resize-none"
              />
            </label>
            <label className="flex items-start gap-3 text-xs leading-5 text-[#D9D9D9]/60">
              <input
                type="checkbox"
                name="override"
                className="mt-1 size-4 accent-[#C0C0C0]"
              />
              Override the normal status sequence. Use only to correct an
              operational mistake.
            </label>
            <ConfirmSubmitButton
              fieldName="orderStatus"
              confirmValues={["cancelled", "returned"]}
              message="This terminal status can restore tracked inventory and cannot be moved forward normally. Continue?"
              className="w-full bg-[#C0C0C0] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black"
            >
              Save update
            </ConfirmSubmitButton>
          </form>

          <section className="border border-[#C0C0C0]/15 bg-[#111113] p-5">
            <h3 className="font-playfair text-2xl">Customer & delivery</h3>
            <p className="mt-4 text-sm leading-6 text-[#D9D9D9]/70">
              {order.customer_name}
              <br />
              <a href={`tel:${order.customer_phone}`}>{order.customer_phone}</a>
              <br />
              {order.customer_email && (
                <a href={`mailto:${order.customer_email}`}>
                  {order.customer_email}
                </a>
              )}
            </p>
            <p className="mt-4 border-t border-[#C0C0C0]/10 pt-4 text-sm leading-6 text-[#D9D9D9]/70">
              {order.delivery_address}
              <br />
              {order.city}
            </p>
            {order.order_notes && (
              <p className="mt-4 border-t border-[#C0C0C0]/10 pt-4 text-sm text-[#D9D9D9]/70">
                <strong className="text-[#F5F5F5]">Customer note:</strong>{" "}
                {order.order_notes}
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
