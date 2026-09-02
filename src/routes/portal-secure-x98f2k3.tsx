import { createFileRoute } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/adminAuth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const Route = createFileRoute("/portal-secure-x98f2k3")({
  head: () => ({
    meta: [
      { title: "Norva Secure Admin Portal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRouteComponent,
});

function AdminRouteComponent() {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-xs">
        INITIALIZING SECURE VAULT...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminPanel />;
}
