import { WorkspaceProvider } from "@/context/WorkspaceContext";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      {children}
    </WorkspaceProvider>
  );
}
