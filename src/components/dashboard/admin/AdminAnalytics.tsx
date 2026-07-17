"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface BreakdownData {
  name: string;
  value: number;
}

const STATUS_COLORS: Record<string, string> = {
  Pending: "#f5a623",
  Approved: "var(--primary)",
  Rejected: "var(--destructive)",
  Suspended: "#94a3b8",
};

const ROLE_COLORS = ["var(--primary)", "#34c87f", "#94a3b8"];

interface LegendPayloadEntry {
  value: string;
  color: string;
}

function CustomLegend({ payload }: { payload?: LegendPayloadEntry[] }) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {payload?.map((entry) => (
        <div
          key={entry.value}
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </div>
      ))}
    </div>
  );
}

export default function AdminAnalytics({
  campaignStatusBreakdown,
  userRoleBreakdown,
}: {
  campaignStatusBreakdown: BreakdownData[];
  userRoleBreakdown: BreakdownData[];
}) {
  const hasCampaignData = campaignStatusBreakdown.some((d) => d.value > 0);
  const hasUserData = userRoleBreakdown.some((d) => d.value > 0);

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="font-heading text-sm font-semibold text-foreground">
          Campaign Status Breakdown
        </h3>
        {hasCampaignData ? (
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={campaignStatusBreakdown}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  allowDecimals={false}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {campaignStatusBreakdown.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        STATUS_COLORS[entry.name] || "var(--muted-foreground)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-4 flex h-56 items-center justify-center text-sm text-muted-foreground">
            No campaign data yet
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="font-heading text-sm font-semibold text-foreground">
          User Role Distribution
        </h3>
        {hasUserData ? (
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {userRoleBreakdown.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={ROLE_COLORS[i % ROLE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-4 flex h-56 items-center justify-center text-sm text-muted-foreground">
            No user data yet
          </div>
        )}
      </motion.div>
    </div>
  );
}
