"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { applicationService } from "@/services/application.service";
import { getOpportunityBySlug } from "@/services/opportunity.service";
import { getProfile } from "@/services/profile.service";

// Main component that uses useSearchParams
function ApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const opportunitySlug = searchParams.get("opportunity");

  const [opportunity, setOpportunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    coverLetter: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!opportunitySlug) {
          setError("No opportunity specified");
          setLoading(false);
          return;
        }

        const opp = await getOpportunityBySlug(opportunitySlug);
        if (!opp) {
          setError("Opportunity not found");
          setLoading(false);
          return;
        }

        if (opp.status !== "OPEN") {
          setError(`This opportunity is ${opp.status}. Applications are not being accepted.`);
          setLoading(false);
          return;
        }

        setOpportunity(opp);

        try {
          const profile = await getProfile();
          setFormData({
            name: `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
            email: profile.email || "",
            phone: profile.phone || "",
            education: profile.education || "",
            skills: profile.skills || "",
            experience: profile.experienceYears ? `${profile.experienceYears} years` : "",
            coverLetter: "",
          });
        } catch {
          // Profile might not be complete
        }

        try {
          const existing = await applicationService.getApplicationForOpportunity(opp.id);
          if (existing) {
            setError(`You have already applied to this opportunity (Status: ${existing.status})`);
          }
        } catch {
          // No existing application
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
        setLoading(false);
      }
    };

    loadData();
  }, [opportunitySlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!opportunity) {
        throw new Error("Opportunity not loaded");
      }

      if (!formData.name.trim()) {
        throw new Error("Please enter your name");
      }
      if (!formData.email.trim()) {
        throw new Error("Please enter your email");
      }

      const submission = await applicationService.create({
        opportunityId: opportunity.id,
        applicationData: formData,
      });

      const submitted = await applicationService.submitApplication(submission.id);
      setSuccess(true);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("You have already applied to this opportunity.");
      } else {
        setError(err.message || "Failed to submit application");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error && !success) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Cannot Apply</h2>
          <p className="text-red-600">{error}</p>
          <Link
            href={`/opportunities/${opportunitySlug}`}
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            ← Back to Opportunity
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800">Application Submitted Successfully!</h2>
          <p className="text-green-600 mt-2">
            Your application for <strong>{opportunity?.title}</strong> has been submitted.
          </p>
          <p className="text-sm text-green-500 mt-1">Status: SUBMITTED</p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link
              href={`/opportunities/${opportunity?.slug}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Opportunity
            </Link>
            <Link
              href="/my-applications"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              View My Applications
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Apply for Opportunity</h1>

      {opportunity && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <h2 className="font-semibold text-lg">{opportunity.title}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {opportunity.category && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {opportunity.category}
              </span>
            )}
            {opportunity.type && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {opportunity.type}
              </span>
            )}
            {opportunity.state && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {opportunity.state}
              </span>
            )}
            {opportunity.lastDate && (
              <span className="text-xs text-gray-500">
                Deadline: {new Date(opportunity.lastDate).toLocaleDateString()}
              </span>
            )}
          </div>
          {opportunity.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{opportunity.description}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
          <input
            type="text"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., JavaScript, Python, Design"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <input
            type="text"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 3 years"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
          <textarea
            rows={4}
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us why you're interested in this opportunity..."
          />
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
          <Link
            href={`/opportunities/${opportunity?.slug}`}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

// Page component with Suspense boundary
export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto p-6 text-center">Loading...</div>}>
      <ApplyContent />
    </Suspense>
  );
}
