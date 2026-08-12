"use client";
import { Sparkles, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AIIntelligence({ aiData }) {
  const { matches, highConfidence, strongestMatch } = aiData || { matches: 0, highConfidence: 0, strongestMatch: "" };

  if (matches === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <Sparkles className="w-5 h-5 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">No matching opportunities found yet.</p>
        <p className="text-xs text-gray-400 mt-1">Complete your profile to improve your recommendations.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="flex items-center gap-1 font-semibold text-gray-800">
        <Sparkles className="w-4 h-4 text-purple-600" /> AI Intelligence
      </h3>
      <p className="text-xs text-gray-500 mt-1">POVOS found {matches} opportunities for you.</p>
      <div className="flex gap-4 mt-2">
        <div>
          <span className="font-bold text-lg text-gray-800">{matches}</span>
          <span className="text-xs text-gray-400 ml-1">Matches</span>
        </div>
        <div>
          <span className="font-bold text-lg text-purple-600">{highConfidence}</span>
          <span className="text-xs text-gray-400 ml-1">High Confidence</span>
        </div>
      </div>
      {strongestMatch && (
        <div className="text-xs text-gray-600 mt-1">
          <span className="font-medium">Strongest match:</span> {strongestMatch}
        </div>
      )}
      <Link href="/ai" className="inline-block text-xs text-blue-600 hover:underline flex items-center gap-1 mt-2">
        Explore Insights <BarChart3 className="w-3 h-3" />
      </Link>
    </div>
  );
}
