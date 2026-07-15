"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateCampaign } from "@/lib/action/campaigns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import type { Campaign } from "@/types";

interface UpdateFormValues {
  campaign_title: string;
  campaign_story: string;
  reward_info: string;
}

export default function UpdateCampaignDialog({
  campaign,
  onUpdated,
}: {
  campaign: Campaign;
  onUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<UpdateFormValues>({
    defaultValues: {
      campaign_title: campaign.campaign_title,
      campaign_story: campaign.campaign_story,
      reward_info: campaign.reward_info || "",
    },
  });

  const onSubmit = async (values: UpdateFormValues) => {
    setLoading(true);
    try {
      await updateCampaign(campaign._id as string, values);
      toast.success("Campaign updated");
      setOpen(false);
      onUpdated();
    } catch {
      toast.error("Failed to update campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">
    <Pencil size={14} />
    Update
  </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaign_title">Title</Label>
            <Input id="campaign_title" {...register("campaign_title")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign_story">Story</Label>
            <textarea
              id="campaign_story"
              rows={5}
              className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              {...register("campaign_story")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reward_info">Reward Info</Label>
            <Input id="reward_info" {...register("reward_info")} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
