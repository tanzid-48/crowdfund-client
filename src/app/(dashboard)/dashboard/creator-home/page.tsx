"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getCreatorStats, type CreatorStats } from "@/lib/api/campaigns";
import StatsCard from "@/components/dashboard/StatsCard";
import Loading from "@/components/shared/Loading";
import { FolderKanban, Rocket, TrendingUp } from "lucide-react";

export default function CreatorHomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<CreatorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    getCreatorStats(user.email)
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
        Here are an overview of your campaigns
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard
          icon={FolderKanban}
          label="Total Campaigns"
          value={stats?.totalCampaigns ?? 0}
        />
        <StatsCard
          icon={Rocket}
          label="Active Campaigns"
          value={stats?.activeCampaigns ?? 0}
          accent="success"
        />
        <StatsCard
          icon={TrendingUp}
          label="Total Raised"
          value={`$${(stats?.totalRaised ?? 0).toLocaleString()}`}
          accent="success"
        />
      </div>
    </div>
  );
}
