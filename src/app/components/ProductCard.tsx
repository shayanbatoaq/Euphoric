"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  formatProductPrice,
  getCategoryShopHref,
  type Product,
} from "../data/products";
import { useStorefront } from "../context/StorefrontContext";

type ProductCardProps = Pick<
  Product,
  "id" | "name" | "brand" | "category" | "price" | "sizeMl" | "image"
>;

export function ProductCard({
  id,
  name,
  brand,
  category,
  price,
  sizeMl,
  image,
}: ProductCardProps) {
  const productTitle = `${name} by ${brand}`;
  const { addToCart } = useStorefront();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative overflow-hidden border border-[#C0C0C0]/10 bg-[#1C1C1E] hover-lift">
        <Link
          href={`/product/${id}`}
          className="block"
          aria-label={`View ${productTitle}`}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <ImageWithFallback
              src={image}
              alt={`${productTitle} product placeholder`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => addToCart(id)}
            className="pointer-events-auto flex items-center space-x-2 bg-[#C0C0C0] px-6 py-2 text-sm uppercase tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#D9D9D9]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Quick Add</span>
          </button>
        </div>

        <Link
          href={getCategoryShopHref(category)}
          className="glass-light absolute left-4 top-4 px-3 py-1 text-xs uppercase tracking-widest text-[#D9D9D9] transition-colors hover:text-white"
          aria-label={`Shop ${category} fragrances`}
        >
          {category}
        </Link>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <Link href={`/product/${id}`}>
          <h3 className="font-playfair text-xl text-[#F5F5F5] hover:text-[#C0C0C0] transition-colors">
            {name} <span className="text-[#C0C0C0]">by {brand}</span>
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-[#C0C0C0] text-lg">
            {formatProductPrice(price)}
            <span className="ml-2 text-xs text-[#D9D9D9]">· {sizeMl} ml</span>
          </span>
          <button
            type="button"
            onClick={() => addToCart(id)}
            aria-label={`Add ${productTitle} to shopping bag`}
            className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
