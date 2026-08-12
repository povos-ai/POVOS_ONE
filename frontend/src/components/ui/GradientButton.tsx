"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function GradientButton({ 
  children, 
  onClick, 
  variant = "primary",
  size = "md",
  className = "",
  type = "button"
}: GradientButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/25",
    secondary: "bg-gradient-to-r from-slate-500 to-slate-700 text-white hover:shadow-lg",
    danger: "bg-gradient-to-r from-rose-500 to-red-600 text-white hover:shadow-lg hover:shadow-rose-500/25",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 dark:border-blue-400 dark:text-blue-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`
        font-semibold rounded-xl transition-all duration-300 
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

