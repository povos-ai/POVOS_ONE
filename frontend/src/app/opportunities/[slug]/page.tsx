'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
  district: string | null;
  status: string;
  published: boolean;
  createdAt: string;
  workspace: {
    id: string;
    name: string;
    slug: string;
  };
  aiSummary?: string;
  applicationUrl?: string;
  lastDate?: string;
  startDate?: string;
}

export default function OpportunityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchOpportunity();
    }
  }, [slug]);

  const fetchOpportunity = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/opportunities/slug/${slug}`);
      setOpportunity(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Opportunity not found');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error || 'Not found'}</p>
          <Link href="/opportunities" className="text-blue-600 hover:underline mt-4 block">
            ← Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/opportunities" className="text-blue-600 hover:underline mb-6 block">
          ← Back to Opportunities
        </Link>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-900">{opportunity.title}</h1>
            <p className="text-gray-500 mt-2">by {opportunity.workspace?.name}</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{opportunity.description}</p>
            </div>

            {opportunity.aiSummary && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">🤖 AI Summary</h2>
                <p className="text-blue-800">{opportunity.aiSummary}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{opportunity.category}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{opportunity.type}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium">{opportunity.level}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{opportunity.status}</p>
              </div>
              {opportunity.state && (
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium">{opportunity.state}</p>
                </div>
              )}
              {opportunity.district && (
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-500">District</p>
                  <p className="font-medium">{opportunity.district}</p>
                </div>
              )}
              {opportunity.lastDate && (
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-500">Last Date</p>
                  <p className="font-medium">{formatDate(opportunity.lastDate)}</p>
                </div>
              )}
            </div>

            {/* Application URL - Commented to avoid timeout */}
            {/* {opportunity.applicationUrl && (
              <a
                href={opportunity.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply Now →
              </a>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}