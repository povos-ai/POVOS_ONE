'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/services/api';

interface Opportunity {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  type: string;
  level: string;
  state: string | null;
  status: string;
  published: boolean;
  createdAt: string;
  workspace: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/opportunities');
      
      // ✅ Ensure data is an array
      const data = response.data;
      if (Array.isArray(data)) {
        setOpportunities(data);
      } else {
        console.error('API returned non-array:', data);
        setOpportunities([]);
        setError('Invalid data format received');
      }
      
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load opportunities');
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={fetchOpportunities}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No opportunities found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Opportunities</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                <Link href={`/opportunities/${opp.slug}`} className="hover:text-blue-600">
                  {opp.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mt-2">{opp.description?.slice(0, 120)}...</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {opp.category}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                  {opp.type}
                </span>
                {opp.state && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                    {opp.state}
                  </span>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">{opp.workspace?.name}</span>
                <Link
                  href={`/opportunities/${opp.slug}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}