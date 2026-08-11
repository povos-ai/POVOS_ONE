"use client";

import Link from "next/link";
import { Calendar, ClipboardList, TrendingUp, User } from "lucide-react";

const actions = [
  {
    title: "Journey",
    description: "Track your application journey and progress.",
    icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
    link: "/applications",
    cta: "View Journey",
  },
  {
    title: "Deadlines",
    description: "Keep track of important deadlines.",
    icon: <Calendar className="w-5 h-5 text-orange-500" />,
    link: "/opportunities",
    cta: "View Deadlines",
  },
  {
    title: "Applications",
    description: "Manage all your applications.",
    icon: <ClipboardList className="w-5 h-5 text-teal-500" />,
    link: "/my-applications",
    cta: "View Applications",
  },
  {
    title: "Next Action",
    description: "Complete your profile for better matches.",
    icon: <User className="w-5 h-5 text-purple-500" />,
    link: "/profile",
    cta: "Update Profile",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <div
          key={action.title}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-center gap-2 mb-1">
            {action.icon}
            <h4 className="font-semibold text-gray-800">{action.title}</h4>
          </div>
          <p className="text-sm text-gray-500 mb-2">{action.description}</p>
          <Link
            href={action.link}
            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            {action.cta} →
          </Link>
        </div>
      ))}
    </div>
  );
}
