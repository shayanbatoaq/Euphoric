import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { requireAdmin } from "../../../lib/auth";
import { updateEnquiryStatusAction } from "../../../actions/admin";
import { formatDate, formatStatus } from "../../../components/account/OrderUI";
import {
  AdminHeader,
  AdminNotice,
} from "../../../components/admin/AdminUI";

const statuses = ["new", "in_progress", "resolved", "spam"] as const;

export default async function AdminEnquiryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  await requireAdmin(`/admin/enquiries/${id}`);
  const query = await searchParams;
  const admin = createSupabaseAdminClient();
  const { data: enquiry } = await admin
    .from("contact_enquiries")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!enquiry) notFound();

  return (
    <div>
      <AdminHeader
        eyebrow="Enquiry"
        title={enquiry.subject || "Website enquiry"}
        description={`From ${enquiry.name} · ${formatDate(enquiry.created_at)}`}
      />
      <AdminNotice saved={Boolean(query.saved)} error={query.error} />

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <article className="border border-[#C0C0C0]/15 bg-[#111113] p-6">
          <p className="whitespace-pre-wrap text-sm leading-7 text-[#D9D9D9]/80">
            {enquiry.message}
          </p>
        </article>
        <aside className="space-y-6">
          <form
            action={updateEnquiryStatusAction}
            className="border border-[#C0C0C0]/15 bg-[#111113] p-5"
          >
            <input type="hidden" name="enquiryId" value={enquiry.id} />
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-[#C0C0C0]">
                Status
              </span>
              <select
                name="status"
                defaultValue={enquiry.status}
                className="account-input"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </label>
            <button className="mt-4 w-full bg-[#C0C0C0] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black">
              Save status
            </button>
          </form>
          <section className="border border-[#C0C0C0]/15 bg-[#111113] p-5">
            <h3 className="font-playfair text-2xl">Contact</h3>
            <p className="mt-4 break-words text-sm leading-6 text-[#D9D9D9]/70">
              {enquiry.name}
              <br />
              {enquiry.email && (
                <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
              )}
              <br />
              {enquiry.phone && (
                <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
              )}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
