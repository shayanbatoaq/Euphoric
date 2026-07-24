import Link from "next/link";
import { createSupabaseAdminClient } from "../../lib/supabase/admin";
import { requireAdmin } from "../../lib/auth";
import { formatProductPrice } from "../../data/products";
import { formatDate, StatusBadge } from "../../components/account/OrderUI";
import { AdminHeader } from "../../components/admin/AdminUI";
import type { OrderStatus, PaymentStatus } from "../../types/database";

const PAGE_SIZE = 25;
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

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await requireAdmin("/admin/orders");
  const query = await searchParams;
  const page = Math.max(1, Number.parseInt(query.page ?? "1", 10) || 1);
  const search = safeSearch(query.q ?? "");
  const status = orderStatuses.includes(query.status as OrderStatus)
    ? (query.status as OrderStatus)
    : "";
  const payment = paymentStatuses.includes(query.payment as PaymentStatus)
    ? (query.payment as PaymentStatus)
    : "";
  const admin = createSupabaseAdminClient();

  let request = admin
    .from("orders")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: query.sort === "oldest" })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (search) {
    request = request.or(
      `order_number.ilike.%${search}%,customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%,customer_email.ilike.%${search}%`,
    );
  }
  if (status) request = request.eq("order_status", status);
  if (payment) request = request.eq("payment_status", payment);
  if (query.from) request = request.gte("created_at", `${query.from}T00:00:00`);
  if (query.to) request = request.lte("created_at", `${query.to}T23:59:59`);

  const { data: orders, count } = await request;
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
  const qs = new URLSearchParams(
    Object.entries(query).flatMap(([key, value]) =>
      value && key !== "page" ? [[key, value]] : [],
    ),
  );
  const exportQuery = qs.toString();

  return (
    <div>
      <AdminHeader
        eyebrow="Fulfilment"
        title="Orders"
        description={`${count ?? 0} matching orders. Search, filter, export, and open an order to update its workflow.`}
        actionHref={`/api/admin/orders/export${exportQuery ? `?${exportQuery}` : ""}`}
        actionLabel="Export CSV"
      />

      <form className="mt-8 grid gap-3 border border-[#C0C0C0]/15 bg-[#111113] p-4 md:grid-cols-2 xl:grid-cols-7">
        <input
          name="q"
          defaultValue={search}
          placeholder="Order, customer, phone…"
          className="account-input xl:col-span-2"
        />
        <select name="status" defaultValue={status} className="account-input">
          <option value="">All order statuses</option>
          {orderStatuses.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select
          name="payment"
          defaultValue={payment}
          className="account-input"
        >
          <option value="">All payment statuses</option>
          {paymentStatuses.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <input
          name="from"
          type="date"
          defaultValue={query.from}
          className="account-input"
          aria-label="From date"
        />
        <input
          name="to"
          type="date"
          defaultValue={query.to}
          className="account-input"
          aria-label="To date"
        />
        <div className="flex gap-2">
          <select name="sort" defaultValue={query.sort} className="account-input">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button className="bg-[#C0C0C0] px-5 text-xs font-semibold uppercase tracking-wider text-black">
            Apply
          </button>
        </div>
      </form>

      <div className="mt-6 overflow-x-auto border border-[#C0C0C0]/15">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-[#171719] text-xs uppercase tracking-wider text-[#C0C0C0]">
            <tr>
              <th className="px-4 py-4">Order</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Placed</th>
              <th className="px-4 py-4">Order status</th>
              <th className="px-4 py-4">Payment</th>
              <th className="px-4 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C0C0C0]/10">
            {(orders ?? []).map((order) => (
              <tr key={order.id} className="bg-[#111113]">
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/orders/${order.order_number}`}
                    className="font-medium underline decoration-[#C0C0C0]/40 underline-offset-4"
                  >
                    {order.order_number}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <p>{order.customer_name}</p>
                  <p className="text-xs text-[#D9D9D9]/50">
                    {order.customer_phone}
                  </p>
                </td>
                <td className="px-4 py-4 text-[#D9D9D9]/60">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge value={order.order_status} />
                </td>
                <td className="px-4 py-4">
                  <StatusBadge value={order.payment_status} />
                </td>
                <td className="px-4 py-4 text-right text-[#C0C0C0]">
                  {formatProductPrice(order.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders?.length && (
          <p className="bg-[#111113] p-8 text-center text-[#D9D9D9]/60">
            No orders match these filters.
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-[#D9D9D9]/55">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <PageLink
            page={Math.max(1, page - 1)}
            query={qs}
            disabled={page <= 1}
          >
            Previous
          </PageLink>
          <PageLink
            page={Math.min(totalPages, page + 1)}
            query={qs}
            disabled={page >= totalPages}
          >
            Next
          </PageLink>
        </div>
      </div>
    </div>
  );
}

function PageLink({
  page,
  query,
  disabled,
  children,
}: {
  page: number;
  query: URLSearchParams;
  disabled: boolean;
  children: string;
}) {
  const next = new URLSearchParams(query);
  next.set("page", String(page));
  return (
    <Link
      href={disabled ? "#" : `/admin/orders?${next.toString()}`}
      aria-disabled={disabled}
      className={`border border-[#C0C0C0]/20 px-4 py-2 ${
        disabled ? "pointer-events-none opacity-35" : "hover:border-[#C0C0C0]"
      }`}
    >
      {children}
    </Link>
  );
}
