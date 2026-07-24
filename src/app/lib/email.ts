import "server-only";

import { Resend } from "resend";
import type {
  ContactEnquiryRow,
  OrderStatus,
  OrderWithItems,
} from "../types/database";
import { formatProductPrice } from "../data/products";

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getMailer() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;

  if (!apiKey || !from) {
    return null;
  }

  return { resend: new Resend(apiKey), from };
}

function orderTable(order: OrderWithItems) {
  const rows = order.order_items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #ddd">${escapeHtml(item.product_name)} by ${escapeHtml(item.product_brand)}</td>
          <td style="padding:10px;border-bottom:1px solid #ddd;text-align:center">${item.quantity}</td>
          <td style="padding:10px;border-bottom:1px solid #ddd;text-align:right">${formatProductPrice(item.line_total)}</td>
        </tr>`,
    )
    .join("");

  return `
    <table style="width:100%;border-collapse:collapse;margin:24px 0">
      <thead>
        <tr>
          <th style="padding:10px;text-align:left;border-bottom:2px solid #222">Fragrance</th>
          <th style="padding:10px;text-align:center;border-bottom:2px solid #222">Qty</th>
          <th style="padding:10px;text-align:right;border-bottom:2px solid #222">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function emailFrame(title: string, content: string) {
  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f3f3f3;color:#111;font-family:Arial,sans-serif">
        <div style="max-width:680px;margin:0 auto;padding:32px 16px">
          <div style="background:#0A0A0A;color:#F5F5F5;padding:28px;text-align:center">
            <div style="font-family:Georgia,serif;font-size:30px;letter-spacing:3px">EUPHORIC</div>
            <div style="margin-top:8px;color:#C0C0C0;font-size:12px;letter-spacing:2px;text-transform:uppercase">${escapeHtml(title)}</div>
          </div>
          <div style="background:#fff;padding:32px;line-height:1.6">${content}</div>
          <div style="padding:20px;text-align:center;color:#666;font-size:12px">
            Need help? Email info@euphoric.com or call +92 370 2143838.
          </div>
        </div>
      </body>
    </html>`;
}

export async function sendNewOrderEmails(order: OrderWithItems) {
  const mailer = getMailer();

  if (!mailer) {
    return;
  }

  const totals = `
    <p style="text-align:right">
      Subtotal: <strong>${formatProductPrice(order.subtotal)}</strong><br>
      Shipping: <strong>${formatProductPrice(order.shipping_fee)}</strong><br>
      Total: <strong>${formatProductPrice(order.total)}</strong>
    </p>`;
  const address = `${escapeHtml(order.delivery_address)}, ${escapeHtml(order.city)}`;
  const customerContent = emailFrame(
    "Order confirmation",
    `
      <h1 style="font-family:Georgia,serif">Thank you, ${escapeHtml(order.customer_name)}</h1>
      <p>Your cash-on-delivery order <strong>${escapeHtml(order.order_number)}</strong> has been received.</p>
      ${orderTable(order)}
      ${totals}
      <p><strong>Delivery address:</strong><br>${address}</p>
      <p>Please keep the total amount ready. Payment is due when your order is delivered.</p>
    `,
  );

  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin/orders/${encodeURIComponent(order.order_number)}`;
  const adminContent = emailFrame(
    "New order",
    `
      <h1 style="font-family:Georgia,serif">New order ${escapeHtml(order.order_number)}</h1>
      <p><strong>Customer:</strong> ${escapeHtml(order.customer_name)}<br>
      <strong>Phone:</strong> ${escapeHtml(order.customer_phone)}<br>
      <strong>Email:</strong> ${escapeHtml(order.customer_email)}<br>
      <strong>Address:</strong> ${address}</p>
      ${orderTable(order)}
      ${totals}
      <p><strong>Notes:</strong> ${escapeHtml(order.order_notes) || "None"}</p>
      <p><a href="${escapeHtml(adminUrl)}">Open this order in the admin dashboard</a></p>
    `,
  );

  const sends: Promise<unknown>[] = [];

  if (order.customer_email) {
    sends.push(
      mailer.resend.emails.send({
        from: mailer.from,
        to: order.customer_email,
        subject: `Euphoric order ${order.order_number}`,
        html: customerContent,
        headers: {
          "Idempotency-Key": `customer-order-${order.id}`,
        },
      }),
    );
  }

  if (process.env.ORDER_ADMIN_EMAIL) {
    sends.push(
      mailer.resend.emails.send({
        from: mailer.from,
        to: process.env.ORDER_ADMIN_EMAIL,
        subject: `New Euphoric order ${order.order_number}`,
        html: adminContent,
        headers: {
          "Idempotency-Key": `admin-order-${order.id}`,
        },
      }),
    );
  }

  const results = await Promise.allSettled(sends);
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Transactional order email failed.", {
        orderNumber: order.order_number,
      });
    }
  });
}

export async function sendOrderStatusEmail(
  order: OrderWithItems,
  previousStatus: OrderStatus,
  newStatus: OrderStatus,
  note?: string,
) {
  const mailer = getMailer();

  if (!mailer || !order.customer_email) {
    return;
  }

  const html = emailFrame(
    "Order update",
    `
      <h1 style="font-family:Georgia,serif">Your order has been updated</h1>
      <p>Order <strong>${escapeHtml(order.order_number)}</strong> moved from
      <strong>${escapeHtml(previousStatus)}</strong> to
      <strong>${escapeHtml(newStatus)}</strong>.</p>
      ${note ? `<p><strong>Update:</strong> ${escapeHtml(note)}</p>` : ""}
    `,
  );

  const { error } = await mailer.resend.emails.send({
    from: mailer.from,
    to: order.customer_email,
    subject: `Update for Euphoric order ${order.order_number}`,
    html,
    headers: {
      "Idempotency-Key": `order-status-${order.id}-${newStatus}-${order.updated_at}`,
    },
  });

  if (error) {
    console.error("Order-status email failed.", {
      orderNumber: order.order_number,
    });
  }
}

export async function sendContactEnquiryEmail(
  enquiry: ContactEnquiryRow,
) {
  const mailer = getMailer();
  const receiver =
    process.env.CONTACT_RECEIVER_EMAIL ?? process.env.ORDER_ADMIN_EMAIL;

  if (!mailer || !receiver) {
    return;
  }

  const html = emailFrame(
    "New enquiry",
    `
      <h1 style="font-family:Georgia,serif">${escapeHtml(enquiry.subject) || "New website enquiry"}</h1>
      <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}<br>
      <strong>Email:</strong> ${escapeHtml(enquiry.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>
    `,
  );

  const { error } = await mailer.resend.emails.send({
    from: mailer.from,
    to: receiver,
    subject: `Euphoric enquiry: ${enquiry.subject ?? "Website message"}`,
    html,
    headers: {
      "Idempotency-Key": `contact-enquiry-${enquiry.id}`,
    },
  });

  if (error) {
    console.error("Contact-enquiry email failed.", {
      enquiryId: enquiry.id,
    });
  }
}
