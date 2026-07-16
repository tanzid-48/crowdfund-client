"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { getPendingCampaigns } from "@/lib/api/campaigns";
import { approveCampaign, rejectCampaign } from "@/lib/action/campaigns";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { Check, X, Inbox } from "lucide-react";
import type { Campaign } from "@/types";

export default function CampaignApprovalsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPendingCampaigns();
      setCampaigns(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      await approveCampaign(id);
      toast.success("Campaign approved");
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Failed to approve campaign");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setProcessingId(id);
    try {
      await rejectCampaign(id);
      toast.success("Campaign rejected");
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Failed to reject campaign");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Campaign Approvals
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review and approve pending campaigns
      </p>

      {campaigns.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Inbox className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">No pending campaigns</p>
            <p className="mt-1 text-sm text-muted-foreground">
              New campaign submissions will show up here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {campaigns.map((c) => (
            <div
              key={c._id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg sm:w-32">
                <Image
                  src={c.campaign_image_url}
                  alt={c.campaign_title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground">
                  {c.campaign_title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  by {c.creator_name} · {c.category}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  Goal: ${c.funding_goal} · Deadline:{" "}
                  {new Date(c.deadline).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 text-primary hover:text-primary"
                  disabled={processingId === c._id}
                  onClick={() => handleApprove(c._id as string)}
                >
                  <Check size={14} />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 text-destructive hover:text-destructive"
                  disabled={processingId === c._id}
                  onClick={() => handleReject(c._id as string)}
                >
                  <X size={14} />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
