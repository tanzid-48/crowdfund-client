"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getWithdrawalsForCreator } from "@/lib/api/withdrawals";
import Loading from "@/components/shared/Loading";
import { Receipt } from "lucide-react";
import type { Withdrawal } from "@/types";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  approved: "bg-primary/10 text-primary",
};

export default function PaymentHistoryPage() {
  const { user } = useAuth();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    getWithdrawalsForCreator(user.email)
      .then(setWithdrawals)
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Payment History
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        All your withdrawal requests and their status
      </p>

      {withdrawals.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Receipt className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">No withdrawals yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your withdrawal requests will appear here once submitted.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Credits</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr
                  key={w._id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(w.withdraw_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground">
                    {w.withdrawal_credit}
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground">
                    ${w.withdrawal_amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">
                    {w.payment_system}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {w.account_number}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[w.status]}`}
                    >
                      {w.status}
                    </span>
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
