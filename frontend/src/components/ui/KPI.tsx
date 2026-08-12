interface KPIProps {
  label: string;
  value: string | number;
  supportingText?: string;
  icon: React.ReactNode;
  color: "blue" | "teal" | "orange" | "purple";
}

const colorMap = {
  blue: "border-blue-500 bg-blue-50 text-blue-600",
  teal: "border-teal-500 bg-teal-50 text-teal-600",
  orange: "border-orange-500 bg-orange-50 text-orange-600",
  purple: "border-purple-500 bg-purple-50 text-purple-600",
};

export function KPI({ label, value, supportingText, icon, color }: KPIProps) {
  const accent = colorMap[color];
  return (
    <div className={`flex items-center gap-3 border-l-4 ${accent.split(' ')[0]} pl-3`}>
      <div className={`w-8 h-8 rounded-full ${accent.split(' ').slice(1,3).join(' ')} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-500">{label}</p>
        <p className="text-2xl font-extrabold leading-none text-gray-900">{value}</p>
        {supportingText && <p className="text-[10px] font-medium text-gray-500">{supportingText}</p>}
      </div>
    </div>
  );
}




