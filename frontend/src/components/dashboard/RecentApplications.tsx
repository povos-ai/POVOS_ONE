"use client";

import { useEffect, useState } from "react";
import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";

export default function RecentApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:3001/submissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setApps((data || []).slice(0,3)))
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  const statusIcon = (status) => {
    const map = { SUBMITTED: <Clock className="w-3 h-3 text-yellow-500" />, UNDER_REVIEW: <Clock className="w-3 h-3 text-blue-500" />, APPROVED: <CheckCircle className="w-3 h-3 text-green-500" />, REJECTED: <XCircle className="w-3 h-3 text-red-500" /> };
    return map[status] || <FileText className="w-3 h-3 text-gray-400" />;
  };

  if (loading) return <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse h-40"></div>;
  if (apps.length === 0) return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center text-sm text-gray-500">
      <FileText className="w-5 h-5 text-gray-400 mx-auto mb-2" />
      <p>No applications yet.</p>
      <Link href="/opportunities" className="text-blue-600 text-xs hover:underline">Explore opportunities</Link>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
          <FileText className="w-4 h-4 text-blue-500" /> Recent Applications
        </h3>
        <Link href="/my-applications" className="text-xs text-blue-600 hover:underline">View all</Link>
      </div>
      <div className="divide-y divide-gray-100">
        {apps.map((app) => (
          <div key={app.id} className="py-2 flex justify-between items-center">
            <div><div className="text-sm font-medium text-gray-800">{app.opportunity?.title || "Opportunity"}</div><div className="text-xs text-gray-500">{new Date(app.updatedAt || app.createdAt).toLocaleDateString()}</div></div>
            <div className="flex items-center gap-1 text-xs">{statusIcon(app.status)}<span className="text-gray-600">{app.status || "Draft"}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
