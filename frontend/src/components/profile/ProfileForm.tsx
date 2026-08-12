"use client";
import { useState } from "react";

export default function ProfileForm({ profile, onUpdate }) {
  const [formData, setFormData] = useState(profile || {});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setMessage("✅ Profile updated successfully!");
      if (onUpdate) onUpdate(data);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" name="age" placeholder="Age" value={formData.age || ""} onChange={handleChange} className="border p-2 rounded" />
          <select name="gender" value={formData.gender || ""} onChange={handleChange} className="border p-2 rounded">
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          <input name="state" placeholder="State" value={formData.state || ""} onChange={handleChange} className="border p-2 rounded" />
          <input name="district" placeholder="District" value={formData.district || ""} onChange={handleChange} className="border p-2 rounded" />
          <input name="city" placeholder="City" value={formData.city || ""} onChange={handleChange} className="border p-2 rounded" />
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Education & Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="education" value={formData.education || ""} onChange={handleChange} className="border p-2 rounded">
            <option value="">Highest Education</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Diploma">Diploma</option>
            <option value="Graduate">Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
            <option value="PhD">PhD</option>
          </select>
          <input name="fieldOfStudy" placeholder="Field of Study" value={formData.fieldOfStudy || ""} onChange={handleChange} className="border p-2 rounded" />
          <input name="skills" placeholder="Skills (comma-separated)" value={formData.skills || ""} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="experienceYears" placeholder="Experience (years)" value={formData.experienceYears || ""} onChange={handleChange} className="border p-2 rounded" />
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">User Type & Professional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="userType" value={formData.userType || ""} onChange={handleChange} className="border p-2 rounded">
            <option value="">Select User Type</option>
            <option value="Student">Student</option>
            <option value="Job Seeker">Job Seeker</option>
            <option value="Professional">Professional</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Farmer">Farmer</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Organization">Organization</option>
            <option value="Other">Other</option>
          </select>
          <input name="employmentStatus" placeholder="Employment Status" value={formData.employmentStatus || ""} onChange={handleChange} className="border p-2 rounded" />
          {formData.userType === "Entrepreneur" && (
            <>
              <input name="businessType" placeholder="Business Type" value={formData.businessType || ""} onChange={handleChange} className="border p-2 rounded" />
              <select name="businessStage" value={formData.businessStage || ""} onChange={handleChange} className="border p-2 rounded">
                <option value="">Business Stage</option>
                <option value="Idea">Idea</option>
                <option value="Early Stage">Early Stage</option>
                <option value="Growth">Growth</option>
                <option value="Mature">Mature</option>
              </select>
            </>
          )}
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Opportunity Interests & Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="interests" placeholder="Interests (e.g., Grant, Startup, Scholarship)" value={formData.interests || ""} onChange={handleChange} className="border p-2 rounded" />
          <input name="preferredTypes" placeholder="Preferred Types (e.g., Government, Private)" value={formData.preferredTypes || ""} onChange={handleChange} className="border p-2 rounded" />
          <select name="geoPreference" value={formData.geoPreference || ""} onChange={handleChange} className="border p-2 rounded">
            <option value="">Geographic Preference</option>
            <option value="Local">Local</option>
            <option value="District">District</option>
            <option value="State">State</option>
            <option value="National">National</option>
            <option value="Online/Remote">Online/Remote</option>
          </select>
        </div>
      </section>

      <div className="flex justify-end gap-4">
        <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
      {message && <p className="text-sm text-center">{message}</p>}
    </form>
  );
}

