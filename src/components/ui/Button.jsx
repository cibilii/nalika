"use client";

import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-500/20",
  secondary: "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700",
  ghost: "bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`px-6 py-3 rounded-2xl font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}