# ============================================
# CREATE OPPORTUNITY PAGE - COMPLETE SETUP
# ============================================

Write-Host "🚀 Setting up Create Opportunity Page..." -ForegroundColor Cyan

# Step 1: Create folder
cd D:\POVOS_ONE\frontend
mkdir src\app\opportunities\create -Force

# Step 2: Create page.tsx
@'
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import api from "@/services/api";

export default function CreateOpportunityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "GRANT",
    type: "GRANT",
    workspaceId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/opportunities", formData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating opportunity:", error);
      alert("Failed to create opportunity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
        <h1 className="text-2xl font-bold gradient-text mb-6">Create Opportunity</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 rounded-xl glass border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white" placeholder="Enter opportunity title" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 rounded-xl glass border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white" placeholder="Enter description" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 rounded-xl glass border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white">
                {["GRANT", "JOB", "SCHOLARSHIP", "STARTUP", "FELLOWSHIP", "TRAINING", "INTERNSHIP", "SCHEME"].map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 rounded-xl glass border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white">
                {["GRANT", "JOB", "SCHEME", "INTERNSHIP", "FELLOWSHIP", "TRAINING", "EVENT", "OTHER"].map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Workspace ID</label>
            <input type="text" value={formData.workspaceId} onChange={(e) => setFormData({ ...formData, workspaceId: e.target.value })} className="w-full px-4 py-2 rounded-xl glass border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white" placeholder="Enter workspace ID" />
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition disabled:opacity-50">
            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>) : (<><Save className="w-4 h-4" /> Create Opportunity</>)}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
'@ | Out-File -FilePath src\app\opportunities\create\page.tsx -Encoding utf8

Write-Host "✅ Create Opportunity page created!" -ForegroundColor Green

# Step 3: Restart frontend
Write-Host "🔄 Restarting frontend..." -ForegroundColor Yellow
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
cd D:\POVOS_ONE\frontend
Start-Process powershell -ArgumentList "-NoExit -Command 'npm run dev'"

Write-Host "
🎉 Setup Complete!" -ForegroundColor Green
Write-Host "🌐 Open: http://localhost:3002/opportunities/create" -ForegroundColor Cyan
