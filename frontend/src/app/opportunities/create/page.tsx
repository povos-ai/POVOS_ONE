'use client';

import { useState, useEffect } from 'react';
import { userouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/auth.service';
import api from '@/services/api';

interface workspace {
  id: string;
  name: string;
}

export default function CreateOpportunityPage() {
  const router = userouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [workspaces, setworkspaces] = useState<workspace[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'SCHEME',
    type: 'SCHEME',
    level: 'STATE',
    state: '',
    district: '',
    workspaceId: '',
    status: 'DRAFT',
    published: false,
    applicationUrl: '',
    lastDate: '',
    startDate: '',
    eligibility: { criteria: '' },
    benefits: { description: '' },
  });

  useEffect(() => {
    setMounted(true);
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchworkspaces();
  }, []);

  const fetchworkspaces = async () => {
    try {
      setLoadingOrgs(true);
      // ✅ Use workspaces endpoint without /api prefix
      const response = await api.get('/workspaces');
      setworkspaces(response.data);
      
      if (response.data.length > 0) {
        setFormData(prev => ({ ...prev, workspaceId: response.data[0].id }));
      }
    } catch (err) {
      console.warn('workspaces API not available, continuing without orgs');
      // Continue without workspaces
    } finally {
      setLoadingOrgs(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const payload = {
        ...formData,
        slug,
        eligibility: typeof formData.eligibility === 'string' 
          ? JSON.parse(formData.eligibility) 
          : formData.eligibility,
        benefits: typeof formData.benefits === 'string'
          ? JSON.parse(formData.benefits)
          : formData.benefits,
      };

      await api.post('/opportunities', payload);
      setSuccess('Opportunity created successfully!');
      
      setFormData({
        title: '',
        slug: '',
        description: '',
        category: 'SCHEME',
        type: 'SCHEME',
        level: 'STATE',
        state: '',
        district: '',
        workspaceId: formData.workspaceId,
        status: 'DRAFT',
        published: false,
        applicationUrl: '',
        lastDate: '',
        startDate: '',
        eligibility: { criteria: '' },
        benefits: { description: '' },
      });

      setTimeout(() => {
        router.push('/opportunities');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create opportunity');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'eligibility' || name === 'benefits') {
      try {
        const parsed = JSON.parse(value);
        setFormData(prev => ({ ...prev, [name]: parsed }));
      } catch {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (!mounted) {
    return null;
  }

  if (loadingOrgs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Opportunity</h1>
          <Link href="/opportunities" className="text-blue-600 hover:underline">
            ← Back to Opportunities
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {workspaces.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">workspace</label>
                <select
                  name="workspaceId"
                  value={formData.workspaceId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  {workspaces.map(org => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter opportunity title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Slug (URL-friendly)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="auto-generated-from-title"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Describe the opportunity..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  {['JOB', 'SCHOLARSHIP', 'TENDER', 'GRANT', 'STARTUP', 
                    'FELLOWSHIP', 'TRAINING', 'INTERNSHIP', 'SCHEME', 'CSR', 'EVENT'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  {['JOB', 'SCHEME', 'TENDER', 'GRANT', 'INTERNSHIP', 
                    'FELLOWSHIP', 'BUSINESS', 'EVENT', 'OTHER'].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  {['CENTRAL', 'STATE', 'DISTRICT', 'PRIVATE', 'INTERNATIONAL'].map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="e.g., Bihar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="e.g., Patna"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Date</label>
                <input
                  type="date"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Application URL</label>
              <input
                type="url"
                name="applicationUrl"
                value={formData.applicationUrl}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="https://example.com/apply"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Eligibility (JSON)</label>
                <textarea
                  name="eligibility"
                  value={typeof formData.eligibility === 'string' ? formData.eligibility : JSON.stringify(formData.eligibility)}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder='{"criteria": "..."}'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Benefits (JSON)</label>
                <textarea
                  name="benefits"
                  value={typeof formData.benefits === 'string' ? formData.benefits : JSON.stringify(formData.benefits)}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder='{"description": "..."}'
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  {['DRAFT', 'PUBLISHED', 'CLOSED', 'ARCHIVED'].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Published</label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? 'Creating...' : 'Create Opportunity'}
              </button>
              <Link
                href="/opportunities"
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}