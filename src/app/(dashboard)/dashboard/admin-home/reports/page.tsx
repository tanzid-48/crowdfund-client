"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllReports } from "@/lib/api/reports";
import { suspendReportedCampaign, dismissReport } from "@/lib/action/reports";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { Flag, Ban, X } from "lucide-react";
import type { Report } from "@/types";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllReports();
      setReports(data.filter((r) => r.status === "pending"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSuspend = async (id: string) => {
    setProcessingId(id);
    try {
      await suspendReportedCampaign(id);
      toast.success("Campaign suspended");
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch {
      toast.error("Failed to suspend campaign");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDismiss = async (id: string) => {
    setProcessingId(id);
    try {
      await dismissReport(id);
      toast.success("Report dismissed");
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch {
      toast.error("Failed to dismiss report");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Reports
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review campaigns reported by supporters
      </p>

      {reports.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Flag className="text-muted-foreground" size={24} />
          </div>
          <p className="font-medium text-foreground">No pending reports</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3">Reporter</th>
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr
                  key={r._id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {r.reporter_name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.campaign_title}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.reason}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-destructive hover:text-destructive"
                        disabled={processingId === r._id}
                        onClick={() => handleSuspend(r._id as string)}
                      >
                        <Ban size={14} />
                        Suspend
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        disabled={processingId === r._id}
                        onClick={() => handleDismiss(r._id as string)}
                      >
                        <X size={14} />
                        Dismiss
                      </Button>
                    </div>
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
