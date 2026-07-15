"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getAvailableCredits } from "@/lib/api/withdrawals";
import { createWithdrawal } from "@/lib/action/withdrawals";
import {
  withdrawalSchema,
  type WithdrawalFormValues,
} from "@/schemas/withdrawal.schema";
import { WITHDRAW_RATE, MIN_WITHDRAW_CREDIT } from "@/lib/creditMath";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/shared/Loading";

const paymentSystems = [
  { value: "stripe", label: "Stripe" },
  { value: "bkash", label: "bKash" },
  { value: "rocket", label: "Rocket" },
  { value: "nagad", label: "Nagad" },
];

export default function WithdrawalForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const [availableCredits, setAvailableCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
  });

  const creditAmount = watch("withdrawal_credit") || 0;
  const dollarAmount = creditAmount / WITHDRAW_RATE;

  useEffect(() => {
    if (!user?.email) return;
    getAvailableCredits(user.email)
      .then((data) => setAvailableCredits(data.availableCredits))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const onSubmit = async (values: WithdrawalFormValues) => {
    if (!user) return;

    if (values.withdrawal_credit > (availableCredits ?? 0)) {
      toast.error("You don't have enough raised credits");
      return;
    }

    setSubmitting(true);
    try {
      await createWithdrawal({
        ...values,
        creator_email: user.email,
        creator_name: user.name,
      });
      toast.success("Withdrawal request submitted");
      onSuccess();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to submit withdrawal request",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  const insufficientCredit = (availableCredits ?? 0) < MIN_WITHDRAW_CREDIT;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs text-muted-foreground">Available to withdraw</p>
        <p className="mt-1 font-mono text-2xl font-bold text-primary">
          {availableCredits ?? 0} credits
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          ≈ ${((availableCredits ?? 0) / WITHDRAW_RATE).toFixed(2)} · Minimum
          withdrawal: {MIN_WITHDRAW_CREDIT} credits
        </p>
      </div>

      {insufficientCredit ? (
        <div className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
          Insufficient credit. You need at least {MIN_WITHDRAW_CREDIT} credits
          raised to request a withdrawal.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="withdrawal_credit">Credits to withdraw</Label>
            <Input
              id="withdrawal_credit"
              type="number"
              placeholder={`Min ${MIN_WITHDRAW_CREDIT}`}
              {...register("withdrawal_credit", { valueAsNumber: true })}
            />
            {errors.withdrawal_credit && (
              <p className="text-xs text-destructive">
                {errors.withdrawal_credit.message}
              </p>
            )}
            {creditAmount > 0 && (
              <p className="font-mono text-xs text-muted-foreground">
                You wll receive: ${dollarAmount.toFixed(2)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_system">Payment method</Label>
            <select
              id="payment_system"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              {...register("payment_system")}
            >
              <option value="">Select method</option>
              {paymentSystems.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            {errors.payment_system && (
              <p className="text-xs text-destructive">
                {errors.payment_system.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="account_number">Account number</Label>
            <Input
              id="account_number"
              placeholder="e.g. 01XXXXXXXXX"
              {...register("account_number")}
            />
            {errors.account_number && (
              <p className="text-xs text-destructive">
                {errors.account_number.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Request Withdrawal"}
          </Button>
        </form>
      )}
    </div>
  );
}
