"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPIGrid from "@/components/dashboard/KPIGrid";
import Recommendations from "@/components/dashboard/Recommendations";
import AIIntelligence from "@/components/dashboard/AIIntelligence";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <AppShell><div className="flex justify-center items-center h-full">Loading...</div></AppShell>;
  }

  return (
    <AppShell>
      <div className="h-full flex flex-col">
        <DashboardHeader user={user} />
        <div className="flex-1 overflow-y-auto space-y-4">
          {/* KPI Grid */}
          <KPIGrid />

          {/* Main Grid: Recommendations + AI Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Recommendations />
            </div>
            <div>
              <AIIntelligence />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </AppShell>
  );
}
