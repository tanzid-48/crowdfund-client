"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAdminStats, type AdminStats } from "@/lib/api/users";
import StatsCard from "@/components/dashboard/StatsCard";
import AdminAnalytics from "@/components/dashboard/admin/AdminAnalytics";
import Loading from "@/components/shared/Loading";
import { Users, Rocket, Coins, Receipt } from "lucide-react";

export default function AdminHomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Platform overview at a glance
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={Users}
          label="Total Supporters"
          value={stats?.totalSupporters ?? 0}
        />
        <StatsCard
          icon={Rocket}
          label="Total Creators"
          value={stats?.totalCreators ?? 0}
          accent="success"
        />
        <StatsCard
          icon={Coins}
          label="Total Credits (all users)"
          value={stats?.totalCredits ?? 0}
        />
        <StatsCard
          icon={Receipt}
          label="Payments Processed"
          value={stats?.totalPaymentsProcessed ?? 0}
          accent="success"
        />
      </div>

      <AdminAnalytics
        campaignStatusBreakdown={stats?.campaignStatusBreakdown ?? []}
        userRoleBreakdown={stats?.userRoleBreakdown ?? []}
      />
    </div>
  );
}
