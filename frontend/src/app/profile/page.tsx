'use client';

import { useEffect, useState } from 'react';
import { userouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import api from '@/services/api';

interface user {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export default function ProfilePage() {
  const router = userouter();
  const [user, setuser] = useState<user | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/me');
      const userData = response.data.user || response.data;
      setuser(userData);
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.patch(`/users/${user?.id}`, formData);
      setSuccess('Profile updated successfully!');
      
      // Update local user data
      if (user) {
        setuser({ ...user, ...formData });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={fetchProfile}
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
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={user?.role || ''}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
                disabled
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={authService.logout}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}