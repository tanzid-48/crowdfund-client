"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { getAllCampaignsForAdmin } from "@/lib/api/campaigns";
import AdminDeleteCampaignDialog from "@/components/dashboard/admin/AdminDeleteCampaignDialog";
import Loading from "@/components/shared/Loading";
import { FolderKanban } from "lucide-react";
import type { Campaign } from "@/types";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  approved: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
  suspended: "bg-destructive/10 text-destructive",
};

export default function ManageCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCampaignsForAdmin();
      setCampaigns(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Manage Campaigns
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View and manage all campaigns on the platform
      </p>

      {campaigns.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <FolderKanban className="text-muted-foreground" size={24} />
          </div>
          <p className="font-medium text-foreground">No campaigns found</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {campaigns.map((c) => (
            <div
              key={c._id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-16 w-full shrink-0 overflow-hidden rounded-lg sm:w-24">
                <Image
                  src={c.campaign_image_url}
                  alt={c.campaign_title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-semibold text-foreground">
                    {c.campaign_title}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  by {c.creator_name} · ${c.amount_raised}/${c.funding_goal}
                </p>
              </div>

              <AdminDeleteCampaignDialog
                campaignId={c._id as string}
                campaignTitle={c.campaign_title}
                onDeleted={fetchCampaigns}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
