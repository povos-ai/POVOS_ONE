"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPIGrid from "@/components/dashboard/KPIGrid";
import Recommendations from "@/components/dashboard/Recommendations";
import AIIntelligence from "@/components/dashboard/AIIntelligence";
import Deadlines from "@/components/dashboard/Deadlines";
import RecentApplications from "@/components/dashboard/RecentApplications";
import NextAction from "@/components/dashboard/NextAction";

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
    return <AppShell><div className="flex justify-center items-center h-screen">Loading dashboard...</div></AppShell>;
  }

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <DashboardHeader user={user} />
        <KPIGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <Recommendations />
          </div>
          <div>
            <AIIntelligence />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Deadlines />
          <RecentApplications />
          <NextAction />
        </div>
      </div>
    </AppShell>
  );
}




