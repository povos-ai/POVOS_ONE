"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Decode token or fetch user
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to decode token.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <AppShell><div className="flex justify-center items-center h-full">Loading...</div></AppShell>;
  }

  if (error) {
    return <AppShell><div className="text-red-500 p-4">Error: {error}</div></AppShell>;
  }

  return (
    <AppShell>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white p-4 rounded shadow">
          <p><strong>Email:</strong> {user?.email || "N/A"}</p>
          <p><strong>Role:</strong> {user?.role || "N/A"}</p>
          <p><strong>User ID:</strong> {user?.sub || user?.id || "N/A"}</p>
        </div>
      </div>
    </AppShell>
  );
}
