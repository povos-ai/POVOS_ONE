"use client";
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold">POVOS ONE</h1>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
