"use client";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 min-h-0">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
