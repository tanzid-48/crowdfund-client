"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { getMyCampaigns } from "@/lib/api/campaigns";
import UpdateCampaignDialog from "@/components/dashboard/creator/UpdateCampaignDialog";
import DeleteCampaignDialog from "@/components/dashboard/creator/DeleteCampaignDialog";
import Loading from "@/components/shared/Loading";
import { FolderOpen } from "lucide-react";
import type { Campaign } from "@/types";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  approved: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
  suspended: "bg-destructive/10 text-destructive",
};

export default function MyCampaignsPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const data = await getMyCampaigns(user.email);
      setCampaigns(data);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        My Campaigns
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your campaigns, sorted by deadline
      </p>

      {campaigns.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <FolderOpen className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">No campaigns yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Launch your first campaign to get started.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {campaigns.map((campaign) => {
            const percent = campaign.funding_goal
              ? Math.min(
                  100,
                  Math.round(
                    (campaign.amount_raised / campaign.funding_goal) * 100,
                  ),
                )
              : 0;

            return (
              <div
                key={campaign._id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg sm:w-32">
                  <Image
                    src={campaign.campaign_image_url}
                    alt={campaign.campaign_title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-foreground">
                      {campaign.campaign_title}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[campaign.status]}`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {percent}% · ${campaign.amount_raised}/$
                      {campaign.funding_goal}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <UpdateCampaignDialog
                    campaign={campaign}
                    onUpdated={fetchCampaigns}
                  />
                  <DeleteCampaignDialog
                    campaignId={campaign._id as string}
                    campaignTitle={campaign.campaign_title}
                    onDeleted={fetchCampaigns}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
