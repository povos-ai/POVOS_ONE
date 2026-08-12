"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@povos.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError((("" instanceof Error ? "".message : (typeof "" === "string" ? "" : JSON.stringify("" instanceof Error ? ("" instanceof Error ? "".message : (typeof "" === "string" ? "" : JSON.stringify("".message : (typeof ("" instanceof Error ? "".message : (typeof "" === "string" ? "" : JSON.stringify("" === "string" ? ("" instanceof Error ? "".message : (typeof "" === "string" ? "" : JSON.stringify("" : JSON.stringify(("" instanceof Error ? "".message : (typeof "" === "string" ? "" : JSON.stringify("")))))));

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(((msg instanceof Error ? msg.message : (typeof msg === "string" ? msg : JSON.stringify(msg instanceof Error ? (msg instanceof Error ? msg.message : (typeof msg === "string" ? msg : JSON.stringify(msg.message : (typeof (msg instanceof Error ? msg.message : (typeof msg === "string" ? msg : JSON.stringify(msg === "string" ? (msg instanceof Error ? msg.message : (typeof msg === "string" ? msg : JSON.stringify(msg : JSON.stringify((msg instanceof Error ? msg.message : (typeof msg === "string" ? msg : JSON.stringify(msg)))))));
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          <div className="text-sm text-center">
            <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
            {' '}or{' '}
            <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}


