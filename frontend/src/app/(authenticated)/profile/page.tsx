"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  sub: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);
      setLoading(false);
    } catch (err) {
      setError((((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? ((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof ((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? ((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? (JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify((JSON.stringify("Unable to decode token."?.message || "Something went wrong" instanceof Error ? JSON.stringify("Unable to decode token."?.message || "Something went wrong".message : (typeof JSON.stringify("Unable to decode token."?.message || "Something went wrong" === "string" ? JSON.stringify("Unable to decode token."?.message || "Something went wrong" : JSON.stringify(JSON.stringify("Unable to decode token."?.message || "Something went wrong")))))))))));
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  if (!user) return <div className="text-red-500 p-8">No user data.</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-600">Your account information (from JWT).</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Role</label>
            <p className="text-lg font-semibold capitalize">{user.role?.toLowerCase()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">User ID</label>
            <p className="text-sm text-gray-600">{user.sub}</p>
          </div>
        </div>
      </div>
    </div>
  );
}






