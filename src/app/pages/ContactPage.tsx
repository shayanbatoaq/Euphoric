"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Facebook,
  Instagram,
  LoaderCircle,
  Mail,
  Phone,
} from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { InternationalPhoneField } from "../components/InternationalPhoneField";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import type { CountryCode } from "libphonenumber-js";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+92 ",
    phoneCountry: "PK" as CountryCode,
    subject: "",
    message: "",
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as {
        message?: string;
        error?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok) {
        setFieldErrors(result.fields ?? {});
        setStatus({
          kind: "error",
          message: result.error ?? "Please check your details and try again.",
        });
        return;
      }

      setStatus({
        kind: "success",
        message: result.message ?? "Your message has been received.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "+92 ",
        phoneCountry: "PK",
        subject: "",
        message: "",
        website: "",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "We could not send your message. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "What is a perfume impression?",
      answer:
        "A perfume impression is a fragrance inspired by the scent profile and character of a well-known luxury fragrance. It offers a familiar olfactory experience through Euphoric's own presentation.",
    },
    {
      question: "Are Euphoric perfumes original designer fragrances?",
      answer:
        "Euphoric creates perfume impressions; we do not sell original designer perfumes or counterfeit products. References to well-known fragrances are used only to help customers understand the inspiration and scent direction.",
    },
    {
      question: "How do I choose the right fragrance?",
      answer:
        "Start with the notes and fragrance families you already enjoy, then explore our men's, women's, and unisex collections. If you are unsure, message us on WhatsApp and we can help narrow down the options.",
    },
    {
      question: "How long do the fragrances last?",
      answer:
        "Our perfume impressions are designed for long-lasting wear. Performance naturally varies by fragrance, skin chemistry, climate, and application, so we recommend applying to moisturized pulse points.",
    },
    {
      question: "Which collections do you offer?",
      answer:
        "Euphoric offers 194 fragrance impressions across men's, women's, and unisex collections, with scent profiles for everyday wear, special occasions, and everything in between.",
    },
    {
      question: "How can I confirm availability or place an order?",
      answer:
        "Browse the collection and complete the secure cash-on-delivery checkout online. Contact us directly when you need fragrance guidance or order support.",
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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#D9D9D9] text-lg"
          >
            Let us help you discover a fragrance that feels like you.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-playfair text-4xl text-[#F5F5F5] mb-6">
                Contact Information
              </h2>
              <p className="text-[#D9D9D9] leading-relaxed mb-8">
                Whether you need help choosing an impression, understanding
                fragrance notes, or confirming availability, the Euphoric team
                is ready to guide you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="glass p-3">
                  <Mail className="w-6 h-6 text-[#C0C0C0]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] mb-1">Email</h3>
                  <a
                    href="mailto:info@euphoric.com"
                    className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
                  >
                    info@euphoric.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="glass p-3">
                  <Phone className="w-6 h-6 text-[#C0C0C0]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] mb-1">Phone</h3>
                  <a
                    href="tel:+923702143838"
                    className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
                  >
                    +92 370 2143838
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="glass p-3">
                  <WhatsAppIcon className="w-6 h-6 text-[#C0C0C0]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/923702143838"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
                  >
                    Chat with us
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="glass p-3">
                  <Instagram className="w-6 h-6 text-[#C0C0C0]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] mb-1">Instagram</h3>
                  <a
                    href="https://www.instagram.com/euphoricpak/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
                  >
                    @euphoricpak
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="glass p-3">
                  <Facebook className="w-6 h-6 text-[#C0C0C0]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] mb-1">Facebook</h3>
                  <a
                    href="https://www.facebook.com/profile.php?id=61560426114088"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D9D9D9] hover:text-[#C0C0C0] transition-colors"
                  >
                    Euphoric PK
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
              <div>
                <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C0C0C0] transition-colors"
                  required
                />
                {fieldErrors.name && (
                  <p className="mt-2 text-xs text-red-200">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C0C0C0] transition-colors"
                  required
                />
                {fieldErrors.email && (
                  <p className="mt-2 text-xs text-red-200">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <InternationalPhoneField
                country={formData.phoneCountry}
                value={formData.phone}
                error={fieldErrors.phone}
                onCountryChange={(phoneCountry) =>
                  setFormData((current) => ({ ...current, phoneCountry }))
                }
                onValueChange={(phone) =>
                  setFormData((current) => ({ ...current, phone }))
                }
              />

              <div>
                <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C0C0C0] transition-colors"
                  required
                />
                {fieldErrors.subject && (
                  <p className="mt-2 text-xs text-red-200">
                    {fieldErrors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[#C0C0C0] text-xs tracking-widest uppercase block mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C0C0C0] transition-colors resize-none"
                  required
                />
                {fieldErrors.message && (
                  <p className="mt-2 text-xs text-red-200">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <div
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label>
                  Website
                  <input
                    name="website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {status && (
                <p
                  role="status"
                  className={`border p-3 text-sm leading-6 ${
                    status.kind === "success"
                      ? "border-emerald-300/20 bg-emerald-300/5 text-emerald-100"
                      : "border-red-300/20 bg-red-300/5 text-red-100"
                  }`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 bg-[#C0C0C0] px-8 py-3 text-sm uppercase tracking-widest text-[#0A0A0A] transition hover:bg-[#D9D9D9] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting && (
                  <LoaderCircle className="size-4 animate-spin" />
                )}
                {submitting ? "Sending…" : "Send Your Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl text-[#F5F5F5] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#D9D9D9]">
            A clearer guide to perfume impressions and the Euphoric collection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#C0C0C0]/10 last:border-0"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
                  <span className="text-[#F5F5F5] pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-[#D9D9D9] leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>
    </div>
  );
}
