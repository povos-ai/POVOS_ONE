"use client";

import { useEffect, useState } from "react";
import { Sparkles, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AIIntelligence() {
  const [insights, setInsights] = useState({ matches: 0, highConfidence: 0, sectors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:3001/ai/intelligence", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("AI unavailable");
        return res.json();
      })
      .then((data) => {
        setInsights({
          matches: data.matches || 0,
          highConfidence: data.highConfidence || 0,
          sectors: data.sectors || ["Technology", "Education", "Entrepreneurship"],
        });
      })
      .catch(() => {
        setError((((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" instanceof Error ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong".message : (typeof (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" === "string" ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" : JSON.stringify((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" instanceof Error ? ((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" instanceof Error ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong".message : (typeof (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" === "string" ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" : JSON.stringify((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong".message : (typeof ((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" instanceof Error ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong".message : (typeof (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" === "string" ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" : JSON.stringify((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" === "string" ? ((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" instanceof Error ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong".message : (typeof (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" === "string" ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" : JSON.stringify((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" : JSON.stringify(((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" instanceof Error ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong".message : (typeof (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" === "string" ? (true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong" : JSON.stringify((true?.message || "Something went wrong" instanceof Error ? true?.message || "Something went wrong".message : (typeof true?.message || "Something went wrong" === "string" ? true?.message || "Something went wrong" : JSON.stringify(true?.message || "Something went wrong"))))))))));
        setInsights({ matches: 12, highConfidence: 5, sectors: ["Technology", "Education", "Entrepreneurship"] });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse h-40"></div>;
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center text-sm text-gray-500">
        <Sparkles className="w-5 h-5 text-gray-400 mx-auto mb-2" />
        <p>AI insights temporarily unavailable.</p>
        <p className="text-xs mt-1">Check back later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1 mb-2">
        <Sparkles className="w-4 h-4 text-purple-600" /> AI Intelligence
      </h3>
      <p className="text-xs text-gray-500 mb-3">Analyzing opportunities based on your profile...</p>
      <div className="flex gap-4 mb-3">
        <div><div className="text-lg font-bold text-gray-800">{insights.matches}</div><div className="text-[10px] text-gray-400">Matches Found</div></div>
        <div><div className="text-lg font-bold text-purple-600">{insights.highConfidence}</div><div className="text-[10px] text-gray-400">High Confidence</div></div>
      </div>
      <div className="mb-3">
        <div className="text-xs font-medium text-gray-500">Top Sectors</div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {insights.sectors.slice(0,4).map((s, i) => <span key={i} className="bg-purple-50 text-purple-700 text-[10px] px-2 py-0.5 rounded-full">{s}</span>)}
        </div>
      </div>
      <Link href="/ai" className="inline-block text-xs text-blue-600 hover:underline flex items-center gap-1">
        Explore Insights <BarChart3 className="w-3 h-3" />
      </Link>
    </div>
  );
}





