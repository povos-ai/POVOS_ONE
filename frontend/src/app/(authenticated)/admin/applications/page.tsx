"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

interface Application { id: string; status: string; createdAt: string; submittedAt: string | null; user: { email: string; firstName: string; lastName: string }; opportunity: { title: string; slug: string }; remarks: string | null; }

export default function AdminApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetch("http://192.168.1.8:3001/submissions/admin/all", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((data) => { setApplications(Array.isArray(data) ? data : []); setLoading(false); })
      .catch((err) => { console.error(err); setError((((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? ((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof ((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? ((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong"))))))))))); setLoading(false); });
  }, [router]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: "bg-gray-200 text-gray-800",
      SUBMITTED: "bg-yellow-100 text-yellow-800",
      UNDER_REVIEW: "bg-blue-100 text-blue-800",
      DOCUMENT_REQUIRED: "bg-orange-100 text-orange-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      WITHDRAWN: "bg-gray-300 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) return <AppShell><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div></AppShell>;
  if (error) return <AppShell><div className="text-red-500 p-8">Error: {error}</div></AppShell>;

  return (
    <AppShell>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">All Applications (Admin)</h1><p className="text-gray-600">Review and manage all submitted applications.</p></div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {applications.length === 0 ? <div className="p-6 text-center text-gray-500">No applications submitted yet.</div> :
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th></tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{app.user?.email || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.opportunity?.title || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(app.status)}`}>{app.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : "Draft"}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><Link href={`/admin/applications/${app.id}`} className="text-blue-600 hover:underline">Review</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </AppShell>
  );
}












