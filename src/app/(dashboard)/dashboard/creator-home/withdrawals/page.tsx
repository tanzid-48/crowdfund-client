"use client";

import { useState } from "react";
import WithdrawalForm from "@/components/dashboard/creator/WithdrawalForm";

export default function WithdrawalsPage() {
  const [key, setKey] = useState(0);

  return (
    <div className="text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Withdrawals
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Convert your raised credits into cash — {"20 credits = $1"}
      </p>
      <div className="mt-6">
        <WithdrawalForm key={key} onSuccess={() => setKey((k) => k + 1)} />
      </div>
    </div>
  );
}
