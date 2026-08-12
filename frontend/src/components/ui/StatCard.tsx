"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  isPositive?: boolean;
  color?: "blue" | "purple" | "emerald" | "amber" | "rose";
  delay?: number;
  onClick?: () => void;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-500",
  purple: "bg-purple-500/10 text-purple-500",
  emerald: "bg-emerald-500/10 text-emerald-500",
  amber: "bg-amber-500/10 text-amber-500",
  rose: "bg-rose-500/10 text-rose-500",
};

const hoverColorMap: Record<string, string> = {
  blue: "hover:shadow-blue-500/10",
  purple: "hover:shadow-purple-500/10",
  emerald: "hover:shadow-emerald-500/10",
  amber: "hover:shadow-amber-500/10",
  rose: "hover:shadow-rose-500/10",
};

export function StatCard({
  icon,
  label,
  value,
  change,
  isPositive = true,
  color = "blue",
  delay = 0,
  onClick,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2 } 
      }}
      onClick={onClick}
      className={`
        glass rounded-2xl p-6 
        hover:shadow-xl transition-all duration-300 
        ${hoverColorMap[color]}
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="text-2xl md:text-3xl font-bold mt-1 text-slate-900 dark:text-white">
            {value}
          </p>
          <div className={`
            flex items-center gap-1 mt-1 text-xs font-medium
            ${isPositive ? 'text-emerald-500' : 'text-rose-500'}
          `}>
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {change}
          </div>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

