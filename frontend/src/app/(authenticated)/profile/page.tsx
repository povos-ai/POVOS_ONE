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
  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setFormData(data);
        setError(null);
      } catch (err: any) {
        let msg = "Failed to load profile";
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
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  // Section navigation for edit mode
  const sections = [
    { id: "personal", label: "Personal" },
    { id: "location", label: "Location" },
    { id: "professional", label: "Professional" },
    { id: "academic", label: "Academic" },
    { id: "preferences", label: "Preferences" },
    { id: "social", label: "Social" },
  ];

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

  if (!profile) {
    return <div className="p-6 text-center text-gray-500">No profile data found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <p className="text-blue-100 text-sm mt-1">Manage your personal and professional information</p>
        </div>

        {successMsg && (
          <div className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg">
            {successMsg}
          </div>
        )}

        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        {editing ? (
          // ==================== EDIT MODE ====================
          <form onSubmit={handleSubmit} className="p-6">
            {/* Section Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Personal Details */}
            {activeSection === "personal" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" name="email" value={formData.email || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select name="gender" value={formData.gender || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nationality</label>
                    <select name="nationality" value={formData.nationality || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Nationality</option>
                      <option value="Indian">Indian</option>
                      <option value="American">American</option>
                      <option value="British">British</option>
                      <option value="Canadian">Canadian</option>
                      <option value="Australian">Australian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Marital Status</label>
                    <select name="maritalStatus" value={formData.maritalStatus || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input type="text" value={profile?.role || ""} className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50" disabled />
                  </div>
                </div>
              </div>
            )}

            {/* Location Details */}
            {activeSection === "location" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Location Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <select name="state" value={formData.state || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">District</label>
                    <input type="text" name="district" value={formData.district || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input type="text" name="city" value={formData.city || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pin Code</label>
                    <input type="text" name="pinCode" value={formData.pinCode || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="560001" />
                  </div>
                </div>
              </div>
            )}

            {/* Professional Details */}
            {activeSection === "professional" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">User Type</label>
                    <select name="userType" value={formData.userType || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select User Type</option>
                      <option value="Student (School)">Student (School)</option>
                      <option value="Student (College)">Student (College)</option>
                      <option value="Fresh Graduate">Fresh Graduate</option>
                      <option value="Professional (1-5 years)">Professional (1-5 years)</option>
                      <option value="Professional (5-10 years)">Professional (5-10 years)</option>
                      <option value="Professional (10+ years)">Professional (10+ years)</option>
                      <option value="Entrepreneur">Entrepreneur</option>
                      <option value="Job Seeker">Job Seeker</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Government Employee">Government Employee</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Job Title</label>
                    <input type="text" name="jobTitle" value={formData.jobTitle || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Software Engineer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company/Organization</label>
                    <input type="text" name="company" value={formData.company || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Employment Status</label>
                    <select name="employmentStatus" value={formData.employmentStatus || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Status</option>
                      <option value="Employed Full-time">Employed Full-time</option>
                      <option value="Employed Part-time">Employed Part-time</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Student">Student</option>
                      <option value="Retired">Retired</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Industry</label>
                    <select name="industry" value={formData.industry || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Industry</option>
                      <option value="Technology / IT">Technology / IT</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Finance / Banking">Finance / Banking</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Construction">Construction</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Government / Public Sector">Government / Public Sector</option>
                      <option value="Non-Profit / NGO">Non-Profit / NGO</option>
                      <option value="Media / Entertainment">Media / Entertainment</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Transport / Logistics">Transport / Logistics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sector</label>
                    <input type="text" name="sector" value={formData.sector || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Name</label>
                    <input type="text" name="businessName" value={formData.businessName || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Type</label>
                    <input type="text" name="businessType" value={formData.businessType || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Stage</label>
                    <select name="businessStage" value={formData.businessStage || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Stage</option>
                      <option value="Idea">Idea</option>
                      <option value="Startup">Startup</option>
                      <option value="Growth">Growth</option>
                      <option value="Established">Established</option>
                      <option value="Expansion">Expansion</option>
                      <option value="Merger/Acquisition">Merger/Acquisition</option>
                      <option value="IPO">IPO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Monthly Income</label>
                    <select name="income" value={formData.income || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Income Range</option>
                      <option value="Below 10K">Below ₹10,000</option>
                      <option value="10K-25K">₹10,000 - ₹25,000</option>
                      <option value="25K-50K">₹25,000 - ₹50,000</option>
                      <option value="50K-1L">₹50,000 - ₹1,00,000</option>
                      <option value="1L-5L">₹1,00,000 - ₹5,00,000</option>
                      <option value="5L-10L">₹5,00,000 - ₹10,00,000</option>
                      <option value="10L+">₹10,00,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Years of Experience</label>
                    <input type="number" name="experienceYears" value={formData.experienceYears || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="0" max="50" />
                  </div>
                </div>
              </div>
            )}

            {/* Academic Details */}
            {activeSection === "academic" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Academic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Education</label>
                    <select name="education" value={formData.education || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Education Level</option>
                      <option value="High School">High School</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="MBA">MBA</option>
                      <option value="PhD">PhD</option>
                      <option value="Post-Doctoral">Post-Doctoral</option>
                      <option value="Professional Certification">Professional Certification</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Qualification</label>
                    <input type="text" name="qualification" value={formData.qualification || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Field of Study</label>
                    <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">University/College</label>
                    <input type="text" name="university" value={formData.university || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Year of Passing</label>
                    <input type="number" name="yearOfPassing" value={formData.yearOfPassing || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="1980" max="2030" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Skills</label>
                    <input type="text" name="skills" value={formData.skills || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., JavaScript, Python, Design" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Certifications</label>
                    <input type="text" name="certifications" value={formData.certifications || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., AWS Certified, PMP, CISSP" />
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeSection === "preferences" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select name="category" value={formData.category || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Category</option>
                      <option value="Education">Education</option>
                      <option value="Employment">Employment</option>
                      <option value="Entrepreneurship">Entrepreneurship</option>
                      <option value="Health">Health</option>
                      <option value="Social Welfare">Social Welfare</option>
                      <option value="Financial">Financial</option>
                      <option value="Technology">Technology</option>
                      <option value="Sports">Sports</option>
                      <option value="Arts & Culture">Arts & Culture</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Environment">Environment</option>
                      <option value="Housing">Housing</option>
                      <option value="Legal">Legal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Interests</label>
                    <input type="text" name="interests" value={formData.interests || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Technology, Education, Health" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Types</label>
                    <input type="text" name="preferredTypes" value={formData.preferredTypes || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Work Mode</label>
                    <select name="preferredWorkMode" value={formData.preferredWorkMode || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Work Mode</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Job Type</label>
                    <select name="preferredJobType" value={formData.preferredJobType || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contractual">Contractual</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Volunteer">Volunteer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Salary Expectation</label>
                    <select name="salaryExpectation" value={formData.salaryExpectation || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Range</option>
                      <option value="Below 3 LPA">Below ₹3 LPA</option>
                      <option value="3-5 LPA">₹3-5 LPA</option>
                      <option value="5-10 LPA">₹5-10 LPA</option>
                      <option value="10-20 LPA">₹10-20 LPA</option>
                      <option value="20+ LPA">₹20+ LPA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Location</label>
                    <input type="text" name="preferredLocation" value={formData.preferredLocation || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Bangalore, Mumbai, Remote" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Geo Preference</label>
                    <input type="text" name="geoPreference" value={formData.geoPreference || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
            )}

            {/* Social/Online Presence */}
            {activeSection === "social" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Social & Online Presence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
                    <input type="url" name="linkedin" value={formData.linkedin || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://linkedin.com/in/username" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub Profile</label>
                    <input type="url" name="github" value={formData.github || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://github.com/username" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Portfolio Website</label>
                    <input type="url" name="portfolio" value={formData.portfolio || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://portfolio.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Twitter/X</label>
                    <input type="url" name="twitter" value={formData.twitter || ""} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://twitter.com/username" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Resume/CV</label>
                    <input type="file" name="resume" accept=".pdf,.doc,.docx" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <p className="text-xs text-gray-400 mt-1">Upload PDF or DOC file (Max 5MB)</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-6 pt-4 border-t">
              <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
                {saving ? "Saving..." : "Save All Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setFormData(profile || {});
                  setSuccessMsg("");
                  setError(null);
                }}
                className="bg-gray-200 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // ==================== VIEW MODE ====================
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Personal Details */}
              <div className="col-span-full">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Personal Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                  <div><span className="text-xs text-gray-400">First Name</span><p className="font-medium">{profile.firstName || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Last Name</span><p className="font-medium">{profile.lastName || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Email</span><p className="font-medium">{profile.email}</p></div>
                  <div><span className="text-xs text-gray-400">Role</span><p className="font-medium">{profile.role}</p></div>
                  <div><span className="text-xs text-gray-400">Gender</span><p className="font-medium">{profile.gender || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Phone</span><p className="font-medium">{profile.phone || "—"}</p></div>
                </div>
              </div>

              {/* Location Details */}
              <div className="col-span-full">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Location Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                  <div><span className="text-xs text-gray-400">State</span><p className="font-medium">{profile.state || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">District</span><p className="font-medium">{profile.district || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">City</span><p className="font-medium">{profile.city || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Pin Code</span><p className="font-medium">{profile.pinCode || "—"}</p></div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="col-span-full">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Professional Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                  <div><span className="text-xs text-gray-400">User Type</span><p className="font-medium">{profile.userType || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Job Title</span><p className="font-medium">{profile.jobTitle || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Employment Status</span><p className="font-medium">{profile.employmentStatus || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Industry</span><p className="font-medium">{profile.industry || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Experience</span><p className="font-medium">{profile.experienceYears ? `${profile.experienceYears} years` : "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Business Stage</span><p className="font-medium">{profile.businessStage || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Income</span><p className="font-medium">{profile.income || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Company</span><p className="font-medium">{profile.company || "—"}</p></div>
                </div>
              </div>

              {/* Academic Details */}
              <div className="col-span-full">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Academic Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                  <div><span className="text-xs text-gray-400">Education</span><p className="font-medium">{profile.education || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Qualification</span><p className="font-medium">{profile.qualification || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Field of Study</span><p className="font-medium">{profile.fieldOfStudy || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Skills</span><p className="font-medium">{profile.skills || "—"}</p></div>
                </div>
              </div>

              {/* Preferences */}
              <div className="col-span-full">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Preferences</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                  <div><span className="text-xs text-gray-400">Category</span><p className="font-medium">{profile.category || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Interests</span><p className="font-medium">{profile.interests || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Work Mode</span><p className="font-medium">{profile.preferredWorkMode || "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Salary Expectation</span><p className="font-medium">{profile.salaryExpectation || "—"}</p></div>
                </div>
              </div>

              {/* Social Links */}
              <div className="col-span-full">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Social & Online Presence</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                  <div><span className="text-xs text-gray-400">LinkedIn</span><p className="font-medium">{profile.linkedin ? "✓" : "—"}</p></div>
                  <div><span className="text-xs text-gray-400">GitHub</span><p className="font-medium">{profile.github ? "✓" : "—"}</p></div>
                  <div><span className="text-xs text-gray-400">Portfolio</span><p className="font-medium">{profile.portfolio ? "✓" : "—"}</p></div>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="col-span-full mt-4">
                <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-blue-700">Profile Completion</span>
                    <p className="text-2xl font-bold text-blue-700">{profile.completion || 0}%</p>
                  </div>
                  <div className="w-48 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${profile.completion || 0}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="col-span-full flex justify-end mt-4">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  ✏️ Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
