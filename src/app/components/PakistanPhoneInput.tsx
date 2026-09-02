"use client";

import { useState } from "react";

function formatDigits(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("92")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length <= 3) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3)}`;
}

export function PakistanPhoneInput({
  name,
  defaultValue = "",
  required = false,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [nationalNumber, setNationalNumber] = useState(() =>
    formatDigits(defaultValue),
  );
  const normalized = nationalNumber.replace(/\D/g, "");

  return (
    <div className="flex h-12 w-full overflow-hidden border border-[#C0C0C0]/25 bg-[#0A0A0A]">
      <span className="flex items-center border-r border-[#C0C0C0]/20 px-4 text-sm text-[#F5F5F5]">
        +92
      </span>
      <input
        type="tel"
        value={nationalNumber}
        onChange={(event) => setNationalNumber(formatDigits(event.target.value))}
        placeholder="333-1234567"
        inputMode="tel"
        autoComplete="tel"
        required={required}
        aria-label="Pakistani phone number"
        className="min-w-0 flex-1 bg-transparent px-4 py-0 text-sm text-[#F5F5F5] outline-none placeholder:text-[#D9D9D9]/30"
      />
      <input
        type="hidden"
        name={name}
        value={normalized ? `+92 ${nationalNumber}` : ""}
      />
    </div>
  );
}
