"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface LuxuryButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export function LuxuryButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: LuxuryButtonProps) {
  const baseStyles =
    "px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300";

  const variants = {
    primary:
      "bg-[#C0C0C0] text-[#0A0A0A] hover:bg-[#D9D9D9] glow-silver-soft hover:glow-silver",
    secondary:
      "bg-transparent text-[#C0C0C0] border border-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-[#0A0A0A]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
