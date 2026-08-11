"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Target, Clock, Sparkles } from "lucide-react";

export default function KPIGrid() {
  const [stats, setStats] = useState({ new: 0, matches: 0, closing: 0, avgMatch: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:3001/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats({
          new: data.newOpportunities || 0,
          matches: data.strongMatches || 0,
          closing: data.closingSoon || 0,
          avgMatch: data.avgMatch || 0,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: "New Opportunities", value: stats.new, icon: <TrendingUp className="w-5 h-5 text-blue-600" />, subtext: "Available for you" },
    { title: "Strong Matches", value: stats.matches, icon: <Target className="w-5 h-5 text-green-600" />, subtext: "80%+ match" },
    { title: "Closing Soon", value: stats.closing, icon: <Clock className="w-5 h-5 text-orange-600" />, subtext: "next 7 days" },
    { title: "Avg. Match", value: stats.avgMatch ? `${stats.avgMatch}%` : "—", icon: <Sparkles className="w-5 h-5 text-purple-600" />, subtext: "AI confidence" },
  ];

  if (loading) {
    return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1,2,3,4].map(i => <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 animate-pulse h-24"></div>)}
    </div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-500">{card.title}</span>
            {card.icon}
          </div>
          <div className="text-xl font-bold text-gray-800">{card.value}</div>
          <div className="text-xs text-gray-400 mt-1">{card.subtext}</div>
        </div>
      ))}
    </div>
  );
}

