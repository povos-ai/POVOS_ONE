"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

interface Opportunity { id: string; title: string; slug: string; description: string; category: string; type: string; status: string; createdAt: string; }

export default function OpportunitiesPage() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetch("http://192.168.1.8:3001/opportunities", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => { setOpportunities(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) return <AppShell><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div></AppShell>;

  return (
    <AppShell>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">Opportunities</h1><p className="text-gray-600">Browse and manage available opportunities.</p></div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {opportunities.length === 0 ? <div className="p-6 text-center text-gray-500">No opportunities found.</div> :
          <ul className="divide-y divide-gray-200">
            {opportunities.map((opp) => (
              <li key={opp.id} className="p-4 hover:bg-gray-50 transition">
                <Link href={`/opportunities/${opp.slug}`} className="block">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{opp.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{opp.description}</p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-400">
                        <span>Category: {opp.category}</span><span>Type: {opp.type}</span><span>Status: {opp.status}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{new Date(opp.createdAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        }
      </div>
    </AppShell>
  );
}







