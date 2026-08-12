"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // âœ… Fixed: useRouter
import { motion } from "framer-motion";
import {
  Briefcase,
  Search,
  Plus,
  ArrowUpRight,
  Filter,
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import api from "@/services/api";

interface Application {
  id: string;
  status: string;
  createdAt: string;
  opportunity: {
    id: string;
    title: string;
    type: string;
    category: string;
  };
  person: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function ApplicationsPage() {
  const router = useRouter(); // âœ… Fixed: useRouter()
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/submissions");
        setApplications(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500/20 text-emerald-500";
      case "REJECTED":
        return "bg-rose-500/20 text-rose-500";
      case "UNDER_REVIEW":
        return "bg-amber-500/20 text-amber-500";
      case "SUBMITTED":
        return "bg-blue-500/20 text-blue-500";
      default:
        return "bg-slate-500/20 text-slate-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4" />;
      case "UNDER_REVIEW":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filtered = applications.filter((app) =>
    app.opportunity?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.person?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.person?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-6 lg:p-8">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Applications</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and track all applications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 flex-wrap"
        >
          <GradientButton variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </GradientButton>
          <GradientButton variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" /> Export
          </GradientButton>
          <GradientButton variant="primary" size="sm" onClick={() => router.push("/opportunities")}>
            <Plus className="w-4 h-4 mr-1" /> New Application
          </GradientButton>
        </motion.div>
      </div>

      {/* ===== SEARCH ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-md mb-6"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search applications by opportunity or applicant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white"
        />
      </motion.div>

      {/* ===== LIST ===== */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No applications found.</p>
          </div>
        ) : (
          filtered.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl glass hover:shadow-lg transition cursor-pointer"
              onClick={() => router.push(`/applications/${app.id}`)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">
                      {app.opportunity?.title || "Unknown Opportunity"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>
                        {app.person?.firstName} {app.person?.lastName}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">|</span>
                      <span>{app.opportunity?.category || "N/A"}</span>
                      <span className="text-slate-300 dark:text-slate-600">|</span>
                      <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {getStatusIcon(app.status)}
                    {app.status || "DRAFT"}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}



