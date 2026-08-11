"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Recommendations() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:3001/opportunities", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => { const list = Array.isArray(data) ? data : data.items || [];
        const scored = (data || []).map((opp) => ({
          ...opp,
          matchScore: opp.matchScore || 0,
        }));
        setOpportunities(scored.slice(0, 5));
      })
      .catch(() => setOpportunities([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse h-48"></div>;
  }

  if (opportunities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="text-gray-500 text-sm">No recommendations yet.</div>
        <div className="text-gray-400 text-xs mt-1">Complete your profile or explore opportunities.</div>
        <Link href="/profile" className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          Complete Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">âœ¨ Recommended for You</h2>
          <p className="text-xs text-gray-500">AI-matched based on your profile</p>
        </div>
        <Link href="/opportunities" className="text-sm text-blue-600 hover:underline">View all ({opportunities.length})</Link>
      </div>
      <div className="divide-y divide-gray-100">
        {opportunities.map((opp) => (
          <div key={opp.id} className="py-3">
            <Link href={`/opportunities/${opp.slug}`} className="block hover:bg-gray-50 rounded-md transition -mx-2 px-2 py-1">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-800 truncate">{opp.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{opp.description || "No description"}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{opp.category || "General"}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{opp.type || "Opportunity"}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className={`text-sm font-bold ${
                    opp.matchScore >= 90 ? "text-green-600" :
                    opp.matchScore >= 80 ? "text-green-500" :
                    opp.matchScore >= 70 ? "text-yellow-600" : "text-gray-500"
                  }`}>
                    {opp.matchScore}% Match
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


