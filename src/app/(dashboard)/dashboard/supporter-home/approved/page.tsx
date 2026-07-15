"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getApprovedContributions } from "@/lib/api/contributions";
import Loading from "@/components/shared/Loading";
import { CheckCircle2 } from "lucide-react";
import type { Contribution } from "@/types";

export default function ApprovedContributionsPage() {
  const { user } = useAuth();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    getApprovedContributions(user.email)
      .then(setContributions)
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Approved Contributions
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Contributions that creators have approved
      </p>

      {contributions.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <CheckCircle2 className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">
              No approved contributions yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Once a creator approves your contribution, it will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Creator</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {c.campaign_title}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.creator_name}
                  </td>
                  <td className="px-4 py-3 font-mono text-primary">
                    {c.contribution_amount} credits
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(c.current_date).toLocaleDateString()}
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
