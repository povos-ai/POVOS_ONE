import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-slate-900">
          POVOS ONE
        </h1>

        <p className="text-lg text-slate-600">
          AI Powered Opportunity Intelligence Platform
        </p>

        <Link
          href="/dashboard"
          className="inline-flex rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
        >
          Enter Dashboard
        </Link>
      </div>
    </main>
  );
}