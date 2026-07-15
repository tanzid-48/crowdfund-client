"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";

const roleHomeMap: Record<UserRole, string> = {
  creator: "/dashboard/creator-home",
  supporter: "/dashboard/supporter-home",
  admin: "/dashboard/admin-home",
};

export default function DashboardIndexPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !isAuthenticated || !user) return;
    router.replace(roleHomeMap[user.role]);
  }, [loading, isAuthenticated, user, router]);

  return null;
}
