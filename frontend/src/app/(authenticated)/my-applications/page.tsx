"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { applicationService } from "@/services/application.service";

interface Application {
  id: string;
  status: string;
  createdAt: string;
  submittedAt: string | null;
  opportunity: {
    title: string;
    slug: string;
    category: string;
    type: string;
  };
}

export default function MyApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const data = await applicationService.getUserApplications();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Failed to fetch applications:", err);
        setError(err.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  const getStatusBadge = (status: string) => {
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
        <p className="text-gray-600">Track all your submitted applications.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 text-lg">You haven't applied to any opportunities yet.</p>
            <Link
              href="/opportunities"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Opportunities
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {applications.map((app) => (
              <li key={app.id} className="p-4 hover:bg-gray-50 transition">
                <Link href={`/my-applications/${app.id}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {app.opportunity?.title || "Unknown Opportunity"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                          {app.status || "DRAFT"}
                        </span>
                        {app.opportunity?.category && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            {app.opportunity.category}
                          </span>
                        )}
                        {app.opportunity?.type && (
                          <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded-full">
                            {app.opportunity.type}
                          </span>
                        )}
                        <span className="text-sm text-gray-400">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="text-blue-600 hover:underline text-sm">
                      View →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
