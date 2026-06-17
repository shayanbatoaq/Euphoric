"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  notes: string;
  price: number;
  image: string;
}

export function ProductCard({
  id,
  name,
  category,
  notes,
  price,
  image,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${id}`}>
        <div className="relative overflow-hidden bg-[#1C1C1E] border border-[#C0C0C0]/10 hover-lift">
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden">
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-[#C0C0C0] text-[#0A0A0A] px-6 py-2 flex items-center space-x-2 text-sm tracking-widest uppercase hover:bg-[#D9D9D9] transition-colors">
              <ShoppingBag className="w-4 h-4" />
              <span>Quick Add</span>
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="glass-light px-3 py-1 text-xs tracking-widest uppercase text-[#D9D9D9]">
              {category}
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <Link href={`/product/${id}`}>
          <h3 className="font-playfair text-xl text-[#F5F5F5] hover:text-[#C0C0C0] transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-[#D9D9D9] text-sm">{notes}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#C0C0C0] text-lg">${price}</span>
          <button className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
