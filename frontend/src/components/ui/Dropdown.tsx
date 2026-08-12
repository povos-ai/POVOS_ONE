"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  items: DropdownItem[];
  onChange?: (value: string) => void;
}

export default function Dropdown({
  label,
  placeholder = "Select...",
  items,
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  function select(item: DropdownItem) {
    setSelected(item.label);
    setOpen(false);
    onChange?.(item.value);
  }

  return (
    <div className="relative w-72">

      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 text-left shadow-sm hover:border-slate-400"
      >
        <span className={cn(!selected && "text-slate-400")}>
          {selected || placeholder}
        </span>

        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => select(item)}
              className="block w-full px-4 py-3 text-left hover:bg-blue-50"
            >
              {item.label}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}



