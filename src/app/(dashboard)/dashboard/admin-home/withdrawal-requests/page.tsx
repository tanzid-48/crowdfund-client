"use client";

import { useEffect, useState, useCallback } from "react";
import { getPendingWithdrawals } from "@/lib/api/withdrawals";
import { approveWithdrawal } from "@/lib/action/withdrawals";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Wallet } from "lucide-react";
import type { Withdrawal } from "@/types";

export default function WithdrawalRequestsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPendingWithdrawals();
      setWithdrawals(data);
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
      await approveWithdrawal(id);
      toast.success("Withdrawal marked as paid");
      setWithdrawals((prev) => prev.filter((w) => w._id !== id));
    } catch {
      toast.error("Failed to process withdrawal");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Withdrawal Requests
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Process pending withdrawal requests from creators
      </p>

      {withdrawals.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Wallet className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">
              No pending withdrawals
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Withdrawal requests from creators will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3">Creator</th>
                <th className="px-4 py-3">Credits</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr
                  key={w._id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {w.creator_name}
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground">
                    {w.withdrawal_credit}
                  </td>
                  <td className="px-4 py-3 font-mono text-primary">
                    ${w.withdrawal_amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">
                    {w.payment_system}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {w.account_number}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(w.withdraw_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-primary hover:text-primary"
                      disabled={processingId === w._id}
                      onClick={() => handleApprove(w._id as string)}
                    >
                      <CheckCircle2 size={14} />
                      Payment Success
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
