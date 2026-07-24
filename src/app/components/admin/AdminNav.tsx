"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gauge,
  Inbox,
  PackageSearch,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: Gauge },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: PackageSearch },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Administration"
      className="flex gap-2 overflow-x-auto lg:flex-col"
    >
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href ||
          (href !== "/admin" && pathname.startsWith(`${href}/`));
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
    </nav>
  );
}
