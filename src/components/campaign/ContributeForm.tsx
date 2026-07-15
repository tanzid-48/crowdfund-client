"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  contributionSchema,
  type ContributionFormValues,
} from "@/schemas/contribution.schema";
import { createContribution } from "@/lib/action/contributions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Campaign } from "@/types";

export default function ContributeForm({ campaign }: { campaign: Campaign }) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
  });

  const onSubmit = async (values: ContributionFormValues) => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to contribute");
      router.push(`/login?redirect=/campaign/${campaign._id}`);
      return;
    }

    if (values.contribution_amount < campaign.minimum_contribution) {
      toast.error(
        `Minimum contribution is ${campaign.minimum_contribution} credits`,
      );
      return;
    }

    if (values.contribution_amount > user.credits) {
      toast.error("You don't have enough credits");
      return;
    }

    setLoading(true);
    try {
      await createContribution({
        campaign_id: campaign._id as string,
        campaign_title: campaign.campaign_title,
        contribution_amount: values.contribution_amount,
        supporter_email: user.email,
        supporter_name: user.name,
        creator_name: campaign.creator_name,
        creator_email: campaign.creator_email,
        message: values.message,
      });
      toast.success("Contribution submitted! Waiting for creator approval.");
      reset();
    } catch {
      toast.error("Failed to submit contribution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-border bg-card p-6"
    >
      <h3 className="font-heading text-lg font-semibold text-foreground">
        Contribute to this campaign
      </h3>
      <p className="text-xs text-muted-foreground">
        Minimum contribution:{" "}
        <span className="font-mono">
          {campaign.minimum_contribution} credits
        </span>
      </p>

      <div className="space-y-2">
        <Label htmlFor="contribution_amount">Amount (credits)</Label>
        <Input
          id="contribution_amount"
          type="number"
          step="1"
          placeholder={`e.g. ${campaign.minimum_contribution}`}
          {...register("contribution_amount", { valueAsNumber: true })}
        />
        {errors.contribution_amount && (
          <p className="text-xs text-destructive">
            {errors.contribution_amount.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (optional)</Label>
        <textarea
          id="message"
          rows={3}
          placeholder="Say something encouraging..."
          className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Contribute"}
      </Button>
    </form>
  );
}
