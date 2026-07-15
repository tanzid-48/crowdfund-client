import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: "primary" | "success";
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  accent = "primary",
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            accent === "success"
              ? "bg-primary/10 text-primary"
              : "bg-secondary text-foreground"
          }`}
        >
          <Icon size={20} />
        </div>
        <div>
          <p className="font-mono text-2xl font-bold text-foreground">
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}
