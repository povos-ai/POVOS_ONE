import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function CardHeader({
  children,
  className,
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "border-b border-slate-200",
        "px-6 py-5",
        className
      )}
    >
      {children}
    </div>
  );
}

