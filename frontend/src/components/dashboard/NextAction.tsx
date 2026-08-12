"use client";

import { useEffect, useState } from "react";
import { Zap, User, Target } from "lucide-react";
import Link from "next/link";

export default function NextAction() {
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const fields = ['firstName', 'lastName', 'age', 'education', 'state', 'category', 'businessType'];
    const filled = fields.filter(f => user[f]).length;
    const pct = Math.round((filled / fields.length) * 100);
    setProfileCompletion(pct);
    setLoading(false);
  }, []);

  if (loading) return <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse h-32"></div>;
  const isComplete = profileCompletion >= 80;
  const nextAction = isComplete ? { label: "View Recommendations", link: "/opportunities", icon: <Target className="w-4 h-4" /> } : { label: "Complete Your Profile", link: "/profile", icon: <User className="w-4 h-4" /> };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-500" /> Next Action</h3>
        {!isComplete && <span className="text-xs font-medium text-gray-500">{profileCompletion}%</span>}
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm text-gray-700 mb-3">{isComplete ? "You're ready to explore top opportunities." : "Get better matches by completing your profile."}</p>
        <Link href={nextAction.link} className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          {nextAction.icon} {nextAction.label}
        </Link>
        {!isComplete && <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${profileCompletion}%` }}></div></div>}
      </div>
    </div>
  );
}


