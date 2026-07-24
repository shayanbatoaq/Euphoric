"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { LuxuryButton } from "../components/LuxuryButton";
import { ProductCard } from "../components/ProductCard";
import { CategoryCard } from "../components/CategoryCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Sparkles, Clock, Award, Heart, Instagram, Facebook } from "lucide-react";
import {
  getCategoryShopHref,
  type Product,
} from "../data/products";

export function HomePage({
  featuredProducts,
}: {
  featuredProducts: Product[];
}) {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-black-silver overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 gradient-radial-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <span className="text-xs tracking-widest uppercase text-[#C0C0C0]">
                Premium Perfume Impressions
              </span>
              <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] leading-tight">
                Luxury, Reimagined for{" "}
                <span className="text-[#C0C0C0] italic">Every Day</span>
              </h1>
              <p className="text-[#D9D9D9] text-lg leading-relaxed max-w-lg">
                Discover high-quality perfume impressions inspired by iconic
                luxury fragrances, thoughtfully presented for men, women, and
                every identity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <LuxuryButton variant="primary">Shop Fragrances</LuxuryButton>
                </Link>
                <Link href="/about">
                  <LuxuryButton variant="secondary">
                    Discover Our Story
                  </LuxuryButton>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square glow-silver">
                <ImageWithFallback
                  src="/hero-banner-image.png"
                  alt="Euphoric Voyage perfume"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
              Find Your Signature
            </h2>
            <p className="text-[#D9D9D9] max-w-2xl mx-auto">
              Explore 194 perfume impressions across our men&apos;s,
              women&apos;s, and unisex collections.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <CategoryCard
              title="Men"
              image="/men-perfume-banner.png"
              link={getCategoryShopHref("Men")}
            />
            <CategoryCard
              title="Women"
              image="/women-perfumes-image.png"
              link={getCategoryShopHref("Women")}
            />
            <CategoryCard
              title="Unisex"
              image="/unisex-perfumes-image.png"
              link={getCategoryShopHref("Unisex")}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1C1C1E]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
              The Fragrance Edit
            </h2>
            <p className="text-[#D9D9D9] max-w-2xl mx-auto">
              A curated introduction to the moods, notes, and personalities in
              the Euphoric collection.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <LuxuryButton variant="secondary">View All Products</LuxuryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <ImageWithFallback
                src="/about-us-image.png"
                alt="Euphoric's black and gold botanical brand setting"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-xs tracking-widest uppercase text-[#C0C0C0]">
                Our Philosophy
              </span>
              <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
                Everyday Luxury, Thoughtfully Expressed
              </h2>
              <p className="text-[#D9D9D9] leading-relaxed">
                Fragrance is more than a finishing touch. It is confidence,
                memory, and identity expressed without a word. Euphoric brings
                the character of celebrated luxury scents into a collection
                designed for real life.
              </p>
              <p className="text-[#D9D9D9] leading-relaxed">
                From the fragrance profile to the presentation, every detail is
                considered to make premium scent feel personal, polished, and
                within reach.
              </p>
              <Link href="/about">
                <LuxuryButton variant="secondary">Learn More</LuxuryButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1C1C1E]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5]">
              The Euphoric Standard
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Impressions",
                description:
                  "Luxury-inspired fragrance profiles with a refined character of their own.",
              },
              {
                icon: Clock,
                title: "Long-Lasting Wear",
                description:
                  "Composed to stay with you from the first spray to the final impression.",
              },
              {
                icon: Sparkles,
                title: "194 Fragrances",
                description:
                  "A growing catalogue for different moods, moments, and identities.",
              },
              {
                icon: Heart,
                title: "Everyday Elegance",
                description:
                  "Sophisticated scents that make an everyday ritual feel exceptional.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 text-center hover-lift"
              >
                <feature.icon className="w-12 h-12 text-[#C0C0C0] mx-auto mb-4" />
                <h3 className="text-[#F5F5F5] text-xl mb-2">{feature.title}</h3>
                <p className="text-[#D9D9D9] text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1C1C1E]/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
              Join the Euphoric Community
            </h2>
            <p className="text-[#D9D9D9] max-w-2xl mx-auto">
              Follow Euphoric PK for premium perfume impressions, fragrance
              inspiration, collection updates, and everyday elegance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Instagram",
                handle: "@euphoricpak",
                description:
                  "Discover luxury-inspired scent profiles, fragrance highlights, and the latest from Euphoric.",
                cta: "Visit Instagram",
                href: "https://www.instagram.com/euphoricpak/",
                icon: Instagram,
              },
              {
                name: "Facebook",
                handle: "Euphoric PK",
                description:
                  "Stay connected for collection updates, product moments, and everyday scent inspiration.",
                cta: "Visit Facebook",
                href: "https://www.facebook.com/profile.php?id=61560426114088",
                icon: Facebook,
              },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass group p-8 sm:p-10 hover-lift border border-transparent hover:border-[#C0C0C0]/40 transition-colors"
              >
                <social.icon className="w-10 h-10 text-[#C0C0C0] mb-8" />
                <p className="text-xs tracking-widest uppercase text-[#C0C0C0] mb-3">
                  {social.name}
                </p>
                <h3 className="font-playfair text-3xl text-[#F5F5F5] mb-4">
                  {social.handle}
                </h3>
                <p className="text-[#D9D9D9] leading-relaxed mb-8">
                  {social.description}
                </p>
                <span className="text-sm tracking-widest uppercase text-[#F5F5F5] group-hover:text-[#C0C0C0] transition-colors">
                  {social.cta}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
