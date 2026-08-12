"use client";
import Link from "next/link";

export default function Recommendations({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-sm text-gray-500">No recommendations yet.</p>
        <p className="text-xs text-gray-400 mt-1">Complete your profile to get personalized opportunities.</p>
        <Link href="/profile" className="inline-block mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
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
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{opp.category || "General"}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{opp.type || "Opportunity"}</span>
              </div>
              {opp.matchReasons && opp.matchReasons.length > 0 && (
                <div className="mt-1 text-xs text-gray-500">
                  {opp.matchReasons.slice(0,2).map((reason, i) => (
                    <span key={i} className="mr-2">✓ {reason}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-shrink-0 text-right ml-4">
              <span className={`text-sm font-bold ${opp.matchScore >= 90 ? 'text-teal-600' : opp.matchScore >= 75 ? 'text-green-600' : opp.matchScore >= 60 ? 'text-yellow-600' : 'text-gray-500'}`}>
                {opp.matchScore || 0}% Match
              </span>
              <div className="text-xs text-gray-400">{opp.matchLevel || ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
