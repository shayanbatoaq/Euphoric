"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Package,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const links = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/profile", label: "Profile", icon: UserRound },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
];

export function AccountNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Account"
      className="flex gap-2 overflow-x-auto lg:flex-col"
    >
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href ||
          (href !== "/account" && pathname.startsWith(`${href}/`));
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-3 border px-4 py-3 text-sm transition ${
              active
                ? "border-[#C0C0C0] bg-[#C0C0C0] text-black"
                : "border-[#C0C0C0]/15 text-[#D9D9D9] hover:border-[#C0C0C0]/50 hover:text-white"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
      {isAdmin && (
        <Link
          href="/admin"
          className="flex shrink-0 items-center gap-3 border border-[#C0C0C0]/15 px-4 py-3 text-sm text-[#D9D9D9] transition hover:border-[#C0C0C0]/50 hover:text-white"
        >
          <ShieldCheck className="size-4" />
          Admin
        </Link>
      )}
    </nav>
  );
}
