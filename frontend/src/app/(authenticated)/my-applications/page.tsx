"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

interface Application { id: string; status: string; createdAt: string; submittedAt: string | null; opportunity: { title: string; slug: string }; }

export default function MyApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetch("http://192.168.1.8:3001/submissions", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => { setApplications(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
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

  return (
    <AppShell>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">My Applications</h1><p className="text-gray-600">Track all your submitted applications.</p></div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">You haven't applied to any opportunities yet. <Link href="/opportunities" className="text-blue-600 hover:underline">Browse Opportunities</Link></div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {applications.map((app) => (
              <li key={app.id} className="p-4 hover:bg-gray-50 transition">
                <Link href={`/my-applications/${app.id}`} className="block">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{app.opportunity?.title || "N/A"}</h3>
                      <div className="flex gap-3 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(app.status)}`}>{app.status}</span>
                        <span className="text-sm text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="text-blue-600 hover:underline text-sm">View →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}









