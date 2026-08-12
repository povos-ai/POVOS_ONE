"use client";
import Link from "next/link";
import { TrendingUp, Calendar, ClipboardList, User } from "lucide-react";

const actions = [
  { title: "Journey", desc: "Track your application journey and progress.", icon: <TrendingUp className="w-5 h-5 text-blue-500" />, link: "/applications", cta: "View Journey" },
  { title: "Deadlines", desc: "Keep track of important deadlines.", icon: <Calendar className="w-5 h-5 text-orange-500" />, link: "/opportunities", cta: "View Deadlines" },
  { title: "Applications", desc: "Manage all your applications.", icon: <ClipboardList className="w-5 h-5 text-teal-500" />, link: "/my-applications", cta: "View Applications" },
  { title: "Next Action", desc: "Complete your profile for better matches.", icon: <User className="w-5 h-5 text-purple-500" />, link: "/profile", cta: "Update Profile" },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {actions.map(a => (
        <div key={a.title} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition">
          <div className="flex items-center gap-2 mb-1">{a.icon}<h4 className="font-semibold">{a.title}</h4></div>
          <p className="text-sm text-gray-500 mb-2">{a.desc}</p>
          <Link href={a.link} className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1">{a.cta} →</Link>
        </div>
      ))}
    </div>
  );
}
