"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

console.log("✅ (public) login page loaded");

export default function LoginPage() {
  console.log("🔍 LoginPage component rendered");
  const router = useRouter();
  const [email, setEmail] = useState("demo@povos.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      alert("Error: " + (err instanceof Error ? err.message : JSON.stringify(err)));
      setError(err instanceof Error ? err.message : String(err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "4px solid red", borderRadius: "8px" }}>
      <h2>Sign in (TEST – RED BORDER)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: "8px", margin: "5px 0" }} required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", padding: "8px", margin: "5px 0" }} required />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", border: "none" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
