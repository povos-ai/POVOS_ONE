"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function Deadlines() {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:3001/opportunities?closingSoon=true", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const sorted = (data || []).slice(0,3).map(opp => ({
          ...opp,
          daysLeft: Math.floor((new Date(opp.lastDate || Date.now() + 7*24*60*60*1000) - new Date()) / (1000*60*60*24)),
        }));
        setDeadlines(sorted);
      })
      .catch(() => setDeadlines([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse h-40"></div>;
  if (deadlines.length === 0) return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center text-sm text-gray-500">
      <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-2" />
      <p>No upcoming deadlines.</p>
      <Link href="/opportunities" className="text-blue-600 text-xs hover:underline">View opportunities</Link>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
          <Calendar className="w-4 h-4 text-orange-500" /> Deadlines Coming Up
        </h3>
        <Link href="/opportunities" className="text-xs text-blue-600 hover:underline">View all</Link>
      </div>
      <div className="divide-y divide-gray-100">
        {deadlines.map((opp) => (
          <div key={opp.id} className="py-2 flex justify-between items-center">
            <div><div className="text-sm font-medium text-gray-800">{opp.title}</div><div className="text-xs text-gray-500">{opp.lastDate ? new Date(opp.lastDate).toLocaleDateString() : "No date"}</div></div>
            <div className="flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3 text-orange-500" />
              <span className={`font-medium ${opp.daysLeft <= 3 ? "text-red-500" : "text-gray-600"}`}>
                {opp.daysLeft > 0 ? `${opp.daysLeft} days left` : "Today"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
