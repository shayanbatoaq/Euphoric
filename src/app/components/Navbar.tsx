"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStorefront } from "../context/StorefrontContext";
import {
  AccountDialog,
  CartDrawer,
  SearchOverlay,
} from "./StorefrontPanels";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const {
    openSearch,
    openAccount,
    openCart,
    cartQuantity,
    user,
  } = useStorefront();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50">
        <div
          role="note"
          className="border-b border-[#C0C0C0]/15 bg-[#0A0A0A] px-3 py-2 text-center text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[#D9D9D9] sm:text-xs sm:tracking-[0.2em]"
        >
          All Euphoric perfumes are fragrance impressions and are not original
          designer scents.
        </div>

        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          aria-label="Primary navigation"
          className={`transition-all duration-300 ${
            scrolled
              ? "border-b border-[#C0C0C0]/10 bg-[#0A0A0A]/95 py-1.5 backdrop-blur-xl"
              : "bg-[#0A0A0A]/75 py-3 backdrop-blur-md"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex shrink-0 items-center"
                aria-label="Euphoric home"
              >
                <Image
                  src="/euphoric-logo.png"
                  alt="Euphoric"
                  width={339}
                  height={201}
                  priority
                  className="h-auto w-[108px] sm:w-[132px]"
                  sizes="(min-width: 640px) 132px, 108px"
                />
              </Link>

              <div className="hidden items-center space-x-8 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm uppercase tracking-widest transition-colors ${
                      pathname === link.path
                        ? "text-[#C0C0C0]"
                        : "text-[#D9D9D9] hover:text-[#C0C0C0]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4 sm:space-x-6">
                <button
                  type="button"
                  onClick={openSearch}
                  aria-label="Search products"
                  className="text-[#D9D9D9] transition-colors hover:text-[#C0C0C0]"
                >
                  <Search className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={openAccount}
                  aria-label={user ? "Open your account" : "Sign in or create an account"}
                  className="relative text-[#D9D9D9] transition-colors hover:text-[#C0C0C0]"
                >
                  <User className="size-5" />
                  {user && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 -top-1 size-2 rounded-full bg-emerald-300 ring-2 ring-[#0A0A0A]"
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={openCart}
                  aria-label={`Open shopping bag with ${cartQuantity} ${
                    cartQuantity === 1 ? "item" : "items"
                  }`}
                  className="relative text-[#D9D9D9] transition-colors hover:text-[#C0C0C0]"
                >
                  <ShoppingBag className="size-5" />
                  <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[#C0C0C0] text-[10px] font-medium text-[#0A0A0A]">
                    {cartQuantity > 99 ? "99+" : cartQuantity}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={
                    mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
                  }
                  aria-expanded={mobileMenuOpen}
                  className="text-[#D9D9D9] transition-colors hover:text-[#C0C0C0] md:hidden"
                >
                  {mobileMenuOpen ? (
                    <X className="size-6" />
                  ) : (
                    <Menu className="size-6" />
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden md:hidden"
                >
                  <div className="flex flex-col space-y-4 border-t border-[#C0C0C0]/10 py-5">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={`text-sm uppercase tracking-widest transition-colors ${
                          pathname === link.path
                            ? "text-[#C0C0C0]"
                            : "text-[#D9D9D9] hover:text-[#C0C0C0]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </header>

      <SearchOverlay />
      <AccountDialog />
      <CartDrawer />
    </>
  );
}
