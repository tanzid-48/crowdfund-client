"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface StatusData {
  name: string;
  value: number;
}

interface LegendPayloadEntry {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendPayloadEntry[];
}

const COLORS: Record<string, string> = {
  Approved: "var(--primary)",
  Pending: "#f5a623",
  Rejected: "var(--destructive)",
};

function CustomLegend({ payload }: CustomLegendProps) {
  return (
    <div className="mt-4 flex justify-center gap-5">
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

export default function ContributionStatusChart({
  data,
}: {
  data: StatusData[];
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (total === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
        No contributions yet to visualize
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-heading text-sm font-semibold text-foreground">
        Contribution Status Breakdown
      </h3>
      <div className="mt-2 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name] || "var(--muted-foreground)"}
                />
              ))}
            </Pie>
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
