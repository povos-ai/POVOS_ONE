"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile, UserProfile } from "@/services/profile.service";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("📡 Fetching profile...");
        const data = await getProfile();
        console.log("✅ Profile data:", data);
        setProfile(data);
        setFormData(data);
        setError(null);
      } catch (err: any) {
        console.error("❌ Profile fetch error:", err);
        let msg = "Failed to load profile";
        try {
          if (typeof err === "string") {
            msg = err;
          } else if (err && typeof err === "object") {
            if (err.message) {
              msg = err.message;
            } else if (err.error?.message) {
              msg = err.error.message;
            } else {
              msg = JSON.stringify(err);
            }
          }
        } catch (e) {
          msg = "An unexpected error occurred";
        }
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setError(null);
    try {
      const updated = await updateProfile(formData);
      setProfile(updated);
      setEditing(false);
      setSuccessMsg("Profile updated successfully!");
    } catch (err: any) {
      let msg = "Update failed";
      try {
        if (typeof err === "string") msg = err;
        else if (err?.message) msg = err.message;
        else if (err?.error?.message) msg = err.error.message;
        else msg = JSON.stringify(err);
      } catch (e) {
        msg = "An unexpected error occurred";
      }
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-medium">Unable to load profile</p>
        <p className="text-sm text-gray-500 mt-1">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded mb-4">
          {successMsg}
        </div>
      )}

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              value={profile?.role || ""}
              className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
              disabled
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setFormData(profile || {});
                setSuccessMsg("");
              }}
              className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{profile?.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{profile?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profile?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{profile?.role}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-mono text-sm">{profile?.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="font-medium">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
