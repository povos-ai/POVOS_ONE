"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function Recommendations({ recommendations: initialRecommendations }) {
  const [recommendations, setRecommendations] = useState(initialRecommendations || []);
  const [loading, setLoading] = useState(!initialRecommendations || initialRecommendations.length === 0);
  const [userFeedback, setUserFeedback] = useState<Record<string, boolean | null>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  // Fetch recommendations if not provided by parent
  useEffect(() => {
    if (initialRecommendations && initialRecommendations.length > 0) {
      console.log("📦 Using initial recommendations:", initialRecommendations);
      setRecommendations(initialRecommendations);
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔑 Token from localStorage:", token ? token.substring(0, 20) + "..." : "null");
        if (!token) {
          console.warn("⚠️ No token found in localStorage");
          setLoading(false);
          return;
        }
        console.log("🌐 Fetching /ai/recommendations...");
        const res = await fetch("/ai/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: "{}",
        });
        console.log("📡 Response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          console.log("✅ Recommendations received:", data.length, "items");
          setRecommendations(data);
        } else {
          console.error("❌ Failed to fetch, status:", res.status);
          const errorText = await res.text();
          console.error("Error body:", errorText);
        }
      } catch (e) {
        console.error("❌ Fetch exception:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [initialRecommendations]);

  // Fetch existing feedback on mount
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("/ai/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const map: Record<string, boolean> = {};
          data.feedback.forEach((f: any) => {
            map[f.opportunityId] = f.feedback;
          });
          setUserFeedback(map);
        }
      } catch (e) {
        console.error("Failed to fetch feedback:", e);
      }
    };
    fetchFeedback();
  }, []);

  // Handle thumb click
  const handleFeedback = async (opportunityId: string, feedback: boolean) => {
    if (submitting === opportunityId) return;
    setSubmitting(opportunityId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/ai/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ opportunityId, feedback }),
      });
      if (res.ok) {
        setUserFeedback((prev) => ({ ...prev, [opportunityId]: feedback }));
      } else {
        console.error("Feedback API error:", await res.text());
      }
    } catch (e) {
      console.error("Network error:", e);
    } finally {
      setSubmitting(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-sm text-gray-500">Loading recommendations...</p>
      </div>
    );
  }

  // No recommendations state
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-sm text-gray-500">No recommendations yet.</p>
        <p className="text-xs text-gray-400 mt-1">Complete your profile to get personalized opportunities.</p>
        <Link
          href="/profile"
          className="inline-block mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recommended for You</h3>
          <p className="text-xs text-gray-500">AI-matched based on your profile</p>
        </div>
        <Link href="/opportunities" className="text-sm text-blue-600 hover:underline">
          View all ({recommendations.length})
        </Link>
      </div>
      <div className="divide-y divide-gray-100">
        {recommendations.map((opp) => (
          <div key={opp.id} className="py-3 flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-800 truncate">{opp.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{opp.description || "No description"}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                  {opp.category || "General"}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {opp.type || "Opportunity"}
                </span>
              </div>
              {opp.matchReasons && opp.matchReasons.length > 0 && (
                <div className="mt-1 text-xs text-gray-500">
                  {opp.matchReasons.slice(0, 2).map((reason, i) => (
                    <span key={i} className="mr-2">✓ {reason}</span>
                  ))}
                </div>
              )}

              {/* ===== PERSONALIZATION REASONS ===== */}
              {opp.personalizationReasons && opp.personalizationReasons.length > 0 && (
                <div className="mt-1 text-xs text-gray-600">
                  <span className="font-medium">Why recommended:</span>
                  <ul className="list-disc list-inside ml-1">
                    {opp.personalizationReasons.map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ===== FEEDBACK CONTROLS ===== */}
              <div className="flex items-center gap-1 mt-2">
                <button
                  onClick={() => handleFeedback(opp.id, true)}
                  disabled={submitting === opp.id}
                  className={`p-1 rounded hover:bg-gray-100 ${
                    userFeedback[opp.id] === true ? "text-blue-600" : "text-gray-400"
                  }`}
                  aria-label="Mark as helpful"
                  title="Helpful"
                >
                  <ThumbsUp size={16} />
                </button>
                <button
                  onClick={() => handleFeedback(opp.id, false)}
                  disabled={submitting === opp.id}
                  className={`p-1 rounded hover:bg-gray-100 ${
                    userFeedback[opp.id] === false ? "text-red-500" : "text-gray-400"
                  }`}
                  aria-label="Mark as not helpful"
                  title="Not helpful"
                >
                  <ThumbsDown size={16} />
                </button>
                {submitting === opp.id && (
                  <span className="text-xs text-gray-400 ml-1">...</span>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 text-right ml-4">
              <span
                className={`text-sm font-bold ${
                  opp.matchScore >= 90
                    ? "text-teal-600"
                    : opp.matchScore >= 75
                    ? "text-green-600"
                    : opp.matchScore >= 60
                    ? "text-yellow-600"
                    : "text-gray-500"
                }`}
              >
                {opp.matchScore || 0}% Match
              </span>
              <div className="text-xs text-gray-400">{opp.matchLevel || ""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
