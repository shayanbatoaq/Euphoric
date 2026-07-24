"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowUpRight, Sparkles, Heart, Award, Users } from "lucide-react";
import {
  getCategoryShopHref,
  type ProductCategory,
} from "../data/products";

export function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: "Premium Quality",
      description:
        "High-quality perfume impressions designed with depth, balance, and lasting presence in mind.",
    },
    {
      icon: Heart,
      title: "Considered Presentation",
      description:
        "From bottle to digital experience, every detail is shaped to feel polished and intentional.",
    },
    {
      icon: Award,
      title: "Accessible Luxury",
      description:
        "A refined fragrance experience that brings the feeling of luxury closer to everyday life.",
    },
    {
      icon: Users,
      title: "Confidence Through Scent",
      description:
        "A diverse collection created to help every customer find a scent that feels distinctly their own.",
    },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-20">
      {/* Hero */}
      <section className="gradient-black-silver py-16 px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] mb-6"
          >
            About Euphoric
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#D9D9D9] text-lg leading-relaxed"
          >
            Premium perfume impressions for a life lived with confidence and
            style.
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
              Our Story
            </h2>
            <p className="text-[#D9D9D9] leading-relaxed">
              Euphoric begins with a simple idea: the character and emotion of a
              luxury fragrance should be easier to experience every day.
            </p>
            <p className="text-[#D9D9D9] leading-relaxed">
              We specialize in high-quality perfume impressions inspired by
              iconic scent profiles. Each collection balances sophistication,
              wearability, and considered presentation without making price the
              whole story.
            </p>
            <p className="text-[#D9D9D9] leading-relaxed">
              With 194 fragrances across men&apos;s, women&apos;s, and
              unisex collections, Euphoric offers room to explore every mood,
              moment, and expression of self.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] glow-silver"
          >
            <ImageWithFallback
              src="/about-us-image.png"
              alt="Euphoric's black and gold botanical brand setting"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Collections Explanation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Men's Collection",
              category: "Men" as ProductCategory,
              description:
                "Confident fragrance profiles ranging from crisp and fresh to warm, woody, and intense—created for modern personal style.",
              image: "/men-perfume-banner.png",
            },
            {
              title: "Women's Collection",
              category: "Women" as ProductCategory,
              description:
                "Expressive compositions spanning luminous florals, soft musks, warm vanillas, and richer evening signatures.",
              image: "/women-perfumes-image.png",
            },
            {
              title: "Unisex Collection",
              category: "Unisex" as ProductCategory,
              description:
                "Versatile scent profiles chosen for character rather than convention, ready to be worn by anyone who connects with them.",
              image: "/unisex-perfumes-image.png",
            },
          ].map((collection, index) => (
            <motion.article
              key={collection.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass h-full overflow-hidden hover-lift"
            >
              <Link
                href={getCategoryShopHref(collection.category)}
                aria-label={`Shop the ${collection.title}`}
                className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F5] focus-visible:ring-inset"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <ImageWithFallback
                    src={collection.image}
                    alt={`Euphoric ${collection.category.toLowerCase()} fragrance collection`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="font-playfair text-2xl text-[#F5F5F5] transition-colors group-hover:text-white">
                      {collection.title}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 shrink-0 text-[#C0C0C0] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1"
                    />
                  </div>
                  <p className="text-[#D9D9D9] text-sm leading-relaxed">
                    {collection.description}
                  </p>
                  <span className="mt-auto pt-6 text-xs uppercase tracking-[0.18em] text-[#C0C0C0]">
                    Explore collection
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
            Our Values
          </h2>
          <p className="text-[#D9D9D9] max-w-2xl mx-auto">
            Quality, presentation, accessibility, and confidence in every
            detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 text-center hover-lift"
            >
              <value.icon className="w-12 h-12 text-[#C0C0C0] mx-auto mb-4" />
              <h3 className="text-[#F5F5F5] text-xl mb-3">{value.title}</h3>
              <p className="text-[#D9D9D9] text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1C1C1E] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-[#C0C0C0] text-6xl font-playfair mb-4">"</div>
            <p className="font-playfair text-3xl sm:text-4xl text-[#F5F5F5] italic leading-relaxed">
              Luxury is not only what you wear. It is how a fragrance makes you
              feel.
            </p>
            <div className="h-px w-24 bg-[#C0C0C0] mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
            Our Mission
          </h2>
          <p className="text-[#D9D9D9] text-lg leading-relaxed">
            To make the experience of luxury fragrance more accessible through
            high-quality perfume impressions, elegant presentation, and a
            collection broad enough for every customer to discover a signature
            of their own.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
