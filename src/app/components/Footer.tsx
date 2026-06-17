import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#C0C0C0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl tracking-wider text-[#C0C0C0] mb-4">
              EUPHORIC
            </h3>
            <p className="text-[#D9D9D9] text-sm leading-relaxed">
              Luxury perfume impressions crafted to leave a lasting impression.
              Premium-inspired scents for the discerning individual.
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
                  href="/shop"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
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
              <li>
                <a
                  href="#"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C0C0C0] text-xs tracking-widest uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-2 mb-6">
              <li className="text-[#D9D9D9] text-sm">info@euphoric.com</li>
              <li className="text-[#D9D9D9] text-sm">+1 (555) 123-4567</li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C0C0C0]/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-[#D9D9D9] text-sm">
              © 2026 Euphoric. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[#D9D9D9] text-sm hover:text-[#C0C0C0] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
