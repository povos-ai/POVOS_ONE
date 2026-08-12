"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { GradientButton } from "./ui/GradientButton";

export function InteractiveDemo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setShowResult(false);
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50 max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-center mb-4 dark:text-white">
        <span className="gradient-text">Interactive Demo</span>
      </h3>
      <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
        See how POVOS One finds your perfect opportunity.
      </p>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="I'm looking for tech grants and startup funding"
            className="w-full pl-10 pr-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {isSearching && (
          <div className="flex items-center gap-3 py-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-5 h-5 text-blue-500" />
            </motion.div>
            <span className="text-sm text-slate-500 dark:text-slate-400">AI is analyzing 12,846+ opportunities...</span>
          </div>
        )}

        {showResult && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium dark:text-white">Top Match: Digital India Scholarship (94%)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">AI Confidence: 94%</p>
              </div>
            </div>
          </motion.div>
        )}

        {!showResult && !isSearching && (
          <GradientButton variant="primary" size="sm" className="w-full" onClick={handleSearch} disabled={!searchQuery.trim()}>
            Try it Now <ArrowRight className="w-4 h-4 ml-2 inline" />
          </GradientButton>
        )}

        {showResult && (
          <GradientButton variant="outline" size="sm" className="w-full" onClick={() => { setShowResult(false); setSearchQuery(""); }}>
            Start Over
          </GradientButton>
        )}
      </div>
    </div>
  );
}



