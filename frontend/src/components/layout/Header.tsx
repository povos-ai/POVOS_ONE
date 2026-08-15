"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
  <img src="/logo.png" alt="POVOS ONE" className="h-8 w-auto" />
  <span className="text-xl font-semibold text-gray-800">POVOS ONE</span>
</div>
      <button onClick={logout} className="text-sm text-red-600 hover:text-red-800">
        Logout
      </button>
    </header>
  );
}

