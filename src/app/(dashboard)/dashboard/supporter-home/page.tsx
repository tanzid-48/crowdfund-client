"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  getSupporterStats,
  type SupporterStats,
} from "@/lib/api/contributions";
import StatsCard from "@/components/dashboard/StatsCard";
import ContributionStatusChart from "@/components/dashboard/supporter/ContributionStatusChart";
import Loading from "@/components/shared/Loading";
import { HeartHandshake, Clock, Wallet } from "lucide-react";

export default function SupporterHomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<SupporterStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    getSupporterStats(user.email)
      .then(setStats)
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Here's a summary of your contributions
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard
          icon={HeartHandshake}
          label="Total Contributions"
          value={stats?.totalContributions ?? 0}
          accent="success"
        />
        <StatsCard
          icon={Clock}
          label="Pending Contributions"
          value={stats?.pendingContributions ?? 0}
        />
        <StatsCard
          icon={Wallet}
          label="Total Contributed"
          value={`${stats?.totalAmountContributed ?? 0} credits`}
          accent="success"
        />
      </div>

      <div className="mt-6">
        <ContributionStatusChart data={stats?.statusBreakdown ?? []} />
      </div>
    </div>
  );
}
