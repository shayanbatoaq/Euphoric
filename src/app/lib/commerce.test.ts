import { describe, expect, it } from "vitest";
import {
  calculateOrderTotals,
  canTransitionOrder,
  checkoutSchema,
  contactEnquirySchema,
  isValidEuphoricOrderNumber,
  normalizePakistanPhone,
  pakistanPhoneSchema,
} from "./commerce";

describe("Pakistan phone normalization", () => {
  it.each([
    ["03341111657", "+92 334-1111657"],
    ["923341111657", "+92 334-1111657"],
    ["+92 334-1111657", "+92 334-1111657"],
    ["0092 334 1111657", "+92 334-1111657"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizePakistanPhone(input)).toBe(expected);
    expect(pakistanPhoneSchema.parse(input)).toBe(expected);
  });

  it("rejects incomplete and non-mobile numbers", () => {
    expect(pakistanPhoneSchema.safeParse("+92 334-123").success).toBe(false);
    expect(pakistanPhoneSchema.safeParse("+92 214-1111657").success).toBe(
      false,
    );
  });
});

describe("checkout validation and totals", () => {
  const validCheckout = {
    name: "Ayesha Khan",
    phone: "03341111657",
    email: "ayesha@example.com",
    city: "Karachi",
    address: "House 10, Street 5, DHA Phase 2",
    notes: "",
    items: [{ productId: "voyage-nautica-men", quantity: 2 }],
    idempotencyKey: "4a4a2f6c-3f16-40d8-a10a-957f1125d711",
    website: "",
  };

  it("accepts a valid COD payload and normalizes the phone", () => {
    const parsed = checkoutSchema.parse(validCheckout);
    expect(parsed.phone).toBe("+92 334-1111657");
    expect(parsed.items).toEqual([
      { productId: "voyage-nautica-men", quantity: 2 },
    ]);
  });

  it("rejects invalid quantities and bot honeypot content", () => {
    expect(
      checkoutSchema.safeParse({
        ...validCheckout,
        items: [{ productId: "voyage-nautica-men", quantity: 100 }],
      }).success,
    ).toBe(false);
    expect(
      checkoutSchema.safeParse({ ...validCheckout, website: "bot.example" })
        .success,
    ).toBe(false);
  });

  it("calculates subtotal, shipping, and total", () => {
    expect(
      calculateOrderTotals([
        { unitPrice: 2000, quantity: 2 },
        { unitPrice: 2500, quantity: 1 },
      ]),
    ).toEqual({ subtotal: 6500, shippingFee: 300, total: 6800 });
  });
});

describe("order workflow", () => {
  it("permits the normal fulfilment sequence", () => {
    expect(canTransitionOrder("pending", "confirmed")).toBe(true);
    expect(canTransitionOrder("confirmed", "processing")).toBe(true);
    expect(canTransitionOrder("processing", "dispatched")).toBe(true);
    expect(canTransitionOrder("dispatched", "delivered")).toBe(true);
  });

  it("blocks invalid jumps and terminal-state changes", () => {
    expect(canTransitionOrder("pending", "delivered")).toBe(false);
    expect(canTransitionOrder("delivered", "cancelled")).toBe(false);
    expect(canTransitionOrder("cancelled", "confirmed")).toBe(false);
  });

  it("recognizes generated order-number structure", () => {
    expect(isValidEuphoricOrderNumber("EUP-20260724-91AB2F")).toBe(true);
    expect(isValidEuphoricOrderNumber("EUP-2026-BAD")).toBe(false);
  });
});

describe("contact validation", () => {
  it("accepts a legitimate enquiry", () => {
    expect(
      contactEnquirySchema.safeParse({
        name: "Ali Raza",
        email: "ali@example.com",
        phone: "+92 300-1234567",
        subject: "Fragrance advice",
        message: "Please help me choose an everyday fragrance.",
        website: "",
      }).success,
    ).toBe(true);
  });

  it("rejects a short message and filled honeypot", () => {
    expect(
      contactEnquirySchema.safeParse({
        name: "Ali",
        email: "ali@example.com",
        message: "Hi",
        website: "spam",
      }).success,
    ).toBe(false);
  });
});
