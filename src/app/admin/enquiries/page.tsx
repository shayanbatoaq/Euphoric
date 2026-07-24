import Link from "next/link";
import { createSupabaseAdminClient } from "../../lib/supabase/admin";
import { requireAdmin } from "../../lib/auth";
import { formatDate, formatStatus } from "../../components/account/OrderUI";
import { AdminHeader } from "../../components/admin/AdminUI";

const statuses = ["new", "in_progress", "resolved", "spam"] as const;

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin("/admin/enquiries");
  const query = await searchParams;
  const admin = createSupabaseAdminClient();
  let request = admin
    .from("contact_enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (statuses.includes(query.status as (typeof statuses)[number])) {
    request = request.eq(
      "status",
      query.status as (typeof statuses)[number],
    );
  }
  const { data: enquiries } = await request;

  return (
    <div>
      <AdminHeader
        eyebrow="Customer care"
        title="Enquiries"
        description={`${enquiries?.length ?? 0} enquiries in this view.`}
      />
      <form className="mt-8 flex max-w-md gap-3 border border-[#C0C0C0]/15 bg-[#111113] p-4">
        <select
          name="status"
          defaultValue={query.status}
          className="account-input"
        >
          <option value="">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {formatStatus(status)}
            </option>
          ))}
        </select>
        <button className="bg-[#C0C0C0] px-5 text-xs font-semibold uppercase tracking-wider text-black">
          Apply
        </button>
      </form>

      <div className="mt-6 divide-y divide-[#C0C0C0]/10 border border-[#C0C0C0]/15">
        {(enquiries ?? []).map((enquiry) => (
          <Link
            key={enquiry.id}
            href={`/admin/enquiries/${enquiry.id}`}
            className="grid gap-3 bg-[#111113] p-5 transition hover:bg-[#171719] md:grid-cols-[minmax(0,1fr)_180px_130px] md:items-center"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">
                {enquiry.subject || "Website enquiry"}
              </p>
              <p className="mt-1 truncate text-sm text-[#D9D9D9]/55">
                {enquiry.name} · {enquiry.email || enquiry.phone || "No contact"}
              </p>
            </div>
            <p className="text-xs text-[#D9D9D9]/55">
              {formatDate(enquiry.created_at)}
            </p>
            <span className="border border-[#C0C0C0]/20 px-2 py-1 text-center text-[10px] uppercase tracking-wider text-[#C0C0C0]">
              {formatStatus(enquiry.status)}
            </span>
          </Link>
        ))}
        {!enquiries?.length && (
          <p className="bg-[#111113] p-8 text-center text-[#D9D9D9]/55">
            No enquiries in this view.
          </p>
        )}
      </div>
    </div>
  );
}
