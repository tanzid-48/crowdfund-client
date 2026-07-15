"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // ⬅️ এইটাই key — লোডিং শেষ না হওয়া পর্যন্ত redirect করবো না

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [loading, isAuthenticated, user, allowedRoles, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
