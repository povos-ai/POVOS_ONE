import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ai" | "outline";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variantMap = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  ai: "bg-indigo-600 hover:bg-indigo-700 text-white",
  outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
};

const sizeMap = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

export function Button({ children, variant = "primary", size = "md", className = "", onClick, disabled }: ButtonProps) {
  return (
    <button
      className={`rounded-lg font-semibold transition shadow-sm focus:outline-none ${variantMap[variant]} ${sizeMap[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}




