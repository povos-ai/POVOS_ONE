import { Search } from "lucide-react";
import Input from "@/components/ui/Input";

export default function SearchBar() {
  return (
    <div className="relative mb-6">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
      />

      <Input
        type="search"
        placeholder="Search opportunities, schemes, startups..."
        className="pl-12"
      />
    </div>
  );
}

