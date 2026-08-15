"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOpportunity } from "@/services/opportunity.service";

export default function CreateOpportunity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "GRANT",
    type: "GRANT",
    district: "",
    state: "",
    status: "DRAFT",
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        category: form.category,
        type: form.type,
        district: form.district,
        state: form.state,
        status: form.status,
        published: form.published,
      };

      const created = await createOpportunity(data);
      
      // Redirect to the opportunity detail page using the returned slug
      if (created?.slug) {
        router.push(`/opportunities/${created.slug}`);
      } else {
        router.push("/opportunities");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to create opportunity";
      setError(typeof message === "string" ? message : "Something went wrong");
      console.error("Create opportunity error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Opportunity</h1>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400 mb-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            URL-friendly identifier (e.g., "my-opportunity")
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            required
            className="w-full border rounded px-3 py-2"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            disabled={loading}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              disabled={loading}
            >
              <option value="GRANT">Grant</option>
              <option value="JOB">Job</option>
              <option value="SCHOLARSHIP">Scholarship</option>
              <option value="TENDER">Tender</option>
              <option value="STARTUP">Startup</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              disabled={loading}
            >
              <option value="GRANT">Grant</option>
              <option value="JOB">Job</option>
              <option value="SCHOLARSHIP">Scholarship</option>
              <option value="TENDER">Tender</option>
              <option value="STARTUP">Startup</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">District</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              disabled={loading}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            disabled={loading}
          >
            <option value="DRAFT">Draft</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            disabled={loading}
          />
          <label className="text-sm font-medium">Publish immediately</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating..." : "Create Opportunity"}
        </button>
      </form>
    </div>
  );
}
