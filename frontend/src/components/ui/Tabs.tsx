"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  items: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function Tabs({
  items,
  defaultValue,
  onChange,
}: TabsProps) {
  const [active, setActive] = useState(
    defaultValue || items[0]?.value
  );

  function changeTab(value: string) {
    setActive(value);
    onChange?.(value);
  }

  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1">

      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => changeTab(item.value)}
          className={cn(
            "rounded-lg px-5 py-2 text-sm font-medium transition-all",
            active === item.value
              ? "bg-blue-600 text-white shadow"
              : "text-slate-600 hover:bg-white"
          )}
        >
          {item.label}
        </button>
      ))}

    </div>
  );
}



