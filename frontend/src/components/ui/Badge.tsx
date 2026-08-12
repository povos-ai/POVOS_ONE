interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "blue" | "purple" | "amber" | "red";
  icon?: React.ReactNode;
}

const variantMap = {
  green: "bg-green-50 text-green-700",
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-purple-50 text-purple-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
};

export function Badge({ children, variant = "blue", icon }: BadgeProps) {
  return (
    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${variantMap[variant]}`}>
      {icon && <span className="w-3 h-3">{icon}</span>}
      {children}
    </span>
  );
}


