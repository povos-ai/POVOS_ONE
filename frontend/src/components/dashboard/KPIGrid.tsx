"use client";
import { TrendingUp, Target, Clock, Sparkles } from "lucide-react";

export default function KPIGrid({ stats }) {
  const cards = [
    { title: "New Opportunities", value: stats.new, icon: <TrendingUp className="w-5 h-5 text-blue-600" />, subtext: "Available for you" },
    { title: "Strong Matches", value: stats.strong, icon: <Target className="w-5 h-5 text-teal-600" />, subtext: "80%+ match" },
    { title: "Closing Soon", value: stats.closing, icon: <Clock className="w-5 h-5 text-orange-600" />, subtext: "next 7 days" },
    { title: "Avg. Match", value: stats.avgMatch ? `${stats.avgMatch}%` : "—", icon: <Sparkles className="w-5 h-5 text-purple-600" />, subtext: "AI confidence" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition h-24 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">{card.title}</span>
            {card.icon}
          </div>
          <div className="text-2xl font-bold text-gray-800">{card.value}</div>
          <div className="text-xs text-gray-400">{card.subtext}</div>
        </div>
      ))}
    </div>
  );
}
