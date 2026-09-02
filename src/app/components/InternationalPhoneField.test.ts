import { describe, expect, it } from "vitest";
import { formatInternationalPhone } from "./InternationalPhoneField";

describe("international contact phone formatting", () => {
  it("matches the checkout format for Pakistan", () => {
    expect(formatInternationalPhone("03341111657", "PK")).toBe(
      "+92 334-1111657",
    );
  });

  it("formats a selected international country number", () => {
    expect(formatInternationalPhone("2025550123", "US")).toBe(
      "+1 202 555 0123",
    );
  });
});
