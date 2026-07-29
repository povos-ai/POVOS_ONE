import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        "border border-slate-200",
        "bg-white",
        "shadow-sm",
        "transition-all",
        "duration-300",
        "hover:shadow-lg",
        "focus-within:ring-2",
        "focus-within:ring-blue-500",
        "overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}