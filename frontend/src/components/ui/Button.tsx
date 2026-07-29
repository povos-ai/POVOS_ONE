import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-slate-200 text-slate-900 hover:bg-slate-300",

    outline:
      "border border-slate-300 bg-white hover:bg-slate-100",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={cn(
        "rounded-xl px-5 py-2.5 font-medium transition-all",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}