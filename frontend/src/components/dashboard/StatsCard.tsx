interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-gray-500 text-lg">
        {title}
      </p>

      <h2 className="mt-2 text-5xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-3 text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}



