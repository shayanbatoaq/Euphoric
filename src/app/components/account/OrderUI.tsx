import type { OrderStatus, PaymentStatus } from "../../types/database";

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

export function formatStatus(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) =>
    letter.toUpperCase(),
  );
}

const statusStyles: Record<OrderStatus | PaymentStatus, string> = {
  pending: "border-amber-300/25 bg-amber-300/5 text-amber-100",
  confirmed: "border-sky-300/25 bg-sky-300/5 text-sky-100",
  processing: "border-violet-300/25 bg-violet-300/5 text-violet-100",
  dispatched: "border-blue-300/25 bg-blue-300/5 text-blue-100",
  delivered: "border-emerald-300/25 bg-emerald-300/5 text-emerald-100",
  cancelled: "border-red-300/25 bg-red-300/5 text-red-100",
  returned: "border-orange-300/25 bg-orange-300/5 text-orange-100",
  paid: "border-emerald-300/25 bg-emerald-300/5 text-emerald-100",
  failed: "border-red-300/25 bg-red-300/5 text-red-100",
  refunded: "border-violet-300/25 bg-violet-300/5 text-violet-100",
};

export function StatusBadge({
  value,
}: {
  value: OrderStatus | PaymentStatus;
}) {
  return (
    <span
      className={`inline-flex border px-2.5 py-1 text-[11px] uppercase tracking-wider ${statusStyles[value]}`}
    >
      {formatStatus(value)}
    </span>
  );
}

export function AccountNotice({
  success,
  error,
}: {
  success?: string;
  error?: string;
}) {
  if (!success && !error) return null;
  return (
    <p
      role="status"
      className={`mb-6 border p-3 text-sm ${
        error
          ? "border-red-300/20 bg-red-300/5 text-red-100"
          : "border-emerald-300/20 bg-emerald-300/5 text-emerald-100"
      }`}
    >
      {error ?? success}
    </p>
  );
}
