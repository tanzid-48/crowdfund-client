"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getContributionsForCreator } from "@/lib/api/contributions";
import {
  approveContribution,
  rejectContribution,
} from "@/lib/action/contributions";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Check, X, Eye, Inbox } from "lucide-react";
import type { Contribution } from "@/types";

export default function ContributionReviewTable() {
  const { user } = useAuth();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [viewing, setViewing] = useState<Contribution | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const data = await getContributionsForCreator(user.email, "pending");
      setContributions(data);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      await approveContribution(id);
      toast.success("Contribution approved");
      setContributions((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Failed to approve contribution");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setProcessingId(id);
    try {
      await rejectContribution(id);
      toast.success("Contribution rejected and refunded");
      setContributions((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Failed to reject contribution");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <Loading />;

  if (contributions.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <Inbox className="text-muted-foreground" size={24} />
        </div>
        <div>
          <p className="font-medium text-foreground">
            No pending contributions
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            New contributions to your campaigns will show up here for review.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3">Supporter</th>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr key={c._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">
                  {c.supporter_name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {c.campaign_title}
                </td>
                <td className="px-4 py-3 font-mono text-foreground">
                  {c.contribution_amount} credits
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {new Date(c.current_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setViewing(c)}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contribution Details</DialogTitle>
            <DialogDescription>
              Full details of this contribution
            </DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Supporter</span>
                <span className="font-medium text-foreground">
                  {viewing.supporter_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="text-foreground">
                  {viewing.supporter_email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign</span>
                <span className="text-foreground">
                  {viewing.campaign_title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-mono text-primary">
                  {viewing.contribution_amount} credits
                </span>
              </div>
              {viewing.message && (
                <div>
                  <span className="text-muted-foreground">Message</span>
                  <p className="mt-1 rounded-md bg-secondary/40 p-3 text-foreground">
                    {viewing.message}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
