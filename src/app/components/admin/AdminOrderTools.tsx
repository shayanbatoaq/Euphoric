"use client";

import { useState } from "react";
import { Clipboard, Printer } from "lucide-react";

export function AdminOrderTools({
  phone,
  address,
}: {
  phone: string;
  address: string;
}) {
  const [copied, setCopied] = useState("");

  async function copy(value: string, label: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1600);
  }

  return (
    <div className="admin-print-hidden mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-2 border border-[#C0C0C0]/25 px-4 py-2.5 text-xs uppercase tracking-wider hover:border-[#C0C0C0]"
      >
        <Printer className="size-4" />
        Print packing slip
      </button>
      <button
        type="button"
        onClick={() => copy(phone, "Phone")}
        className="flex items-center gap-2 border border-[#C0C0C0]/25 px-4 py-2.5 text-xs uppercase tracking-wider hover:border-[#C0C0C0]"
      >
        <Clipboard className="size-4" />
        {copied === "Phone" ? "Phone copied" : "Copy phone"}
      </button>
      <button
        type="button"
        onClick={() => copy(address, "Address")}
        className="flex items-center gap-2 border border-[#C0C0C0]/25 px-4 py-2.5 text-xs uppercase tracking-wider hover:border-[#C0C0C0]"
      >
        <Clipboard className="size-4" />
        {copied === "Address" ? "Address copied" : "Copy address"}
      </button>
    </div>
  );
}
