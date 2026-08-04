'use client';

import { useEffect, useState } from 'react';
import { userouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/auth.service';
import api from '@/services/api';

interface Submission {
  id: string;
  status: string;
  submittedAt: string | null;
  createdAt: string;
  opportunity: {
    id: string;
    title: string;
    slug: string;
    category: string;
    type: string;
    level: string;
    workspace: {
      name: string;
    };
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function ApplicationsPage() {
  const router = userouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const user = authService.getCurrentuser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch submissions for this user
      const response = await api.get(`/api/submissions/user/${user.id}`);
      setSubmissions(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load applications');
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
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
            onClick={fetchApplications}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <Link
            href="/opportunities"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse More Opportunities
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No applications yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Start exploring opportunities and submit your applications.
            </p>
            <Link
              href="/opportunities"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Browse Opportunities
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link
                      href={`/opportunities/${submission.opportunity.slug}`}
                      className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                      {submission.opportunity.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {submission.opportunity.workspace?.name || 'Unknown workspace'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>
                    📅 Applied: {formatDate(submission.createdAt)}
                  </span>
                  {submission.submittedAt && (
                    <span>
                      ✅ Submitted: {formatDate(submission.submittedAt)}
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    {submission.opportunity.category}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    {submission.opportunity.type}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    {submission.opportunity.level}
                  </span>
                </div>

                {submission.status === 'DRAFT' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/submissions/${submission.id}/edit`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Complete Application →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}