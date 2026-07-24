import { NextResponse, type NextRequest } from "next/server";
import { contactEnquirySchema } from "../../lib/commerce";
import { sendContactEnquiryEmail } from "../../lib/email";
import { enforceRateLimit } from "../../lib/rate-limit";
import { createSupabaseAdminClient } from "../../lib/supabase/admin";

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
    const allowed = await enforceRateLimit(request, "contact", 6, 900);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many messages. Please wait before trying again." },
        { status: 429 },
      );
    }

    const body: unknown = await request.json();
    const parsed = contactEnquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check the highlighted details.",
          fields: validationErrors(parsed.error.issues),
        },
        { status: 400 },
      );
    }

    const admin = createSupabaseAdminClient();
    const { data: enquiry, error } = await admin
      .from("contact_enquiries")
      .insert({
        name: parsed.data.name,
        email: parsed.data.email ?? null,
        phone: parsed.data.phone ?? null,
        subject: parsed.data.subject ?? null,
        message: parsed.data.message,
        status: "new",
      })
      .select("*")
      .single();

    if (error || !enquiry) {
      return NextResponse.json(
        { error: "Your message could not be saved. Please try again." },
        { status: 500 },
      );
    }

    await sendContactEnquiryEmail(enquiry).catch(() => undefined);

    return NextResponse.json(
      {
        message:
          "Thank you. Your message has been received and our team will reply soon.",
      },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Contact enquiry failed.", {
      type: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { error: "Contact is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }
}
