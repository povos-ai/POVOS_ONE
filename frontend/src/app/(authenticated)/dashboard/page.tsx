"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPIGrid from "@/components/dashboard/KPIGrid";
import Recommendations from "@/components/dashboard/Recommendations";
import AIIntelligence from "@/components/dashboard/AIIntelligence";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    recommendations: [],
    stats: { new: 0, strong: 0, closing: 0, avgMatch: 0 },
    ai: { matches: 0, highConfidence: 0, strongestMatch: "" },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/ai/recommendations", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.recommendations || [];
        const newCount = list.length;
        const strong = list.filter((item) => (item.matchScore || 0) >= 80).length;
        const closing = list.filter((item) => {
          if (!item.lastDate) return false;
          const days = Math.ceil((new Date(item.lastDate) - Date.now()) / (1000*60*60*24));
          return days <= 7 && days >= 0;
        }).length;
        const avg = list.length > 0
          ? Math.round(list.reduce((acc, item) => acc + (item.matchScore || 0), 0) / list.length)
          : 0;
        const strongest = list.length > 0
          ? list.reduce((a, b) => (a.matchScore || 0) > (b.matchScore || 0) ? a : b)
          : null;

        setDashboardData({
          recommendations: list,
          stats: { new: newCount, strong, closing, avgMatch: avg },
          ai: {
            matches: newCount,
            highConfidence: strong,
            strongestMatch: strongest?.title || "",
          },
        });
      })
      .catch(() => {
        setDashboardData({
          recommendations: [],
          stats: { new: 0, strong: 0, closing: 0, avgMatch: 0 },
          ai: { matches: 0, highConfidence: 0, strongestMatch: "" },
        });
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <DashboardHeader />
      <KPIGrid stats={dashboardData.stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Recommendations recommendations={dashboardData.recommendations} />
        </div>
        <div>
          <AIIntelligence aiData={dashboardData.ai} />
        </div>
      </div>
      <QuickActions />
    </div>
  );
}


