"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

export function CategoryCard({ title, image, link }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden"
    >
      <Link href={link}>
        <div className="aspect-[4/5] relative">
          {/* Image */}
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-end p-6 sm:p-8">
            <div>
              <span className="text-xs tracking-widest uppercase text-[#D9D9D9] mb-2 block">
                Explore
              </span>
              <h3 className="font-playfair text-3xl sm:text-4xl text-[#F5F5F5] group-hover:text-[#C0C0C0] transition-colors">
                {title}
              </h3>
            </div>
          </div>

          {/* Border on hover */}
          <div className="absolute inset-0 border-2 border-[#C0C0C0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}
