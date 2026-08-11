"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

interface Opportunity {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  type: string;
  level: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  providerId: string;
  state?: string;
  district?: string;
  lastDate?: string;
  startDate?: string;
  published?: boolean;
  aiSummary?: string;
}

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`http://localhost:3001/opportunities/slug/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Opportunity not found");
        return res.json();
      })
      .then((data) => {
        setOpportunity(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug, router]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      </AppShell>
    );
  }

  if (error || !opportunity) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl font-semibold text-red-600">
            {error || "Opportunity not found"}
          </h2>
          <Link
            href="/opportunities"
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Back to opportunities
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/opportunities"
          className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back to opportunities
        </Link>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {opportunity.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
              {opportunity.category || "General"}
            </span>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {opportunity.type || "Opportunity"}
            </span>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {opportunity.level || "N/A"}
            </span>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full ${
                opportunity.status === "OPEN"
                  ? "bg-green-100 text-green-700"
                  : opportunity.status === "CLOSED"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {opportunity.status || "Unknown"}
            </span>
          </div>

          {opportunity.description && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="text-gray-700">{opportunity.description}</p>
            </div>
          )}

          {opportunity.state && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-500">State: </span>
              <span className="text-sm text-gray-700">{opportunity.state}</span>
            </div>
          )}

          {opportunity.lastDate && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-500">
                Deadline:{" "}
              </span>
              <span className="text-sm text-gray-700">
                {new Date(opportunity.lastDate).toLocaleDateString()}
              </span>
            </div>
          )}

          {opportunity.aiSummary && (
            <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
              <h4 className="text-sm font-medium text-purple-700">AI Summary</h4>
              <p className="text-sm text-purple-800">{opportunity.aiSummary}</p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Link
              href={`/apply?slug=${opportunity.slug}`}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/opportunities"
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Browse More
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}