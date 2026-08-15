"use client";

import { useEffect, useState } from "react";
import { getOpportunityBySlug } from "@/services/opportunity.service";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OpportunityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [opportunity, setOpportunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const opp = await getOpportunityBySlug(slug);
        if (!opp) {
          setError("Opportunity not found");
          setLoading(false);
          return;
        }
        setOpportunity(opp);
      } catch (error: any) {
        setError(error.message || "Failed to load opportunity");
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 text-center">Loading...</div>;
  }

  if (error || !opportunity) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-2">{error || "Opportunity not found"}</p>
        <Link href="/opportunities" className="text-blue-600 hover:underline mt-4 inline-block">
          ? Back to opportunities
        </Link>
      </div>
    );
  }

  // Check if opportunity is open for applications
  const isOpen = opportunity.status === "OPEN";
  const isPublished = opportunity.published === true;
  const canApply = isOpen && isPublished;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Link href="/opportunities" className="text-blue-600 hover:underline text-sm inline-block">
        ? Back to opportunities
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {opportunity.title}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              opportunity.status === "OPEN"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                : opportunity.status === "CLOSED"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {opportunity.status || "DRAFT"}
          </span>
        </div>

        {opportunity.description && (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">
              {opportunity.description}
            </p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunity.category && (
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {opportunity.category}
              </p>
            </div>
          )}
          {opportunity.type && (
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {opportunity.type}
              </p>
            </div>
          )}
          {opportunity.state && (
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">State</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {opportunity.state}
              </p>
            </div>
          )}
          {opportunity.district && (
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">District</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {opportunity.district}
              </p>
            </div>
          )}
          {opportunity.startDate && (
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Start Date</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(opportunity.startDate).toLocaleDateString()}
              </p>
            </div>
          )}
          {opportunity.lastDate && (
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Application Deadline</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(opportunity.lastDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Apply Button Section */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {canApply
                  ? "?? This opportunity is open for applications"
                  : "?? This opportunity is not accepting applications"}
              </p>
            </div>
            {canApply ? (
              <Link
                href={`/apply?opportunity=${slug}`}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-center"
              >
                ?? Apply Now
              </Link>
            ) : (
              <span className="px-6 py-2.5 bg-gray-200 text-gray-500 rounded-lg font-medium cursor-not-allowed">
                {opportunity.status === "CLOSED" ? "?? Applications Closed" : "?? Not Available"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
