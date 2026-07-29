import Typography from "@/components/ui/Typography";

export default function DashboardHeader() {
  return (
    <div className="mb-10">
      <Typography variant="h1">
        Dashboard
      </Typography>

      <Typography
        variant="body"
        className="mt-2 text-lg"
      >
        Welcome to POVOS ONE Enterprise Platform
      </Typography>
    </div>
  );
}