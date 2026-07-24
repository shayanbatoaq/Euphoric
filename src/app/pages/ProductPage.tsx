"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LuxuryButton } from "../components/LuxuryButton";
import { ProductCard } from "../components/ProductCard";
import { Minus, Plus } from "lucide-react";
import {
  formatProductPrice,
  getCategoryShopHref,
  type Product,
} from "../data/products";
import { useStorefront } from "../context/StorefrontContext";

export function ProductPage({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, closeCart } = useStorefront();

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-20 pt-44 sm:pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2 text-[#D9D9D9]">
            <li>
              <Link href="/" className="hover:text-[#C0C0C0] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/shop" className="hover:text-[#C0C0C0] transition-colors">
                Shop
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#C0C0C0]">{product.displayName}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/5] bg-[#1C1C1E] glow-silver"
          >
            <ImageWithFallback
              src={product.image}
              alt={`${product.displayName} perfume impression`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="text-xs tracking-widest uppercase text-[#C0C0C0]">
                <Link
                  href={getCategoryShopHref(product.category)}
                  className="hover:text-white transition-colors"
                >
                  {product.category}
                </Link>{" "}
                · Premium Perfume Impression
              </div>
              <h1 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mt-2">
                {product.displayName}
              </h1>
            </div>

            {/* Price */}
            <div className="text-3xl text-[#C0C0C0]">
              {formatProductPrice(product.price)}
              <span className="ml-3 text-sm text-[#D9D9D9]">
                {product.sizeMl} ml
              </span>
            </div>

            {/* Description */}
            <p className="text-[#D9D9D9] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Notes */}
            <div className="glass p-6 space-y-4">
              <h3 className="text-[#C0C0C0] text-xs tracking-widest uppercase">
                Fragrance Notes
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-[#F5F5F5] text-sm block mb-1">Top Notes</span>
                  <span className="text-[#D9D9D9] text-sm">
                    {product.notes.top.join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F5F5] text-sm block mb-1">Heart Notes</span>
                  <span className="text-[#D9D9D9] text-sm">
                    {product.notes.heart.join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F5F5] text-sm block mb-1">Base Notes</span>
                  <span className="text-[#D9D9D9] text-sm">
                    {product.notes.base.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-3">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-[#C0C0C0]/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-[#C0C0C0]/10 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-[#C0C0C0]" />
                  </button>
                  <span className="px-6 text-[#F5F5F5]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    className="p-3 hover:bg-[#C0C0C0]/10 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#C0C0C0]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <LuxuryButton
                variant="primary"
                className="flex-1"
                onClick={() => addToCart(product.id, quantity)}
              >
                Add to Cart
              </LuxuryButton>
              <LuxuryButton
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  addToCart(product.id, quantity);
                  closeCart();
                  router.push("/checkout");
                }}
              >
                Buy Now
              </LuxuryButton>
            </div>

          </motion.div>
        </div>

        {/* Description Section */}
        <div className="mb-20">
          <h2 className="border-b border-[#C0C0C0]/10 pb-4 mb-8 text-sm tracking-widest uppercase text-[#C0C0C0]">
            Description
          </h2>
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#D9D9D9] space-y-4"
            >
              <p className="whitespace-pre-line leading-relaxed">
                {product.longDescription}
              </p>
              <p className="text-sm text-[#D9D9D9]/80">
                Euphoric is an independent perfume impressions brand and is not
                affiliated with any designer fragrance house referenced for scent
                inspiration.
              </p>
            </motion.div>
          </div>
        </div>

        {/* You May Also Like */}
        <div>
          <h2 className="font-playfair text-3xl sm:text-4xl text-[#F5F5F5] mb-8">
            You May Also Like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
