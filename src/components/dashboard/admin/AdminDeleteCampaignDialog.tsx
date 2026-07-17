"use client";

import { useState } from "react";
import { toast } from "sonner";
import { adminDeleteCampaign } from "@/lib/action/campaigns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function AdminDeleteCampaignDialog({
  campaignId,
  campaignTitle,
  onDeleted,
}: {
  campaignId: string;
  campaignTitle: string;
  onDeleted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await adminDeleteCampaign(campaignId);
      toast.success("Campaign deleted");
      setOpen(false);
      onDeleted();
    } catch {
      toast.error("Failed to delete campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-destructive transition-colors hover:bg-accent">
        <Trash2 size={12} />
        Delete
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete &ldquo;{campaignTitle}&rdquo;?</DialogTitle>
          <DialogDescription>
            This will permanently delete this campaign and all its
            contributions. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
