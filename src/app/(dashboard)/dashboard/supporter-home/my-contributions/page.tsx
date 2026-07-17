"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyContributionsPaginated } from "@/lib/api/contributions";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { FileText, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type { Contribution } from "@/types";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  approved: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
};

const PAGE_SIZE = 5;

export default function MyContributionsPage() {
  const { user } = useAuth();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<Contribution | null>(null);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    getMyContributionsPaginated(user.email, page, PAGE_SIZE)
      .then((data) => {
        setContributions(data.contributions);
        setTotalPages(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [user?.email, page]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        My Contributions
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        All contributions you have made, across every campaign
      </p>

      {contributions.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <FileText className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">No contributions yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore campaigns and make your first contribution.
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
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
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
                    <td className="px-4 py-3 font-mono text-foreground">
                      {c.contribution_amount} credits
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(c.current_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setViewing(c)}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="mt-6 space-y-3 md:hidden">
            {contributions.map((c) => (
              <div
                key={c._id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">
                      {c.campaign_title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      by {c.creator_name}
                    </p>
                  </div>
                  <button
                    onClick={() => setViewing(c)}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-accent"
                  >
                    <Eye size={16} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {c.contribution_amount} credits
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(c.current_date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
