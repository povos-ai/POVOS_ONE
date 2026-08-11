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
  color?: string;
  delay?: number;
}

export function StatCard({ 
  icon, 
  label, 
  value, 
  change, 
  isPositive = true,
  color = "blue",
  delay = 0 
}: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    emerald: "bg-emerald-500/10 text-emerald-500",
    amber: "bg-amber-500/10 text-amber-500",
    rose: "bg-rose-500/10 text-rose-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl md:text-3xl font-bold mt-1 dark:text-white">{value}</p>
          <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
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