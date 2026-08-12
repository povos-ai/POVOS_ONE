"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");

  const [opportunity, setOpportunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [status, setStatus] = useState<"draft" | "submitted" | "error">("draft");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    if (!slug) { router.push("/opportunities"); return; }
    fetch(`http://192.168.1.8:3001/opportunities/slug/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((data) => { setOpportunity(data); setLoading(false); })
      .catch((err) => { console.error(err); setError((((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? ((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof ((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? ((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong".message : (typeof (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" === "string" ? (JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify((JSON.stringify(err.message?.message || "Something went wrong" instanceof Error ? JSON.stringify(err.message?.message || "Something went wrong".message : (typeof JSON.stringify(err.message?.message || "Something went wrong" === "string" ? JSON.stringify(err.message?.message || "Something went wrong" : JSON.stringify(JSON.stringify(err.message?.message || "Something went wrong"))))))))))); setLoading(false); });
  }, [slug, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveDraft = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://192.168.1.8:3001/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ opportunityId: opportunity.id, applicationData: formData }),
      });
      const data = await res.json();
      if (!res.ok) { if (res.status === 409) throw new Error("You have already applied."); throw new Error(data.message || "Failed to save draft"); }
      setSubmissionId(data.id);
      setStatus("draft");
      alert("Draft saved successfully!");
    } catch (error: any) { console.error(error); alert(error.message || "Failed to save draft."); }
    finally { setSubmitting(false); }
  };

  const handleSubmit = async () => {
    if (!submissionId) { alert("Please save draft first."); return; }
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://192.168.1.8:3001/submissions/${submissionId}/submit`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("submitted");
      alert("Application submitted successfully!");
      router.push("/my-applications");
    } catch (error: any) { console.error(error); alert("Failed to submit application."); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;
  if (!opportunity) return <div className="text-red-500 p-8">Opportunity not found.</div>;

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Apply for: {opportunity.title}</h1>
        <p className="text-gray-600 mb-6">{opportunity.description}</p>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Application Form</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none" required /></div>
            <div><label className="block text-sm font-medium">Phone</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
            <div><label className="block text-sm font-medium">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
            <div><label className="block text-sm font-medium">Additional Notes</label><textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
          </div>
          <div className="mt-6 flex gap-4">
            <button onClick={handleSaveDraft} disabled={submitting} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 transition">{submitting ? "Saving..." : "Save Draft"}</button>
            <button onClick={handleSubmit} disabled={submitting || status === "submitted"} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition">{status === "submitted" ? "Submitted ✅" : "Submit Application"}</button>
          </div>
          {status === "submitted" && <p className="text-green-600 mt-4">✅ Your application has been submitted.</p>}
        </div>
      </div>
    </AppShell>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
      <ApplyForm />
    </Suspense>
  );
}












