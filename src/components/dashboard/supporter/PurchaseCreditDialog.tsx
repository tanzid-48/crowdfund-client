"use client";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import CheckoutForm from "./CheckoutForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Package {
  credits: number;
  amount: number;
}

export default function PurchaseCreditDialog({
  pkg,
  open,
  onOpenChange,
  onSuccess,
}: {
  pkg: Package | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  if (!pkg) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Purchase {pkg.credits} credits — ${pkg.amount}
          </DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={pkg.amount}
            credits={pkg.credits}
            onSuccess={() => {
              onOpenChange(false);
              onSuccess();
            }}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
