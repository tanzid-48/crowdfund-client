"use client";

import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import Loading from "@/components/shared/Loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <Loading />;
  if (!isAuthenticated || !user) return null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar role={user.role} />
      <div className="flex-1">
        <MobileSidebar role={user.role} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
