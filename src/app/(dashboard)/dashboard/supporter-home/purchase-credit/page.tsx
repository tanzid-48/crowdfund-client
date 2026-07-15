"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import PurchaseCreditDialog from "@/components/dashboard/supporter/PurchaseCreditDialog";

const packages = [
  { credits: 100, amount: 10 },
  { credits: 300, amount: 25 },
  { credits: 800, amount: 60 },
  { credits: 1500, amount: 110 },
];

export default function PurchaseCreditPage() {
  const [selectedPkg, setSelectedPkg] = useState<{
    credits: number;
    amount: number;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Purchase Credit
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Buy credits to contribute to campaigns — 10 credits = $1
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((pkg) => (
          <button
            key={pkg.credits}
            onClick={() => {
              setSelectedPkg(pkg);
              setDialogOpen(true);
            }}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
          >
            <Coins className="text-primary" size={28} />
            <p className="font-mono text-2xl font-bold text-foreground">
              {pkg.credits}
            </p>
            <p className="text-xs text-muted-foreground">credits</p>
            <p className="mt-2 rounded-full bg-secondary px-3 py-1 font-mono text-sm font-semibold text-foreground">
              ${pkg.amount}
            </p>
          </button>
        ))}
      </div>

      <PurchaseCreditDialog
        pkg={selectedPkg}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
}
