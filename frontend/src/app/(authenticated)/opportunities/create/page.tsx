"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateOpportunity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    organizationId: "cms7wtwf100001cl4ev0qxxpk",
    workspaceId: "ws1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://192.168.1.8:3001/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          description: form.description,
          category: form.category,
          type: form.type,
          district: form.district,
          state: form.state,
          status: form.status,
          published: form.published,
          organization: { connect: { id: form.organizationId } },
          workspace: { connect: { id: form.workspaceId } },
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Failed to create opportunity");
      }
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Opportunity</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            required
            className="w-full border rounded px-3 py-2"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium">District</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          <label className="text-sm font-medium">Publish immediately</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Opportunity"}
        </button>
      </form>
    </div>
  );
}







