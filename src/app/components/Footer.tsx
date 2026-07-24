import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { getCategoryShopHref } from "../data/products";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#C0C0C0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-block" aria-label="Euphoric home">
              <Image
                src="/euphoric-logo.png"
                alt="Euphoric"
                width={339}
                height={201}
                className="h-auto w-[170px]"
                sizes="170px"
              />
            </Link>
            <p className="text-[#D9D9D9] text-sm leading-relaxed">
              Premium perfume impressions inspired by luxury, created for
              long-lasting everyday elegance.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[#C0C0C0] text-xs tracking-widest uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link
                  href={getCategoryShopHref("Men")}
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href={getCategoryShopHref("Women")}
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href={getCategoryShopHref("Unisex")}
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  Unisex
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#C0C0C0] text-xs tracking-widest uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C0C0C0] text-xs tracking-widest uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-2 mb-6">
              <li>
                <a
                  href="mailto:info@euphoric.com"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  info@euphoric.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+923702143838"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  +92 370 2143838
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/euphoricpak/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Euphoric on Instagram"
                className="inline-flex size-5 items-center justify-center text-[#D9D9D9] leading-none hover:text-[#C0C0C0] transition-colors"
              >
                <Instagram className="block size-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61560426114088"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Euphoric on Facebook"
                className="inline-flex size-5 items-center justify-center text-[#D9D9D9] leading-none hover:text-[#C0C0C0] transition-colors"
              >
                <Facebook className="block size-5" />
              </a>
              <a
                href="https://wa.me/923702143838"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Euphoric on WhatsApp"
                className="inline-flex size-5 items-center justify-center text-[#D9D9D9] leading-none hover:text-[#C0C0C0] transition-colors"
              >
                <WhatsAppIcon className="block size-5" />
              </a>
              <a
                href="mailto:info@euphoric.com"
                aria-label="Email Euphoric"
                className="inline-flex size-5 items-center justify-center text-[#D9D9D9] leading-none hover:text-[#C0C0C0] transition-colors"
              >
                <Mail className="block size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C0C0C0]/10 mt-12 pt-8">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-[#D9D9D9] text-sm">
              © 2026 Euphoric. All rights reserved.
            </p>
            <p className="text-[#D9D9D9] text-sm">
              Powered by{" "}
              <a
                href="https://patricians.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C0C0C0] underline decoration-[#C0C0C0]/40 underline-offset-4 hover:text-white transition-colors"
              >
                Patricians
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
