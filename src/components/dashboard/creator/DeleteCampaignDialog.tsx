"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteCampaign } from "@/lib/action/campaigns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function DeleteCampaignDialog({
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
      const res = await deleteCampaign(campaignId);
      toast.success(
        `Campaign deleted. ${res.refundedCount} supporters refunded.`,
      );
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
      <DialogTrigger className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-accent">
        <Trash2 size={14} />
        Delete
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete &ldquo;{campaignTitle}&rdquo;?</DialogTitle>
          <DialogDescription>
            This will permanently delete the campaign and refund credits to all
            supporters who contributed. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
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
