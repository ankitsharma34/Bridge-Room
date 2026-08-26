import { DashboardNavbar } from "@/components/dashboard/navbar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="flex h-screen flex-col overflow-hidden bg-background">
        {/* Top Navbar */}
        <DashboardNavbar />

        {/* Workspace Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Left Sidebar */}
          <div className="hidden md:flex h-full">
            <DashboardSidebar />
          </div>

          {/* Main Content Viewport */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
