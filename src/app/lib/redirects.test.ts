import { describe, expect, it } from "vitest";
import { safeReturnPath } from "./redirects";

describe("safeReturnPath", () => {
  it("allows local application paths", () => {
    expect(safeReturnPath("/account/orders")).toBe("/account/orders");
  });

  it("blocks absolute and protocol-relative redirects", () => {
    expect(safeReturnPath("https://attacker.example", "/")).toBe("/");
    expect(safeReturnPath("//attacker.example", "/")).toBe("/");
  });
});
