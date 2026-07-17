"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getPaymentsForUser } from "@/lib/api/payments";
import Loading from "@/components/shared/Loading";
import { Receipt } from "lucide-react";
import type { Payment } from "@/types";

export default function SupporterPaymentHistoryPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    getPaymentsForUser(user.email)
      .then(setPayments)
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Payment History
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        All your credit purchases
      </p>

      {payments.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Receipt className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">No purchases yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Buy credits to start contributing to campaigns.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="mt-6 hidden overflow-x-auto rounded-xl border border-border md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Credits</th>
                  <th className="px-4 py-3">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(p.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-foreground">
                      ${p.amount}
                    </td>
                    <td className="px-4 py-3 font-mono text-primary">
                      {p.credits} credits
                    </td>
                    <td className="px-4 py-3 truncate text-xs text-muted-foreground max-w-[160px]">
                      {p.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="mt-6 space-y-3 md:hidden">
            {payments.map((p) => (
              <div
                key={p._id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-foreground">
                    ${p.amount}
                  </span>
                  <span className="font-mono text-sm text-primary">
                    {p.credits} credits
                  </span>
                </div>
                <p className="mt-2 truncate text-xs text-muted-foreground">
                  {p.transactionId}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(p.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
