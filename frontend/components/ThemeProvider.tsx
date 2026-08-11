"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  Users, 
  Search,
  Bell,
  UserCircle,
  Plus,
  Filter,
  LayoutGrid,
  List,
  ArrowUpRight,
  Clock,
  Star,
  ChevronRight
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const stats = [
  { label: "Live Opportunities", value: "12,846", icon: <Briefcase className="w-5 h-5" />, change: "+12%", color: "blue" },
  { label: "Government Schemes", value: "284", icon: <TrendingUp className="w-5 h-5" />, change: "+8%", color: "purple" },
  { label: "AI Matches", value: "1,289", icon: <Sparkles className="w-5 h-5" />, change: "+23%", color: "emerald" },
  { label: "Active Users", value: "3,245", icon: <Users className="w-5 h-5" />, change: "+18%", color: "amber" },
];

const recentOpportunities = [
  { title: "Digital India Scholarship", status: "Active", date: "2 days ago", views: 234 },
  { title: "Bihar Startup Grant", status: "Review", date: "5 days ago", views: 189 },
  { title: "Senior Software Engineer", status: "Closed", date: "1 week ago", views: 567 },
];

export default function DashboardPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-6 lg:p-8">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Welcome back, Admin</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Here's what's happening with your platform today.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <button className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition">
            <UserCircle className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </button>
          <GradientButton variant="primary" size="sm">
            <Plus className="w-4 h-4 inline mr-1" />
            Create
          </GradientButton>
        </motion.div>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative max-w-2xl mb-8"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Search opportunities, schemes, startups, or keywords..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition dark:text-white"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition">
            <Filter className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </motion.div>

      {/* ===== FILTER TABS ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center gap-2 mb-8"
      >
        {["All", "Schemes", "Jobs", "Startups", "Grants", "Fellowships"].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              i === 0 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                : "glass hover:bg-white/30 dark:hover:bg-slate-700/30"
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button 
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition ${view === "grid" ? "bg-blue-500/20 text-blue-500" : "glass"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition ${view === "list" ? "bg-blue-500/20 text-blue-500" : "glass"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            color={stat.color}
            delay={i * 0.1}
          />
        ))}
      </div>

      {/* ===== RECENT OPPORTUNITIES & RECOMMENDATIONS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Opportunities */}
        <AnimatedCard delay={0.4} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg dark:text-white">Recent Opportunities</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentOpportunities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl glass hover:bg-white/30 dark:hover:bg-slate-700/30 transition cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{item.title}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {item.views} views
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Active" ? "bg-emerald-500/20 text-emerald-500" :
                    item.status === "Review" ? "bg-amber-500/20 text-amber-500" :
                    "bg-rose-500/20 text-rose-500"
                  }`}>
                    {item.status}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>

        {/* AI Recommendations */}
        <AnimatedCard delay={0.5}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-lg dark:text-white">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {["Startup Grant - Bihar", "Digital Scholarship 2026", "CSR Initiative - Healthcare"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="p-4 rounded-xl glass hover:bg-white/30 dark:hover:bg-slate-700/30 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium dark:text-white">{item}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Match: 94%</span>
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: "94%" }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <GradientButton variant="secondary" size="sm" className="w-full mt-4">
            View All Recommendations
          </GradientButton>
        </AnimatedCard>
      </div>

    </div>
  );
}